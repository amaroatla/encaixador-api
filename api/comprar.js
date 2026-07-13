export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Use POST"
    });
  }

  const token = (process.env.PAGBANK_TOKEN || "").trim();

  const {
    nome,
    email,
    cpf,
    valor
  } = req.body;

  const pedido = {

    reference_id: "LIC-" + Date.now(),

    customer: {
      name: nome,
      email: email,
      tax_id: cpf
    },

    items: [
      {
        reference_id: "LICENCA",
        name: "Licença Encaixador DTF",
        quantity: 1,
        unit_amount: valor
      }
    ],

    qr_codes: [
      {
        amount: {
          value: valor
        }
      }
    ]

  };

  try {

    const resposta = await fetch(
      "https://api.pagseguro.com/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(pedido)
      }
    );

    const json = await resposta.json();

    return res.status(resposta.status).json(json);

  } catch (e) {

    return res.status(500).json({
      erro: e.message
    });

  }

}