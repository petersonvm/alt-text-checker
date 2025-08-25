export async function fetchAltText(imgTag: string): Promise<string> {
  const response = await fetch("http://localhost:3000/generate-alt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageTag: imgTag }),
  });

  const data = await response.json() as { altText?: string };
  return data.altText || "Imagem sem descrição";
}
