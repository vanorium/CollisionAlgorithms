export const utils = {
    clamp: (val, min, max) => {
        return Math.max(min, Math.min(max, val))
    },
    modulo1: (max, i) => {
        if(i > max-1) return 0
        return i
    }
    
}