const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
const raindropCountSlider = document.getElementById('raindrop-count');
const countValue = document.getElementById('count-value');
let raindrops = [];
let animationId;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Raindrop {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 5 + 2;
        this.thickness = Math.random() * 1.5 + 0.5;
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = `rgba(174, 194, 224, ${Math.random() * 0.5 + 0.5})`;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
    }
}

function createRaindrops(count) {
    raindrops = [];
    for (let i = 0; i < count; i++) {
        raindrops.push(new Raindrop());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raindrops.forEach(raindrop => {
        raindrop.update();
        raindrop.draw();
    });
    animationId = requestAnimationFrame(animate);
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createRaindrops(raindropCountSlider.value);
}

raindropCountSlider.addEventListener('input', (e) => {
    const count = e.target.value;
    countValue.textContent = count;
    createRaindrops(count);
});

window.addEventListener('resize', handleResize);

createRaindrops(500);
animate();