// Enhanced particle animation with connections
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 0.7 - 0.35;
    this.speedY = Math.random() * 0.7 - 0.35;
    this.opacity = Math.random() * 0.4 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += Math.random() * 0.02 - 0.01;

    if (this.opacity < 0.2) this.opacity = 0.2;
    if (this.opacity > 0.6) this.opacity = 0.6;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 120})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  connectParticles();
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Mouse interaction for particles
window.addEventListener('mousemove', e => {
  particles.forEach(particle => {
    const dx = e.clientX - particle.x;
    const dy = e.clientY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 120) {
      particle.x += dx * 0.03;
      particle.y += dy * 0.03;
    }
  });
});