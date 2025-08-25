import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/generate-alt", async (req, res) => {
  try {
    const { imageTag } = req.body;

    if (!imageTag) {
      return res.status(400).json({ error: "imageTag é obrigatório" });
    }

    // Extrair src da tag <img>
    const srcMatch = /src=["']([^"']+)["']/.exec(imageTag);
    const imageUrl = srcMatch ? srcMatch[1] : null;

    // Prompt refinado para acessibilidade
    const prompt = `
Você é um assistente especializado em acessibilidade digital (WCAG 2.0).
Gere um texto alternativo conciso para a imagem: ${imageUrl || "imagem sem URL"}.
Regras:
- Máx 125 caracteres
- Não use "imagem de" ou "foto de"
- Se decorativa, retorne ""
- Se logotipo, retorne "Logotipo da [empresa/produto]"
Retorne apenas o texto alternativo.
`;

    // Aqui você chamaria o modelo de IA (exemplo simplificado)
    // Simulação de resposta
    const altText = `Descrição automática para ${imageUrl || "imagem"}`;

    // Para produção, substituir por chamada real à OpenAI ou outro modelo
    /*
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    const altText = data.choices[0].message.content.trim();
    */

    res.json({ altText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar alt text" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Middleware rodando em http://localhost:${PORT}`);
});
