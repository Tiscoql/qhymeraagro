// ==========================================
// 1. CARRUSEL DE IMÁGENES
// ==========================================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let slideInterval;

function showSlide(index) {
    if (!slides.length) return; // Evita errores si no existe el carrusel en la página

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });

    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

function nextSlide() { showSlide(currentIndex + 1); }
function prevSlide() { showSlide(currentIndex - 1); }

function startAutoPlay() { 
    if (slides.length) slideInterval = setInterval(nextSlide, 4000); 
}
function stopAutoPlay() { clearInterval(slideInterval); }

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });
    prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay();
    });
});

startAutoPlay();

// ==========================================
// 2. FILTRADO Y MODAL DE COTIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // --- FILTRADO DE PRODUCTOS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-item-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- MODAL DE COTIZACIÓN ---
    const quoteModal = document.getElementById('quoteModal');
    const closeModal = document.getElementById('closeModal');
    const modalProductName = document.getElementById('modalProductName');
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    const btnEmail = document.getElementById('btnEmail');

    // Escuchar clic en los botones de "Cotizar" dentro de las tarjetas de producto
    const productBtns = document.querySelectorAll('.product-item-card .product-btn');

    productBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Si el botón ya tiene un enlace externo configurado (por ejemplo WhatsApp directo), deja que navegue normalmente
            if (btn.getAttribute('href').startsWith('http')) {
                return;
            }

            e.preventDefault(); // Previene la navegación por defecto (#contacto)

            // Obtener el título del producto dentro de la misma tarjeta
            const card = btn.closest('.product-item-card');
            const titleEl = card ? card.querySelector('.product-title') : null;
            const productName = titleEl ? titleEl.textContent.trim() : 'Producto';

            // Actualizar texto del modal
            if (modalProductName) {
                modalProductName.textContent = productName;
            }

            // Configurar enlace de WhatsApp
            const phone = '+56982516697';
            const message = encodeURIComponent(`Hola, me gustaría cotizar el producto: ${productName}`);
            if (btnWhatsapp) {
                btnWhatsapp.href = `https://wa.me/${phone}?text=${message}`;
            }

            // Configurar enlace de Correo
            if (btnEmail) {
                btnEmail.href = `#contacto`;
                btnEmail.onclick = () => {
                    if (quoteModal) quoteModal.classList.remove('active');
                    // Pre-llenar el asunto o mensaje si el textarea existe
                    const mensajeArea = document.getElementById('mensaje');
                    if (mensajeArea) {
                        mensajeArea.value = `Hola, deseo cotizar el producto: ${productName}`;
                    }
                };
            }

            // Mostrar el modal
            if (quoteModal) {
                quoteModal.classList.add('active');
            }
        });
    });

    // Cerrar modal con el botón 'X'
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            quoteModal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer clic fuera del contenido
    if (quoteModal) {
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('active');
            }
        });
    }
});
