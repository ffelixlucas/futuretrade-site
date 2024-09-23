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
    const payNowDiscountButton = document.getElementById('pay-now-discount-button'); // Botão com desconto
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');
    const validateCouponButton = document.getElementById('validate-coupon');

    const pixButton = document.getElementById('pay-pix');
    const cartaoButton = document.getElementById('pay-cartao');

    const pixPrice = 249;
    const cartaoPrice = 299;
    const discountedPixPrice = 199; // Valor com o desconto de cupom

    // Cupom que você pode alterar dinamicamente
    const validCoupon = "DESCONTO199"; // Cupom válido que libera o desconto

    // Função para abrir o popup centralizado
    function abrirPopup(url) {
        const width = 800;
        const height = 800;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    }

    // Função para validar o cupom
    validateCouponButton.addEventListener('click', function () {
        const enteredCoupon = couponInput.value.trim();

        if (enteredCoupon === validCoupon) {
            // Cupom válido, altera o preço e exibe o botão de desconto
            paymentAmount.textContent = discountedPixPrice;
            dailyAmount.textContent = (discountedPixPrice / 365).toFixed(2);
            discountAmount.textContent = "30%"; // Atualiza o valor do desconto
            couponMessage.classList.add('hidden'); // Esconde a mensagem de erro
            payNowDiscountButton.classList.remove('hidden'); // Exibe o botão com desconto
            payNowButton.classList.add('hidden'); // Esconde o botão normal
            payNowDiscountButton.onclick = () => abrirPopup('https://mpago.la/2pQX5un'); // Link para pagamento com desconto
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
            payNowDiscountButton.classList.add('hidden'); // Esconde o botão de desconto se o usuário alternar para cartão
            couponMessage.classList.add('hidden'); // Esconde a mensagem de cupom inválido
        } else if (paymentMethod === 'cartao') {
            paymentAmount.textContent = cartaoPrice;
            dailyAmount.textContent = (cartaoPrice / 365).toFixed(2);
            discountAmount.textContent = "0%";
            payNowButton.textContent = "Pagar com Cartão";
            payNowButton.onclick = abrirPopupcartao;
            cartaoButton.classList.add('active');
            pixButton.classList.remove('active');
            payNowDiscountButton.classList.add('hidden'); // Esconde o botão de desconto para cartão
            couponMessage.classList.add('hidden'); // Esconde a mensagem de cupom inválido
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