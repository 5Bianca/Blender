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
  let mathNorth1, mathWest2, mathSouth3, mathEast4, techNorth1, techWest2, techSouth3, techEast4, techdoor, scienceWest2, scienceNorth1, scienceSouth3, scienceEast4, scienceDoor ;

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
    model.position.set(67, 0, 25);
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
  "https://rawcdn.githack.com/5Bianca/Blender/861930da3a3a47813bc6e95c3b9b6e7f28e97201/Mathfinal.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(1.1);
    model.position.set(38, 0.1, -78);
    model.rotation.y = Math.PI;
    controls.target.copy(model.position);
    scene.add(model);
  }
);


const loadBuilding = (url, position, rotation) => {
  new GLTFLoader().load(url, ({ scene: model }, animations) => {
    model.scale.setScalar(0.7);
    model.position.copy(position);
    model.rotation.y = THREE.MathUtils.degToRad(rotation);
    scene.add(model);
  });
};

   new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/4088b9ae534163799c3b86f6349041f4bb538085/TechFinal3.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(1.1);
    model.position.set(60, -36, -35);
    model.rotateY(Math.PI / 2.3);
    controls.target.copy(model.position);
    scene.add(model);
  }
);
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
    camera.position.set(23, 3, 13);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    mesh = model;
    scene.add(mesh);
  });
  
  
const wallGeometryMath = new THREE.BoxGeometry(19, 22, 0.01);
const wallGeometryMathDoor = new THREE.BoxGeometry(16, 22, 0.01); 
const wallGeometryTech = new THREE.BoxGeometry(16, 22, 0.01);
const wallGeometryTechDoor = new THREE.BoxGeometry(5.5, 22, 0.01);
const wallGeometryScience = new THREE.BoxGeometry(16, 22, 0.01);
const wallGeometryScienceDoor = new THREE.BoxGeometry(5.5, 22, 0.01);
  
const wallMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.001 });
  
mathWest2 = new THREE.Mesh(wallGeometryMath, wallMaterial);
mathWest2.position.set(38.5, 5, -66);
scene.add(mathWest2);
  
mathEast4 = new THREE.Mesh(wallGeometryMath, wallMaterial);
mathEast4.position.set(38.5, 5, -89);
scene.add(mathEast4);
  
mathSouth3 = new THREE.Mesh(wallGeometryMath, wallMaterial);
mathSouth3.position.set(48, 5, -77);
mathSouth3.rotation.y = Math.PI/2; 
scene.add(mathSouth3);
  
mathNorth1 = new THREE.Mesh(wallGeometryMathDoor, wallMaterial);
mathNorth1.position.set(29, 5, -75);
mathNorth1.rotation.y = Math.PI/2; 
scene.add(mathNorth1);
  
techWest2 = new THREE.Mesh(wallGeometryTech, wallMaterial);
techWest2.position.set(-59.88827740948756, 0, 7.377608102401288);
techWest2.rotation.y = Math.PI/2.2; 
scene.add(techWest2);  
  
techNorth1 = new THREE.Mesh(wallGeometryTech, wallMaterial);
techNorth1.position.set(-50.10805866993667, 0, 1.4463358078378459);
techNorth1.rotation.y = Math.PI/1.069; 
scene.add(techNorth1);  
  
techSouth3 = new THREE.Mesh(wallGeometryTech, wallMaterial);
techSouth3.position.set(-53.50805866993667, 0, 17.3463358078378459);
techSouth3.rotation.y = Math.PI/1.069; 
scene.add(techSouth3);  
  
techEast4 = new THREE.Mesh(wallGeometryTechDoor, wallMaterial);
techEast4.position.set(-42.48827740948756, 0, 15.577608102401288);
techEast4.rotation.y = Math.PI/2.2; 
scene.add(techEast4);  
  
techdoor = new THREE.Mesh(wallGeometryTechDoor, wallMaterial);
techdoor.position.set(-40.48827740948756, 0, 6.077608102401288);
techdoor.rotation.y = Math.PI/2.2; 
scene.add(techdoor);  
  
scienceWest2 = new THREE.Mesh(wallGeometryTech, wallMaterial);
scienceWest2.position.set(-9.88827740948756, 0, 40.377608102401288);
scienceWest2.rotation.y = Math.PI; 
scene.add(scienceWest2);     
  

function checkCollisions() {
  if (!mesh) return; 
  const wallBox1 = new THREE.Box3().setFromObject(mathNorth1);
  const wallBox2 = new THREE.Box3().setFromObject(mathWest2);
  const wallBox3 = new THREE.Box3().setFromObject(mathSouth3);
  const wallBox4 = new THREE.Box3().setFromObject(mathEast4);
  const wallBox5 = new THREE.Box3().setFromObject(techNorth1);
  const wallBox6 = new THREE.Box3().setFromObject(techWest2);
  const wallBox7 = new THREE.Box3().setFromObject(techSouth3);
  const wallBox8 = new THREE.Box3().setFromObject(techEast4);
  const objectBox = new THREE.Box3().setFromObject(mesh);

  if (objectBox.intersectsBox(wallBox1)|| objectBox.intersectsBox(wallBox2)|| objectBox.intersectsBox(wallBox3)|| objectBox.intersectsBox(wallBox4)|| objectBox.intersectsBox(wallBox5)|| objectBox.intersectsBox(wallBox6)|| objectBox.intersectsBox(wallBox7)|| objectBox.intersectsBox(wallBox8)) {
    mesh.position.copy(mesh.userData.previousPosition);
  } else {
    mesh.userData.previousPosition = mesh.position.clone();
  }
}
 function animate() {
  requestAnimationFrame(animate);
  if (mesh) {
    mesh.rotation.y = controls.getAzimuthalAngle();
    checkCollisions(); 
  }
  renderer.render(scene, camera);
}

 controls.addEventListener("change", () => {
    const cameraTarget = new THREE.Vector3(mesh.position.x, mesh.position.y + 3, mesh.position.z);
    controls.target.copy(cameraTarget);
   
  });
  
  
 document.addEventListener('keydown', (event) => {
  const speed = 0.8;
  const angle = mesh.rotation.y - Math.PI; 
  const x = speed * Math.sin(angle);
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
   function logPosition() {
  console.log(`Position: (${mesh.position.x}, ${mesh.position.y}, ${mesh.position.z})`);
}
   document.addEventListener('keydown', logPosition);

   
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
