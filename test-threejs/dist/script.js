import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight
);
let mesh;
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xeA5E5FF);

scene.add(new THREE.HemisphereLight(0xffffff, 0x333399, 1.0));
camera.position.set(0.5, 8, 30);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);


const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(-3, 10, -10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = -2;
dirLight.shadow.camera.left = -2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add(dirLight);

new GLTFLoader().load("https://raw.githack.com/5Bianca/Blender/main/Building1.glb",
  ({ scene: model }, animations) => {
    scene.add(model);

    model.scale.setScalar(1.0);

    camera.lookAt(model.position);

    controls.target.copy(model.position);

    mesh = model;
  }
);

const animate = () => {
  if (mesh) {
    //  mesh.rotateY(Math.PI / 360);
  }

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

animate();

document.body.appendChild(renderer.domElement);