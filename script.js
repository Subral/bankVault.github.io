import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
    
new OrbitControls(camera, renderer.domElement)

const markerRoot = new THREE.Group();
scene.add(markerRoot);

const loader = new GLTFLoader();
loader.load(
    'bank-vault/source/Bank vault.glb',
    function (gltf) {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0,0,0);
        markerRoot.add(model);
    }
);

loader.load(
    'pile_of_coins.glb',
    function (gltf) {
        const model = gltf.scene;
        model.scale.set(10, 10, 18);
        model.position.set(-2,3.5,3);
        markerRoot.add(model);
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 10, 30);
scene.add(directionalLight);

camera.position.set(0, 5, 25);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
