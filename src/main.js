import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); 

const width = 297; 
const height = 210; 
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1, 1000);
camera.position.set(width/2,height/2,150);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createDoubleBoundary() {
    const margin = 5;
    const points = [];
    
    const outerPoints = [
        new THREE.Vector3(-margin,-margin,0),
        new THREE.Vector3(width+margin,-margin,0),
        new THREE.Vector3(width + margin, height + margin, 0),
        new THREE.Vector3(-margin, height + margin, 0),
        new THREE.Vector3(-margin,-margin,0)
    ];
    const innerPoints = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(width,0,0),
        new THREE.Vector3(width,height,0),
        new THREE.Vector3(0,height,0),
        new THREE.Vector3(0,0,0)
    ];


    const material = new THREE.LineBasicMaterial({ color: '#000000'});

    const outerGeom = new THREE.BufferGeometry().setFromPoints(outerPoints);
    scene.add(new THREE.Line(outerGeom, material));

    const innerGeom = new THREE.BufferGeometry().setFromPoints(innerPoints);
    scene.add(new THREE.Line(innerGeom, material));
}

createDoubleBoundary();

function createPropertyBox() {
    const panelWidth = 70;
    const panelX = width - panelWidth;
    const points = [];
    points.push(
        new THREE.Vector3(panelX,0,0),
        new THREE.Vector3(panelX,height,0)
    );

    const divisions = 10;
    const rowHeight = height / divisions;
    const mid = panelX + panelWidth/2;
    const rightMid = mid + panelWidth/4;

    points.push(
        new THREE.Vector3(panelX,rowHeight,0),
        new THREE.Vector3(width,rowHeight,0),

        new THREE.Vector3(panelX,2*rowHeight,0),
        new THREE.Vector3(mid,2*rowHeight,0),
        
        new THREE.Vector3(panelX,3*rowHeight,0),
        new THREE.Vector3(mid,3*rowHeight,0),
        
        new THREE.Vector3(panelX,4*rowHeight,0),
        new THREE.Vector3(width,4*rowHeight,0),
        
        new THREE.Vector3(panelX,5*rowHeight,0),
        new THREE.Vector3(mid,5*rowHeight,0),
        
        new THREE.Vector3(mid,5*rowHeight,0),
        new THREE.Vector3(mid,0,0),
        
        new THREE.Vector3(rightMid,4*rowHeight,0),
        new THREE.Vector3(rightMid,rowHeight,0),

        new THREE.Vector3(panelX,6*rowHeight,0),
        new THREE.Vector3(width,6*rowHeight,0),

        new THREE.Vector3(panelX,7*rowHeight,0),
        new THREE.Vector3(width,7*rowHeight,0),

        new THREE.Vector3(panelX,8*rowHeight,0),
        new THREE.Vector3(width,8*rowHeight,0),

        new THREE.Vector3(panelX,9*rowHeight,0),
        new THREE.Vector3(width,9*rowHeight,0),
        
        new THREE.Vector3(mid,9*rowHeight,0),
        new THREE.Vector3(mid,8*rowHeight,0),

        new THREE.Vector3(rightMid,3*rowHeight,0),
        new THREE.Vector3(width,3*rowHeight,0),

    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color: '#000000'});
    const propertyBox = new THREE.LineSegments(geometry,material);
    scene.add(propertyBox);
}

createPropertyBox();

function createShapeBox(){
    const boxWidth = width - 70 -3;
    const boxHeight = 40;
    const points = [];
    points.push(
        new THREE.Vector3(3,3,0),
        new THREE.Vector3(boxWidth,3,0),

        new THREE.Vector3(3,boxHeight,0),
        new THREE.Vector3(boxWidth,boxHeight,0),

        new THREE.Vector3(3,3,0),
        new THREE.Vector3(3,boxHeight,0),

        new THREE.Vector3(boxWidth,3,0),
        new THREE.Vector3(boxWidth,boxHeight,0),
    );

    const slots = 5;
    const slotStep = boxWidth/slots;

    points.push(
        new THREE.Vector3(slotStep,3,0),
        new THREE.Vector3(slotStep,boxHeight,0),

        new THREE.Vector3(2*slotStep,3,0),
        new THREE.Vector3(2*slotStep,boxHeight,0),

        new THREE.Vector3(3*slotStep,3,0),
        new THREE.Vector3(3*slotStep,boxHeight,0),

        new THREE.Vector3(4*slotStep,3,0),
        new THREE.Vector3(4*slotStep,boxHeight,0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color: '#000000'});
    const shapeBox = new THREE.LineSegments(geometry,material);
    scene.add(shapeBox);
}

createShapeBox();

function createPDBox(){
    const boxW = 50;
    const boxH = 40;

    const x = 3;
    const y = height - boxH - 3;
    const radius = 5;
    const material = new THREE.LineBasicMaterial({color: '#000000'});

    const shape = new THREE.Shape();
    shape.moveTo(x+radius,y);
    shape.lineTo(x+boxW-radius,y);
    shape.absarc(x+boxW-radius,y+radius,radius,(3*Math.PI)/2,0,false);
    shape.lineTo(x+boxW,y+boxH-radius);
    shape.absarc(x+boxW-radius,y+boxH-radius,radius,0,Math.PI/2,false);
    shape.lineTo(x+radius,y+boxH);
    shape.absarc(x+radius,y+boxH-radius,radius,Math.PI/2,Math.PI,false);
    shape.lineTo(x,y+radius);
    shape.absarc(x+radius,y+radius,radius,Math.PI,(3*Math.PI)/2,false);

    const shapePoints = shape.getPoints(20);
    const frameGeom = new THREE.BufferGeometry().setFromPoints(shapePoints);
    scene.add(new THREE.Line(frameGeom,material));

    const points = [];
    const rowH = boxH/4;
    points.push(
        new THREE.Vector3(x,y+rowH,0),
        new THREE.Vector3(x+boxW,y+rowH,0),

        new THREE.Vector3(x,y+2*rowH,0),
        new THREE.Vector3(x+boxW,y+2*rowH,0),

        new THREE.Vector3(x,y+3*rowH,0),
        new THREE.Vector3(x+boxW,y+3*rowH,0),

        new THREE.Vector3(x+boxW/2,y,0),
        new THREE.Vector3(x+boxW/2,y+rowH,0),

        new THREE.Vector3(x+boxW/4,y+2*rowH,0),
        new THREE.Vector3(x+boxW/4,y+3*rowH,0),

        new THREE.Vector3(x+3*boxW/4,y+2*rowH,0),
        new THREE.Vector3(x+3*boxW/4,y+3*rowH,0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.LineSegments(geometry,material));
}

createPDBox();

function addHexagon(centerX, centerY, size) {
    const points = [];
    for (let i = 0; i <= 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        points.push(new THREE.Vector3(
            centerX + Math.cos(angle) * size,
            centerY + Math.sin(angle) * size,
            0
        ));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#000000' })));
}



window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();