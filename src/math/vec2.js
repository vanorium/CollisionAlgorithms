export class Vec2{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    add(b){
        return new Vec2(this.x + b.x, this.y + b.y)
    }

    sub(b){
        return new Vec2(this.x - b.x, this.y - b.y)
    }

    scale(scalar){
        return new Vec2(this.x * scalar, this.y * scalar)
    }

    scaleVec(b){
        return new Vec2(this.x * b.x, this.y * b.y)
    }

    div(divider){
        return new Vec2(this.x / divider, this.y / divider)
    }

    dot(b){
        return this.x * b.x + this.y * b.y
    }

    normal(){
        return new Vec2(-this.y, this.x)
    }

    normalize(){
        return this.div(this.length())
    }

    distance(b){
        return Math.sqrt((this.x - b.x)**2 + (this.y - b.y)**2)
    }

    length(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    length2(){
        return this.x**2 + this.y**2
    }

    rotate(deg){
        const radians = deg * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const rotatedX = this.x * cos - this.y * sin
        const rotatedY = this.x * sin + this.y * cos

        return new Vec2(rotatedX, rotatedY)
    }
}