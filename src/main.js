import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const height = 210;
const width = Math.SQRT2 * height;
const panelWidth = width * 0.35; // reused from propertybox
const boxHeight = height * 0.2; // reused from shapebox
const pdBoxW = width * 0.2; // reused from PDBox
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(width / 2, height / 2, 150);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createDoubleBoundary() {
    const margin = 5;
    const points = [];

    const outerPoints = [
        new THREE.Vector3(-margin, -margin, 0),
        new THREE.Vector3(width + margin, -margin, 0),
        new THREE.Vector3(width + margin, height + margin, 0),
        new THREE.Vector3(-margin, height + margin, 0),
        new THREE.Vector3(-margin, -margin, 0)
    ];
    const innerPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(width, 0, 0),
        new THREE.Vector3(width, height, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(0, 0, 0)
    ];


    const material = new THREE.LineBasicMaterial({ color: '#000000' });

    const outerGeom = new THREE.BufferGeometry().setFromPoints(outerPoints);
    scene.add(new THREE.Line(outerGeom, material));

    const innerGeom = new THREE.BufferGeometry().setFromPoints(innerPoints);
    scene.add(new THREE.Line(innerGeom, material));
}

createDoubleBoundary();

function createPropertyBox() {
    const panelWidth = width * 0.35;
    const panelX = width - panelWidth;
    const points = [];
    points.push(
        new THREE.Vector3(panelX, 0, 0),
        new THREE.Vector3(panelX, height, 0)
    );

    const divisions = 10;
    const rowHeight = height / divisions;
    const mid = panelX + panelWidth / 2;
    const rightMid = mid + panelWidth / 4;

    points.push(
        new THREE.Vector3(panelX, rowHeight, 0),
        new THREE.Vector3(width, rowHeight, 0),

        new THREE.Vector3(panelX, 2 * rowHeight - rowHeight / 4, 0),
        new THREE.Vector3(mid, 2 * rowHeight - rowHeight / 4, 0),

        new THREE.Vector3(panelX, 3 * rowHeight - rowHeight / 2, 0),
        new THREE.Vector3(mid, 3 * rowHeight - rowHeight / 2, 0),

        new THREE.Vector3(panelX, 4 * rowHeight, 0),
        new THREE.Vector3(width, 4 * rowHeight, 0),

        new THREE.Vector3(panelX, 5 * rowHeight, 0),
        new THREE.Vector3(mid, 5 * rowHeight, 0),

        new THREE.Vector3(mid, 5 * rowHeight, 0),
        new THREE.Vector3(mid, 0, 0),

        new THREE.Vector3(rightMid, 4 * rowHeight, 0),
        new THREE.Vector3(rightMid, rowHeight, 0),

        new THREE.Vector3(panelX, 6 * rowHeight, 0),
        new THREE.Vector3(width, 6 * rowHeight, 0),

        new THREE.Vector3(panelX, 7 * rowHeight, 0),
        new THREE.Vector3(width, 7 * rowHeight, 0),

        new THREE.Vector3(panelX, 8 * rowHeight, 0),
        new THREE.Vector3(width, 8 * rowHeight, 0),

        new THREE.Vector3(panelX, 9 * rowHeight, 0),
        new THREE.Vector3(width, 9 * rowHeight, 0),

        new THREE.Vector3(mid, 9 * rowHeight, 0),
        new THREE.Vector3(mid, 8 * rowHeight, 0),

        new THREE.Vector3(rightMid, 3 * rowHeight - rowHeight / 2, 0),
        new THREE.Vector3(width, 3 * rowHeight - rowHeight / 2, 0),

    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const propertyBox = new THREE.LineSegments(geometry, material);
    scene.add(propertyBox);
}

createPropertyBox();

function createPDBox() {
    const boxW = width * 0.2;
    const boxH = height * 0.25;

    const x = 3;
    const y = height - boxH - 3;
    const radius = 5;
    const material = new THREE.LineBasicMaterial({ color: '#000000' });

    const pdBoxShape = new THREE.Shape();
    pdBoxShape.moveTo(x + radius, y);
    pdBoxShape.lineTo(x + boxW - radius, y);
    pdBoxShape.absarc(x + boxW - radius, y + radius, radius, (3 * Math.PI) / 2, 0, false);
    pdBoxShape.lineTo(x + boxW, y + boxH - radius);
    pdBoxShape.absarc(x + boxW - radius, y + boxH - radius, radius, 0, Math.PI / 2, false);
    pdBoxShape.lineTo(x + radius, y + boxH);
    pdBoxShape.absarc(x + radius, y + boxH - radius, radius, Math.PI / 2, Math.PI, false);
    pdBoxShape.lineTo(x, y + radius);
    pdBoxShape.absarc(x + radius, y + radius, radius, Math.PI, (3 * Math.PI) / 2, false);

    const shapePoints = pdBoxShape.getPoints(20);
    const frameGeom = new THREE.BufferGeometry().setFromPoints(shapePoints);
    scene.add(new THREE.Line(frameGeom, material));

    const points = [];
    const rowH = boxH / 4;
    points.push(
        new THREE.Vector3(x, y + rowH, 0),
        new THREE.Vector3(x + boxW, y + rowH, 0),

        new THREE.Vector3(x, y + 2 * rowH, 0),
        new THREE.Vector3(x + boxW, y + 2 * rowH, 0),

        new THREE.Vector3(x, y + 3 * rowH, 0),
        new THREE.Vector3(x + boxW, y + 3 * rowH, 0),

        new THREE.Vector3(x + boxW / 2, y, 0),
        new THREE.Vector3(x + boxW / 2, y + rowH, 0),

        new THREE.Vector3(x + boxW / 4, y + 2 * rowH, 0),
        new THREE.Vector3(x + boxW / 4, y + 3 * rowH, 0),

        new THREE.Vector3(x + 3 * boxW / 4, y + 2 * rowH, 0),
        new THREE.Vector3(x + 3 * boxW / 4, y + 3 * rowH, 0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.LineSegments(geometry, material));
}

createPDBox();

function createShapeBox() {
    const boxWidth = width - width * 0.35;
    const boxHeight = height * 0.2;
    const points = [];
    const startX = 0;
    const startY = 0;
    points.push(
        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(boxWidth, startY, 0),

        new THREE.Vector3(startX, boxHeight, 0),
        new THREE.Vector3(boxWidth, boxHeight, 0),

        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(startX, boxHeight, 0),

        new THREE.Vector3(boxWidth, startY, 0),
        new THREE.Vector3(boxWidth, boxHeight, 0),
    );

    const slots = 5;
    const slotStep = boxWidth / slots;

    points.push(
        new THREE.Vector3(slotStep, startY, 0),
        new THREE.Vector3(slotStep, boxHeight, 0),

        new THREE.Vector3(2 * slotStep, startY, 0),
        new THREE.Vector3(2 * slotStep, boxHeight, 0),

        new THREE.Vector3(3 * slotStep, startY, 0),
        new THREE.Vector3(3 * slotStep, boxHeight, 0),

        new THREE.Vector3(4 * slotStep, startY, 0),
        new THREE.Vector3(4 * slotStep, boxHeight, 0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const shapeBox = new THREE.LineSegments(geometry, material);
    scene.add(shapeBox);

    const centerY = startY + (boxHeight - startY) / 2;
    addHexagon(slotStep * 0.5, centerY, boxHeight / 2 - 4);
    addStar(slotStep * 1.5, centerY, boxHeight / 2 - 4, (boxHeight / 2 - 4) / 1.75);
    addArrow(slotStep * 2.5, centerY, boxHeight);
    addLeftArrow(slotStep * 3.5, centerY, boxHeight);
    addRightArrow(slotStep * 4.5, centerY, boxHeight);

}

createShapeBox();


function addHexagon(centerX, centerY, radius) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = i * (2 * Math.PI) / 6;
        points.push(
            // new THREE.Vector3(centerX+radius*Math.cos(angle),centerY+radius*Math.sin(angle),0)
            new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)
        );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const hex = new THREE.LineLoop(geometry, material);
    hex.position.set(centerX, centerY, 0);
    hex.rotation.z = Math.PI / 6;
    scene.add(hex);
}

function addStar(centerX, centerY, outerR, innerR) {
    const points = [];
    for (let i = 0; i < 12; i++) {
        const angle = i * (2 * Math.PI) / 12;
        const radius = (i % 2 === 0) ? outerR : innerR;
        points.push(
            new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)
        );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const star = new THREE.LineLoop(geometry, material);
    star.position.set(centerX, centerY, 0);
    star.rotation.z = Math.PI / 6;
    scene.add(star);
}

function addArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight * 0.7;
    const headSize = arrowHeight * 0.2;

    const topY = centerY + (0.5 * arrowHeight);
    const bottomY = centerY - (0.5 * arrowHeight)
    const points = [];
    points.push(
        new THREE.Vector3(centerX, bottomY, 0),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX - headSize, centerY + headSize),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX + headSize, centerY + headSize)
    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const arrow = new THREE.Line(geometry, material);
    scene.add(arrow);
}

function addRightArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight / 3;
    const arrowWidth = boxHeight * 0.7;
    const points = [];
    points.push(
        new THREE.Vector3(centerX - arrowWidth / 2, centerY + arrowHeight * 0.5, 0),
        new THREE.Vector3(centerX - arrowWidth / 2, centerY - arrowHeight * 0.5, 0),
        new THREE.Vector3((centerX - arrowWidth / 2) + arrowWidth * 0.6, centerY - arrowHeight * 0.5, 0),
        new THREE.Vector3((centerX - arrowWidth / 2) + arrowWidth * 0.6, (centerY - arrowHeight * 0.5) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(centerX + arrowWidth / 2, centerY, 0),
        new THREE.Vector3(centerX + arrowWidth / 2, centerY, 0),
        new THREE.Vector3((centerX - arrowWidth / 2) + arrowWidth * 0.6, (centerY + arrowHeight * 0.5) + 0.5 * arrowHeight, 0),
        new THREE.Vector3(((centerX - arrowWidth / 2) + arrowWidth * 0.6), (centerY + arrowHeight) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(centerX - arrowWidth / 2, centerY + arrowHeight * 0.5, 0),

    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const arrow = new THREE.Line(geometry, material);
    scene.add(arrow);
}

function addLeftArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight / 3;
    const arrowWidth = boxHeight * 0.7;
    const points = [];
    points.push(
        new THREE.Vector3(- arrowWidth / 2, +arrowHeight * 0.5, 0),
        new THREE.Vector3(- arrowWidth / 2, -arrowHeight * 0.5, 0),
        new THREE.Vector3((- arrowWidth / 2) + arrowWidth * 0.6, -arrowHeight * 0.5, 0),
        new THREE.Vector3((- arrowWidth / 2) + arrowWidth * 0.6, (-arrowHeight * 0.5) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(+ arrowWidth / 2, 0, 0),
        new THREE.Vector3(+ arrowWidth / 2, 0, 0),
        new THREE.Vector3((- arrowWidth / 2) + arrowWidth * 0.6, (+arrowHeight * 0.5) + 0.5 * arrowHeight, 0),
        new THREE.Vector3(((- arrowWidth / 2) + arrowWidth * 0.6), (+arrowHeight) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(- arrowWidth / 2, +arrowHeight * 0.5, 0),

    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const arrow = new THREE.Line(geometry, material);
    arrow.position.set(centerX, centerY, 0);
    arrow.rotation.z = Math.PI;
    scene.add(arrow);
}

function addWindow(centerX = pdBoxW, centerY = boxHeight, windowWidth = 100, windowHeight = 100) {

    const points = [];

    const x = (width - panelWidth) / 2;
    const y = (height - boxHeight) / 2;

    const left = centerX + (x - windowWidth / 2);
    const right = centerX + (x + windowWidth / 2);

    const bottom = centerY + (y - windowHeight / 2);
    const top = centerY + (y + windowHeight / 2);

    points.push(
        new THREE.Vector3(left, bottom, 0),
        new THREE.Vector3(left, top, 0),

        new THREE.Vector3(left, top, 0),
        new THREE.Vector3(right, top, 0),

        new THREE.Vector3(right, top, 0),
        new THREE.Vector3(right, bottom, 0),

        new THREE.Vector3(right, bottom, 0),
        new THREE.Vector3(left, bottom, 0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: '#838383'
    });

    const windowShape = new THREE.LineSegments(geometry, material);

    scene.add(windowShape);
}
addWindow();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();