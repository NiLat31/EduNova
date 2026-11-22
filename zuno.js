
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =========================================
   EDUNOVA ZUNO - 3D CHARACTER
========================================= */

const container = document.createElement("div");
container.id = "zuno-system";

const character = document.createElement("div");
character.id = "zuno-character";

const portal = document.createElement("div");
portal.className = "zuno-portal";

const zipper = document.createElement("div");
zipper.className = "zuno-zipper";

const zipperPull = document.createElement("div");
zipperPull.className = "zuno-zipper-pull";

portal.append(zipper, zipperPull);
character.appendChild(portal);
container.appendChild(character);
document.body.appendChild(container);

/* Scene */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    35,
    1,
    0.1,
    100
);
camera.position.set(0, 0.15, 7);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

character.appendChild(renderer.domElement);

/* Lighting */

scene.add(new THREE.AmbientLight(0xffffff, 2));

const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(-3, 5, 6);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0xff5148, 18, 12);
rimLight.position.set(3, 1, -2);
scene.add(rimLight);

/* Materials */

const whiteMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfafafa,
    roughness: 0.3,
    metalness: 0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2
});

const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x171717,
    roughness: 0.25
});

const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x171717,
    roughness: 0.12,
    clearcoat: 1
});

/* Character group */

const zuno = new THREE.Group();
scene.add(zuno);

/* Body */

const bodyGeometry = new THREE.SphereGeometry(0.85, 64, 64);
bodyGeometry.scale(0.85, 1.05, 0.72);

const body = new THREE.Mesh(bodyGeometry, whiteMaterial);
body.position.y = -0.55;
zuno.add(body);

/* Head */

const headGeometry = new THREE.SphereGeometry(0.78, 64, 64);
headGeometry.scale(1, 0.91, 0.82);

const head = new THREE.Mesh(headGeometry, whiteMaterial);
head.position.set(0, 0.55, 0.05);
zuno.add(head);

/* Eyes */

function createEye(x, y, z) {
    const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.105, 32, 32),
        eyeMaterial
    );

    eye.position.set(x, y, z);
    eye.scale.set(0.85, 1.25, 0.5);
    zuno.add(eye);

    const shine = new THREE.Mesh(
        new THREE.SphereGeometry(0.027, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    shine.position.set(x - 0.025, y + 0.035, z + 0.05);
    zuno.add(shine);

    return eye;
}

const leftEye = createEye(-0.28, 0.58, 0.68);
const rightEye = createEye(0.28, 0.58, 0.68);

/* Small nose */

const nose = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 24, 24),
    whiteMaterial
);

nose.position.set(0, 0.39, 0.76);
nose.scale.set(1, 0.7, 0.7);
zuno.add(nose);

/* Smile */

const smileCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.13, 0.28, 0.72),
    new THREE.Vector3(0, 0.19, 0.78),
    new THREE.Vector3(0.13, 0.28, 0.72)
);

const smile = new THREE.Mesh(
    new THREE.TubeGeometry(smileCurve, 24, 0.018, 8, false),
    darkMaterial
);

zuno.add(smile);

/* Signature little tuft */

const tuft = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 32, 32),
    whiteMaterial
);

tuft.position.set(0.02, 1.28, 0.03);
tuft.scale.set(0.55, 1.3, 0.6);
tuft.rotation.z = -0.35;
zuno.add(tuft);

/* Arms */

function createArm(side) {
    const arm = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 32, 32),
        whiteMaterial
    );

    arm.scale.set(0.65, 1.5, 0.65);
    arm.position.set(side * 0.75, -0.48, 0.05);
    arm.rotation.z = side * -0.35;
    zuno.add(arm);

    return arm;
}

const leftArm = createArm(-1);
const rightArm = createArm(1);

/* Initial position */

zuno.position.y = 0.75;
zuno.scale.setScalar(0.85);
/* Resize */

function resize() {
    const width = character.clientWidth;
    const height = character.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

const observer = new ResizeObserver(resize);
observer.observe(character);
resize();

/* Animation */

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Gentle floating
    zuno.position.y = -0.05 + Math.sin(time * 1.5) * 0.045;

    // Small head movement
    head.rotation.y = Math.sin(time * 0.8) * 0.06;
    head.rotation.z = Math.sin(time * 1.1) * 0.025;

    // Gentle arm movement
    leftArm.rotation.z = -0.35 + Math.sin(time * 1.5) * 0.035;
    rightArm.rotation.z = 0.35 + Math.sin(time * 1.5) * 0.035;

    // Occasional blink
    const blink = Math.pow(
        Math.max(0, Math.sin(time * 0.8 + 2)),
        35
    );

    leftEye.scale.y = 1.25 * (1 - blink * 0.9);
    rightEye.scale.y = 1.25 * (1 - blink * 0.9);

    renderer.render(scene, camera);
}

animate();

