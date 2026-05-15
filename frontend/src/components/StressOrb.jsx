import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Three.js animated stress orb — a pulsing, shader-based sphere
 * whose color transitions from green → amber → red based on score.
 */
export default function StressOrb({ score = 50, size = 300 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = size, h = size;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Compute color from score
    const getColor = (s) => {
      if (s <= 30)  return new THREE.Color('#34d399');
      if (s <= 55)  return new THREE.Color('#38bdf8');
      if (s <= 75)  return new THREE.Color('#fbbf24');
      return new THREE.Color('#f87171');
    };

    const orbColor = getColor(score);

    // Custom shader material — lava-lamp / metaball style
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime:    { value: 0 },
        uColor:   { value: orbColor },
        uScore:   { value: score / 100 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScore;
        varying vec3 vNormal;
        varying vec3 vPosition;

        vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
        vec4 mod289(vec4 x){ return x - floor(x*(1./289.))*289.; }
        vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }
        float snoise(vec3 v){
          const vec2 C = vec2(1./6., 1./3.);
          const vec4 D = vec4(0., 0.5, 1., 2.);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1. - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0., i1.z, i2.z, 1.)) +
            i.y + vec4(0., i1.y, i2.y, 1.)) +
            i.x + vec4(0., i1.x, i2.x, 1.));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49. * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7. * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1. - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2. + 1.;
          vec4 s1 = floor(b1)*2. + 1.;
          vec4 sh = -step(h, vec4(0.));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.);
          m = m * m;
          return 42. * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main(){
          vNormal = normal;
          vPosition = position;
          float pulse = 0.12 + uScore * 0.1;
          float speed = 0.4 + uScore * 0.6;
          float noise = snoise(position * 1.8 + uTime * speed) * pulse;
          vec3 displaced = position + normal * noise;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uScore;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main(){
          vec3 light = normalize(vec3(1., 1.5, 2.));
          float diff = max(dot(vNormal, light), 0.0);
          float rim = 1.0 - max(dot(vNormal, vec3(0.,0.,1.)), 0.0);
          rim = pow(rim, 2.5);
          vec3 color = uColor * (0.4 + diff * 0.6);
          color += uColor * rim * 0.6;
          float alpha = 0.85 + rim * 0.15;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Ambient glow ring
    const ringGeo = new THREE.RingGeometry(1.15, 1.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: orbColor, transparent: true, opacity: 0.15, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 6;
    scene.add(ring);

    sceneRef.current = { renderer, scene, camera, material, mesh, ring };

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      mesh.rotation.y = t * 0.15;
      mesh.rotation.z = Math.sin(t * 0.3) * 0.05;
      ring.rotation.z = t * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [size]);

  // Update color when score changes without full reinit
  useEffect(() => {
    const { material } = sceneRef.current;
    if (!material) return;
    const getColor = (s) => {
      if (s <= 30)  return new THREE.Color('#34d399');
      if (s <= 55)  return new THREE.Color('#38bdf8');
      if (s <= 75)  return new THREE.Color('#fbbf24');
      return new THREE.Color('#f87171');
    };
    material.uniforms.uColor.value = getColor(score);
    material.uniforms.uScore.value = score / 100;
  }, [score]);

  return <div ref={mountRef} style={{ width: size, height: size, cursor: 'default' }} />;
}
