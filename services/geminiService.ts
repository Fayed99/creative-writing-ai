
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function dataUrlToBlob(dataUrl: string) {
    const parts = dataUrl.split(',');
    const base64Data = parts[1];
    return {
        data: base64Data,
    };
}


export const generateStoryFromImage = async (imageDataUrl: string, mimeType: string, genre: string, style: string): Promise<string> => {
    const { data } = dataUrlToBlob(imageDataUrl);

    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: data
        },
    };

    const textPart = {
        text: `Analyze the mood, atmosphere, and setting of this image. Based on your analysis, write a compelling and evocative opening paragraph for a ${genre} story in a ${style} writing style. The tone should match the image. Do not add a title or any introductory text, just the paragraph itself.`
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });
    
    return response.text;
};

export const generateSpeechFromText = async (text: string, style: string): Promise<string> => {
    const styleToPrompt: { [key: string]: string } = {
        'Suspenseful': 'Say in a tense, suspenseful voice with dramatic pauses:',
        'Poetic': 'Say in a flowing, lyrical, and emotive voice:',
        'Whimsical': 'Say in a lighthearted, playful, and whimsical voice:',
        'Minimalist': 'Say in a clear, direct, and understated voice:',
        'Descriptive': 'Say in a rich, expressive, and descriptive voice:',
        'Romance': 'Say in a warm, gentle, and romantic voice:',
        'Horror': 'Say in a chilling, fearful voice:'
    };

    const promptPrefix = styleToPrompt[style] || 'Say expressively:';

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `${promptPrefix} ${text}` }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No audio data received from API.");
    }

    return base64Audio;
};
