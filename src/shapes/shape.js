import { Vec2 } from "../math/vec2.js"

export class Shape{
    constructor(translation, withControl){
        this.translation = translation
        this.withControl = withControl
        this.origin = new Vec2(0.5, 0.5)
        this.deg = 0
        this.color = 'rgb(0,0,0)'
    }

    static computePolygonBoundingBox(verticesGroups) {
        let minX = Infinity
        let maxX = -Infinity
        let minY = Infinity
        let maxY = -Infinity

        verticesGroups.forEach((group) => {
            group.forEach((vertex) => {
                if (vertex.x < minX) minX = vertex.x
                if (vertex.x > maxX) maxX = vertex.x
                if (vertex.y < minY) minY = vertex.y
                if (vertex.y > maxY) maxY = vertex.y
            })
        })

        return [minX, minY, maxX, maxY]
    }

    static computeCircleBoundingBox(circle) {
        const transformed = circle.getTransformedTranslation()
        return [transformed.x-circle.r, transformed.y-circle.r, transformed.x+circle.r, transformed.y+circle.r]
    }

    addDeg(deg) {
        this.deg += deg
        if (this.deg > 360) this.deg = this.deg - 360
        else if (this.deg < 0) this.deg = 360 - this.deg
    }
}