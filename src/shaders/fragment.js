export default /*glsl */
`uniform sampler2D uMask;
varying vec2 vUv;
varying float vAlpha;

void main()
{
    float maskStrength = texture2D(uMask, gl_PointCoord).r;
    vec3 texture = texture2D(uMask, gl_PointCoord).rgb;
    gl_FragColor = vec4(1.0, 1.0, 1.0, maskStrength * vAlpha);
}`