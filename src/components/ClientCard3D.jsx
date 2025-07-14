"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
// Removed Link import as the parent will handle the click for the modal

const ClientCard3D = ({ project, onClick }) => { // Added onClick prop
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const textureRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer for this individual card
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 1.5; // Position camera to view the plane

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Calculate visible dimensions at z=0 to make the plane fill the camera's view
    const vFOV = camera.fov * Math.PI / 180; // convert vertical fov to radians
    const planeHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const planeWidth = planeHeight * camera.aspect;

    // Card Geometry and Material
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight); // Use calculated dimensions
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White base, texture will overlay

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Load texture (using project.logo now)
    const loader = new THREE.TextureLoader();
    loader.load(project.logo, (texture) => { // Use project.logo here
      textureRef.current = texture;
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    }, undefined, (error) => {
      console.error('Error loading texture:', error);
      // Fallback to a solid color or default image if logo fails to load
      mesh.material.color.set(0x333333); // Dark gray fallback
      mesh.material.map = null;
      mesh.material.needsUpdate = true;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(mesh.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.3, ease: "power2.out" });
      gsap.to(mesh.rotation, { y: mesh.rotation.y + 0.1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(mesh.rotation, { y: 0, duration: 0.3, ease: "power2.out" }); // Reset to 0 Y rotation
    };

    currentMount.addEventListener('mouseenter', handleMouseEnter);
    currentMount.addEventListener('mouseleave', handleMouseLeave);

    // Handle window resize for individual card
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);


    // Cleanup
    return () => {
      currentMount.removeEventListener('mouseenter', handleMouseEnter);
      currentMount.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (textureRef.current) textureRef.current.dispose();
    };
  }, [project]); // Re-run effect if project changes

  return (
    <div onClick={() => onClick(project)} className="block w-full h-full relative group cursor-pointer">
      <div ref={mountRef} className="absolute inset-0 w-full h-full"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm">{project.description}</p>
      </div>
    </div>
  );
};

export default ClientCard3D;