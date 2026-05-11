import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const scene = new THREE.Scene();
scene.background = new THREE.Color('#e5e5e5');

export const a4Width = 297;
export const a4Height = 210;
const aspect = a4Width/a4Height;
const frustumSize = a4Height + 20;
export const camera = new THREE.OrthographicCamera(
    (frustumSize*aspect)/-2,
    (frustumSize*aspect)/2,
    frustumSize/2,
    frustumSize/-2,
    0.1,
    1000
);
// export const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
// camera.lookAt(1,0,0);
export const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

export const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
// controls.dampingFactor = 100;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});