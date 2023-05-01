export default /*glsl */
`varying vec2 vUv;

// #pragma glslify: perlin3d = require('../partials/perlin3d.glsl)

void main()
{


    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
}`