
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* =====================================
   EDUNOVA | ZUNO 2.0
   Compact Red Zipper Pouch Mascot
===================================== */

const system = document.createElement("div");
system.id = "zuno-system";

const character = document.createElement("div");
character.id = "zuno-character";

system.appendChild(character);
document.body.appendChild(system);

/* Scene */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(32, 150 / 160, 0.1, 100);
camera.position.set(0, 0, 7);

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

scene.add(new THREE.AmbientLight(0xffffff, 1.8));

const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(-3, 4, 6);
scene.add(keyLight);

const softLight = new THREE.PointLight(0xff7770, 12, 10);
softLight.position.set(3, 1, 3);
scene.add(softLight);

/* Materials */

const fur = new THREE.MeshPhysicalMaterial({
    color: 0xfffdfb,
    roughness: 0.3,
    clearcoat: 0.8
});

const red = new THREE.MeshPhysicalMaterial({
    color: 0xd91f19,
    roughness: 0.24,
    metalness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.16
});

const redSide = new THREE.MeshStandardMaterial({
    color: 0x99130f,
    roughness: 0.35
});

const gold = new THREE.MeshStandardMaterial({
    color: 0xe9bd70,
    metalness: 0.85,
    roughness: 0.2
});

const dark = new THREE.MeshPhysicalMaterial({
    color: 0x171717,
    roughness: 0.16,
    clearcoat: 1
});

const shine = new THREE.MeshBasicMaterial({
    color: 0xffffff
});

/* Helpers */

function ball(parent, x, y, z, sx, sy, sz, material) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 40, 40),
        material
    );

    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    parent.add(mesh);
    return mesh;
}

function roundedTube(parent, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(...p))
    );

    const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 40, radius, 10, false),
        material
    );

    parent.add(mesh);
    return mesh;
}

/* Character group */

const zuno = new THREE.Group();
scene.add(zuno);

/* Head */

const head = new THREE.Group();
head.position.set(0, 0.58, 0.05);
zuno.add(head);

ball(head, 0, 0, 0, 0.57, 0.55, 0.46, fur);

/* Sculpted hair */

const hair = new THREE.Group();
head.add(hair);

ball(hair, -0.23, 0.43, 0, 0.20, 0.21, 0.23, fur);
ball(hair, 0.00, 0.55, 0, 0.19, 0.25, 0.22, fur);
ball(hair, 0.20, 0.43, 0, 0.19, 0.19, 0.22, fur);

const hairTip = ball(
    hair, 0.12, 0.69, 0,
    0.11, 0.18, 0.14, fur
);
hairTip.rotation.z = -0.35;

/* Eyes */

const eyes = [];

function makeEye(x) {
    const eye = new THREE.Group();
    eye.position.set(x, 0.015, 0.405);
    head.add(eye);

    ball(eye, 0, 0, 0, 0.105, 0.145, 0.055, dark);
    ball(eye, -0.027, 0.045, 0.047, 0.027, 0.035, 0.014, shine);
    ball(eye, 0.025, -0.035, 0.047, 0.012, 0.015, 0.009, shine);

    eyes.push(eye);
}

makeEye(-0.205);
makeEye(0.205);

/* Eyebrows */

roundedTube(head, [
    [-0.31, 0.22, 0.405],
    [-0.21, 0.255, 0.42],
    [-0.12, 0.22, 0.42]
], 0.018, dark);

roundedTube(head, [
    [0.12, 0.22, 0.42],
    [0.21, 0.255, 0.42],
    [0.31, 0.22, 0.405]
], 0.018, dark);

/* Nose and smile */

ball(head, 0, -0.12, 0.46, 0.035, 0.028, 0.025, fur);

roundedTube(head, [
    [-0.105, -0.21, 0.425],
    [-0.05, -0.255, 0.45],
    [0, -0.26, 0.455],
    [0.05, -0.255, 0.45],
    [0.105, -0.21, 0.425]
], 0.012, dark);

/* Little hands */

const hands = [];

for (const side of [-1, 1]) {
    const hand = new THREE.Group();
    hand.position.set(side * 0.37, 0.035, 0.55);
    zuno.add(hand);

    ball(hand, 0, 0, 0, 0.12, 0.10, 0.09, fur);

    for (let i = 0; i < 3; i++) {
        ball(
            hand,
            side * (-0.065 + i * 0.065),
            -0.055,
            0.025,
            0.035, 0.055, 0.035,
            fur
        );
    }

    hands.push(hand);
}

/* =====================================
   THE NEW PUCH
===================================== */

const pouch = new THREE.Group();
scene.add(pouch);

/* Soft rounded pouch shape */

const shape = new THREE.Shape();

shape.moveTo(-0.64, 0.13);
shape.lineTo(0.64, 0.13);
shape.bezierCurveTo(0.78, 0.13, 0.84, 0.02, 0.84, -0.13);
shape.lineTo(0.84, -0.91);
shape.bezierCurveTo(0.84, -1.13, 0.68, -1.22, 0.48, -1.22);
shape.lineTo(-0.48, -1.22);
shape.bezierCurveTo(-0.68, -1.22, -0.84, -1.13, -0.84, -0.91);
shape.lineTo(-0.84, -0.13);
shape.bezierCurveTo(-0.84, 0.02, -0.78, 0.13, -0.64, 0.13);

const pouchGeometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: 0.045,
    bevelThickness: 0.06,
    curveSegments: 24
});

const pouchMesh = new THREE.Mesh(pouchGeometry, red);
pouchMesh.position.z = 0.25;
pouch.add(pouchMesh);

/* Side seam decoration */

roundedTube(pouch, [
    [-0.72, -0.15, 0.48],
    [-0.76, -0.55, 0.48],
    [-0.70, -0.98, 0.48]
], 0.012, gold);

roundedTube(pouch, [
    [0.72, -0.15, 0.48],
    [0.76, -0.55, 0.48],
    [0.70, -0.98, 0.48]
], 0.012, gold);

/* Horizontal zipper track */

roundedTube(pouch, [
    [-0.72, 0.12, 0.49],
    [-0.42, 0.17, 0.50],
    [0, 0.19, 0.50],
    [0.42, 0.17, 0.50],
    [0.72, 0.12, 0.49]
], 0.025, redSide);

/* Gold zipper teeth */

for (let i = 0; i < 25; i++) {
    const x = -0.62 + i * 0.052;

    ball(
        pouch,
        x,
        0.155 + 0.035 * (1 - Math.pow(x / 0.72, 2)),
        0.53,
        0.012, 0.023, 0.012,
        gold
    );
}

/* Zipper slider */

const slider = new THREE.Group();
slider.position.set(0.49, 0.18, 0.57);
pouch.add(slider);

const sliderBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.09, 0.055),
    gold
);
sliderBody.position.y = 0.015;
slider.add(sliderBody);

const sliderLoop = new THREE.Mesh(
    new THREE.TorusGeometry(0.045, 0.012, 8, 20),
    gold
);
sliderLoop.position.set(0, -0.07, 0.015);
slider.add(sliderLoop);

/* Pouch badge */

const badge = new THREE.Mesh(
    new THREE.CircleGeometry(0.14, 40),
    gold
);
badge.position.set(0, -0.67, 0.57);
pouch.add(badge);

const badgeInner = new THREE.Mesh(
    new THREE.CircleGeometry(0.115, 40),
    redSide
);
badgeInner.position.set(0, -0.67, 0.58);
pouch.add(badgeInner);

/* Pouch position: foreground */

pouch.position.set(0, -0.06, 0.55);

/* Keep character behind pouch */

zuno.position.set(0, 0.02, 0);
zuno.scale.setScalar(0.86);

/* Camera and sizing */

function resize() {
    const width = Math.max(character.clientWidth, 1);
    const height = Math.max(character.clientHeight, 1);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

resize();

const observer = new ResizeObserver(resize);
observer.observe(character);

/* =====================================
   HIDDEN UNTIL AN ANNOUNCEMENT
===================================== */

window.showZuno = function () {
    system.classList.add("zuno-visible");
    resize();
};

window.hideZuno = function () {
    system.classList.remove("zuno-visible");
};

/* Animation */

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    zuno.position.y = 0.02 + Math.sin(t * 1.4) * 0.018;
    head.rotation.y = Math.sin(t * 0.8) * 0.035;
    head.rotation.z = Math.sin(t * 1.1) * 0.012;

    const blink = Math.pow(
        Math.max(0, Math.sin(t * 0.75 + 1)),
        40
    );

    eyes.forEach(eye => {
        eye.scale.y = 1 - blink * 0.9;
    });

    renderer.render(scene, camera);
}

animate();
