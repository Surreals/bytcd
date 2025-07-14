import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const ThreeDShowcase = () => {
  const mountRef = useRef(null);
  const lettersRef = useRef([]);
  const originalPositionsRef = useRef([]);
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)); // A plane at Z=0

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
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Font and Text setup
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_bold.typeface.json', function (font) { // Changed font path
      const text = "BYTCD";
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0x007bff }); // Blue accent color

      let xOffset = 0;
      lettersRef.current = [];
      originalPositionsRef.current = [];

      for (let i = 0; i < text.length; i++) {
        const geometry = new TextGeometry(text[i], {
          font: font,
          size: 1,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });
        geometry.computeBoundingBox();
        geometry.center(); // Center each letter's geometry

        const letterMesh = new THREE.Mesh(geometry, textMaterial);
        
        // Calculate initial position based on previous letter's width
        const letterWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        letterMesh.position.x = xOffset;
        xOffset += letterWidth + 0.2; // Add some spacing between letters

        scene.add(letterMesh);
        lettersRef.current.push(letterMesh);
        originalPositionsRef.current.push(letterMesh.position.clone());
      }

      // Center the entire word
      const totalWidth = xOffset - 0.2; // Remove last spacing
      lettersRef.current.forEach((letter) => {
        letter.position.x -= totalWidth / 2;
        originalPositionsRef.current[lettersRef.current.indexOf(letter)].x -= totalWidth / 2;
      });
    });

    // Mouse interaction
    const onMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.current.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;
    };
    currentMount.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (lettersRef.current.length > 0) {
        raycaster.current.setFromCamera(mouse.current, camera);
        const intersects = raycaster.current.ray.intersectPlane(plane.current, new THREE.Vector3());

        lettersRef.current.forEach((letter, index) => {
          const originalPos = originalPositionsRef.current[index];
          const currentPos = letter.position;

          // Spring back to original position
          currentPos.lerp(originalPos, 0.05); // Adjust 0.05 for speed of return

          if (intersects) {
            const distance = currentPos.distanceTo(intersects);
            const maxDistance = 3; // Max distance for effect
            const strength = 0.5; // How strong the repulsion is

            if (distance < maxDistance) {
              const direction = new THREE.Vector3().subVectors(currentPos, intersects).normalize();
              const force = (1 - distance / maxDistance) * strength;
              currentPos.add(direction.multiplyScalar(force));
            }
          }
        });
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mousemove', onMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose geometries and materials if they were created outside the loop
      // For TextGeometry, it's often created inside the loop, so careful disposal is needed.
      // For simplicity, we'll rely on garbage collection for now, but in a larger app,
      // explicit disposal of all Three.js objects is good practice.
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full flex items-center justify-center">
      {/* Three.js canvas will be appended here */}
    </div>
  );
};

export default ThreeDShowcase;