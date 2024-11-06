/*
AABB checks are used as a coarse first-approximation to see if objects might be colliding
https://tutorialedge.net/gamedev/aabb-collision-detection-tutorial/
*/

export const checkAABB = (rectA, rectB) => {

    const aW = rectA[2]-rectA[0]
    const aH = rectA[3]-rectA[1]
    const bW = rectB[2]-rectB[0]
    const bH = rectB[3]-rectB[1]

    return rectA[0] < rectB[0] + bW && rectA[0] + aW > rectB[0] && rectA[1] < rectB[1] + bH && rectA[1] + aH > rectB[1]
}