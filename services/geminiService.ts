
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Anda adalah asisten AI ahli yang berspesialisasi dalam membuat file Markdown (.md) berkualitas tinggi dan terstruktur dengan baik untuk proyek perangkat lunak. Tujuan Anda adalah untuk menghasilkan README, dokumentasi, atau konten Markdown lainnya yang lengkap dan profesional sesuai permintaan. Outputnya harus HANYA konten Markdown mentah, tanpa penjelasan tambahan atau teks percakapan. Mulailah langsung dengan konten Markdown.`;

export async function generateMarkdown(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
        }
    });

    const text = response.text;
    if (text) {
        // Sometimes the model might wrap the output in markdown code blocks, let's clean it up.
        return text.replace(/^```markdown\n/, '').replace(/\n```$/, '');
    }
    return '';

  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
}
