import {useCallback, useRef} from "react"

export function useDebounce<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, delay: number=500) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    return useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => fn(...args), delay)
    }, [fn, delay])
}

