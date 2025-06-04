import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const GeminiContext = createContext();

export const GeminiContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState('');

  const delayPara = (index, nextWord) => {
		setTimeout(() => {
			setResponseData((prev) => prev + nextWord);
		}, 75 * index);
	};

	const newChat = () => {
		setLoading(false);
		setShowResult(false);
	}

  const onSent = async (prompt) => {
		try {
			setResponseData('');
			setLoading(true);
			setShowResult(true);

			let response;
			if (prompt !== undefined) {
				setRecentPrompt(prompt);
				response = await runChat(prompt);
			} else {
				setRecentPrompt(input);
				setPrevPrompts((prev) => [input, ...prev]);
				response = await runChat(input);
			}

			// For header
			let responseArray = response.split('**');
			let newResponse = '';
			for (let i = 0; i < responseArray.length; i++) {
				if (i === 0 || i % 2 !== 1) {
					newResponse += responseArray[i];
				} else {
					newResponse += `<strong>${responseArray[i]}</strong>`;
				}
			}

			// For a new line
			let responseArray2 = newResponse.split('*').join('<br/>');

			let newResponseArray = responseArray2.split(' ');
			for (let i = 0; i < newResponseArray.length; i++) {
				const nextWord = newResponseArray[i];
				delayPara(i, nextWord + ' ');
			}

			setInput('');
		} catch (error) {
			console.error('Error in onSent:', error);
			setResponseData('Error: ' + error.message);
		} finally {
			setLoading(false);
		}
	};
  
	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		showResult,
		loading,
		responseData,
		input,
		setInput,
		newChat,
	};

	return (
		<GeminiContext.Provider value={contextValue}>
			{children}
		</GeminiContext.Provider>
	);
};

