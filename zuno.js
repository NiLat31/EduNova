
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =====================================
   EDUNOVA - ZUNO 3D REBUILD
===================================== */

const old = document.getElementById("zuno-system");
if (old) old.remove();

const system = document.createElement("div");
system.id = "zuno-system";

const character = document.createElement("div");
character.id = "zuno-character";

system.appendChild(character);
document.body.appendChild(system);

/* Scene */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
camera.position.set(0, 0, 9);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

character.appendChild(renderer.domElement);

/* Lighting */

scene.add(new THREE.AmbientLight(0xffffff, 1.7));

const mainLight = new THREE.DirectionalLight(0xffffff, 3);
mainLight.position.set(-3, 5, 7);
scene.add(mainLight);

const fillLight = new THREE.PointLight(0xff7770, 35, 12);
fillLight.position.set(3, 1, 3);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 2);
rimLight.position.set(2, 3, -4);
scene.add(rimLight);

/* Materials */

const white = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.27,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.18
});

const red = new THREE.MeshPhysicalMaterial({
    color: 0xe52b20,
    roughness: 0.23,
    metalness: 0.12,
    clearcoat: 1
});

const dark = new THREE.MeshPhysicalMaterial({
    color: 0x171717,
    roughness: 0.2,
    clearcoat: 1
});

const gold = new THREE.MeshStandardMaterial({
    color: 0xe9bd67,
    metalness: 0.85,
    roughness: 0.2
});

const eyeWhite = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.12
});

/* Helpers */

function sphere(parent, x, y, z, sx, sy, sz, material) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 48, 48),
        material
    );

    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    parent.add(mesh);
    return mesh;
}

function tube(parent, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(...p))
    );

    const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 48, radius, 10, false),
        material
    );

    parent.add(mesh);
    return mesh;
}

/* Main character */

const zuno = new THREE.Group();
scene.add(zuno);

/* Body */

const body = sphere(
    zuno, 0, -0.35, 0,
    0.61, 0.72, 0.48, white
);

/* Head */

const head = new THREE.Group();
head.position.set(0, 0.68, 0);
zuno.add(head);

sphere(head, 0, 0, 0, 0.83, 0.82, 0.68, white);

/* Hair: layered sculpted tufts */

sphere(head, -0.25, 0.68, 0.02, 0.25, 0.28, 0.3, white);
sphere(head, 0.02, 0.83, 0.02, 0.23, 0.34, 0.28, white);
sphere(head, 0.25, 0.69, 0.02, 0.24, 0.27, 0.28, white);

const hairTip = sphere(
    head, 0.11, 1.02, 0.01,
    0.13, 0.23, 0.16, white
);
hairTip.rotation.z = -0.35;

/* Eyes */

const eyes = [];

function createEye(x) {
    const eye = new THREE.Group();
    eye.position.set(x, 0.03, 0.59);
    head.add(eye);

    sphere(eye, 0, 0, 0, 0.15, 0.205, 0.09, eyeWhite);
    sphere(eye, 0, -0.005, 0.073, 0.105, 0.15, 0.055, dark);

    sphere(
        eye, -0.035, 0.06, 0.12,
        0.035, 0.045, 0.02,
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    eyes.push(eye);
}

createEye(-0.29);
createEye(0.29);

/* Eyebrows */

tube(head, [
    [-0.44, 0.29, 0.62],
    [-0.3, 0.34, 0.65],
    [-0.17, 0.3, 0.63]
], 0.025, dark);

tube(head, [
    [0.17, 0.3, 0.63],
    [0.3, 0.34, 0.65],
    [0.44, 0.29, 0.62]
], 0.025, dark);

/* Nose */

sphere(head, 0, -0.13, 0.7, 0.065, 0.05, 0.045, white);

/* Smile */

tube(head, [
    [-0.15, -0.29, 0.625],
    [-0.08, -0.34, 0.66],
    [0, -0.36, 0.67],
    [0.08, -0.34, 0.66],
    [0.15, -0.29, 0.625]
], 0.018, dark);

/* Cheeks */

const blush = new THREE.MeshBasicMaterial({
    color: 0xf6b8b2,
    transparent: true,
    opacity: 0.45
});

sphere(head, -0.53, -0.2, 0.49, 0.12, 0.07, 0.025, blush);
sphere(head, 0.53, -0.2, 0.49, 0.12, 0.07, 0.025, blush);

/* Arms */

const arms = [];

function createArm(side) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.53, -0.4, 0.15);
    zuno.add(arm);

    const limb = sphere(
        arm, side * 0.13, -0.17, 0,
        0.16, 0.31, 0.16, white
    );

    limb.rotation.z = side * -0.4;

    const hand = sphere(
        arm, side * 0.17, -0.39, 0.04,
        0.19, 0.15, 0.17, white
    );

    // Small fingers
    for (let i = 0; i < 3; i++) {
        sphere(
            arm,
            side * (0.1 + i * 0.075),
            -0.48,
            0.12,
            0.045, 0.09, 0.055,
            white
        );
    }

    arms.push(arm);
}

createArm(-1);
createArm(1);

/* Red 3D pouch */

const pouch = new THREE.Group();
scene.add(pouch);

const pouchShape = new THREE.Shape();

pouchShape.moveTo(-1.05, -0.2);
pouchShape.bezierCurveTo(-1.35, -0.55, -1.2, -1.5, -0.8, -1.65);
pouchShape.bezierCurveTo(-0.35, -1.83, 0.35, -1.83, 0.8, -1.65);
pouchShape.bezierCurveTo(1.2, -1.5, 1.35, -0.55, 1.05, -0.2);
pouchShape.lineTo(1.05, -0.2);
pouchShape.bezierCurveTo(0.5, -0.05, -0.5, -0.05, -1.05, -0.2);

const pouchGeometry = new THREE.ExtrudeGeometry(pouchShape, {
    depth: 0.38,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
    curveSegments: 32
});

const pouchMesh = new THREE.Mesh(pouchGeometry, red);
pouchMesh.position.set(0, -0.35, 0.15);
pouch.add(pouchMesh);

/* Pouch opening and gold zipper */

tube(pouch, [
    [-1.04, -0.53, 0.64],
    [-0.65, -0.39, 0.68],
    [0, -0.34, 0.69],
    [0.65, -0.39, 0.68],
    [1.04, -0.53, 0.64]
], 0.045, gold);

/* Zipper teeth */

for (let i = 0; i < 21; i++) {
    const x = -0.9 + i * 0.09;
    const y = -0.5 + 0.16 * Math.pow(x / 1.04, 2);

    sphere(pouch, x, y, 0.72, 0.025, 0.035, 0.025, gold);
}

/* Zipper pull */

const pull = new THREE.Group();
pull.position.set(0.82, -0.48, 0.75);
pouch.add(pull);

sphere(pull, 0, 0, 0, 0.085, 0.11, 0.04, gold);
sphere(pull, 0, -0.16, 0, 0.035, 0.13, 0.025, gold);

/* Position the pouch in front of lower body */

pouch.position.y = -0.1;

/* Character sits behind the pouch */

zuno.position.set(0, 0.05, -0.15);
zuno.scale.setScalar(0.92);

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

    const t = clock.getElapsedTime();

    zuno.position.y = 0.05 + Math.sin(t * 1.4) * 0.025;
    head.rotation.y = Math.sin(t * 0.8) * 0.045;
    head.rotation.z = Math.sin(t * 1.1) * 0.018;

    pouch.rotation.y = Math.sin(t * 0.6) * 0.012;

    renderer.render(scene, camera);
}

animate();
