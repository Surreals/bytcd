"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const ClientCard3D = ({ project, position, rotation }) => {
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const textureRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer for this individual card
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1 for square card
    camera.position.z = 1.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Card Geometry and Material
    const geometry = new THREE.PlaneGeometry(1, 0.75); // Aspect ratio for a card
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White base, texture will overlay

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.load(project.image, (texture) => {
      textureRef.current = texture;
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    });

    // Initial positioning and rotation (from props)
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);

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
      gsap.to(mesh.rotation, { y: rotation[1], duration: 0.3, ease: "power2.out" }); // Reset to initial Y rotation
    };

    currentMount.addEventListener('mouseenter', handleMouseEnter);
    currentMount.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      currentMount.removeEventListener('mouseenter', handleMouseEnter);
      currentMount.removeEventListener('mouseleave', handleMouseLeave);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (textureRef.current) textureRef.current.dispose();
    };
  }, [project, position, rotation]);

  return (
    <Link to={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
      <div ref={mountRef} className="absolute inset-0 w-full h-full"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm">{project.description}</p>
      </div>
    </Link>
  );
};

export default ClientCard3D;