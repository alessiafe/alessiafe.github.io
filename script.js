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
        nodes.push({
            x: mouseX,
            y: mouseY,
            life: 1,
            size: 1.5 + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15
        });

        lastNodeTime = now;
    }
});


// ===== ANIMATION =====

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // ===== MOUSE GLOW =====

    const glow = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 40
    );

    glow.addColorStop(0, "rgba(80, 100, 110, 0.18)");
    glow.addColorStop(1, "rgba(80, 100, 110, 0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
    ctx.fill();


    // ===== UPDATE NODES =====

    nodes.forEach((node) => {
        node.life -= 0.012;
        node.x += node.vx;
        node.y += node.vy;
    });

    nodes = nodes.filter((node) => node.life > 0);


    // ===== CONNECTIONS =====

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const a = nodes[i];
            const b = nodes[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {

                const opacity = Math.min(a.life, b.life) * 0.25;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);

                ctx.strokeStyle = `rgba(60, 75, 85, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }


    // ===== NODES =====

    nodes.forEach((node) => {

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(40, 50, 55, ${node.life * 0.65})`;
        ctx.fill();
    });


    requestAnimationFrame(animate);
}

animate();