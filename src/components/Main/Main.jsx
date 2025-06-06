import './Main.css';
import { assets } from "../../assets/assets";
import useGeminiContext from "../../hooks/useGeminiContext";

const Main = () => {
	const {
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
	} = useGeminiContext();

  return (
		<div className="main">
			<div className="nav">
				<p>Gemini</p>
				<img src={assets.user_icon} alt="User Icon" className="user-icon" />
			</div>
			<div className="main-container">
				{!showResult ? (
					<>
						<div className="greet">
							<p>
								<span>Hello, Dev</span>
							</p>
							<p>How can I help you today</p>
						</div>
						<div className="cards">
							<div className="card">
								<p>Suggest beautiful places to see on an upcoming road trip</p>
								<img src={assets.compass_icon} alt="Compass Icon" />
							</div>
							<div className="card">
								<p>Briefly summarize this concept: urban planning</p>
								<img src={assets.bulb_icon} alt="Bulb Icon" />
							</div>
							<div className="card">
								<p>Brainstorm team bonding activities for our work retreat</p>
								<img src={assets.message_icon} alt="Message Icon" />
							</div>
							<div className="card">
								<p>Improve the readability of the following code</p>
								<img src={assets.code_icon} alt="Code Icon" />
							</div>
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<img src={assets.user_icon} alt="User Icon" />
							<p className="capitalize">{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.gemini_icon} alt="Gemini Icon" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: responseData }}></p>
							)}
						</div>
					</div>
				)}
				<div className="main-bottom">
					<div className="search-box">
						<input
							type="text"
							placeholder="Enter a prompt here"
							onChange={(e) => setInput(e.target.value)}
							value={input}
						/>
						<div>
							<img src={assets.gallery_icon} alt="gallery icon" />
							<img src={assets.mic_icon} alt="mic icon" />
							{input.length > 5 && <img
								src={assets.send_icon}
								alt="send icon"
								onClick={() => onSent()}
							/>}
							
						</div>
					</div>
					<p className="bottom-info">
						Gemini may display inaccurate info, including about people, so
						double-check its responses. Your privacy and Gemini Apps
					</p>
				</div>
			</div>
		</div>
	);
};

export default Main;
