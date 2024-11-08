import { utils } from "../math/utils.js"
import { Vec2 } from "../math/vec2.js"

// Modifed https://www.jeffreythompson.org/collision-detection/poly-circle.php
export const usePolygonCircle = (verticesGroups, circlePos, circleR, factor) => {
    let res = {depth:-Infinity}

    for(const group of verticesGroups){
        for(let i=0; i<group.length; i++){
            const collision = lineCircle(group[i], group[utils.modulo1(group.length, i+1)], circlePos, circleR, factor)
            if(collision.depth > res.depth) res = collision 
        }
    }
    return res.depth > 0 ? res : false
}

const lineCircle = (pos1, pos2, circlePos, circleR, factor) => {
    const axes = new Vec2().copy(pos2).sub(pos1)
    const dot = new Vec2().copy(circlePos).sub(pos1).dot(axes) / axes.length2()
    const clampedDot = Math.max(0, Math.min(1, dot))
    const closest = new Vec2().copy(pos1).add(new Vec2().copy(axes).scale(clampedDot))
    const distance = closest.distance(circlePos)
    
    const depth = circleR - distance
    const normalizedNormal = axes.normal().normalize().scale(factor)

    return depth > 0 ? {depth, normalizedNormal} : false
}