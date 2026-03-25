export const blobFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uEmissive;

  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));

    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);

    vec3 baseColor = mix(uColor, uEmissive, vDisplacement * 2.0 + 0.5);

    vec3 rimColor = vec3(0.4, 0.7, 1.0);
    vec3 finalColor = baseColor + rimColor * fresnel * 0.6;

    float specular = pow(max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.0), 32.0);
    finalColor += vec3(1.0) * specular * 0.3;

    gl_FragColor = vec4(finalColor, 0.9);
  }
`;
