// Adiciona a chave pública fornecida pelo Mercado Pago
const mp = new MercadoPago('TEST-e938af65-23c7-4bb4-a0f0-6b34ef10ed0d', {
  locale: 'pt'
});

const bricksBuilder = mp.bricks();

const renderPaymentBrick = async (bricksBuilder) => {
  try {
    // Faz uma requisição ao backend (via ngrok) para obter o preferenceId
    const response = await fetch("https://4c02-189-73-45-73.ngrok-free.app/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    const preferenceId = data.preferenceId;

    // Configura o Payment Brick com o preferenceId recebido do backend
    const settings = {
      initialization: {
        amount: 249.00,  // Quantia do pagamento
        preferenceId: preferenceId,  // Usando o preferenceId gerado no backend
        payer: {
          firstName: "",
          lastName: "",
          email: "",
        },
      },
      customization: {
        visual: {
          style: {
            theme: "dark",
          },
        },
        paymentMethods: {
          bankTransfer: "all",
          atm: "all",
          wallet_purchase: "all",
          maxInstallments: 1
        },
      },
      callbacks: {
        onReady: () => {
          // Callback chamado quando o Brick está pronto
        },
        onSubmit: ({ selectedPaymentMethod, formData }) => {
          // callback chamado quando o formulário de pagamento é enviado
          return new Promise((resolve, reject) => {
            // Faz a requisição ao backend (via ngrok) para processar o pagamento
            fetch("https://4c02-189-73-45-73.ngrok-free.app/process_payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then((response) => {
                // Receber o resultado do pagamento
                resolve();
              })
              .catch((error) => {
                // Tratar erro ao tentar criar o pagamento
                reject();
              });
          });
        },
        onError: (error) => {
          // Callback chamado para todos os casos de erro do Brick
          console.error(error);
        },
      },
    };

    // Renderiza o Brick de pagamento
    window.paymentBrickController = await bricksBuilder.create(
      "payment",
      "paymentBrick_container",
      settings
    );
  } catch (error) {
    console.error("Erro ao renderizar o Brick de pagamento", error);
  }
};

renderPaymentBrick(bricksBuilder);
