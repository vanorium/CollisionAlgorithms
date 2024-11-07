export class Vec2{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    add(b){
        this.x += b.x
        this.y += b.y
        return this
    }

    sub(b){
        this.x -= b.x
        this.y -= b.y
        return this
    }

    scale(scalar){
        this.x *= scalar
        this.y *= scalar
        return this
    }

    mul(b){
        this.x *= b.x
        this.y *= b.y
        return this
    }

    div(divider){
        this.x /= divider
        this.y /= divider
        return this
    }

    dot(b){
        return this.x * b.x + this.y * b.y
    }

    normal(){
        const t = this.x 
        this.x =- this.y
        this.y = t
        return this
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

    copy(b){
        this.x = b.x
        this.y = b.y
        return this
    }

    rotate(deg){
        const radians = deg * Math.PI / 180
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        const rotatedX = this.x * cos - this.y * sin
        const rotatedY = this.x * sin + this.y * cos
        this.x = rotatedX
        this.y = rotatedY
        return this
    }
}