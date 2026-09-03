// ===== CHANGED: FIRST MOUSE NODE =====

const canvas = document.getElementById("data-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("mousemove", (event) => {

    const x = event.clientX;
    const y = event.clientY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.arc(x, y, 5, 0, Math.PI * 2);

    ctx.fill();
});