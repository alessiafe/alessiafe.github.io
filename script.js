// ===== CURSOR-GENERATED CONSTELLATION =====

const canvas = document.getElementById("data-canvas");
const ctx = canvas.getContext("2d");

let nodes = [];
let mouseX = 0;
let mouseY = 0;
let lastNodeTime = 0;


// ===== CANVAS =====

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// ===== MOUSE =====
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    const now = Date.now();
    if (now - lastNodeTime > 70) {
        nodes.push({ x: mouseX, y: mouseY, life: 1 });
        lastNodeTime = now;
    }
});


// ===== ANIMATION =====
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ===== MOUSE GLOW =====
    const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 35);
    glow.addColorStop(0, "rgba(80, 100, 110, 0.16)");
    glow.addColorStop(1, "rgba(80, 100, 110, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 35, 0, Math.PI * 2);
    ctx.fill();

    // ===== UPDATE NODES =====
    nodes.forEach((node) => {
        node.life -= 0.012;
    });

    nodes = nodes.filter((node) => node.life > 0);

    // ===== CONNECTIONS =====
    for (let i = 0; i < nodes.length - 1; i++) {
        const node = nodes[i];
        const nextNode = nodes[i + 1];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.strokeStyle = `rgba(60, 75, 85, ${node.life * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // ===== NODES =====
    nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40, 50, 55, ${node.life * 0.7})`;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();