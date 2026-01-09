const canvas =document.getElementById('canvas');
const ctx=canvas.getContext('2d');

function random(min,max){
    return Math.random()*(max-min)+min
}


async function draw(startX,startY,length,angle,branchWidth,hue,sat,light){
    ctx.lineWidth=branchWidth;
    ctx.beginPath();

    ctx.save();
    ctx.strokeStyle=`hsl(${random(hue-10,hue+10)},${sat}%,${light}%)`;
    ctx.fillStyle=`hsl(${hue},${sat}%,${light}%)`;

    ctx.translate(startX,startY);
    ctx.rotate((angle*Math.PI)/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-length);
    ctx.stroke();

    if(length<10){
        ctx.restore();
        return;
    }

    ctx.shadowBlur=15;
    ctx.shadowColor="rgba(0,0,0,0.4"

    draw(0,-length,length*0.8,angle-12.5,branchWidth*0.8,(hue+=2),100,(light+=1));
    draw(0,-length,length*0.8,angle+12.5,branchWidth*0.8,(hue+=2),100,(light+=1));
    ctx.restore();
}
draw(500,675,120,0,40,34,244,26);


