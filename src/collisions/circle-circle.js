/*
The idea is to compare the distance from the center of each circle with the sum of their radii
If the distance is bigger, there's at least one overlapping
*/

export const useCircleCircle = (circleTranslationA, circleRadiusA, circleTranslationB, circleRadiusB) => {
    const normal = circleTranslationB.sub(circleTranslationA) 
    const dist2 = normal.x**2 + normal.y**2 
    const minDist = circleRadiusA + circleRadiusB 
    if(dist2 < minDist**2) {
        const dist = Math.sqrt(dist2) 
        const normalizedNormal = normal.normalize()
        const depth = minDist-dist
        return {normalizedNormal, depth}
    }  
}