import { Suspense, useCallback, useLayoutEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, OrbitControls, useCursor } from '@react-three/drei'
import { Color } from 'three'
import { motion } from 'framer-motion'
import InfoPanel from './InfoPanel'
import { useTheme } from '../context/useTheme'

const PARTS = {
  camera: {
    title: 'Camera module',
    description:
      'A compact camera aimed at the user’s eyes streams frames to the vision pipeline for real-time face and eye tracking.',
    role: 'Captures video used to estimate eye openness and closure duration.',
  },
  esp32: {
    title: 'ESP32 microcontroller',
    description:
      'Runs inference scheduling, timing logic, and drives peripherals. Low power with enough headroom for CV pre-processing or UART bridges.',
    role: 'System brain: processes signals, enforces the 4–5 second rule, and triggers the alert.',
  },
  speaker: {
    title: 'Speaker',
    description:
      'A small buzzer or speaker plays a distinct alert tone when prolonged eye closure is detected.',
    role: 'Delivers the audible wake-up cue to the wearer.',
  },
  battery: {
    title: 'Battery pack',
    description:
      'Powers the camera, MCU, and audio stage for portable, all-day use with USB recharge.',
    role: 'Supplies stable energy for continuous sensing on the move.',
  },
}

function SceneBackground({ isLight }) {
  const { scene, gl } = useThree()
  useLayoutEffect(() => {
    /* eslint-disable react-hooks/immutability -- Three.js scene & renderer are mutated by design */
    scene.background = new Color(isLight ? '#f1f5f9' : '#0b1120')
    gl.toneMappingExposure = isLight ? 1.08 : 1.02
    /* eslint-enable react-hooks/immutability */
  }, [isLight, scene, gl])
  return null
}

function InteractivePart({ partId, position, rotation = [0, 0, 0], onPick, selected, children }) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const handlePointerDown = useCallback(
    (e) => {
      e.stopPropagation()
      onPick(partId)
    },
    [onPick, partId],
  )

  const active = hovered || selected

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onClick={handlePointerDown}
    >
      <group scale={active ? 1.06 : 1}>{children(active)}</group>
    </group>
  )
}

function GlassesModel({ onPick, selectedId }) {
  const isSel = (id) => selectedId === id

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.14}>
      <group position={[0, 0.1, 0]}>
        {[-0.28, 0.28].map((x) => (
          <mesh key={x} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
            <torusGeometry args={[0.24, 0.028, 16, 48]} />
            <meshStandardMaterial color="#1e293b" metalness={0.45} roughness={0.38} />
          </mesh>
        ))}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.035, 0.035]} />
          <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.4} />
        </mesh>
        {[-0.28, 0.28].map((x) => (
          <mesh key={`l-${x}`} castShadow position={[x, 0, 0.06]}>
            <circleGeometry args={[0.2, 48]} />
            <meshStandardMaterial
              color="#0ea5e9"
              metalness={0.8}
              roughness={0.1}
              transparent
              opacity={0.35}
            />
          </mesh>
        ))}
        <InteractivePart partId="camera" position={[-0.42, 0.08, 0.12]} onPick={onPick} selected={isSel('camera')}>
          {(active) => (
            <mesh castShadow>
              <cylinderGeometry args={[0.045, 0.045, 0.08, 24]} />
              <meshStandardMaterial
                color="#22d3ee"
                metalness={0.55}
                roughness={0.28}
                emissive="#22d3ee"
                emissiveIntensity={active ? 0.45 : 0.1}
              />
            </mesh>
          )}
        </InteractivePart>
        <InteractivePart
          partId="esp32"
          position={[0.62, -0.02, -0.05]}
          rotation={[0, -0.35, 0]}
          onPick={onPick}
          selected={isSel('esp32')}
        >
          {(active) => (
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.12, 0.06]} />
              <meshStandardMaterial
                color="#a855f7"
                metalness={0.45}
                roughness={0.32}
                emissive="#a855f7"
                emissiveIntensity={active ? 0.5 : 0.08}
              />
            </mesh>
          )}
        </InteractivePart>
        <InteractivePart
          partId="speaker"
          position={[0.72, -0.06, 0.02]}
          rotation={[0.4, 0, 0.2]}
          onPick={onPick}
          selected={isSel('speaker')}
        >
          {(active) => (
            <mesh castShadow>
              <cylinderGeometry args={[0.055, 0.055, 0.04, 24]} />
              <meshStandardMaterial
                color="#f472b6"
                metalness={0.35}
                roughness={0.42}
                emissive="#f472b6"
                emissiveIntensity={active ? 0.45 : 0.06}
              />
            </mesh>
          )}
        </InteractivePart>
        <InteractivePart
          partId="battery"
          position={[-0.62, -0.04, -0.02]}
          rotation={[0, 0.25, 0]}
          onPick={onPick}
          selected={isSel('battery')}
        >
          {(active) => (
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.08, 0.05]} />
              <meshStandardMaterial
                color="#34d399"
                metalness={0.3}
                roughness={0.45}
                emissive="#34d399"
                emissiveIntensity={active ? 0.45 : 0.08}
              />
            </mesh>
          )}
        </InteractivePart>
        <mesh castShadow position={[0.58, -0.02, -0.05]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.35, 0.04, 0.04]} />
          <meshStandardMaterial color="#475569" metalness={0.35} roughness={0.42} />
        </mesh>
        <mesh castShadow position={[-0.58, -0.02, -0.05]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.35, 0.04, 0.04]} />
          <meshStandardMaterial color="#475569" metalness={0.35} roughness={0.42} />
        </mesh>
      </group>
    </Float>
  )
}

function SceneContent({ onPick, selectedId, isLight }) {
  return (
    <>
      <SceneBackground isLight={isLight} />
      <ambientLight intensity={isLight ? 0.62 : 0.42} color={isLight ? '#ffffff' : '#e0f2fe'} />
      <hemisphereLight
        color="#f8fafc"
        groundColor={isLight ? '#94a3b8' : '#0f172a'}
        intensity={isLight ? 0.55 : 0.38}
      />
      <directionalLight
        castShadow
        position={[4.5, 9, 5]}
        intensity={isLight ? 1.1 : 1.4}
        color="#fff7ed"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={22}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.00012}
      />
      <directionalLight position={[-4, 3, -3]} intensity={isLight ? 0.45 : 0.55} color="#38bdf8" />
      <GlassesModel onPick={onPick} selectedId={selectedId} />
      <Suspense fallback={null}>
        <Environment preset={isLight ? 'studio' : 'city'} environmentIntensity={isLight ? 1.05 : 1.1} />
      </Suspense>
      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={isLight ? 0.38 : 0.5}
        scale={14}
        blur={2.8}
        far={6}
        color="#020617"
      />
      <OrbitControls
        enablePan
        enableZoom
        minDistance={1.35}
        maxDistance={5.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0.32}
        target={[0, 0, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.setValueAtTime(0.06, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + 0.12)
  } catch {
    /* optional */
  }
}

export default function ModelViewer() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [canvasReady, setCanvasReady] = useState(false)

  const handlePick = useCallback((id) => {
    setSelected(id)
    setPanelOpen(true)
    playClickSound()
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
  }, [])

  const panelData = selected ? PARTS[selected] : null

  return (
    <section id="model" className="relative scroll-mt-20 px-4 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Interactive 3D hardware
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
            Rotate and zoom with the pointer. Click the highlighted parts — each mesh uses R3F raycasting.
            Orbit: drag · Zoom: scroll · Pan: right-drag (or two-finger drag).
          </p>
        </motion.div>

        <motion.div
          className="glass-panel canvas-shell relative overflow-hidden rounded-[2rem] border border-slate-200/70 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.2)] dark:border-white/10 dark:shadow-none"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {!canvasReady && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-100/95 backdrop-blur-md dark:bg-slate-950/90">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent dark:border-cyan-400" />
              <p className="text-sm text-slate-600 dark:text-slate-400">Starting WebGL…</p>
            </div>
          )}
          <div className="h-[min(72vh,580px)] w-full min-h-[300px] sm:min-h-[360px]">
            <Canvas
              shadows
              camera={{ position: [0, 0.35, 2.45], fov: 42 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'default',
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={() => setCanvasReady(true)}
            >
              <Suspense fallback={null}>
                <SceneContent isLight={isLight} onPick={handlePick} selectedId={selected} />
              </Suspense>
            </Canvas>
          </div>
          <div className="flex flex-wrap justify-center gap-2 border-t border-slate-200/60 px-4 py-4 text-xs dark:border-white/5 sm:gap-3">
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 font-medium text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-300">
              Camera
            </span>
            <span className="rounded-full bg-violet-500/15 px-3 py-1 font-medium text-violet-800 dark:bg-violet-500/10 dark:text-violet-300">
              ESP32
            </span>
            <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 font-medium text-fuchsia-800 dark:bg-fuchsia-500/10 dark:text-fuchsia-300">
              Speaker
            </span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
              Battery
            </span>
          </div>
        </motion.div>
      </div>

      <InfoPanel open={panelOpen} onClose={closePanel} data={panelData} />
    </section>
  )
}
