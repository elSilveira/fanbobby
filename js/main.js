// JavaScript para o site de fã clube do Bobbyzera

// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Animação de elementos ao scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar elementos visíveis ao carregar a página
    checkFade();
    
    // Verificar elementos visíveis ao rolar a página
    window.addEventListener('scroll', checkFade);
    
    // Countdown para próxima live
    function updateCountdown() {
        // Horário da próxima live (17h de segunda a sexta)
        const now = new Date();
        let nextStream = new Date();
        
        // Definir para 17h
        nextStream.setHours(17, 0, 0, 0);
        
        // Se já passou das 17h hoje, ajustar para o próximo dia
        if (now.getHours() >= 17) {
            nextStream.setDate(nextStream.getDate() + 1);
        }
        
        // Se for fim de semana, ajustar para segunda-feira
        const dayOfWeek = nextStream.getDay(); // 0 = Domingo, 6 = Sábado
        if (dayOfWeek === 0) { // Domingo
            nextStream.setDate(nextStream.getDate() + 1); // Próxima segunda
        } else if (dayOfWeek === 6) { // Sábado
            nextStream.setDate(nextStream.getDate() + 2); // Próxima segunda
        }
        
        // Calcular diferença de tempo
        const diff = nextStream - now;
        
        // Converter para dias, horas, minutos e segundos
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Atualizar elementos HTML
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours;
        if (minutesElement) minutesElement.textContent = minutes;
        if (secondsElement) secondsElement.textContent = seconds;
    }
    
    // Atualizar countdown a cada segundo
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Filtros da galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe active ao botão clicado
                button.classList.add('active');
                
                // Filtrar itens da galeria
                const filter = button.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // Toggle active class para a pergunta
                question.classList.toggle('active');
                
                // Toggle active class para a resposta
                const answer = question.nextElementSibling;
                answer.classList.toggle('active');
            });
        });
    }
});
