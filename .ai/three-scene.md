# Three.js Hero Scene

**File:** `src/components/three/hero-scene.tsx`

## Architecture

The hero nebula is a React Three Fiber (R3F) canvas rendered as a Client Component (`"use client"`). It is **never server-rendered** — imported in the Hero section via:

```ts
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });
```

This keeps the Three.js/R3F bundle out of the SSR pass and off the critical path for LCP.

## How the nebula works

1. `Nebula` component generates `count` (default 1500) particles in `useMemo` using spherical coordinates (radius 2.4–3.4, flattened on Y by 0.85 to look like a disc nebula).
2. Positions stored in a `Float32Array` — never re-computed after mount.
3. `useFrame` rotates the point cloud 0.025 rad/s on the Y axis each frame.
4. Rendered with `<Points>` + `<PointMaterial>` from `@react-three/drei`:
   - `color: #8b9bff`, `opacity: 0.55`, `size: 0.008`
   - `blending: THREE.AdditiveBlending` — particles add light rather than occlude
   - `depthWrite: false` — avoids z-fighting artifacts

## Canvas settings

| Prop | Value | Why |
|---|---|---|
| `dpr` | `[1, 1.5]` | Caps pixel ratio to avoid GPU overload on HiDPI screens |
| `camera.position` | `[0, 0, 3.5]` | Pulls camera back so the sphere fills but doesn't clip the viewport |
| `gl.powerPreference` | `"high-performance"` | Requests discrete GPU on hybrid systems |
| `gl.alpha` | `true` | Transparent background so CSS gradients show through |

## Extending

To add another object to the scene, create a new component inside `hero-scene.tsx` and render it as a sibling of `<Nebula>` inside `<Suspense>`. Keep total particle count under ~3000 to avoid frame drops on mid-range mobile.
