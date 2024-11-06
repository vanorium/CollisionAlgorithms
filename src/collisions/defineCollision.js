import { checkAABB } from "./aabb.js"
import { usePolygonPolygon } from "./polygon-polygon.js"
import { useCircleCircle } from "./circle-circle.js"
import { usePolygonCircle } from "./polygon-circle.js"
import { Shape } from "../shapes/shape.js"

// Returns {normalizedNormal:..., depth:...} if a collision is detected, otherwise false
export const defineCollision = (shapeA, shapeB) => {
    const typeOfA = shapeA.constructor.name
    const typeOfB = shapeB.constructor.name

    // For different combinations of shapes we use different algorithms to improve perfomance 

    if(typeOfA == typeOfB){

        // Polygon-polygon
        if(typeOfA == 'Polygon') {
            const verticesGroupsA = shapeA.getTransformedVerticesGroups(shapeA.verticesGroups)
            const verticesGroupsB = shapeB.getTransformedVerticesGroups(shapeB.verticesGroups)
    
            if(checkAABB(Shape.computePolygonBoundingBox(verticesGroupsA), Shape.computePolygonBoundingBox(verticesGroupsB))){
                return usePolygonPolygon(verticesGroupsA, verticesGroupsB)
            }
        }

        // Circle-circle
        else if(typeOfA == 'Circle'){
            if(checkAABB(Shape.computeCircleBoundingBox(shapeA), Shape.computeCircleBoundingBox(shapeB))){
                return useCircleCircle(shapeA.getTransformedTranslation(), shapeA.r, shapeB.getTransformedTranslation(), shapeB.r)
            }
        }
    }


    // Polygon-circle or circle-polygon
    else{
        const isPolygonA = typeOfA == 'Polygon'
        const vertices = isPolygonA ? shapeA.getTransformedVerticesGroups(shapeA.verticesGroups) : shapeB.getTransformedVerticesGroups(shapeB.verticesGroups)
        const args = isPolygonA ?
        [Shape.computePolygonBoundingBox(vertices), Shape.computeCircleBoundingBox(shapeB)] :
        [Shape.computeCircleBoundingBox(shapeA), Shape.computePolygonBoundingBox(vertices)]
        
        if(checkAABB(...args)){
            if(isPolygonA) return usePolygonCircle(vertices, shapeB.getTransformedTranslation(), shapeB.r, 1)
            else return usePolygonCircle(vertices, shapeA.getTransformedTranslation(), shapeA.r, -1)
        }
    }

}