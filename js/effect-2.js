// Prendiamo il context e definiamo i parametri
var ctx = canvas.getContext("2d"),
    particleCount = 25,
    particles = [],
    particleRadius = 5,
    minDist = 100,
    velocity = 3,
    colors = [{
        r: 228,
        g: 69,
        b: 30
    }, {
        r: 89,
        g: 179,
        b: 157
    }, {
        r: 115,
        g: 187,
        b: 91
    }, {
        r: 248,
        g: 172,
        b: 19
    }, {
        r: 61,
        g: 67,
        b: 97
    }];

// Dobbiamo ridipingere ogni volta di nero il canvas per non lasciare la 'traccia'
function paintCanvas() {
        ctx.fillStyle = "rgb(0,0,0)", ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    // La nostra particella
function Particle() {
    this.x = Math.random() * window.innerWidth, this.y = Math.random() * window.innerHeight, this.vx = -1 + 2 * Math.random(), this.vy = -1 + 2 * Math.random(), this.radius = particleRadius;
    var color = colors[Math.floor(Math.random() * colors.length)];
    this.color = {
        r: color.r,
        g: color.g,
        b: color.b
    }, this.blur = Math.floor(-7 * Math.random() + 9) / 10, this.draw = function () {
        ctx.fillStyle = "white", ctx.beginPath(), ctx.arc(this.x, this.y, this.radius, 0, Math.PI * this.radius, !1), ctx.fillStyle = "rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")", ctx.fill()
    }
}

function draw() {
    paintCanvas();
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.draw();
    }
    update();
}

function update() {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx, p.y += p.vy, p.x > window.innerWidth + p.radius ? p.x = p.radius : p.x < 0 - p.radius && (p.x = window.innerWidth - p.radius), p.y > window.innerHeight + p.radius ? p.y = p.radius : p.y < 0 - p.radius && (p.y = window.innerHeight - p.radius);
            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                distance(p, p2);
            }
        }
    }
    // Uniamo le particelle vicine di colore diverso
function distance(p1, p2) {
        var dist, dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            dist = Math.sqrt(dx * dx + dy * dy);
        if (minDist >= dist) {
            if (JSON.stringify(p1.color) != JSON.stringify(p2.color)) {
                ctx.beginPath();
                var gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                gradient.addColorStop("0", "rgb(" + p1.color.r + ", " + p1.color.g + ", " + p1.color.b + ")"), gradient.addColorStop("1.0", "rgb(" + p2.color.r + ", " + p2.color.g + ", " + p2.color.b + ")"), ctx.strokeStyle = gradient, ctx.moveTo(p1.x, p1.y), ctx.lineTo(p2.x, p2.y), ctx.lineWidth = 2, ctx.stroke(), ctx.closePath()
            }
            var ax = dx / (1e3 * velocity),
                ay = dy / (1e3 * velocity);
            p1.vx -= ax, p1.vy -= ay, p2.vx += ax, p2.vy += ay
        }
    }
    // Loop dell'animazione
function animloop() {
    draw(), requestAnimFrame(animloop);
}

// Callback requestAnimFrame https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1e3 / 60);
        };
})(), window.innerWidth <= 320 && (particleCount = 5); // Su mobile mostriamo meno particelle
// Creiamo le particelle
for (var i = 0; particleCount > i; i++) {
    particles.push(new Particle);
}
// Diamo il via alle danze!
animloop();