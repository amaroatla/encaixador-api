export default async function handler(req, res) {
  try {
    const resposta = await fetch("https://api.pagseguro.com/orders", {
      headers: {
        Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
        Accept: "application/json"
      }
    });

    const texto = await resposta.text();

    res.status(200).json({
      statusHTTP: resposta.status,
      resposta: texto
    });

  } catch (e) {
    res.status(500).json({
      erro: e.message
    });
  }
}