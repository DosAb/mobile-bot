export default /*glsl */
`
varying vec2 vUv;

uniform float uTime;

varying vec4 bgColor;


void main()
{
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    float time = uTime;

    vec2 coord = uv;

	// float color = 0.0;
	// color += sin( coord.x * cos( time / 15.0 ) * 80.0 ) + cos( coord.y * cos( time / 15.0 ) * 10.0 );
	// color += sin( coord.y * sin( time / 10.0 ) * 40.0 ) + cos( coord.x * sin( time / 25.0 ) * 40.0 );
	// color += sin( coord.x * sin( time / 5.0 ) * 10.0 ) + sin( coord.y * sin( time / 35.0 ) * 80.0 );
	// color *= sin( time / 10.0 ) * 0.5;

    // vec4 color2 = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );

    // bgColor = color2;
    
    gl_Position = vec4(position, 1.0);

    vUv = uv;
}
`