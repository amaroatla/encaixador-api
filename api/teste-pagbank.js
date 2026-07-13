export default async function handler(req, res) {
  const token = (process.env.PAGBANK_TOKEN || "").trim();

  try {
    const resposta = await fetch("https://api.pagseguro.com/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const texto = await resposta.text();

    res.status(200).json({
      tokenLength: token.length,
      statusHTTP: resposta.status,
      resposta: texto
    });

  } catch (e) {
    res.status(500).json({
      erro: e.message
    });
  }
}