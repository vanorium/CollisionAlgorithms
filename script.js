import { Vec2 } from "./src/math/vec2.js"
import { Polygon } from "./src/shapes/polygon.js"
import { Circle } from "./src/shapes/circle.js"
import { defineCollision } from "./src/collisions/defineCollision.js"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const polygon1 = [
    new Vec2(0, 0),
    new Vec2(0, 64),
    new Vec2(32, 32),
]

const polygon2 = [
    new Vec2(0, 0),
    new Vec2(0, 64),
    new Vec2(64, 64),
    new Vec2(64, 0)
]

const polygon3 = [
    new Vec2(0, 0),
    new Vec2(0, 32),
    new Vec2(32, 32),
    new Vec2(32, 16),
    new Vec2(16, 16),
    new Vec2(16, 0),
]


const objects = [
    new Polygon(polygon2, false, new Vec2(320+128, 320), true),
    new Polygon(polygon3, true, new Vec2(320, 320), false),
    new Polygon(polygon3, true, new Vec2(320, 320+32), false),
    new Polygon(polygon1, false, new Vec2(320+128, 320+128), false),
    new Circle(8, new Vec2(320+64, 320+128), false),
    new Circle(32, new Vec2(320-32, 320+128), false)
]

let controls = { up: false, left: false, down: false, right: false }
let rotateControls = { left: false, right: false }

window.addEventListener('keydown', (event) => {
    const code = event.code

    if (code == 'ArrowUp') controls.up = 1
    if (code == 'ArrowLeft') controls.left = 1
    if (code == 'ArrowDown') controls.down = 1
    if (code == 'ArrowRight') controls.right = 1

    if (code == 'KeyA') rotateControls.left = 1
    if (code == 'KeyD') rotateControls.right = 1
})

window.addEventListener('keyup', (event) => {
    const code = event.code

    if (code == 'ArrowUp') controls.up = 0
    if (code == 'ArrowLeft') controls.left = 0
    if (code == 'ArrowDown') controls.down = 0
    if (code == 'ArrowRight') controls.right = 0

    if (code == 'KeyA') rotateControls.left = 0
    if (code == 'KeyD') rotateControls.right = 0
})

const speed = 1

const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    objects.forEach((obj1) => {
        obj1.draw(ctx)
        obj1.color = 'rgb(0,0,0)'

        if (obj1.withControl) {
            if(controls.left || controls.right || controls.up || controls.down){
                obj1.translation = obj1.translation.add(
                    new Vec2((-controls.left+controls.right) * speed, (-controls.up+controls.down) * speed)
                )
            }

            if(rotateControls.left || rotateControls.right) {
                obj1.addDeg((-rotateControls.left + rotateControls.right) * speed)
            }
        }

        objects.forEach((obj2) => {
            if (obj1 != obj2) {
                const collision = defineCollision(obj1, obj2)

                if (collision) {
                    obj1.color = 'rgb(255,0,0)'
                    obj2.color = 'rgb(255,0,0)'
                    console.log(collision.normalizedNormal, collision.depth)
                    obj1.translation = obj1.translation.sub(collision.normalizedNormal.scale(collision.depth))
                    obj2.translation = obj2.translation.add(collision.normalizedNormal.scale(collision.depth))
                }
            }
        })        
    })

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)