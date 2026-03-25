"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { blobVertexShader } from "./shaders/blob.vert";
import { blobFragmentShader } from "./shaders/blob.frag";

interface MorphBlobProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

export function MorphBlob({ mousePosition, isMobile }: MorphBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrequency: { value: 0.4 },
      uAmplitude: { value: 0.3 },
      uMousePos: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#4a90d9") },
      uEmissive: { value: new THREE.Color("#1a3a5c") },
    }),
    []
  );

  const detail = isMobile ? 16 : 32;

  useFrame((state) => {
    if (prefersReducedMotion) return;

    uniforms.uTime.value = state.clock.elapsedTime;

    if (!isMobile && mousePosition.current) {
      uniforms.uMousePos.value.lerp(
        new THREE.Vector2(
          mousePosition.current.x,
          mousePosition.current.y
        ),
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        vertexShader={blobVertexShader}
        fragmentShader={blobFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
