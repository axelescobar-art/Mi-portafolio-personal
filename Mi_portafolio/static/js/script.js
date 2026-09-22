document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. MENÚ RESPONSIVE (TOGGLE EN MÓVILES)
       =================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navMenu.classList.toggle('activo');
        });

        document.querySelectorAll('.nav-menu a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navMenu.classList.remove('activo');
            });
        });
    }

    /* ===================================================
       2. PANEL INTERACTIVO DE HABILIDADES
       =================================================== */
    const tarjetasHabilidades = document.querySelectorAll('.tarjeta-habilidad');
    const panelInfo = document.getElementById('infoHabilidad');

    if (tarjetasHabilidades.length > 0) {
        tarjetasHabilidades.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                tarjetasHabilidades.forEach(t => t.classList.remove('activa'));
                tarjeta.classList.add('activa');

                const info = tarjeta.getAttribute('data-info');
                if (panelInfo && info) {
                    panelInfo.innerHTML = `<p>${info}</p>`;
                }
            });
        });
    }

    /* ===================================================
       3. LLUVIA TORRENCIAL Y SALPICONES (ESTILO CIUDAD DE LAS LÁGRIMAS)
       =================================================== */
    const canvas = document.getElementById('bg-particulas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function ajustarTamanoCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        ajustarTamanoCanvas();
        window.addEventListener('resize', ajustarTamanoCanvas);

        // --- CONFIGURACIÓN DE LA LLUVIA ---
        const cantidadGotas = 130; // Un poco más densa para efecto de tormenta
        const gotas = [];
        let ondas = [];

        // Inclinación suave del viento (-1.5 px x cuadro para caída realista)
        const vientoX = -1.5; 

        for (let i = 0; i < cantidadGotas; i++) {
            // Generamos gotas con diferentes velocidades para crear profundidad (efecto 3D)
            const profundidad = Math.random(); 

            gotas.push({
                x: Math.random() * (canvas.width + 200), // Margen extra a la derecha para compensar inclinación
                y: Math.random() * canvas.height,
                largo: profundidad * 25 + 25,            // Trazo más largo por la alta velocidad (25px a 50px)
                velocidadY: profundidad * 25 + 35,       // CAÍDA RÁPIDA REALISTA: 35px a 60px por fotograma
                velocidadX: vientoX,
                grosor: profundidad * 1.2 + 0.6,         // Gotas más cercanas son más gruesas
                opacidad: profundidad * 0.4 + 0.15,
                color: Math.random() > 0.25 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
            });
        }

        // --- CONFIGURACIÓN DE PARTÍCULAS / ESPORAS DE LUZ ---
        const cantidadParticulas = Math.floor((canvas.width * canvas.height) / 30000);
        const particulas = [];

        for (let i = 0; i < cantidadParticulas; i++) {
            particulas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * 0.4 - 0.2,
                speedY: Math.random() * -0.4 - 0.1,
                opacity: Math.random() * 0.4 + 0.2
            });
        }

        // --- BUCLE DE ANIMACIÓN ---
        function animarAmbiente() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Dibujar Partículas de Luz Flotantes (Fondo)
            particulas.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }

                ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 2. Dibujar Gotas de Lluvia de Alta Velocidad
            gotas.forEach(g => {
                g.y += g.velocidadY;
                g.x += g.velocidadX;

                ctx.beginPath();
                ctx.moveTo(g.x, g.y);
                // Dibujamos la traza inclinada proporcional a su velocidad
                ctx.lineTo(g.x + g.velocidadX, g.y + g.largo); 
                ctx.strokeStyle = g.color + g.opacidad + ')';
                ctx.lineWidth = g.grosor;
                ctx.stroke();

                // Impacto en el suelo
                if (g.y > canvas.height) {
                    // Generar onda/salpicón sólo si la gota está en el plano frontal
                    if (g.grosor > 1.0) {
                        ondas.push({
                            x: g.x,
                            y: canvas.height - 3,
                            radio: 1,
                            maxRadio: Math.random() * 7 + 4,
                            opacidad: 0.6,
                            color: g.color
                        });
                    }

                    // Reiniciar la gota arriba
                    g.y = -g.largo;
                    g.x = Math.random() * (canvas.width + 200);
                }
            });

            // 3. Dibujar Salpicones u Ondas de Impacto
            ondas = ondas.filter(o => {
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.radio, 0, Math.PI * 2);
                ctx.strokeStyle = o.color + o.opacidad + ')';
                ctx.lineWidth = 0.8;
                ctx.stroke();

                o.radio += 0.8; // Expansión rápida del salpicón
                o.opacidad -= 0.05;

                return o.opacidad > 0 && o.radio < o.maxRadio;
            });

            requestAnimationFrame(animarAmbiente);
        }

        animarAmbiente();
    }

    /* ===================================================
       4. MANEJO DEL FORMULARIO DE CONTACTO
       =================================================== */
    const formulario = document.querySelector('.formulario-hk');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Axel te responderá pronto.');
            formulario.reset();
        });
    }
});