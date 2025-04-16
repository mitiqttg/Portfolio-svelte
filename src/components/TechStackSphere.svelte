<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import * as THREE from 'three';
	import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
	import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
  
	export let techs = [
	  { name: 'HTML', icon: 'fa-brands fa-html5', color: 'orange-500', description: 'The standard markup language for documents designed to be displayed in a web browser.' },
	  { name: 'CSS', icon: 'fa-brands fa-css3-alt', color: 'blue-500' },
	  { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'yellow-500' },
	  { name: 'Svelte', icon: 'fa-brands fa-svelte', color: 'red-500' },
	  { name: 'TailwindCSS', icon: 'fa-solid fa-wind', color: 'teal-500' },
	  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'green-500' },
	  { name: 'Python', icon: 'fa-brands fa-python', color: 'yellow-600' },
	  { name: 'Scala', icon: 'fa-brands fa-java', color: 'red-600' },
	  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'orange-600' },
	  { name: 'Docker', icon: 'fa-brands fa-docker', color: 'blue-600' }
	];
  
	let container;
	const dispatch = createEventDispatcher();
  
	onMount(() => {
	  init();
	  animate();
	});
  
	let camera, scene, renderer, controls;
	let objects = [];
	let radius = 0;
	const sphereColor = new THREE.Color().setRGB(0.5, 0.5, 0.5);
	const sphereOpacity = 0.3;
	let maxRadius = 0;
	let sphere;
	let sphereRotationSpeed = 0.04;
	let iconRotationSpeed = 0.005;
	let sphereGroup;
	let hovered = false;
	let selectedTech = null;
	let iconRotationAxes = [];
	let headerObject;
  
	function init() {
	  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	  camera.position.z = 800;
  
	  scene = new THREE.Scene();
  
	  maxRadius = Math.min(container.clientWidth, container.clientHeight) / 2;
	  radius = Math.min(500, maxRadius * 0.8);
  
	  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
	  const sphereMaterial = new THREE.MeshBasicMaterial({
		color: sphereColor,
		opacity: sphereOpacity,
		transparent: true,
	  });
	  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
	  sphereGroup = new THREE.Group();
	  sphereGroup.add(sphere);
  
	  scene.add(sphereGroup);
  
	  const headerElement = document.createElement('h2');
	  headerElement.textContent = 'My tech stack';
	  headerElement.className = 'sphere-header';
	  headerObject = new CSS3DObject(headerElement);
	  headerObject.position.set(0, 0, 0);
	  headerObject.scale.set(0.7, 0.7, 0.7);
	  scene.add(headerObject);
  
	  techs.forEach((tech, index) => {
		const element = document.createElement('div');
		element.className = 'tech-icon';
		element.innerHTML = `<i class="${tech.icon}" style="color: ${tech.color};"></i>`;
		element.style.opacity = '0.6';
  
		const object = new CSS3DObject(element);
		const phi = Math.acos(-1 + (2 * index) / techs.length);
		const theta = Math.sqrt(techs.length * Math.PI) * phi;
  
		object.position.x = radius * 1.1 * Math.cos(theta) * Math.sin(phi);
		object.position.y = radius * 1.1 * Math.sin(theta) * Math.sin(phi);
		object.position.z = radius * 1.1 * Math.cos(phi);
  
		object.scale.set(1.5, 1.5, 1.5);
  
		object.element.addEventListener('click', () => {
		  selectedTech = tech;
		});
  
		sphereGroup.add(object);
		objects.push(object);
  
		iconRotationAxes.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize());
	  });
  
	  renderer = new CSS3DRenderer();
	  renderer.setSize(container.clientWidth, container.clientHeight);
	  container.appendChild(renderer.domElement);
  
	  controls = new TrackballControls(camera, renderer.domElement);
	  controls.rotateSpeed = 0.5;
	  controls.zoomSpeed = 1.2;
	  controls.panSpeed = 0.8;
	  controls.noRotate = false;
	  controls.noZoom = false;
	  controls.noPan = false;
	  controls.staticMoving = true;
	  controls.dynamicDampingFactor = 0.3;
	  controls.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.NONE };
	  controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];
  
	  controls.minDistance = radius * 1.2;
	  controls.maxDistance = radius * 3;
	  controls.addEventListener('change', render);
  
	  container.addEventListener('mouseenter', () => (hovered = true));
	  container.addEventListener('mouseleave', () => (hovered = false));
  
	  window.addEventListener('resize', onWindowResize);
	}
  
	function animate() {
	  requestAnimationFrame(animate);
	  controls.update();
  
	  sphereGroup.rotation.y += hovered ? sphereRotationSpeed / 3 : sphereRotationSpeed;
  
	  objects.forEach((obj, index) => {
		obj.rotateOnAxis(iconRotationAxes[index], iconRotationSpeed);
	  });
  
	  render();
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
  
  <div bind:this={container} class="w-full h-full relative">
	{#if selectedTech}
	  <div
		class="description-box absolute bg-white text-gray-800 p-4 rounded shadow-lg"
		style:left={container.clientWidth / 2 > renderer.domElement.offsetLeft + selectedTech.element.offsetLeft ? '10px' : 'auto'}
		style:right={container.clientWidth / 2 <= renderer.domElement.offsetLeft + selectedTech.element.offsetLeft ? '10px' : 'auto'}
		style:top={`${selectedTech.element.offsetTop + selectedTech.element.offsetHeight + 10}px`}
	  >
		<h4 class="font-bold">{selectedTech.name}</h4>
		<p>{selectedTech.description}</p>
	  </div>
	{/if}
  
	<div class="sphere-container w-full h-full" />
  </div>
  
  <style>
	.tech-icon {
	  font-size: 4rem;
	  text-align: center;
	  cursor: pointer;
	  transition: opacity 0.3s ease;
	}
  
	.tech-icon:hover {
	  opacity: 1;
	}
  
	.description-box {
	  max-width: 300px;
	}
  
	.sphere-container {
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  overflow: hidden;
	}
  
	.sphere-header {
	  font-size: 2rem;
	  font-weight: bold;
	  color: white;
	  background-color: rgba(0, 0, 0, 0.5);
	  padding: 0.5em 1em;
	  border-radius: 0.5em;
	  user-select: none;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  z-index: 10; /* Ensure header is on top */
	}
  </style>