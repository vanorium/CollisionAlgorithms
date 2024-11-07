import { utils } from "../math/utils.js"
import { Vec2 } from "../math/vec2.js"

// Modifed https://www.youtube.com/watch?v=-EsWKT7Doww&t=1550s
export const usePolygonPolygon = (verticesGroupsA, verticesGroupsB) => {
    let res = {separation: Infinity}

    for(const groupA of verticesGroupsA){
        for(const groupB of verticesGroupsB) {
            const AB = SAT(groupA, groupB, 1)
            const BA = SAT(groupB, groupA, -1)
            if(AB.separation <= 0 && BA.separation <= 0){
                const t = AB.separation > BA.separation ? AB : BA 
                if(t.separation < res.separation) res = t
            }
        }
    }
    
    return res.depth > 0 ? res : false
}

const SAT = (verticesA, verticesB, factor) => {
    let separation = -Infinity

    let normalizedNormal = null
    let depth = null

    for (let i = 0; i < verticesA.length; i++) {
        const vertexAc = verticesA[i]
        const vertexAn = verticesA[utils.modulo1(verticesA.length, i + 1)]

        const axes = new Vec2().copy(vertexAn).sub(vertexAc)
        const tNormalizedNormal = axes.normal().normalize()

        let minSep = Infinity        

        for (let j = 0; j < verticesB.length; j++) {
            const vertexB = verticesB[j]
            const sep = new Vec2().copy(vertexB).sub(vertexAc).dot(tNormalizedNormal)
            minSep = Math.min(minSep, sep)
        } 
        
        if (minSep > separation) {
            separation = minSep
            normalizedNormal = tNormalizedNormal.scale(factor)
            depth = -separation
        }
    }

    return {separation, normalizedNormal, depth}
}