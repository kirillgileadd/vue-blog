import { ref, customRef } from 'vue'

const debounce = (fn: Function, delay = 0, immediate:boolean = false) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any) => {
        if (immediate && !timeout) fn(...args)
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const useDebouncedRef = (initialValue: string, delay: number, immediate: boolean) => {
    const state = ref<string>(initialValue)
    const debouncedRef = customRef((track, trigger) => ({
        get() {
            track()
            return state.value
        },
        set: debounce(
            (value: string) => {
                state.value = value
                trigger()
            },
            delay,
            immediate
        ),
    }))
    return debouncedRef
}

export default useDebouncedRef