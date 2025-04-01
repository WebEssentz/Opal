import { useCallback, useRef } from 'react'

interface LongPressOptions {
  onClick?: () => void
  onLongPress?: () => void
  onCancel?: () => void
  ms?: number
  disabled?: boolean
}

export const useLongPress = ({
  onClick,
  onLongPress,
  onCancel,
  ms = 500,
  disabled = false,
}: LongPressOptions = {}) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const isLongPress = useRef(false)

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return

      isLongPress.current = false
      timerRef.current = setTimeout(() => {
        isLongPress.current = true
        onLongPress?.()
      }, ms)
    },
    [onLongPress, ms, disabled]
  )

  const cancel = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return
      
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        if (isLongPress.current) {
          onCancel?.()
        } else {
          onClick?.()
        }
      }
    },
    [onClick, onCancel, disabled]
  )

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchEnd: cancel,
  }
}