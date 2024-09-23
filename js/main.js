/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

navLink.forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
}));

/*=============== SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
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

/*=============== BLUR HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header');
};
window.addEventListener('scroll', blurHeader);

// ================== Card de Pagamento ==================

document.addEventListener('DOMContentLoaded', function () {
    const paymentAmount = document.getElementById('payment-amount');
    const dailyAmount = document.getElementById('daily-amount');
    const discountAmount = document.getElementById('discount-amount');
    const payNowButton = document.getElementById('pay-now-button');

    const pixButton = document.getElementById('pay-pix');
    const cartaoButton = document.getElementById('pay-cartao');

    const pixPrice = 249;
    const cartaoPrice = 299;

    // Função para abrir o popup centralizado
    function abrirPopup(url) {
        const width = 800;
        const height = 800;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const popup = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

        // Verifica se o popup foi bloqueado
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            alert('Falha ao abrir o popup. Verifique se o navegador está bloqueando popups.');
            return;
        }

        // Monitora o fechamento do popup de pagamento
        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkPopupClosed); // Para a verificação quando o popup for fechado
                abrirPopupConfirmacao();  // Exibe a mensagem de confirmação no popup
            }
        }, 1000); // Verifica a cada segundo
    }

    // Função para abrir o popup de confirmação
    function abrirPopupConfirmacao() {
        const whatsappLink = "https://wa.me/5541988919440?text=Olá%2C%20acabei%20de%20realizar%20um%20pagamento.%20Aqui%20está%20meu%20comprovante!";

        const popupHtml = `
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

        // Adiciona o HTML do popup na página
        document.body.insertAdjacentHTML('beforeend', popupHtml);

        // Fecha o popup de confirmação
        document.getElementById('popup-close').addEventListener('click', function () {
            document.getElementById('popup-overlay').remove(); // Remove o popup de confirmação
        });
    }

    // Função para Pix
    function abrirPopuppix(event) {
        event.preventDefault();
        abrirPopup('https://mpago.la/1nkHoUd'); // Abre o popup para Pix e exibe a mensagem depois
    }

    // Função para Cartão
    function abrirPopupcartao(event) {
        event.preventDefault();
        abrirPopup('https://mpago.la/2a4GBKM'); // Abre o popup para Cartão e exibe a mensagem depois
    }

    // Função que gerencia o método de pagamento selecionado
    function handlePaymentMethod(paymentMethod) {
        if (paymentMethod === 'pix') {
            paymentAmount.textContent = pixPrice;
            dailyAmount.textContent = (pixPrice / 365).toFixed(2);
            discountAmount.textContent = "17%";
            payNowButton.textContent = "Pagar com Pix";
            payNowButton.onclick = abrirPopuppix;
            pixButton.classList.add('active');
            cartaoButton.classList.remove('active');
        } else if (paymentMethod === 'cartao') {
            paymentAmount.textContent = cartaoPrice;
            dailyAmount.textContent = (cartaoPrice / 365).toFixed(2);
            discountAmount.textContent = "0%";
            payNowButton.textContent = "Pagar com Cartão";
            payNowButton.onclick = abrirPopupcartao;
            cartaoButton.classList.add('active');
            pixButton.classList.remove('active');
            document.getElementById('popup-overlay')?.remove(); // Remove popup se houver
        }
    }

    // Eventos de clique para os botões Pix e Cartão
    pixButton.addEventListener('click', function () {
        handlePaymentMethod('pix');
    });

    cartaoButton.addEventListener('click', function () {
        handlePaymentMethod('cartao');
    });

    // Inicializa com Pix selecionado por padrão
    handlePaymentMethod('pix');
});
