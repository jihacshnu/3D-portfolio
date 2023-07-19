import './style.css'

import * as THREE from 'three'
import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene=new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer=new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene,camera);

//torus

const geometry= new THREE.TorusGeometry(10,3,16,100);

const material=new THREE.MeshBasicMaterial({color:0xFF6347});

const torus= new THREE.Mesh(geometry,material);
scene.add(torus);

//light
const pointLight=new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ablight= new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ablight);

// const lihelp=new THREE.PointLightHelper(pointLight);
// const grid=new THREE.GridHelper(200,50);
// scene.add(lihelp,grid);

// const obcon=new OrbitControls(camera,renderer.domElement);


//star
function addstar() {
    const star= new THREE.SphereGeometry(0.25,24,24);
    const mat= new THREE.MeshStandardMaterial({color:0xffffff})
    const mesh= new THREE.Mesh(star,mat);
    
    const [x,y,z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    mesh.position.set(x,y,z)
    scene.add(mesh);
    
}

Array(200).fill().forEach(addstar);

//background

const spacetexture= new THREE.TextureLoader().load('space.jpg');
scene.background=spacetexture;

//avatar
const jistex=new THREE.TextureLoader().load('jishnu2.jpg');
const jish=new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: jistex})
);
scene.add(jish);

//moon
const moontext=new THREE.TextureLoader().load('moon.jpg');
const normal=new THREE.TextureLoader().load('normal.jpg');

const moon= new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map:moontext,
        normalMap:normal
    })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jish.position.z = -5;
jish.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jish.rotation.y += 0.01;
  jish.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
