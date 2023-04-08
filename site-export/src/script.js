import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";


const joinButton = document.getElementById("join-button");
const welcomePage = document.querySelector(".overlay");
const scenePage = document.querySelector(".scene-container");
const sceneCanvas = document.getElementById("scene-canvas");


joinButton.addEventListener("click", () => {
  welcomePage.style.display = "none";
  scenePage.style.display = "block";

  const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 2;


  let mesh;

  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.background = new THREE.Color(0xea5e5ff);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x333399, 1.0));
  
  const addLight = (color, intensity, position) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);
  return light;
};

addLight(0xffffff, 1, { x: -3, y: 10, z: -10 }).castShadow = true;
addLight(0xffffff, 1, { x: 0, y: 20, z: 0 });

  new GLTFLoader().load(
    "https://rawcdn.githack.com/5Bianca/Blender/181f78714c5c09d096965967f22559cb7d240856/groundF2.glb",
    ({ scene: model }, animations) => {
      model.scale.setScalar(1.1);
      model.position.set(10, -2.5, 0);
      controls.target.copy(model.position);
      scene.add(model);
    }
  );
  new GLTFLoader().load(
    "https://rawcdn.githack.com/5Bianca/Blender/181f78714c5c09d096965967f22559cb7d240856/terrasse.glb",
    ({ scene: model }, animations) => {
      model.scale.setScalar(1.1);
      model.position.set(10, -2.5, 0);
      controls.target.copy(model.position);
      scene.add(model);
    }
  );
  

new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/62b5494715a5da5aa8f125a91f0a3e0659ca3b58/Conferernce%20Hall.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(0.135);
    model.position.set(67, -0.5, 25);
    model.rotateY(Math.PI / 2.3);
    const cameraTarget = new THREE.Vector3(model.position.x, model.position.y + 2, model.position.z);
    controls.target.copy(model.position);
    scene.add(model);
  }
);

new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/b3ecd7089ca803ae5ba4c654002a3aeaa21da05c/Help%20center.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(0.4);
    model.position.set(-29, 0, -20);
    model.rotateY(Math.PI / 2.5);
    controls.target.copy(model.position);
    scene.add(model);
  }
);
 new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/d33e2866954a1a5a23d348c1613bbd84feb98131/Math%20Building%20good.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(1.1);
    model.position.set(38, 0, -78);
    model.rotation.y = Math.PI;
    controls.target.copy(model.position);
    scene.add(model);
  }
);

   new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/d33e2866954a1a5a23d348c1613bbd84feb98131/Tech%20building.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(1.1);
    model.position.set(60, -37, -35);
    model.rotateY(Math.PI / 2.3);
    controls.target.copy(model.position);
    scene.add(model);
  }
);

const loadBuilding = (url, position, rotation) => {
  new GLTFLoader().load(url, ({ scene: model }, animations) => {
    model.scale.setScalar(0.5);
    model.position.copy(position);
    model.rotation.y = THREE.MathUtils.degToRad(rotation);
    scene.add(model);
  });
};

[
  [new THREE.Vector3(70, 0, -40), 205],
  [new THREE.Vector3(-46, 0, -38), -41],
  [new THREE.Vector3(-27, 0, 50), 220],
].forEach(([position, rotation]) =>
  loadBuilding(
    "https://rawcdn.githack.com/5Bianca/Blender/220629b627f8485b943586b3b51ee49c4bc747cf/bottombuildingspecialty4.glb",
    position,
    rotation
  )
);

[
  [new THREE.Vector3(70, 0, -40), 205],
  [new THREE.Vector3(-46, 0, -38), -41],
  [new THREE.Vector3(-27, 0, 50), 220],
].forEach(([position, rotation]) =>
  loadBuilding(
    "https://rawcdn.githack.com/5Bianca/Blender/220629b627f8485b943586b3b51ee49c4bc747cf/topbuildingspecialty2.glb",
    position,
    rotation
  )
);
  
  
new GLTFLoader().load("https://rawcdn.githack.com/5Bianca/Blender/e6cfceeb25e30af159e8958c4317aba1a0c6e23c/person.glb", ({ scene: model }, animations) => {
    scene.add(model);
    model.scale.setScalar(1.1);
    model.position.set(23, 0, 7);
    camera.position.set(12, 3, 6);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    mesh = model;
    scene.add(mesh);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (mesh) mesh.rotation.y = controls.getAzimuthalAngle();
    renderer.render(scene, camera);
  }

 controls.addEventListener("change", () => {
    const cameraTarget = new THREE.Vector3(mesh.position.x, mesh.position.y + 3, mesh.position.z);
    controls.target.copy(cameraTarget);
   
  });
  
  
 document.addEventListener('keydown', (event) => {
  const speed = 0.8;
  const angle = mesh.rotation.y - Math.PI; // subtract 180 degrees (PI radians) to face the back of the object
  const x = speed * Math.sin(angle); // calculate the x and z components of the movement vector
  const z = speed * Math.cos(angle);
  switch (event.key) {
    case 'ArrowUp': 
    case 'w':
      mesh.position.z += z; mesh.position.x += x; break;
    case 'ArrowDown': 
    case 's':
      mesh.position.z -= z; mesh.position.x -= x; break;
    case 'ArrowLeft':
    case 'a':
      mesh.position.x += z; mesh.position.z -= x; break;
    case 'ArrowRight':
    case 'd':
      mesh.position.x -= z; mesh.position.z += x; break;
    case "Escape":
      scenePage.style.display = "none";
      welcomePage.style.display = "block";
      break;
  }
   
  const cameraDistance = 5;
  const cameraPosition = new THREE.Vector3(
    mesh.position.x - cameraDistance * Math.sin(angle),
    3,
    mesh.position.z - cameraDistance * Math.cos(angle)
  );
  const cameraTarget = new THREE.Vector3(
    mesh.position.x + 2 * Math.sin(angle),
    3,
    mesh.position.z + 2 * Math.cos(angle)
  );
  camera.position.copy(cameraPosition);
  camera.lookAt(cameraTarget);
});

  animate();
});
