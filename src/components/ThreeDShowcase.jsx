"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

// Define geometries and materials outside the component to ensure they are created only once
const GEOMETRIES = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.75, 32, 32),
  new THREE.TorusGeometry(0.6, 0.2, 16, 100),
  new THREE.ConeGeometry(0.7, 1.2, 32),
  new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
];
const MATERIALS = [
  new THREE.MeshStandardMaterial({ color: 0x007bff, roughness: 0.5, metalness: 0.5 }), // Blue
  new THREE.MeshStandardMaterial({ color: 0xffa500, roughness: 0.5, metalness: 0.5 }), // Orange
  new THREE.MeshStandardMaterial({ color: 0x28a745, roughness: 0.5, metalness: 0.5 }), // Green
  new THREE.MeshStandardMaterial({ color: 0xdc3545, roughness: 0.5, metalness: 0.5 }), // Red
  new THREE.MeshStandardMaterial({ color: 0x6f42c1, roughness: 0.5, metalness: 0.5 }), // Purple
];

const ThreeDShowcase = () => {
  const mountRef = useRef(null);
  const meshRef = useRef(null); // Ref to store the main 3D object
  const controlsRef = useRef(null); // Ref to store OrbitControls
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
    const initialMesh = new THREE.Mesh(GEOMETRIES[currentShapeIndex], MATERIALS[currentShapeIndex]);
    scene.add(initialMesh);
    meshRef.current = initialMesh; // Store reference to the mesh

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera movement
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls
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
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Effect to update the mesh when currentShapeIndex changes
  useEffect(() => {
    if (meshRef.current) {
      // Update geometry and material of the existing mesh
      meshRef.current.geometry = GEOMETRIES[currentShapeIndex];
      meshRef.current.material = MATERIALS[currentShapeIndex];
    }
  }, [currentShapeIndex]); // This effect runs when currentShapeIndex changes

  return (
    <div ref={mountRef} className="w-full h-full flex items-center justify-center">
      {/* Three.js canvas will be appended here */}
    </div>
  );
};

export default ThreeDShowcase;