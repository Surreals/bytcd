import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box(props) {
  const meshRef = useRef();
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#007bff'} /> {/* Using the blue accent color */}
    </mesh>
  );
}

const ThreeDBox = () => {
  return (
    <Canvas style={{ height: '100%', width: '100%', background: 'transparent' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} />
      <OrbitControls enableZoom={false} /> {/* Allows user to rotate the box */}
    </Canvas>
  );
};

export default ThreeDBox;