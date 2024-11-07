import { Vec2 } from "../math/vec2.js"
import { Shape } from "./shape.js"

export class Circle extends Shape{
    constructor(r, translation, withControl){
        super(translation, withControl)
        this.r = r
    }

    getTransformedTranslation(){
        const originCopy = new Vec2().copy(this.origin)
        return new Vec2(this.r, this.r).add(originCopy.scale(-2*this.r)).rotate(this.deg).add(this.translation)
    }

    draw(ctx){
        const transformed = this.getTransformedTranslation()

        ctx.beginPath()
        ctx.arc(transformed.x, transformed.y, this.r, 0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.translation.x, this.translation.y, 1, 0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.stroke()
    }
}