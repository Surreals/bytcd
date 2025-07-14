"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap'; // Import GSAP

// Define geometries and materials outside the component to ensure they are created only once
const GEOMETRIES = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.75, 32, 32),
  new THREE.TorusGeometry(0.6, 0.2, 16, 100),
  new THREE.ConeGeometry(0.7, 1.2, 32),
  new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
];
const MATERIALS = [
  new THREE.MeshStandardMaterial({ color: 0x007bff, roughness: 0.5, metalness: 0.5, transparent: true }), // Blue
  new THREE.MeshStandardMaterial({ color: 0xffa500, roughness: 0.5, metalness: 0.5, transparent: true }), // Orange
  new THREE.MeshStandardMaterial({ color: 0x28a745, roughness: 0.5, metalness: 0.5, transparent: true }), // Green
  new THREE.MeshStandardMaterial({ color: 0xdc3545, roughness: 0.5, metalness: 0.5, transparent: true }), // Red
  new THREE.MeshStandardMaterial({ color: 0x6f42c1, roughness: 0.5, metalness: 0.5, transparent: true }), // Purple
];

const ThreeDShowcase = () => {
  const mountRef = useRef(null);
  const meshRef = useRef(null); // Ref to store the main 3D object
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Initial Mesh
    const initialMesh = new THREE.Mesh(GEOMETRIES[currentShapeIndex], MATERIALS[currentShapeIndex].clone());
    scene.add(initialMesh);
    meshRef.current = initialMesh; // Store reference to the mesh

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Continuous rotation for the object
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Click handler for shape change
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([meshRef.current]);

      if (intersects.length > 0) {
        // Only change shape if the current mesh is intersected
        setCurrentShapeIndex((prevIndex) => (prevIndex + 1) % GEOMETRIES.length);
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onClick);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose of geometries and materials only once on component unmount
      GEOMETRIES.forEach(g => g.dispose());
      MATERIALS.forEach(m => m.dispose());
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Effect to update the mesh when currentShapeIndex changes
  useEffect(() => {
    if (meshRef.current) {
      const currentMesh = meshRef.current;
      const newGeometry = GEOMETRIES[currentShapeIndex];
      const newMaterial = MATERIALS[currentShapeIndex].clone(); // Clone material to animate opacity independently

      // Ensure the new material is transparent and starts at opacity 0
      newMaterial.transparent = true;
      newMaterial.opacity = 0;

      // Animate current mesh out (scale down and fade out)
      gsap.to(currentMesh.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(currentMesh.material, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Change geometry and material after the old one fades out
          currentMesh.geometry = newGeometry;
          currentMesh.material = newMaterial; // Assign the new, transparent material

          // Animate new mesh in (scale up and fade in)
          gsap.to(currentMesh.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.5,
            ease: "power2.out"
          });
          gsap.to(currentMesh.material, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  }, [currentShapeIndex]); // This effect runs when currentShapeIndex changes

  return (
    <div ref={mountRef} className="w-full h-full flex items-center justify-center">
      {/* Three.js canvas will be appended here */}
    </div>
  );
};

export default ThreeDShowcase;