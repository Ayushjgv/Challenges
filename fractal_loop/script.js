const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const rotatefactor1=document.getElementById('rotatefactor1');
const rotatefactor2=document.getElementById('rotatefactor2');
const thickness=document.getElementById('thickness');
const depthh=document.getElementById('depth');
const rf1val=document.getElementById('rf1val');
const rf2val=document.getElementById('rf2val');
const thickval=document.getElementById('thickval');
const depthval=document.getElementById('depthval');
const speedfactor=document.getElementById('speed');
const speedval=document.getElementById('speedval');



let maxdepth=0;
let totaldepth=Number(depthh.value);
let rotateFactor1=Number(rotatefactor1.value);
let rotateFactor2=Number(rotatefactor2.value);
let width=Number(thickness.value);
let widthFactor=0.9;
let speed=10;


rf1val.textContent = rotateFactor1;
rf2val.textContent = rotateFactor2;
thickval.textContent = width;
depthval.textContent = totaldepth;
speedval.textContent=speed;

rotatefactor1.addEventListener('input', updateValues);
rotatefactor2.addEventListener('input', updateValues);
thickness.addEventListener('input', updateValues);
depthh.addEventListener('input', updateValues);
speedfactor.addEventListener('input',updateValues);


function updateValues() {
    rotateFactor1 = Number(rotatefactor1.value);
    rotateFactor2 = Number(rotatefactor2.value);
    width = Number(thickness.value);
    totaldepth = Number(depthh.value);
    speed=Number(speedfactor.value)

    rf1val.textContent = rotateFactor1;
    rf2val.textContent = rotateFactor2;
    thickval.textContent = width;
    depthval.textContent = totaldepth;
    speedval.textContent=speed;


    maxdepth = 0;
    animate();
}


function draw(startX,startY,width,length,rotate,depth,factor){
    if(depth>maxdepth) return;
    ctx.save();
    ctx.lineWidth=width;
    ctx.fillStyle='white';
    ctx.strokeStyle='white';
    ctx.translate(startX,startY);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.rotate(rotate*Math.PI/180);
    //drawing line
    ctx.lineTo(0,-length);
    //drawing curve
    // for (let y = 0; y <= length; y++) {
    //     let x = Math.sin(y * 0.5) * (10-factor - depth);
    //     ctx.lineTo(x, -y);
    // }
    ctx.stroke();
    ctx.shadowBlur=15;
    ctx.shadowColor="rgba(0, 0, 0, 1)"
    draw(0,-length,width*0.8,length*0.8,rotate+rotateFactor1,depth+1,factor*0.5);
    draw(0,-length,width*0.8,length*0.8,rotate+rotateFactor2,depth+1,factor*0.5);
    ctx.restore();
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(500,500,width,100,0,0,10);
    if(maxdepth<totaldepth){
        maxdepth+=speed/100;
        requestAnimationFrame(animate);
    }
}
animate();


