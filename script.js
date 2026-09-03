// ===== MOUSE NODE =====

const canvas = document.getElementById("data-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("mousemove", (event) => {

    const x = event.clientX;
    const y = event.clientY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Soft glow

    const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, 35
    );

    gradient.addColorStop(0, "rgba(80, 100, 110, 0.18)");
    gradient.addColorStop(1, "rgba(80, 100, 110, 0)");

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(x, y, 35, 0, Math.PI * 2);

    ctx.fill();


    // Central node

    ctx.beginPath();

    ctx.arc(x, y, 4, 0, Math.PI * 2);

    ctx.fillStyle = "#151515";

    ctx.fill();

});