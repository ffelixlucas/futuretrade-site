

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

navLink.forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
}))

/*=============== SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {  // Verifica se sectionsClass não é null
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        } else {
            console.warn(`Link de navegação não encontrado para a seção: ${sectionId}`);
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*============================ POP UP PAGAMENTO ==============================*/

// Função para o link de pagamento via Pix
function abrirPopuppix() {
    const url = 'https://mpago.la/1nkHoUd'; // Link do Pix
    const popup = window.open(url, '_blank', 'width=800,height=800');

    const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopupClosed);
            exibirMensagem();
        }
    }, 1000); // Verifica a cada segundo se o pop-up foi fechado
}

// Função para o link de pagamento via cartão de crédito
function abrirPopupcartao() {
    const url = 'https://mpago.la/2a4GBKM'; // Link do Cartão de crédito
    const popup = window.open(url, '_blank', 'width=800,height=800');

    const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopupClosed);
            exibirMensagem();
        }
    }, 1000); // Verifica a cada segundo se o pop-up foi fechado
}

// Função para exibir a mensagem após o pop-up ser fechado
function exibirMensagem() {
    const whatsappLink = "https://wa.me/5541988919440?text=Olá%2C%20acabei%20de%20realizar%20um%20pagamento.%20Aqui%20está%20meu%20comprovante!";
    
    const popupContent = `
        <div class="popup-overlay" id="popup-overlay">
            <div class="popup-container">
                <h2 class="popup-title">Realizou o pagamento?</h2>
                <p class="popup-text">Por favor, envie o comprovante de pagamento e seu nome completo para liberação do pedido:</p>
                <p class="popup-text">
                    <i class="ri-whatsapp-fill" style="color: #25D366;"></i> 
                    <a href="${whatsappLink}" target="_blank" class="popup-link">Clique aqui para enviar pelo WhatsApp</a>
                </p>
                <p class="popup-text">
                    <i class="ri-phone-fill" style="color: #028877;"></i> 
                    Número: <strong>(41) 98891-9440</strong>
                </p>
                <button class="popup-close" id="popup-close">Fechar</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupContent);

    document.getElementById('popup-close').addEventListener('click', function() {
        document.getElementById('popup-overlay').remove();
    });
}

// Seleciona todos os cards
const cards = document.querySelectorAll('.new__card');

// Para cada card, adiciona um evento de mouseover e mouseout
cards.forEach(card => {
    card.addEventListener('mouseover', () => {
        // Ao passar o mouse, adiciona a classe que mostra o texto e expande o card
        card.classList.add('expanded');
    });

    card.addEventListener('mouseout', () => {
        // Ao remover o mouse, remove a classe para retornar ao estado normal
        card.classList.remove('expanded');
    });
});
