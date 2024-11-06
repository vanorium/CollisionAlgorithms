import { Vec2 } from "../math/vec2.js"
import { Shape } from "./shape.js";
import earcut from 'earcut';
import { utils } from "../math/utils.js";

export class Polygon extends Shape {
    constructor(polygon, triangulate, translation, withControl) {
        super(translation, withControl)
        this.verticesGroups = this.#computeVerticesGroups(polygon, triangulate)
        this.size = this.#computeSize()
    }

    #computeSize(){
        const edges = Shape.computePolygonBoundingBox(this.verticesGroups)

        return new Vec2(edges[2] - edges[0], edges[3] - edges[1])
    }

    #calculateArea(vertices) {
        let area = 0;

        for (let i = 0; i < vertices.length; i++) {
            let j = utils.modulo1(vertices.length, i+1)
            area += vertices[i].x * vertices[j].y - vertices[i].y * vertices[j].x;
        }

        return area/2
    }

    #ensureCW(vertices) {
        if (this.#calculateArea(vertices) > 0) {
            return vertices.reverse();
        }

        return vertices;
    }

    #computeVerticesGroups(polygon, triangulate) {
        const verticesGroups = []

        if (triangulate) {
            const t = []
            polygon.forEach((vertex) => t.push(vertex.x, vertex.y))
            const triangles = earcut(t)

            for (let i = 0; i < triangles.length; i += 3) {
                verticesGroups.push([
                    polygon[triangles[i]],
                    polygon[triangles[i + 1]],
                    polygon[triangles[i + 2]]
                ])
            }
        }

        else {
            verticesGroups.push([...polygon])
        }

        return verticesGroups.map((group) => this.#ensureCW(group))
    }

    getTransformedVerticesGroups() {
        const res = Array.from({ length: this.verticesGroups.length }, () => [])

        this.verticesGroups.forEach((group, i) => {
            group.forEach((vertex) => {
                res[i].push(vertex.sub(this.size.scaleVec(this.origin)).rotate(this.deg).add(this.translation))
            })
        })

        return res
    }

    draw(ctx) {
        this.getTransformedVerticesGroups().forEach((group) => {
            ctx.beginPath()
            group.forEach((_, i) => {
                const vertex1 = group[i]
                const vertex2 = group[utils.modulo1(group.length, i+1)]
                ctx.moveTo(vertex1.x, vertex1.y)
                ctx.lineTo(vertex2.x, vertex2.y)
            })
            ctx.strokeStyle = this.color
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(this.translation.x, this.translation.y, 1, 0, Math.PI * 2)
            ctx.stroke()
        })
    }
}