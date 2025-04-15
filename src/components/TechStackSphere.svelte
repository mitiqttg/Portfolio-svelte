<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
	import { TWEEN } from 'three/examples/jsm/libs/tween.module.js';
	import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
  
	export let techs = [
	  { name: 'HTML', icon: 'fa-brands fa-html5', color: 'orange-500' },
	  { name: 'CSS', icon: 'fa-brands fa-css3-alt', color: 'blue-500' },
	  { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'yellow-500' },
	  { name: 'Svelte', icon: 'fa-brands fa-svelte', color: 'red-500' },
	  { name: 'TailwindCSS', icon: 'fa-solid fa-wind', color: 'teal-500' },
	  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'green-500' },
	  { name: 'Python', icon: 'fa-brands fa-python', color: 'yellow-600' },
	  { name: 'Scala', icon: 'fa-brands fa-java', color: 'red-600' },
	  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'orange-600' },
	  { name: 'Docker', icon: 'fa-brands fa-docker', color: 'blue-600' },
	];
  
	let container;
  
	onMount(() => {
	  init();
	  animate();
	});
  
	let camera, scene, renderer, controls;
	let objects = [];
	const radius = 200;
  
	function init() {
	  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	  camera.position.z = 500;
  
	  scene = new THREE.Scene();
  
	  techs.forEach((tech, index) => {
		const element = document.createElement('div');
		element.className = 'tech-icon';
		element.innerHTML = `<i class="${tech.icon}" style="color: ${tech.color};"></i>`;
		element.style.opacity = '0.6'; // Set initial opacity for semi-transparency
  
		const object = new CSS3DObject(element);
		const phi = Math.acos(-1 + (2 * index) / techs.length);
		const theta = Math.sqrt(techs.length * Math.PI) * phi;
  
		object.position.x = radius * Math.cos(theta) * Math.sin(phi);
		object.position.y = radius * Math.sin(theta) * Math.sin(phi);
		object.position.z = radius * Math.cos(phi);
  
		object.scale.set(1.5, 1.5, 1.5);
  
		scene.add(object);
		objects.push(object);
	  });
  
	  renderer = new CSS3DRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  container.appendChild(renderer.domElement);
  
	  controls = new TrackballControls(camera, renderer.domElement);
	  controls.rotateSpeed = 0.5;
	  controls.minDistance = 200;
	  controls.maxDistance = 600;
	  controls.addEventListener('change', render);
  
	  window.addEventListener('resize', onWindowResize);
	}
  
	function animate() {
	  requestAnimationFrame(animate);
	  TWEEN.update();
	  controls.update();
	}
  
	function render() {
	  renderer.render(scene, camera);
	}
  
	function onWindowResize() {
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  render();
	}
  </script>
  
  <div bind:this={container} class="w-full h-full" />
  
  <style>
	.tech-icon {
	  font-size: 2rem;
	  text-align: center;
	  cursor: pointer;
	  transition: opacity 0.3s ease;
	}
  
	.tech-icon:hover {
	  opacity: 1;
	}
  </style>