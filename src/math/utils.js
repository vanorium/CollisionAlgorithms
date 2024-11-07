export const utils = {
    clamp: (val, min, max) => {
        return Math.max(min, Math.min(max, val))
    },
    modulo1: (max, i) => {
        return i > max - 1 ? 0 : i
    }
    
}