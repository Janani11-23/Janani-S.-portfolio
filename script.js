const canvas=document.getElementById('bg-canvas');
if(canvas){const ctx=canvas.getContext('2d');const mob=innerWidth<720;let parts=[];let mx=-999,my=-999;function resize(){canvas.width=innerWidth;canvas.height=innerHeight}resize();addEventListener('resize',()=>{resize();init()});if(matchMedia('(pointer:fine)').matches)document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});const cols=['rgba(155,93,229,','rgba(205,180,255,','rgba(139,60,220,'];class Particle{constructor(){this.reset(true)}reset(init=false){this.x=Math.random()*canvas.width;this.y=init?Math.random()*canvas.height:-10;this.s=Math.random()*1.8+.4;this.v=Math.random()*.45+.12;this.op=Math.random()*.4+.08;this.dx=(Math.random()-.5)*.25}update(){this.x+=this.dx;this.y+=this.v;if(this.y>canvas.height+10)this.reset();if(matchMedia('(pointer:fine)').matches){let dx=this.x-mx,dy=this.y-my,d=Math.hypot(dx,dy);if(d<100&&d>0){this.x+=dx/d*(100-d)*.02;this.y+=dy/d*(100-d)*.02}}}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,Math.PI*2);ctx.fillStyle=cols[(Math.random()*cols.length)|0]+this.op+')';ctx.fill()}}function init(){parts=[];for(let i=0;i<(mob?45:85);i++)parts.push(new Particle)}init();function loop(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let i=0;i<parts.length;i++){parts[i].update();parts[i].draw();if(!mob)for(let j=i+1;j<parts.length;j++){let a=parts[i],b=parts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<78){ctx.strokeStyle='rgba(155,93,229,.045)';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}requestAnimationFrame(loop)}loop()}
const nav=document.getElementById('navbar');if(nav)addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>50));const ham=document.getElementById('hamburger'),links=document.getElementById('navLinks');if(ham)ham.addEventListener('click',()=>{links.classList.toggle('open');ham.classList.toggle('open')});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');ham.classList.remove('open')}));


// Native page scrolling is intentionally preserved; section links navigate only when clicked.

// Smooth wheel navigation between portfolio sections while keeping normal scrolling inside each page.
(() => {
  const order = ['index.html', 'about.html', 'skills.html', 'projects.html', 'certifications.html', 'contact.html'];
  const currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const currentIndex = Math.max(0, order.indexOf(currentFile));
  let moving = false;
  let lastWheel = 0;
  document.body.style.transition = 'opacity 260ms ease';
  function moveTo(index) {
    if (moving || index < 0 || index >= order.length) return;
    moving = true;
    document.body.style.opacity = '0.25';
    setTimeout(() => { location.href = order[index]; }, 220);
  }
  window.addEventListener('wheel', (event) => {
    if (moving || Math.abs(event.deltaY) < 8) return;
    const now = Date.now();
    if (now - lastWheel < 650) return;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const atTop = window.scrollY <= 2;
    if (event.deltaY > 0 && atBottom && currentIndex < order.length - 1) {
      lastWheel = now;
      moveTo(currentIndex + 1);
    } else if (event.deltaY < 0 && atTop && currentIndex > 0) {
      lastWheel = now;
      moveTo(currentIndex - 1);
    }
  }, { passive: true });
})();
