const API_URL = process.env.EXPO_PUBLIC_API_URL; 

export const enviarParaIA = async (texto: string, cardapio: any[]): Promise<any> => {
  try {
    const response = await fetch(API_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto, cardapio }),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    return { recomendados: [] };
  }
};