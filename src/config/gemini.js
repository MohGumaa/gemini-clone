import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME;

async function runChat(prompt) {
  try {
		// Check if API key exists
		if (!GEMINI_API_KEY) {
			throw new Error('GEMINI_API_KEY is not defined in environment variables');
		}
		// console.log('API Key loaded:', GEMINI_API_KEY ? 'Yes' : 'No');

		if (!MODEL_NAME) {
			throw new Error('MODEL_NAME is not defined in environment variables');
		}

		const ai = new GoogleGenAI({
			apiKey: GEMINI_API_KEY,
		});

    const config = {
			responseMimeType: 'text/plain',
		};
    const model = MODEL_NAME;
		const contents = [
			{
				role: 'user',
				parts: [
					{
						text: prompt,
					},
				],
			},
		];

    const response = await ai.models.generateContentStream({
			model,
			config,
			contents,
		});

		let fileIndex = 0;
    let responseData = '';
		for await (const chunk of response) {
      // console.log(chunk.text)
			let chunkText = chunk.text;
			responseData += chunkText;
		}

    return responseData;
	} catch (error) {
    console.error('Error in runChat:', error);
		throw error;
  }
}

export default runChat;
