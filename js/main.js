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

/* SCROLL REVEAL ANIMATION */
const sr = ScrollReveal({
    origin: 'top',         // Direção da animação
    distance: '80px',      // Distância percorrida na animação
    duration: 2500,        // Duração em milissegundos
    delay: 300,            // Atraso antes de começar
    reset: false           // Não repetir animação ao rolar para cima
});

/* Elementos a serem revelados conforme o usuário desce a página */
sr.reveal(`.home__title, .home__description, .home__img, 
           .card, .card-content, .pricing-card, .iphone-container, 
           .features-list, .compatibility__card, .compatibility__description, 
           .section__title, video`, {
    interval: 200  // Intervalo entre as animações de cada elemento
});


// ================== Card de Pagamento ==================

document.addEventListener('DOMContentLoaded', function () {
    const paymentAmount = document.getElementById('payment-amount');
    const dailyAmount = document.getElementById('daily-amount');
    const discountAmount = document.getElementById('discount-amount');
    const payNowButton = document.getElementById('pay-now-button');
    const payNowDiscountButton = document.getElementById('pay-now-discount-button'); // Botão com desconto de R$ 199
    const payNowDiscountButton189 = document.getElementById('pay-now-discount-button-189'); // Botão com desconto de R$ 189
    const payNowDiscountButton80 = document.getElementById('pay-now-discount-button-80'); // Botão com desconto de R$ 80
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');
    const validateCouponButton = document.getElementById('validate-coupon');

    const pixButton = document.getElementById('pay-pix');
    const cartaoButton = document.getElementById('pay-cartao');

    const pixPrice = 249;
    const cartaoPrice = 299;
    const discountedPixPrice199 = 199; // Valor com o desconto de cupom DESCONTO199
    const discountedPixPrice189 = 189; // Valor com o desconto de cupom SETEMBRO189
    const discountedPixPrice80 = 80;   // Valor com o desconto de cupom RENOVA80

    // Cupons válidos
    const validCoupons = {
        "DESCONTO199": { price: discountedPixPrice199, link: 'https://mpago.la/2pQX5un', discount: '20%' },
        "SETEMBRO189": { price: discountedPixPrice189, link: 'https://mpago.la/1FwwSxm', discount: '24%' },
        "RENOVA80": { price: discountedPixPrice80, link: 'https://mpago.la/1DKirny', discount: '68%' }
    };

    // Função para abrir o popup centralizado
    function abrirPopup(url) {
        const width = 800;
        const height = 800;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const popup = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            alert('Falha ao abrir o popup. Verifique se o navegador está bloqueando popups.');
            return;
        }

        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkPopupClosed);
                abrirPopupConfirmacao();
            }
        }, 1000);
    }

    // Função para abrir o popup de confirmação após o pagamento
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

    // Função para validar o cupom
    validateCouponButton.addEventListener('click', function () {
        const enteredCoupon = couponInput.value.trim();

        if (validCoupons[enteredCoupon]) {
            // Cupom válido, altera o preço e exibe o botão de desconto correto
            const { price, link, discount } = validCoupons[enteredCoupon];
            paymentAmount.textContent = price;
            dailyAmount.textContent = (price / 365).toFixed(2);
            discountAmount.textContent = discount;
            couponMessage.classList.add('hidden');
            payNowButton.classList.add('hidden');
            payNowDiscountButton.classList.add('hidden');
            payNowDiscountButton189.classList.add('hidden');
            payNowDiscountButton80.classList.add('hidden');

            // Exibe o botão correspondente ao cupom
            if (enteredCoupon === "DESCONTO199") {
                payNowDiscountButton.classList.remove('hidden');
                payNowDiscountButton.onclick = () => abrirPopup(link);
            } else if (enteredCoupon === "SETEMBRO189") {
                payNowDiscountButton189.classList.remove('hidden');
                payNowDiscountButton189.onclick = () => abrirPopup(link);
            } else if (enteredCoupon === "RENOVA80") {
                payNowDiscountButton80.classList.remove('hidden');
                payNowDiscountButton80.onclick = () => abrirPopup(link);
            }
        } else {
            // Cupom inválido, exibe a mensagem de erro
            couponMessage.textContent = "Cupom inválido!";
            couponMessage.classList.remove('hidden');
        }
    });

    // Função para Pix (sem desconto)
    function abrirPopuppix(event) {
        event.preventDefault();
        abrirPopup('https://mpago.la/1nkHoUd'); // Link para pagamento normal
    }

    // Função para Cartão
    function abrirPopupcartao(event) {
        event.preventDefault();
        abrirPopup('https://mpago.la/2a4GBKM'); // Link para pagamento com cartão
    }

    // Função que gerencia o método de pagamento selecionado (Pix ou Cartão)
    function handlePaymentMethod(paymentMethod) {
        if (paymentMethod === 'pix') {
            paymentAmount.textContent = pixPrice;
            dailyAmount.textContent = (pixPrice / 365).toFixed(2);
            discountAmount.textContent = "17%";
            payNowButton.textContent = "Pagar com Pix";
            payNowButton.onclick = abrirPopuppix;
            pixButton.classList.add('active');
            cartaoButton.classList.remove('active');
            payNowDiscountButton.classList.add('hidden');
            payNowDiscountButton189.classList.add('hidden');
            payNowDiscountButton80.classList.add('hidden');
            couponMessage.classList.add('hidden');
        } else if (paymentMethod === 'cartao') {
            paymentAmount.textContent = cartaoPrice;
            dailyAmount.textContent = (cartaoPrice / 365).toFixed(2);
            discountAmount.textContent = "0%";
            payNowButton.textContent = "Pagar com Cartão";
            payNowButton.onclick = abrirPopupcartao;
            cartaoButton.classList.add('active');
            pixButton.classList.remove('active');
            payNowDiscountButton.classList.add('hidden');
            payNowDiscountButton189.classList.add('hidden');
            payNowDiscountButton80.classList.add('hidden');
            couponMessage.classList.add('hidden');
        }
    }

    // Inicializa com Pix selecionado por padrão
    handlePaymentMethod('pix');

    // Eventos de clique para os botões Pix e Cartão
    pixButton.addEventListener('click', function () {
        handlePaymentMethod('pix');
    });

    cartaoButton.addEventListener('click', function () {
        handlePaymentMethod('cartao');
    });
});
