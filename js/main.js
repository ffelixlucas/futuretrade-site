

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

/*=============== blur header ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*============================ POP UP PAGAMENTO ==============================*/

// Função genérica para abrir o popup
function abrirPopup(url) {
    // Abre o popup com a URL fornecida
    const popup = window.open(url, '_blank', 'width=800,height=800');
  
    // Verifica se o popup foi bloqueado ou não abriu
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('Falha ao abrir o popup. Verifique se o navegador está bloqueando popups.');
        return;
    }
  
    // Verifica se o popup foi fechado a cada segundo
    const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopupClosed); // Para o intervalo quando o popup for fechado
            exibirMensagem(); // Chama a função para exibir a mensagem
        }
    }, 1000); // Verifica a cada 1 segundo
  }
  
 // Função para abrir o popup para Pix
function abrirPopuppix(event) {
    event.preventDefault(); // Evita que a página role para o topo
    abrirPopup('https://mpago.la/1nkHoUd');
  }
  
  // Função para abrir o popup para Cartão
  function abrirPopupcartao(event) {
    event.preventDefault(); // Evita que a página role para o topo
    abrirPopup('https://mpago.la/2a4GBKM');
  }
  
  // Função que exibe uma mensagem após o fechamento do popup
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
    
    // Insere o conteúdo do popup na página
    document.body.insertAdjacentHTML('beforeend', popupContent);
  
    // Função para fechar o popup quando o botão for clicado
    document.getElementById('popup-close').addEventListener('click', function() {
        document.getElementById('popup-overlay').remove(); // Remove o popup da tela
    });
  }

