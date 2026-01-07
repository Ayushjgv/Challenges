const canvas=document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const slider=document.getElementById('particles');
const maxdistance=document.getElementById('maxdistance');


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

// ctx.fillStyle='red';
ctx.strokeStyle='white';
ctx.lineWidth=1;

console.log(ctx);

// ctx.fillRect(50,50,100,200);

const gradient=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0,'white');
gradient.addColorStop(0.5,'purple');
gradient.addColorStop(1,'blue');
ctx.fillStyle=gradient;


slider.addEventListener('input',()=>{
    const value=Number(slider.value);

    effect.updateParticleCount(value);
});

maxdistance.addEventListener('input',()=>{
    const value=Number(maxdistance.value);
    effect.updateParticleLine(value);
});



class Particle {
    constructor(effect) {
        this.effect=effect;
        this.radius=Math.random()*20;
        this.x=this.radius+Math.random()*(this.effect.width -this.radius *2);
        this.y=this.radius +Math.random()*(this.effect.height-this.radius*2);
        this.vx=Math.random()*1-0.5;
        this.vy=Math.random()*1-0.5;
    }

    draw(context){
        // context.fillStyle='hsl('+this.x*0.5+',100%,50%)';
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI*2);
        context.fill();
        context.stroke();
    }

    update(){
        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x>this.effect.width -this.radius || this.x<this.radius) this.vx*=-1;
        if(this.y>this.effect.height -this.radius || this.y<this.radius) this.vy*=-1;
    }
}

class Effect{
    constructor(canvas){
        this.canvas=canvas;
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.particles=[];
        this.numberofparticles=slider.value;
        this.maxDistance=150;
        this.createParticles();
    }

    createParticles(){
        this.particles.length=0;
        for(let i=0;i<this.numberofparticles;i++){
            this.particles.push(new Particle(this));
        }
    }
    updateParticleCount(value) {
        this.numberofparticles = value;
        this.createParticles();
    }

    updateParticleLine(value){
        this.maxDistance=value;
    }

    handleParticles(context){
        this.connectParticles(context);
        this.particles.forEach(particles=>{
            particles.draw(context);
            particles.update();
        });
        // console.log(this.particles.length)
    }

    connectParticles(context){
        for(let i=0;i<this.particles.length;i++){
            for(let j=i;j<this.particles.length;j++){
                const dx = this.particles[i].x-this.particles[j].x;
                const dy = this.particles[i].y-this.particles[j].y;
                const dist=Math.hypot(dx,dy);
                if(dist<this.maxDistance){
                    context.save();
                    const opacity=1-(dist/this.maxDistance);
                    context.globalAlpha=opacity;
                    context.beginPath();
                    context.moveTo(this.particles[i].x,this.particles[i].y);
                    context.lineTo(this.particles[j].x,this.particles[j].y);
                    context.stroke();
                    context.restore();
                }
            }
        }

    }

}


const effect=new Effect(canvas);




function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();