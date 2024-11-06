export const utils = {
    clamp: (val, min, max) => {
        return Math.max(Math.min(val, min), max)
    },
    modulo1: (max, i) => {
        if(i > max-1) return 0
        return i
    }
    
} 