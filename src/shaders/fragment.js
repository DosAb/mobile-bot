export default /*glsl */
`
uniform vec3 uColor;
uniform float uTime;
uniform float uStrength;
uniform sampler2D uBakedTexture;
uniform sampler2D ulightMapTexture;
varying vec2 vUv;

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}


float blendReflect(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

vec3 blendReflect(vec3 base, vec3 blend) {
	return vec3(blendReflect(base.r,blend.r),blendReflect(base.g,blend.g),blendReflect(base.b,blend.b));
}

vec3 blendReflect(vec3 base, vec3 blend, float opacity) {
	return (blendReflect(base, blend) * opacity + base * (1.0 - opacity));
}

vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}

vec3 blendGlow(vec3 base, vec3 blend, float opacity) {
	return (blendGlow(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{

    vec3 lightTexture = texture2D(ulightMapTexture, vUv).rgb;
    vec3 texture = texture2D(uBakedTexture, vUv).rgb;

    float strength = uStrength * abs(sin(uTime) * 0.5 + 0.5);

    // lightTexture = mix(texture, uColor, lightTexture.r);
    lightTexture = blendLighten(texture, uColor, lightTexture.r * strength);

    gl_FragColor = vec4(lightTexture, 1.0);
}`