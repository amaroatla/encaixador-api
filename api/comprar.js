export default async function handler(req, res) {

  const token = (process.env.PAGBANK_TOKEN || "").trim();

  const pedido = {

    reference_id: "LIC-" + Date.now(),

    customer: {
      name: "Cliente Teste",
      email: "teste@encaixador.com"
    },

    items: [
      {
        reference_id: "LICENCA",
        name: "Licença Encaixador DTF",
        quantity: 1,
        unit_amount: 9900
      }
    ],

    qr_codes: [
      {
        amount: {
          value: 9900
        }
      }
    ]

  };

  try {

    const resposta = await fetch("https://api.pagseguro.com/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(pedido)
    });

    const texto = await resposta.text();

    return res.status(resposta.status).send(texto);

  } catch (e) {

    return res.status(500).json({
      erro: e.message
    });

  }

}