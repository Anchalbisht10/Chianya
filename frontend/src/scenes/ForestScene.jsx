
import { useChianya } from "../context/ChianyaContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useEffect, useRef as useRefDOM } from "react";
import { motion } from "framer-motion";

// ── 3D swaying tree ──────────────────────────────────────────
function SwayingTree({ position, scale, glowing, index }) {
  const group = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
group.current.rotation.z = Math.sin(t * 0.75 + index * 1.3) * 0.042;
    group.current.rotation.x = Math.sin(t * 0.62 + index * 0.9) * 0.024;
  });
  const cones = [
    { y:3.6, r:1.25, h:4.0, op:0.94 },
    { y:5.3, r:0.92, h:3.2, op:0.85 },
    { y:6.8, r:0.58, h:2.6, op:0.75 },
    { y:7.9, r:0.32, h:1.9, op:0.62 },
  ];
  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.13, 0.24, 3.0, 7]} />
        <meshStandardMaterial color="#0c0a05" roughness={1} />
      </mesh>
  {cones.map((c, i) => (
        <group key={i}>
          <mesh position={[0, c.y, 0]}>
            <coneGeometry args={[c.r, c.h, 8]} />
            <meshStandardMaterial
              color={glowing ? `#${["081a0a","091e0b","0a220c","0b260e"][i]}` : `#${["060e07","070f08","080f08","090f09"][i]}`}
              roughness={1} transparent opacity={c.op}
              emissive={glowing ? "#195b24" : "#0c1e0e"}
              emissiveIntensity={glowing ? 0.19 - i * 0.02 : 0.08}
            />
          </mesh>
          <mesh position={[0, c.y, 0]} scale={1.015}>
            <coneGeometry args={[c.r, c.h, 8]} />
            <meshStandardMaterial
              color="#51af64"
              transparent
              opacity={glowing ? 0.12 : 0.06}
              side={1}
              emissive="#28dc43"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Slow drifting 3D particles ────────────────────────────────
function DriftParticles() {
  const mesh = useRef();
  const count = 120;
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i*3]   = (Math.random()-0.5)*48;
      a[i*3+1] = Math.random()*18 - 3;
      a[i*3+2] = (Math.random()-0.5)*48;
    }
    return a;
  }, []);
  useFrame((s) => {
    mesh.current.rotation.y = s.clock.elapsedTime * 0.002;
    const p = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i*3+1] += Math.sin(s.clock.elapsedTime * 0.14 + i) * 0.0007;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"
          count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.042} color="#88ffcc"
        transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

// ── Animated fog plane ────────────────────────────────────────
function FogPlane({ y, opacity, sx = 0.016, sz = 0.009 }) {
  const m = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    m.current.position.x = Math.sin(t * sx) * 3.5;
    m.current.position.z = Math.cos(t * sz) * 2.2;
  });
  return (
    <mesh ref={m} rotation={[-Math.PI/2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[145, 145]} />
      <meshStandardMaterial color="#091808" transparent opacity={opacity} />
    </mesh>
  );
}

// ── Glowing ground ring ───────────────────────────────────────
function GlowRing({ radius, y }) {
  const m = useRef();
  useFrame((s) => { m.current.rotation.y = s.clock.elapsedTime * 0.005; });
  return (
    <mesh ref={m} rotation={[-Math.PI/2, 0, 0]} position={[0, y, 0]}>
      <ringGeometry args={[radius - 0.4, radius + 0.4, 72]} />
      <meshStandardMaterial color="#1a6020" transparent opacity={0.055}
        emissive="#1a6020" emissiveIntensity={0.55} />
    </mesh>
  );
}


// ── Simple lotus ─────────────────────────────────────────────
function Lotus({ x, z }) {
  const g = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    g.current.position.y = -2.12 + Math.sin(t * 0.4 + x) * 0.03;
    g.current.rotation.y = t * 0.05;
  });
  const petals = 6;
  return (
    <group ref={g} position={[x, -2.12, z]}>
      {/* Pad */}
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshStandardMaterial color="#1a5520" transparent opacity={0.75}
          emissive="#0d3010" emissiveIntensity={0.2} />
      </mesh>
      {/* Petals */}
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2;
        return (
          <mesh key={i}
            position={[Math.cos(a)*0.25, 0.04, Math.sin(a)*0.25]}
            rotation={[-Math.PI/3, 0, a]}>
            <sphereGeometry args={[0.1, 6, 4, 0, Math.PI*2, 0, Math.PI/2]} />
            <meshStandardMaterial color="#e8a0b8" transparent opacity={0.65}
              emissive="#c06080" emissiveIntensity={0.15} />
          </mesh>
        );
      })}
      {/* Center */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#f0d060" transparent opacity={0.85}
          emissive="#c0a020" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// ── 2D lake + canvas overlay ─────────────────────────────────
function LakeCanvas({ fireflyCount = 7 }) {
  const ref = useRefDOM();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    let W, H;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
    };
    setSize();
    window.addEventListener("resize", setSize);
    const ctx = canvas.getContext("2d");

    const ripples = Array.from({ length: 10 }, () => ({
      x: Math.random(),
      yr: 0.0 + Math.random() * 0.18,
      r: Math.random() * 14,
      maxR: 30 + Math.random() * 28,
      speed: 0.09 + Math.random() * 0.09,
      alpha: 0.06 + Math.random() * 0.07,
    }));

    const shimmers = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      yr: Math.random() * 0.22,
      len: 10 + Math.random() * 32,
      alpha: 0.03 + Math.random() * 0.07,
      speed: 0.004 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
    }));




    // Moving stars
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.72,
      size: Math.random() * 2.0 + 0.5,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: -(Math.random() * 0.00025 + 0.00006),
      alpha: Math.random() * 0.52 + 0.14,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.018 + 0.006,
      warm: Math.random() > 0.58,
    }));

const filaments = Array.from({ length: 75 }, () => ({
      x: Math.random(),
      startYR: 1.02,
      endYR: 0.58 + Math.random() * 0.28,
      alpha: Math.random() * 0.20 + 0.10,
      width: Math.random() * 1.2 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.007 + 0.002,
    }));


    let t = 0; let frame;

    const draw = () => {
      if (!W || !H) { frame = requestAnimationFrame(draw); return; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // ── Moving square stars ──────────────────────────────
      stars.forEach(s => {
        const pulse = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        const a = s.alpha * (0.35 + 0.65 * pulse);
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
        if (s.y < 0) s.y = 0.72; if (s.y > 0.72) s.y = 0;
        const px = s.x * W;
        const py = s.y * H;
        const sz = s.size * (0.82 + 0.18 * pulse);
        ctx.shadowColor = s.warm
          ? "rgba(255,238,155,0.65)"
          : "rgba(145,235,185,0.65)";
        ctx.shadowBlur = 6;
        ctx.fillStyle = s.warm
          ? `rgba(255,240,158,${a})`
          : `rgba(158,248,195,${a})`;
        ctx.fillRect(px - sz/2, py - sz/2, sz, sz);
        ctx.shadowBlur = 0;
      });

      // ── Full-width lake — reaches ground edge ────────────
      const lakeTop = H * 0.74;

      const lg = ctx.createLinearGradient(0, lakeTop, 0, H);
      lg.addColorStop(0,   "rgba(14,48,75,0.65)");
      lg.addColorStop(0.3, "rgba(9,32,56,0.60)");
      lg.addColorStop(0.65,"rgba(5,18,36,0.72)");
      lg.addColorStop(1,   "rgba(2,8,18,0.88)");
      ctx.fillStyle = lg;

      // Natural wide lake — full width, fills to bottom
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, lakeTop + H * 0.055);
      // Left gentle curve up
      ctx.bezierCurveTo(
        W * 0.08, lakeTop - H * 0.015,
        W * 0.22, lakeTop - H * 0.025,
        W * 0.42, lakeTop - H * 0.005
      );
      // Center slight rise
      ctx.bezierCurveTo(
        W * 0.52, lakeTop + H * 0.008,
        W * 0.64, lakeTop - H * 0.018,
        W * 0.78, lakeTop - H * 0.010
      );
      // Right curve
      ctx.bezierCurveTo(
        W * 0.88, lakeTop - H * 0.005,
        W * 0.95, lakeTop + H * 0.02,
        W, lakeTop + H * 0.045
      );
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // ── Wave lines ───────────────────────────────────────
      for (let wi = 0; wi < 5; wi++) {
        const wBase = lakeTop + H * (0.012 + wi * 0.038);
        ctx.beginPath();
        for (let xi = 0; xi <= 100; xi++) {
          const px = (xi / 100) * W;
          const wave = Math.sin(t * 0.019 + xi * 0.30 + wi * 0.9) * 1.9
                     + Math.sin(t * 0.013 + xi * 0.52 + wi * 0.5) * 1.1
                     + Math.sin(t * 0.008 + xi * 0.78) * 0.6;
          if (xi === 0) ctx.moveTo(px, wBase + wave);
          else ctx.lineTo(px, wBase + wave);
        }
        ctx.strokeStyle = `rgba(75,168,218,${0.065 - wi * 0.008})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // ── Shimmer flecks ───────────────────────────────────
      shimmers.forEach(sh => {
        const a = sh.alpha * (0.45 + 0.55 * Math.sin(t * sh.speed + sh.phase));
        const sx = sh.x * W;
        const sy = lakeTop + sh.yr * H * 0.28 + Math.sin(t * 0.016 + sh.x * 5) * 2.8;
        ctx.beginPath();
        ctx.moveTo(sx - sh.len / 2, sy);
        ctx.lineTo(sx + sh.len / 2, sy);
        ctx.strokeStyle = `rgba(158,228,255,${a})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      });

      // ── Ripples ──────────────────────────────────────────
      ripples.forEach(rip => {
        rip.r += rip.speed;
        if (rip.r > rip.maxR) rip.r = 0;
        const a = rip.alpha * (1 - rip.r / rip.maxR);
        ctx.beginPath();
        ctx.ellipse(
          rip.x * W,
          lakeTop + rip.yr * H * 0.22,
          rip.r * 2.8, rip.r * 0.48,
          0, 0, Math.PI * 2
        );
        ctx.strokeStyle = `rgba(98,198,242,${a})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });

      // ── Long organic grass — Ground.js style ─────────────
      const grassBaseY = lakeTop + H * 0.028;


      // ── Organic filaments ─────────────────────────────────
      filaments.forEach(f => {
        const pulse = Math.sin(t * f.speed + f.phase);
        const a = f.alpha * (0.6 + 0.4 * pulse);
        const fx = f.x * W;
        const startY = f.startYR * H;
        const endY = f.endYR * H;
        ctx.beginPath();
        ctx.moveTo(fx, startY);
        ctx.quadraticCurveTo(
          fx + Math.sin(t * 0.009 + f.phase) * 18,
          (startY + endY) / 2,
          fx + Math.cos(f.phase) * 12,
          endY
        );
        ctx.strokeStyle = `rgba(55,175,55,${a})`;
        ctx.lineWidth = f.width;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
          fx + Math.cos(f.phase) * 12,
          endY,
          f.width * 1.4,
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(75,210,55,${a * 0.4})`;
        ctx.fill();
      });

      // ── Mist at lake edge ────────────────────────────────
      const mist = ctx.createLinearGradient(0, lakeTop - 22, 0, lakeTop + 65);
      mist.addColorStop(0, "rgba(8,42,18,0)");
      mist.addColorStop(0.45, "rgba(8,42,18,0.2)");
      mist.addColorStop(1, "rgba(8,42,18,0)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, lakeTop - 22, W, 87);

      // ── Green glow at water edge ─────────────────────────
      const edgeG = ctx.createLinearGradient(0, lakeTop - 18, 0, lakeTop + 42);
      edgeG.addColorStop(0, "rgba(28,138,48,0)");
      edgeG.addColorStop(0.6, "rgba(28,138,48,0.065)");
      edgeG.addColorStop(1, "rgba(28,138,48,0)");
      ctx.fillStyle = edgeG;
      ctx.fillRect(0, lakeTop - 18, W, 60);

      // ── Fireflies ────────────────────────────────────────
for (let i = 0; i < fireflyCount; i++) {
  const speed = 0.0006;

  // Full canvas roaming — X and Y both wander everywhere
  const fx = W * 0.5 + (
    Math.sin(t * speed * 1.1 + i * 2.3) * W * 0.42 +
    Math.cos(t * speed * 0.7 + i * 1.1) * W * 0.28 +
    Math.sin(t * speed * 1.9 + i * 3.7) * W * 0.12
  );
  const fy = H * 0.5 + (
    Math.sin(t * speed * 0.9 + i * 1.7) * H * 0.42 +
    Math.cos(t * speed * 1.3 + i * 2.5) * H * 0.28 +
    Math.sin(t * speed * 2.1 + i * 0.8) * H * 0.12
  );

  // Slow lazy blink
  const blinkCycle = (t * 0.018 + i * 2.3) % (Math.PI * 2);
  const fa = Math.pow(Math.max(0, Math.sin(blinkCycle)), 0.4) * 0.9;

  // Slow gentle wing flap
  const wingFlap = Math.sin(t * 0.04 + i) * 0.5 + 0.5;

  // Face direction of travel
  const fx2 = W * 0.5 + (
    Math.sin((t + 1) * speed * 1.1 + i * 2.3) * W * 0.42 +
    Math.cos((t + 1) * speed * 0.7 + i * 1.1) * W * 0.28 +
    Math.sin((t + 1) * speed * 1.9 + i * 3.7) * W * 0.12
  );
  const fy2 = H * 0.5 + (
    Math.sin((t + 1) * speed * 0.9 + i * 1.7) * H * 0.42 +
    Math.cos((t + 1) * speed * 1.3 + i * 2.5) * H * 0.28 +
    Math.sin((t + 1) * speed * 2.1 + i * 0.8) * H * 0.12
  );
  const angle = Math.atan2(fy2 - fy, fx2 - fx) + Math.PI / 2;

  ctx.save();
  ctx.translate(fx, fy);
  ctx.rotate(angle);

  // Soft outer glow
  ctx.shadowColor = `rgba(255,220,80,${fa * 0.7})`;
  ctx.shadowBlur = 18 + fa * 10;

  // Left upper wing
  ctx.beginPath();
  ctx.ellipse(-6, -3, 7 + wingFlap * 3, 3.5, -Math.PI / 5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,120,80,${fa * 0.35})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,160,100,${fa * 0.6})`;
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Right upper wing
  ctx.beginPath();
  ctx.ellipse(6, -3, 7 + wingFlap * 3, 3.5, Math.PI / 5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,120,80,${fa * 0.35})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,160,100,${fa * 0.6})`;
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Left lower wing
  ctx.beginPath();
  ctx.ellipse(-5, 2, 5 + wingFlap * 2, 2.5, Math.PI / 6, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,100,60,${fa * 0.25})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,140,80,${fa * 0.45})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Right lower wing
  ctx.beginPath();
  ctx.ellipse(5, 2, 5 + wingFlap * 2, 2.5, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,100,60,${fa * 0.25})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,140,80,${fa * 0.45})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Body
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.ellipse(0, 0, 2.2, 4.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,200,120,${fa * 0.9})`;
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(0, -4.5, 2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(80,40,20,${Math.max(fa, 0.3)})`;
  ctx.fill();

  // Glowing abdomen
  ctx.beginPath();
  ctx.ellipse(0, 2.5, 1.8, 2.8, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,220,80,${fa})`;
  ctx.shadowColor = `rgba(255,200,50,${fa})`;
  ctx.shadowBlur = 10 + fa * 12;
  ctx.fill();

  // Antennae
  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(100,60,20,${Math.max(fa, 0.25)})`;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-1, -5.5);
  ctx.quadraticCurveTo(-5, -10, -4, -13);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(1, -5.5);
  ctx.quadraticCurveTo(5, -10, 4, -13);
  ctx.stroke();

  // Antenna tips
  ctx.beginPath();
  ctx.arc(-4, -13, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,120,80,${Math.max(fa, 0.2)})`;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(4, -13, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,120,80,${Math.max(fa, 0.2)})`;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.restore();
}

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      t++;
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setSize);
    };}, [fireflyCount]);

  return (
    <canvas ref={ref} style={{
      
         
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    }} />
  );
}

// ── Main export ───────────────────────────────────────────────
export default function ForestScene() {
  const { feelings, currentMode, userStreak } = useChianya();
  const primaryFeeling = feelings?.[0] || "default";
const moodConfig = {
    anxious:     { fogFar: 18, bgColor: "#010602", },
    heavy:       { fogFar: 14, bgColor: "#010401", },
    lonely:      { fogFar: 16, bgColor: "#010305", },
    overwhelmed: { fogFar: 15, bgColor: "#010502", },
    restless:    { fogFar: 22, bgColor: "#020803", },
    tired:       { fogFar: 12, bgColor: "#010401", },
    scattered:   { fogFar: 20, bgColor: "#020703", },
    numb:        { fogFar: 10, bgColor: "#010301", },
    stuck:       { fogFar: 13, bgColor: "#010401", },
    hurt:        { fogFar: 15, bgColor: "#020302", },
    hollow:      { fogFar: 11, bgColor: "#010301", },
    lost:        { fogFar: 14, bgColor: "#010305", },
    default:     { fogFar: 58, bgColor: "#020903", },
  };

  const mood = moodConfig[primaryFeeling] || moodConfig.default;

  const trees = useMemo(() => {
    const arr = [];
    // Inner ring — glowing, close
    for (let i = 0; i < 14; i++) {
      const a = (i/14)*Math.PI*2;
      const r = 7 + Math.random()*2.5;
      arr.push({
        pos: [Math.cos(a)*r, -2.5, Math.sin(a)*r],
        scale: 0.5 + Math.random()*0.75,
        glowing: true, idx: i,
      });
    }
    // Middle ring
    for (let i = 0; i < 16; i++) {
      const a = (i/16)*Math.PI*2 + 0.22;
      const r = 13 + Math.random()*4;
      arr.push({
        pos: [Math.cos(a)*r, -2.5, Math.sin(a)*r],
        scale: 0.6 + Math.random()*0.95,
        glowing: false, idx: i+14,
      });
    }
    // Outer ring
    for (let i = 0; i < 20; i++) {
      const a = (i/20)*Math.PI*2 + 0.6;
      const r = 20 + Math.random()*7;
      arr.push({
        pos: [Math.cos(a)*r, -2.5, Math.sin(a)*r],
        scale: 0.45 + Math.random()*1.15,
        glowing: false, idx: i+30,
      });
    }
    return arr;
  }, []);



  // Lotuses in lake
  const lotuses = useMemo(() => Array.from({ length: 5 }, (_, i) => {
    const a = (i/5)*Math.PI*2;
    const r = 1.5 + Math.random()*2.5;
    return { x: Math.cos(a)*r, z: Math.sin(a)*r };
  }), []);

const moodOverlay = {
    anxious:     "rgba(8,28,4,0.45)",
    heavy:       "rgba(4,16,8,0.55)",
    lonely:      "rgba(4,8,24,0.50)",
    overwhelmed: "rgba(8,24,4,0.48)",
    restless:    "rgba(4,28,4,0.35)",
    tired:       "rgba(4,12,4,0.58)",
    scattered:   "rgba(8,24,4,0.42)",
    numb:        "rgba(2,8,2,0.65)",
    stuck:       "rgba(4,12,4,0.55)",
    hurt:        "rgba(12,4,4,0.45)",
    hollow:      "rgba(2,8,2,0.62)",
    lost:        "rgba(4,8,20,0.48)",
    default:     "rgba(0,0,0,0)",
  };


  // Streak based forest enhancement
 const streakConfig = userStreak >= 30 ? {
    fogFar: 70,
    ambientIntensity: 1.8,
    fireflyCount: 40,        // was 14
    extraGlow: "rgba(255,200,80,0.06)",
  } : userStreak >= 14 ? {
    fogFar: 65,
    ambientIntensity: 1.5,
    fireflyCount: 35,        // was 11
    extraGlow: "rgba(180,255,120,0.05)",
  } : userStreak >= 7 ? {
    fogFar: 62,
    ambientIntensity: 1.3,
    fireflyCount: 28,        // was 9
    extraGlow: "rgba(160,240,100,0.04)",
  } : userStreak >= 3 ? {
    fogFar: 60,
    ambientIntensity: 1.1,
    fireflyCount: 22,        // was 8
    extraGlow: null,
  } : {
    fogFar: 58,
    ambientIntensity: 1.0,
    fireflyCount: 18,        // was 7
    extraGlow: null,
  };
  

 const overlayColor = moodOverlay[primaryFeeling] || moodOverlay.default;

 const modeOverlay = {
    antar:    "rgba(255,195,50,0.14)",
    breathe:  "rgba(20,140,220,0.16)",
    release:  "rgba(120,60,20,0.14)",
    ground:   "rgba(60,140,40,0.13)",
    justSit:  "rgba(80,20,160,0.14)",
    wisdom:   "rgba(200,220,255,0.11)",
    default:  "rgba(0,0,0,0)",
  };

  const finalOverlay = currentMode && currentMode !== "default"
    ? modeOverlay[currentMode] || moodOverlay[primaryFeeling] || moodOverlay.default
    : moodOverlay[primaryFeeling] || moodOverlay.default;


  return (
    <div style={{
      position: "fixed", top:0, left:0,
      width: "100vw", height: "100vh", zIndex: 0,
    }}>
      {/* Mood overlay */}
    <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: finalOverlay,
        transition: "background 2s ease",
        pointerEvents: "none",
      }} />
      {streakConfig.extraGlow && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          background: streakConfig.extraGlow,
          transition: "background 3s ease",
          pointerEvents: "none",
        }} />
      )}
      {userStreak >= 30 && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: "radial-gradient(ellipse at bottom, rgba(255,180,40,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}
      {userStreak >= 7 && (
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: "radial-gradient(ellipse at center bottom, rgba(80,220,80,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      )}
      {/* 2D lake overlay */}
   <LakeCanvas fireflyCount={streakConfig.fireflyCount} />

      <Canvas
       dpr={Math.min(window.devicePixelRatio, 1.5)}
        camera={{ position:[0, 1, 3.5], fov:78 }}
        style={{ width:"100%", height:"100%", background: mood.bgColor, transition:"background 2s ease" }}
        gl={{ antialias:true }}
      >
        <ambientLight intensity={0.07} color="#1a3d10" />
        <pointLight position={[0,18,-8]} intensity={0.68}
          color="#b5f0b5" distance={100} />
        <pointLight position={[0,5,0]} intensity={0.1}
          color="#70cc50" distance={26} />
        <pointLight position={[-8,3,8]} intensity={0.07}
          color="#50aa40" distance={30} />
        {/* Soft lake light */}
        <pointLight position={[0,-1,0]} intensity={0.18}
          color="#4090c0" distance={18} />

       <fog attach="fog" args={["#040e05", 10, streakConfig.fogFar]} />

        <Stars radius={92} depth={52} count={2600}
          factor={2.2} saturation={0.14} fade speed={0.35} />

        <DriftParticles />

        <FogPlane y={-2.5} opacity={0.96} sx={0.014} sz={0.008} />
        <FogPlane y={-1.9} opacity={0.40} sx={0.020} sz={0.013} />
        <FogPlane y={-1.1} opacity={0.15} sx={0.026} sz={0.018} />
        <FogPlane y={-0.3} opacity={0.05} sx={0.030} sz={0.022} />

        <GlowRing radius={7.5}  y={-2.4} />
        <GlowRing radius={13.5} y={-2.4} />
        <GlowRing radius={21}   y={-2.4} />

       

        {/* Lotus flowers */}
        {lotuses.map((l, i) => (
          <Lotus key={i} x={l.x} z={l.z} />
        ))}

        {/* Trees */}
        {trees.map((t, i) => (
          <SwayingTree key={i} position={t.pos}
            scale={t.scale} glowing={t.glowing} index={t.idx} />
        ))}
      </Canvas>
    </div>
  );
}