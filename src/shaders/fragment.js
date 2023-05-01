export default /*glsl */
`
uniform sampler2D uBakedTexture;
uniform sampler2D ulightMapTexture;
varying vec2 vUv;

void main()
{

    vec3 lightTexture = texture2D(ulightMapTexture, vUv).rgb;
    vec3 texture = texture2D(uBakedTexture, vUv).rgb;

    vec3 lightColor = vec3(255.0 / 192.0, 255.0 /218.0, 255.0 / 116.0);

    vec3 mixColor = mix(texture, lightColor, lightTexture.r * 0.5);

    gl_FragColor = vec4(mixColor, 1.0);
}`