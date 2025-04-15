import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function createTechSphere(container, techs) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x0099ff,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const iconLoader = new THREE.TextureLoader();

    techs.forEach((tech, index) => {
        const iconTexture = iconLoader.load(`/${tech.icon.replace('fa-brands fa-', '').replace('fa-solid fa-', '')}.png`, () => {
            // Texture loaded, render the scene
            render();
        });

        const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture, transparent: true });
        const iconSprite = new THREE.Sprite(iconMaterial);
        iconSprite.scale.set(0.5, 0.5, 0.5);

        const phi = Math.acos(-1 + (2 * index) / techs.length);
        const theta = Math.sqrt(techs.length * Math.PI) * phi;

        iconSprite.position.setFromSphericalCoords(2.5, phi, theta);
        sphere.add(iconSprite);

        // Create a label for the tech name
        const techLabel = document.createElement('div');
        techLabel.className = 'tech-label';
        techLabel.textContent = tech.name;
        techLabel.style.color = 'white';

        const techLabelObject = new CSS2DObject(techLabel);
        techLabelObject.position.copy(iconSprite.position);
        techLabelObject.position.multiplyScalar(1.2); // Position label slightly outside the icon
        sphere.add(techLabelObject);

        // Handle hover events
        iconSprite.addEventListener('mouseover', () => {
            techLabelObject.element.style.opacity = '1';
        });

        iconSprite.addEventListener('mouseout', () => {
            techLabelObject.element.style.opacity = '0.5';
        });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    container.addEventListener('mousemove', onMouseMove);

    function render() {
        controls.update();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(sphere.children);

        sphere.children.forEach(child => {
            if (child instanceof THREE.Sprite) {
                child.material.opacity = 0.7; // Default opacity
            }
            if (child instanceof CSS2DObject) {
                child.element.style.opacity = '0.5'; // Default label opacity
            }
        });

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject instanceof THREE.Sprite) {
                intersectedObject.material.opacity = 1; // Highlight on hover
            }
            // Find the corresponding CSS2DObject (label) and highlight it
            const labelObject = sphere.children.find(child => child instanceof CSS2DObject && child.position.equals(intersectedObject.position.clone().multiplyScalar(1.2)));
            if (labelObject) {
                labelObject.element.style.opacity = 1;
            }
        }

        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    animate();

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        render();
    }

    window.addEventListener('resize', onWindowResize);

    // Clean up resources when the component is destroyed
    return () => {
        window.removeEventListener('resize', onWindowResize);
        container.removeEventListener('mousemove', onMouseMove);
        renderer.dispose();
        labelRenderer.dispose();
    };
}