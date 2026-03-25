"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { MorphBlob } from "./MorphBlob";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMobileDetect } from "@/hooks/useMobileDetect";

export function BlobScene() {
  const mousePosition = useMousePosition();
  const isMobile = useMobileDetect();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        onCreated={() => setIsLoaded(true)}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <MorphBlob mousePosition={mousePosition} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
