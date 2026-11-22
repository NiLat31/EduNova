
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* ==========================================
   EDUNOVA | ZUNO 3.0
   Original 3D Mascot
========================================== */

const system = document.createElement("div");
system.id = "zuno-system";

const character = document.createElement("div");
character.id = "zuno-character";

system.appendChild(character);
document.body.appendChild(system);

/* ---------- RENDERER ---------- */

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
    -1.75, 1.75, 1.87, -1.87, 0.1, 100
);
camera.position.set(0, 0, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
character.appendChild(renderer.domElement);

/* ---------- LIGHTING ---------- */

scene.add(new THREE.HemisphereLight(0xfff5ed, 0x54201c, 2.1));

const keyLight = new THREE.DirectionalLight(0xfff0df, 3.2);
keyLight.position.set(-3, 5, 6);
scene.add(keyLight);

const fillLight = new THREE.PointLight(0xff7770, 2.5, 9);
fillLight.position.set(3, 1, 4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffc77c, 2);
rimLight.position.set(2, 3, -3);
scene.add(rimLight);

/* ---------- MATERIALS ---------- */

const fur = new THREE.MeshPhysicalMaterial({
    color: 0xfffaf6,
    roughness: 0.48,
    metalness: 0,
    clearcoat: 0.28,
    clearcoatRoughness: 0.4
});

const dark = new THREE.MeshPhysicalMaterial({
    color: 0x241b1b,
    roughness: 0.2,
    clearcoat: 1
});

const iris = new THREE.MeshPhysicalMaterial({
    color: 0x75432b,
    roughness: 0.22,
    clearcoat: 1
});

const white = new THREE.MeshBasicMaterial({
    color: 0xffffff
});

const gold = new THREE.MeshPhysicalMaterial({
    color: 0xe8b85d,
    metalness: 0.82,
    roughness: 0.24,
    clearcoat: 0.7
});

const redFabric = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.78,
    metalness: 0.01,
    clearcoat: 0.12
});

const redDark = new THREE.MeshStandardMaterial({
    color: 0x8f1018,
    roughness: 0.55
});

const blush = new THREE.MeshBasicMaterial({
    color: 0xf3aaa2,
    transparent: true,
    opacity: 0.52
});

/* ---------- FABRIC TEXTURE ---------- */

const fabricCanvas = document.createElement("canvas");
fabricCanvas.width = 512;
fabricCanvas.height = 512;

const fabricContext = fabricCanvas.getContext("2d");

fabricContext.fillStyle = "#c91d27";
fabricContext.fillRect(0, 0, 512, 512);

for (let i = 0; i < 512; i += 3) {
    fabricContext.strokeStyle = "rgba(255,255,255,0.07)";
    fabricContext.lineWidth = 1;
    fabricContext.beginPath();
    fabricContext.moveTo(i, 0);
    fabricContext.lineTo(i, 512);
    fabricContext.stroke();

    fabricContext.strokeStyle = "rgba(60,0,0,0.09)";
    fabricContext.beginPath();
    fabricContext.moveTo(0, i);
    fabricContext.lineTo(512, i);
    fabricContext.stroke();
}

const fabricTexture = new THREE.CanvasTexture(fabricCanvas);
fabricTexture.colorSpace = THREE.SRGBColorSpace;
fabricTexture.wrapS = THREE.RepeatWrapping;
fabricTexture.wrapT = THREE.RepeatWrapping;
fabricTexture.repeat.set(2, 2);

redFabric.map = fabricTexture;
redFabric.bumpMap = fabricTexture;
redFabric.bumpScale = 0.035;

/* ---------- HELPERS ---------- */

function sphere(parent, position, scale, material) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 48, 40),
        material
    );

    mesh.position.set(...position);
    mesh.scale.set(...scale);
    parent.add(mesh);
    return mesh;
}

function tube(parent, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(...p))
    );

    const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 64, radius, 10, false),
        material
    );

    parent.add(mesh);
    return mesh;
}

function roundedBox(parent, position, dimensions, radius, material) {
    const geometry = new THREE.BoxGeometry(...dimensions);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.geometry = new THREE.BoxGeometry(...dimensions);
    parent.add(mesh);
    return mesh;
}

/* ==========================================
   ZUNO CHARACTER
========================================== */

const zuno = new THREE.Group();
scene.add(zuno);

/* Body */

const body = new THREE.Group();
zuno.add(body);

sphere(body, [0, -0.12, 0], [0.43, 0.53, 0.34], fur);

/* Head */

const head = new THREE.Group();
head.position.set(0, 0.67, 0.08);
body.add(head);

sphere(head, [0, 0, 0], [0.57, 0.57, 0.48], fur);

/* Ears */

for (const side of [-1, 1]) {
    sphere(
        head,
        [side * 0.49, -0.02, 0.02],
        [0.13, 0.19, 0.19],
        fur
    );
}

/* Hair tuft */

const hair = new THREE.Group();
head.add(hair);

sphere(hair, [-0.20, 0.43, 0.00], [0.20, 0.20, 0.19], fur);
sphere(hair, [0.00, 0.53, 0.01], [0.19, 0.25, 0.20], fur);
sphere(hair, [0.18, 0.43, 0.00], [0.17, 0.18, 0.17], fur);

const hairTip = sphere(
    hair,
    [0.13, 0.68, 0.00],
    [0.12, 0.19, 0.13],
    fur
);
hairTip.rotation.z = -0.4;

/* Eyes */

const eyes = [];

function createEye(x) {
    const eye = new THREE.Group();
    eye.position.set(x, 0.035, 0.423);
    head.add(eye);

    sphere(eye, [0, 0, 0], [0.115, 0.15, 0.065], dark);
    sphere(eye, [0, 0, 0.037], [0.087, 0.12, 0.045], iris);
    sphere(eye, [-0.022, 0.04, 0.072], [0.033, 0.04, 0.015], white);
    sphere(eye, [0.032, -0.035, 0.071], [0.013, 0.017, 0.009], white);

    eyes.push(eye);
}

createEye(-0.205);
createEye(0.205);

/* Eyebrows */

tube(head, [
    [-0.32, 0.25, 0.43],
    [-0.22, 0.29, 0.45],
    [-0.12, 0.26, 0.44]
], 0.021, dark);

tube(head, [
    [0.12, 0.26, 0.44],
    [0.22, 0.29, 0.45],
    [0.32, 0.25, 0.43]
], 0.021, dark);

/* Cheeks */

sphere(head, [-0.35, -0.13, 0.34], [0.11, 0.065, 0.035], blush);
sphere(head, [0.35, -0.13, 0.34], [0.11, 0.065, 0.035], blush);

/* Nose */

sphere(head, [0, -0.105, 0.47], [0.047, 0.034, 0.035], blush);

/* Smiling mouth */

const mouth = sphere(
    head,
    [0, -0.235, 0.423],
    [0.105, 0.09, 0.035],
    dark
);

sphere(
    head,
    [0, -0.285, 0.451],
    [0.052, 0.025, 0.012],
    blush
);

/* Arms and hands */

const arms = [];
const hands = [];

for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.39, 0.28, 0.30);
    zuno.add(arm);

    const upperArm = sphere(
        arm,
        [side * 0.045, -0.02, 0],
        [0.105, 0.22, 0.105],
        fur
    );

    upperArm.rotation.z = side * -0.45;

    const hand = new THREE.Group();
    hand.position.set(side * 0.07, 0.13, 0.06);
    arm.add(hand);

    sphere(hand, [0, 0, 0], [0.13, 0.11, 0.10], fur);

    for (let i = 0; i < 3; i++) {
        sphere(
            hand,
            [side * (-0.075 + i * 0.07), -0.07, 0.015],
            [0.035, 0.065, 0.035],
            fur
        );
    }

    arms.push(arm);
    hands.push(hand);
}

/* ==========================================
   THE EDU NOVA RED POUCH
========================================== */

const pouch = new THREE.Group();
scene.add(pouch);

/* Padded rounded silhouette */

const pouchShape = new THREE.Shape();

pouchShape.moveTo(-0.78, 0.16);
pouchShape.lineTo(0.78, 0.16);
pouchShape.bezierCurveTo(0.94, 0.16, 1.02, 0.04, 1.02, -0.13);
pouchShape.lineTo(1.02, -0.92);
pouchShape.bezierCurveTo(1.02, -1.17, 0.83, -1.29, 0.59, -1.29);
pouchShape.lineTo(-0.59, -1.29);
pouchShape.bezierCurveTo(-0.83, -1.29, -1.02, -1.17, -1.02, -0.92);
pouchShape.lineTo(-1.02, -0.13);
pouchShape.bezierCurveTo(-1.02, 0.04, -0.94, 0.16, -0.78, 0.16);

const pouchGeometry = new THREE.ExtrudeGeometry(pouchShape, {
    depth: 0.38,
    bevelEnabled: true,
    bevelSegments: 8,
    bevelSize: 0.075,
    bevelThickness: 0.075,
    curveSegments: 32
});

const pouchBody = new THREE.Mesh(pouchGeometry, redFabric);
pouchBody.position.z = 0.32;
pouch.add(pouchBody);

/* Soft lower padded panel */

sphere(
    pouch,
    [0, -0.65, 0.46],
    [0.91, 0.60, 0.17],
    redFabric
);

/* Stitched border */

tube(pouch, [
    [-0.86, 0.02, 0.69],
    [-0.96, -0.20, 0.69],
    [-0.95, -0.88, 0.69],
    [-0.78, -1.15, 0.69],
    [0, -1.22, 0.69],
    [0.78, -1.15, 0.69],
    [0.95, -0.88, 0.69],
    [0.96, -0.20, 0.69],
    [0.86, 0.02, 0.69]
], 0.012, gold);

/* Decorative side seams */

for (const side of [-1, 1]) {
    tube(pouch, [
        [side * 0.82, -0.12, 0.70],
        [side * 0.88, -0.52, 0.70],
        [side * 0.84, -0.91, 0.70]
    ], 0.012, gold);
}

/* ==========================================
   ZUNO GOLD NAMEPLATE
========================================== */

const plateShape = new THREE.Shape();

const pw = 0.59;
const ph = 0.19;
const pr = 0.09;

plateShape.moveTo(-pw + pr, -ph);
plateShape.lineTo(pw - pr, -ph);
plateShape.quadraticCurveTo(pw, -ph, pw, -ph + pr);
plateShape.lineTo(pw, ph - pr);
plateShape.quadraticCurveTo(pw, ph, pw - pr, ph);
plateShape.lineTo(-pw + pr, ph);
plateShape.quadraticCurveTo(-pw, ph, -pw, ph - pr);
plateShape.lineTo(-pw, -ph + pr);
plateShape.quadraticCurveTo(-pw, -ph, -pw + pr, -ph);

const plateGeometry = new THREE.ExtrudeGeometry(plateShape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.018,
    bevelThickness: 0.02
});

const namePlate = new THREE.Mesh(plateGeometry, gold);
namePlate.position.set(0, -0.58, 0.72);
pouch.add(namePlate);

/* Gold lettering */

const letteringCanvas = document.createElement("canvas");
letteringCanvas.width = 1024;
letteringCanvas.height = 256;

const letteringContext = letteringCanvas.getContext("2d");

letteringContext.clearRect(0, 0, 1024, 256);
letteringContext.font = "bold 166px Georgia";
letteringContext.textAlign = "center";
letteringContext.textBaseline = "middle";
letteringContext.fillStyle = "#fff0c1";
letteringContext.shadowColor = "#8e571f";
letteringContext.shadowBlur = 8;
letteringContext.fillText("ZUNO", 512, 128);

const letteringTexture = new THREE.CanvasTexture(letteringCanvas);
letteringTexture.colorSpace = THREE.SRGBColorSpace;

const lettering = new THREE.Mesh(
    new THREE.PlaneGeometry(1.02, 0.255),
    new THREE.MeshBasicMaterial({
        map: letteringTexture,
        transparent: true,
        depthWrite: false
    })
);

lettering.position.set(0, -0.58, 0.80);
pouch.add(lettering);

/* ==========================================
   GOLD ZIPPER
========================================== */

const zipperRail = [];

for (const offset of [-0.035, 0.035]) {
    zipperRail.push(
        tube(pouch, [
            [-0.88, 0.17 + offset, 0.76],
            [-0.48, 0.20 + offset, 0.76],
            [0, 0.21 + offset, 0.76],
            [0.48, 0.20 + offset, 0.76],
            [0.88, 0.17 + offset, 0.76]
        ], 0.018, gold)
    );
}

/* Zipper teeth */

const teeth = [];

for (let i = 0; i < 32; i++) {
    const x = -0.82 + i * 0.053;

    const y = 0.17 + 0.04 * (1 - Math.pow(x / 0.9, 2));

    for (const side of [-1, 1]) {
        const tooth = sphere(
            pouch,
            [x, y + side * 0.037, 0.78],
            [0.017, 0.025, 0.018],
            gold
        );

        teeth.push(tooth);
    }
}

/* Zipper slider */

const slider = new THREE.Group();
slider.position.set(0.85, 0.20, 0.84);
pouch.add(slider);

const sliderBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.095, 0.065),
    gold
);
slider.add(sliderBody);

const pullRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.052, 0.014, 12, 24),
    gold
);
pullRing.position.set(0, -0.09, 0.02);
slider.add(pullRing);

/* Small zipper pull extension */

const pull = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.025, 0.14, 4, 8),
    gold
);
pull.position.set(0, -0.17, 0.02);
pull.rotation.z = -0.2;
slider.add(pull);

/* Pouch placement */

pouch.position.set(0, -0.06, 0);

/* Character begins inside pouch */

zuno.position.set(0, -1.55, 0);
zuno.scale.setScalar(0.90);

/* ==========================================
   CAMERA AND RESIZING
========================================== */

function resize() {
    const width = Math.max(character.clientWidth, 1);
    const height = Math.max(character.clientHeight, 1);

    const aspect = width / height;

    camera.left = -1.75 * aspect / (150 / 160);
    camera.right = 1.75 * aspect / (150 / 160);
    camera.top = 1.87;
    camera.bottom = -1.87;

    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

const observer = new ResizeObserver(resize);
observer.observe(character);
resize();

/* ==========================================
   ZUNO ANIMATION CONTROLS
========================================== */

const clock = new THREE.Clock();

let isOpen = false;
let startTime = 0;

function smooth(t) {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
}

window.showZuno = function () {
    system.classList.add("zuno-visible");
    resize();

    if (!isOpen) {
        isOpen = true;
        startTime = clock.getElapsedTime();
    }
};

window.hideZuno = function () {
    isOpen = false;
    system.classList.remove("zuno-visible");

    zuno.position.y = -1.55;
    slider.position.x = 0.85;

    hands.forEach(hand => {
        hand.rotation.z = 0;
    });
};

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    if (isOpen) {
        const elapsed = t - startTime;

        /* Zipper movement */

        const zipperProgress = smooth(elapsed / 1.15);
        slider.position.x = 0.85 - zipperProgress * 1.7;

        /* Zuno rises after zipper opens */

        const riseProgress = smooth((elapsed - 0.85) / 1.7);
        zuno.position.y = -1.55 + riseProgress * 1.55;

        /* Gentle floating */

        if (riseProgress >= 1) {
            zuno.position.y += Math.sin(t * 2) * 0.025;

            head.rotation.z = Math.sin(t * 2.1) * 0.025;
            head.rotation.y = Math.sin(t * 1.1) * 0.035;

            /* Right-hand wave */

            arms[1].rotation.z = -0.48;
            hands[1].rotation.z = Math.sin(t * 7) * 0.65;
        } else {
            arms[1].rotation.z = 0;
            hands[1].rotation.z = 0;
            head.rotation.z = 0;
        }
    }

    /* Natural blinking */

    const blink = Math.pow(
        Math.max(0, Math.sin(t * 0.75 + 1)),
        40
    );

    eyes.forEach(eye => {
        eye.scale.y = 1 - blink * 0.88;
    });

    renderer.render(scene, camera);
}

animate();
