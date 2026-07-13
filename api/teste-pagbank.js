export default function handler(req, res) {
  const token = process.env.PAGBANK_TOKEN || "";

  res.json({
    tamanho: token.length,
    primeiroChar: token.charCodeAt(0),
    ultimoChar: token.charCodeAt(token.length - 1),
    token: JSON.stringify(token)
  });
}