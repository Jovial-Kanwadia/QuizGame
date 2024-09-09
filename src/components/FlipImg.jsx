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
    const textureURL = 'https://imgs.search.brave.com/Fe-DAJmbVzWDznvvsuyR1dwsHvwdIuUvZjUYcRRZ7k0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGhpY2stbHVzaC1n/cmVlbi1mb3Jlc3Qu/anBnP3dpZHRoPTEw/MDAmZm9ybWF0PXBq/cGcmZXhpZj0wJmlw/dGM9MA'; // External image URL
    const texture = new THREE.TextureLoader().load(textureURL);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Right side
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Left side
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Top side
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Bottom side
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Back side
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
