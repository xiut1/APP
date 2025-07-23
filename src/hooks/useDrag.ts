import { useState, useEffect, useCallback, useRef } from "react";
import { Position, DragState } from "../types/portfolio";

interface UseDragProps {
    initialPosition?: Position;
    onPositionChange?: (position: Position) => void;
    onDragStart?: () => void;
    onFixed?: (id: string, isFixed: boolean) => void;
    boundaries?: {
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
    };
    disabled?: boolean;
    id?: string;
}

export const useDrag = ({
    initialPosition = { x: 0, y: 0 },
    onPositionChange,
    onDragStart,
    onFixed,
    boundaries,
    disabled = false,
    id,
}: UseDragProps) => {
    const [position, setPosition] = useState<Position>(initialPosition);
    const [dragState, setDragState] = useState<DragState>({
        isDragging: false,
        dragStart: { x: 0, y: 0 },
        elementOffset: { x: 0, y: 0 },
    });
    const [isFixed, setIsFixed] = useState(false);
    const [isGravityActive, setIsGravityActive] = useState(false);
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
    const gravityAnimationRef = useRef<number | null>(null);
    const velocityRef = useRef({ x: 0, y: 0 });

    // 위치 업데이트 시 초기 위치도 함께 업데이트
    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    // 경계 확인 함수
    const applyBoundaries = useCallback(
        (pos: Position): Position => {
            if (!boundaries) return pos;

            let { x, y } = pos;

            if (boundaries.minX !== undefined) x = Math.max(x, boundaries.minX);
            if (boundaries.maxX !== undefined) x = Math.min(x, boundaries.maxX);
            if (boundaries.minY !== undefined) y = Math.max(y, boundaries.minY);
            if (boundaries.maxY !== undefined) y = Math.min(y, boundaries.maxY);

            return { x, y };
        },
        [boundaries]
    );

    // 중력 애니메이션
    const startGravity = useCallback(() => {
        // 고정된 상태라면 중력 효과를 적용하지 않음
        if (isFixed || isGravityActive) return;

        setIsGravityActive(true);
        
        // 큐브릭스 스타일의 애니메이션을 위한 초기 속도 설정
        // 약간의 랜덤 요소를 추가하여 더 자연스러운 움직임 구현
        const initialVelocityX = (Math.random() - 0.5) * 1.5; // -0.75 ~ 0.75 사이의 랜덤 값
        velocityRef.current = { 
            x: initialVelocityX, 
            y: 0 
        };

        const animate = () => {
            // 애니메이션 도중 고정되었다면 중력 효과 중단
            if (isFixed) {
                stopGravity();
                return;
            }
            
            setPosition((currentPos) => {
                // 큐브릭스 스타일의 부드러운 중력 효과를 위한 값 조정
                const gravity = 0.2; // 중력 감소
                const friction = 0.95; // 마찰 증가
                const bounce = 0.85; // 탄성 증가
                const airResistance = 0.98; // 공기 저항 추가

                // 이징 함수를 적용한 중력 효과
                velocityRef.current.y += gravity * (1 + Math.sin(velocityRef.current.y * 0.05) * 0.1);
                velocityRef.current.x *= friction;
                
                // 공기 저항 적용
                velocityRef.current.y *= airResistance;

                const newPosition = {
                    x: currentPos.x + velocityRef.current.x,
                    y: currentPos.y + velocityRef.current.y,
                };

                const boundedPosition = applyBoundaries(newPosition);

                // 바닥에 닿으면 튕기기 (부드러운 감속 적용)
                if (boundaries?.maxY && boundedPosition.y >= boundaries.maxY) {
                    velocityRef.current.y *= -bounce;
                    // 약간의 수평 방향 속도 추가로 자연스러운 튕김 효과
                    velocityRef.current.x += (Math.random() - 0.5) * velocityRef.current.y * 0.1;
                    
                    if (Math.abs(velocityRef.current.y) < 0.5) {
                        velocityRef.current.y = 0;
                        setIsGravityActive(false);
                        return boundedPosition;
                    }
                }

                // 렌더링 중 setState 방지를 위해 다음 틱으로 지연
                setTimeout(() => onPositionChange?.(boundedPosition), 0);

                if (
                    Math.abs(velocityRef.current.y) > 0.1 ||
                    Math.abs(velocityRef.current.x) > 0.1
                ) {
                    gravityAnimationRef.current = requestAnimationFrame(animate);
                } else {
                    setIsGravityActive(false);
                }

                return boundedPosition;
            });
        };

        gravityAnimationRef.current = requestAnimationFrame(animate);
    }, [isFixed, isGravityActive, boundaries, applyBoundaries, onPositionChange]);

    // 3초 고정 타이머 시작
    const startHoldTimer = useCallback(() => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
        }

        holdTimerRef.current = setTimeout(() => {
            setIsFixed(true);
            onFixed?.(id || "", true);
        }, 1000);
    }, [id, onFixed]);

    // 타이머 정리
    const clearHoldTimer = useCallback(() => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    }, []);

    // 중력 애니메이션 정리
    const stopGravity = useCallback(() => {
        if (gravityAnimationRef.current) {
            cancelAnimationFrame(gravityAnimationRef.current);
            gravityAnimationRef.current = null;
        }
        setIsGravityActive(false);
    }, []);

    // 마우스 다운 핸들러
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            if (disabled) return;

            e.preventDefault();

            // 고정된 상태라면 고정 해제
            if (isFixed) {
                setIsFixed(false);
                onFixed?.(id || "", false);
                return;
            }

            // 중력 애니메이션 중지
            stopGravity();

            const newDragState: DragState = {
                isDragging: true,
                dragStart: { x: e.clientX, y: e.clientY },
                elementOffset: {
                    x: e.clientX - position.x,
                    y: e.clientY - position.y,
                },
            };

            setDragState(newDragState);
            onDragStart?.();

            // 3초 타이머 시작
            startHoldTimer();
        },
        [
            disabled,
            position,
            isFixed,
            id,
            onFixed,
            stopGravity,
            onDragStart,
            startHoldTimer,
        ]
    );

    // 마우스 이동 핸들러
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragState.isDragging) return;

            const newPosition = applyBoundaries({
                x: e.clientX - dragState.elementOffset.x,
                y: e.clientY - dragState.elementOffset.y,
            });

            setPosition(newPosition);
            // 렌더링 중 setState 방지를 위해 다음 틱으로 지연
            setTimeout(() => onPositionChange?.(newPosition), 0);
        },
        [dragState, applyBoundaries, onPositionChange]
    );

    // 마우스 업 핸들러
    const handleMouseUp = useCallback(() => {
        if (!dragState.isDragging) return;

        setDragState((prev) => ({
            ...prev,
            isDragging: false,
        }));

        // 타이머 정리
        clearHoldTimer();

        // 고정 상태 확인 후 중력 시작
        // 고정된 상태라면 중력을 적용하지 않음
        if (!isFixed) {
            // 약간의 지연 후 중력 시작
            setTimeout(() => {
                // 다시 한번 고정 상태 확인 (타이머 실행 중 상태가 변경될 수 있음)
                if (!isFixed) {
                    startGravity();
                }
            }, 100);
        }
    }, [dragState.isDragging, clearHoldTimer, isFixed, startGravity]);

    // 터치 이벤트 핸들러
    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            if (disabled) return;

            e.preventDefault();

            // 고정된 상태라면 고정 해제
            if (isFixed) {
                setIsFixed(false);
                onFixed?.(id || "", false);
                return;
            }

            // 중력 애니메이션 중지
            stopGravity();

            const touch = e.touches[0];

            const newDragState: DragState = {
                isDragging: true,
                dragStart: { x: touch.clientX, y: touch.clientY },
                elementOffset: {
                    x: touch.clientX - position.x,
                    y: touch.clientY - position.y,
                },
            };

            setDragState(newDragState);
            onDragStart?.();

            // 3초 타이머 시작
            startHoldTimer();
        },
        [
            disabled,
            position,
            isFixed,
            id,
            onFixed,
            stopGravity,
            onDragStart,
            startHoldTimer,
        ]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!dragState.isDragging) return;

            e.preventDefault();
            const touch = e.touches[0];

            const newPosition = applyBoundaries({
                x: touch.clientX - dragState.elementOffset.x,
                y: touch.clientY - dragState.elementOffset.y,
            });

            setPosition(newPosition);
            // 렌더링 중 setState 방지를 위해 다음 틱으로 지연
            setTimeout(() => onPositionChange?.(newPosition), 0);
        },
        [dragState, applyBoundaries, onPositionChange]
    );

    const handleTouchEnd = useCallback(() => {
        if (!dragState.isDragging) return;

        setDragState((prev) => ({
            ...prev,
            isDragging: false,
        }));

        // 타이머 정리
        clearHoldTimer();

        // 고정 상태 확인 후 중력 시작
        // 고정된 상태라면 중력을 적용하지 않음
        if (!isFixed) {
            // 약간의 지연 후 중력 시작
            setTimeout(() => {
                // 다시 한번 고정 상태 확인 (타이머 실행 중 상태가 변경될 수 있음)
                if (!isFixed) {
                    startGravity();
                }
            }, 100);
        }
    }, [dragState.isDragging, clearHoldTimer, isFixed, startGravity]);

    // 이벤트 리스너 등록/해제
    useEffect(() => {
        if (dragState.isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [
        dragState.isDragging,
        handleMouseMove,
        handleMouseUp,
        handleTouchMove,
        handleTouchEnd,
    ]);

    // 위치 재설정 함수
    const resetPosition = useCallback(() => {
        setPosition(initialPosition);
        // 렌더링 중 setState 방지를 위해 다음 틱으로 지연
        setTimeout(() => onPositionChange?.(initialPosition), 0);
        setIsFixed(false);
        stopGravity();
        clearHoldTimer();
    }, [initialPosition, onPositionChange, stopGravity, clearHoldTimer]);

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            clearHoldTimer();
            stopGravity();
        };
    }, [clearHoldTimer, stopGravity]);

    return {
        position,
        isDragging: dragState.isDragging,
        isFixed,
        isGravityActive,
        handlers: {
            onMouseDown: handleMouseDown,
            onTouchStart: handleTouchStart,
        },
        resetPosition,
        setPosition: (newPosition: Position) => {
            const boundedPosition = applyBoundaries(newPosition);
            setPosition(boundedPosition);
            // 렌더링 중 setState 방지를 위해 다음 틱으로 지연
            setTimeout(() => onPositionChange?.(boundedPosition), 0);
        },
        setFixed: (fixed: boolean) => {
            setIsFixed(fixed);
            if (fixed) {
                stopGravity();
                clearHoldTimer();
            }
        },
    };
};
