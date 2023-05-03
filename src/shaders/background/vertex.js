export default /*glsl */
`
#define pi 3.14159
// glslsandbox uniforms
uniform float uTime;
varying vec2 vUv;
varying vec3 bgColor;

varying float vProgress;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise3d(vec3 v)
    {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
  
    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  
  // Permutations
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  
  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
  
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
  
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
  
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
  
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
  
    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
  
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
  
  //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
  
  // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
    }


float tanhs(float x) {
    float ex = exp(2.0 * x);
    return ((ex - 1.) / (ex + 1.));
}

// --------[ Original ShaderToy begins here ]---------- //
#define thc(a,b) tanhs(a*cos(b))/tanhs(a)

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a+b*cos(2.*pi*(c*t+d));
}


float h21 (vec2 a) {
    return fract(sin(dot(a.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float sdBox( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
void main()
{
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    float distnaceToCenter = distance(uv, vec2(0.5));

    float perlinStrength = snoise3d(vec3(uv * 10.0, uTime * 0.5));
    float revealProgress = distnaceToCenter + perlinStrength * 0.1;

    
    vProgress = revealProgress;

    vec2 uv2 = uv * 2.0 ;
    uv2.x -= 1. + 0.25 * pi * 0.2 * uTime; 
    uv2.y += 0.06 * cos(4. * uv2.x + pi* 0.2 * uTime);

    float sc = 42. + .025 * (1. + thc(1., 4. * uv2.x + uv2.y + uTime));

    vec2 ipos = floor(sc * uv2);
    vec2 fpos = fract(sc * uv2);

    float m = mod(2. * ipos.x - ipos.y, 5.);

    
    float id = 2.;
    vec2 o = vec2(0);

    if (m != 3.) { fpos *= 0.5;  id = 1.; }    
    if (m == 2.)      o = vec2(1,0); // top right
    else if (m == 4.) o = vec2(0,1); // bottom left
    else if (m == 1.) o = vec2(1); 

    fpos += 0.5 * o - 0.5;
    ipos -= o;

    float h = h21(ipos);    
    float v = 0.3 * ipos.x/sc + 0.25 * h + 0.2 * uTime;

    float d = sdBox(fpos, vec2(0.1)) - 0.28 - 0.1 * thc(20., 2. * pi * v);
    float k = 10. / 1080.0;
    float s = smoothstep(-k, k, -d);

    float c = (0.75/sc) * ipos.y + 0.5 + 0.5 * h;
    c *= s;

    vec3 e = vec3(1.);
    float f = smoothstep(-0.5, 0.5, fpos.x);
    vec3 col = c * pal(v, 0.6 * f * e, e, 0.8 * e, (0.75/sc) * ipos.y * vec3(0., 0.33, 0.66)); 
    col -= step(sdBox(fpos, vec2(0.1)), 0.28 * id);
    col = clamp(col, 0., 1.);
    col += 0.1;

    bgColor = col;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}
`