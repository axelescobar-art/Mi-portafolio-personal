document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ RESPONSIVE (TOGGLE EN MÓVILES)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en cualquier enlace
        document.querySelectorAll('.nav-menu a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. PANEL INTERACTIVO DE HABILIDADES
    const tarjetasHabilidades = document.querySelectorAll('.tarjeta-habilidad');
    const panelInfo = document.getElementById('infoHabilidad');

    tarjetasHabilidades.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            // Remover clase activa de todas las demás tarjetas
            tarjetasHabilidades.forEach(t => t.classList.remove('activa'));
            
            // Activar la tarjeta seleccionada
            tarjeta.classList.add('activa');

            // Obtener información del atributo data-info y colocarla en el panel
            const info = tarjeta.getAttribute('data-info');
            if (panelInfo && info) {
                panelInfo.innerHTML = `<p>${info}</p>`;
            }
        });
    });

<<<<<<< HEAD
    // --- LLUVIA Y SALPICONES (CIUDAD DE LAS LÁGRIMAS - FIDELIDAD AL LORE) ---
=======
    // 3. EFECTO DE LLUVIA / PARTÍCULAS (CIUDAD DE LAS LÁGRIMAS)
>>>>>>> e098b316eb2ac96cd234b2570b57ac5e03f4d33d
    const canvas = document.getElementById('bg-particulas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function ajustarTamanoCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        ajustarTamanoCanvas();
        window.addEventListener('resize', ajustarTamanoCanvas);

<<<<<<< HEAD
        const cantidadGotas = 100;
        const gotas = [];
        let ondas = [];
=======
        // Crear gotas de lluvia
        const cantidadGotas = 80;
        const gotas = [];
>>>>>>> e098b316eb2ac96cd234b2570b57ac5e03f4d33d

        // Inicialización de gotas (filtración directa del Lago Azul: rápidas y 100% verticales)
        for (let i = 0; i < cantidadGotas; i++) {
            gotas.push({
<<<<<<< HEAD
                x: Math.random() * width,
                y: Math.random() * height,
                largo: Math.random() * 20 + 25,       // Gotas finas y esbeltas
                velocidadY: Math.random() * 14 + 20,  // Caída rápida por gravedad constante (20 - 34 px/f)
                velocidadX: 0,                         // 0 = Caída completamente vertical sin viento
                opacidad: Math.random() * 0.45 + 0.25,
                color: Math.random() > 0.3 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
            });
        }

        function animarCiudadDeLasLagrimas() {
            ctx.clearRect(0, 0, width, height);

            // Dibujar lluvia recta hacia abajo
            gotas.forEach(g => {
                g.y += g.velocidadY;
=======
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                longitud: Math.random() * 18 + 10,
                velocidad: Math.random() * 4 + 4,
                opacidad: Math.random() * 0.4 + 0.1
            });
        }

        // Bucle de animación
        function animarLluvia() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
>>>>>>> e098b316eb2ac96cd234b2570b57ac5e03f4d33d

            gotas.forEach(gota => {
                ctx.beginPath();
<<<<<<< HEAD
                ctx.moveTo(g.x, g.y);
                ctx.lineTo(g.x, g.y + g.largo); // Trazo vertical perfecto
                ctx.strokeStyle = g.color + g.opacidad + ')';
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Generar impacto al colisionar con el suelo
                if (g.y > height) {
                    ondas.push({
                        x: g.x,
                        y: height - 4,
                        radio: 1,
                        maxRadio: Math.random() * 6 + 4,
                        opacidad: 0.5,
                        color: g.color
                    });

                    g.y = -g.largo;
                    g.x = Math.random() * width;
                }
            });

            // Dibujar salpicones/ondas en el suelo optimizando rendimiento
            ondas = ondas.filter(o => {
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.radio, 0, Math.PI * 2);
                ctx.strokeStyle = o.color + o.opacidad + ')';
                ctx.lineWidth = 0.8;
                ctx.stroke();

                o.radio += 0.5;
                o.opacidad -= 0.04;

                return o.opacidad > 0 && o.radio < o.maxRadio;
            });

            requestAnimationFrame(animarCiudadDeLasLagrimas);
=======
                ctx.moveTo(gota.x, gota.y);
                ctx.lineTo(gota.x - 1, gota.y + gota.longitud); // Ligera inclinación en la caída
                ctx.strokeStyle = `rgba(56, 189, 248, ${gota.opacidad})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Actualizar posición Y
                gota.y += gota.velocidad;

                // Reiniciar gota al salir de la pantalla
                if (gota.y > canvas.height) {
                    gota.y = -gota.longitud;
                    gota.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(animarLluvia);
>>>>>>> e098b316eb2ac96cd234b2570b57ac5e03f4d33d
        }

        animarLluvia();
    }
});