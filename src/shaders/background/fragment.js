export default /*glsl */

`
#define pi 3.14159
// glslsandbox uniforms
uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 bgColor;

varying float vProgress;



void main()
{
    float distnaceToCenter = distance(vUv, vec2(0.5));

    if(vProgress > .4)
    {
        discard;
    }

    // vec3 mixColor = mix(textureColor, col, 0.2);

    // vec3 color = vec3(revealProgress);

    gl_FragColor = vec4(bgColor, 1.0);

    

}
`