// Funções JavaScript para o site de fã clube do Bobbyzera

// Toggle do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Anima os spans do botão de menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                
                // Reseta a animação do botão de menu
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
    
    // Adiciona classe 'active' ao link da página atual
    const currentLocation = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
    
    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de fade-in para elementos ao scrollar
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Verifica elementos ao carregar a página
    checkFade();
    
    // Verifica elementos ao scrollar
    window.addEventListener('scroll', checkFade);
});

// Galeria de imagens com lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const img = document.createElement('img');
            img.setAttribute('src', imgSrc);
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('lightbox-close');
            closeBtn.innerHTML = '&times;';
            
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            // Impede o scroll da página quando o lightbox está aberto
            document.body.style.overflow = 'hidden';
            
            // Fecha o lightbox ao clicar no botão de fechar ou fora da imagem
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === closeBtn) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
}

// Contador para próxima stream (exemplo)
function initStreamCountdown() {
    const countdownElement = document.getElementById('stream-countdown');
    
    if (countdownElement) {
        // Data da próxima stream (exemplo: próxima segunda-feira às 17h)
        const now = new Date();
        let nextStream = new Date();
        
        // Define para a próxima segunda-feira
        nextStream.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
        nextStream.setHours(17, 0, 0, 0);
        
        // Se já passou da hora hoje, adiciona 7 dias
        if (now > nextStream) {
            nextStream.setDate(nextStream.getDate() + 7);
        }
        
        function updateCountdown() {
            const now = new Date();
            const diff = nextStream - now;
            
            if (diff <= 0) {
                countdownElement.innerHTML = '<span class="live-now">AO VIVO AGORA!</span>';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Dias</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutos</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Segundos</span>
                </div>
            `;
        }
        
        // Atualiza a cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// Inicializa todas as funções quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initStreamCountdown();
});
