export default /*glsl */
`
uniform vec3 uColor;
uniform sampler2D uBakedTexture;
uniform sampler2D ulightMapTexture;
varying vec2 vUv;

#pragma glslify: blendAdd = require(glsl-blend/add)

void main()
{

    vec3 lightTexture = texture2D(ulightMapTexture, vUv).rgb;
    vec3 texture = texture2D(uBakedTexture, vUv).rgb;

    lightTexture = mix(texture, uColor, lightTexture.r);

    gl_FragColor = vec4(lightTexture, 1.0);
}`