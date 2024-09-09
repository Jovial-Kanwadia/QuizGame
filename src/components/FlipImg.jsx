import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const FlipImage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a larger cube with an image on one face
    const geometry = new THREE.BoxGeometry(3, 3, 3); // Adjust size here (width, height, depth)
    const texture = new THREE.TextureLoader().load('../../public/forest-3622519_640.jpg'); // Image path
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x0000 }), // Right side
      new THREE.MeshBasicMaterial({ color: 0x0000 }), // Left side
      new THREE.MeshBasicMaterial({ color: 0x0000 }), // Top side
      new THREE.MeshBasicMaterial({ color: 0x0000 }), // Bottom side
      new THREE.MeshBasicMaterial({ color: 0x0000 }),  // Back side
      new THREE.MeshBasicMaterial({ map: texture }) // Front side with image
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 10; // Move camera further back to fit the larger cube

    // Add OrbitControls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <h1 className='text-2xl text-yellow-400 bg-black font-semibold p-3'>What is the pic about?</h1>
      <div ref={mountRef} />
    </>
  );
};

export default FlipImage;
