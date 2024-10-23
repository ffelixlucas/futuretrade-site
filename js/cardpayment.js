// ================== Card de Pagamento ==================

document.addEventListener('DOMContentLoaded', function () {
    const paymentAmount = document.getElementById('payment-amount');
    const dailyAmount = document.getElementById('daily-amount');
    const discountAmount = document.getElementById('discount-amount');
    const payNowButton = document.getElementById('pay-now-button');
    const payNowDiscountButton = document.getElementById('pay-now-discount-button'); // Botão com desconto de R$ 199
    const payNowDiscountButton179 = document.getElementById('pay-now-discount-button-179'); // Botão com desconto de R$ 179
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');
    const validateCouponButton = document.getElementById('validate-coupon');

    const pixButton = document.getElementById('pay-pix');
    const cartaoButton = document.getElementById('pay-cartao');

    const pixPrice = 249;
    const cartaoPrice = 299;
    const discountedPixPrice199 = 199; // Valor com o desconto de cupom DESCONTO199
    const discountedPixPrice179 = 179; // Valor com o desconto de cupom DESCONTO179

    // Cupons válidos
    const validCoupons = {
        "DESCONTO199": { price: discountedPixPrice199, link: 'https://mpago.la/2pQX5un', discount: '20%' },
        "DESCONTO179": { price: discountedPixPrice179, link: 'https://mpago.la/1FwwSxm', discount: '28%' }
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
            payNowDiscountButton179.classList.add('hidden');

            // Exibe o botão correspondente ao cupom
            if (enteredCoupon === "DESCONTO199") {
                payNowDiscountButton.classList.remove('hidden');
                payNowDiscountButton.onclick = () => abrirPopup(link);
            } else if (enteredCoupon === "DESCONTO179") {
                payNowDiscountButton179.classList.remove('hidden');
                payNowDiscountButton179.onclick = () => abrirPopup(link);
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
            payNowDiscountButton179.classList.add('hidden');
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
            payNowDiscountButton179.classList.add('hidden');
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
