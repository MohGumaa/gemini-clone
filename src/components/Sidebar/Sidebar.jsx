import React, { useState } from "react";
import './Sidebar.css';
import { assets } from "../../assets/assets";
import useGeminiContext from "../../hooks/useGeminiContext";

const Sidebar = () => {
	const [extend, setExtend] = useState(true);
	const { onSent, prevPrompts, setRecentPrompt, newChat } = useGeminiContext();

	const loadPrompt = async(prompt) => {
		await onSent(prompt)
	}
	
	const handleMenuClick = () => setExtend(!extend)

  return (
		<div className="sidebar">
			<div className="top capitalize">
				<img
					onClick={handleMenuClick}
					className="menu"
					src={assets.menu_icon}
					alt="Menu Icon"
				/>
				<div className="new-chat" onClick={() => newChat()}>
					<img src={assets.plus_icon} alt="New Chat" />
					{extend && <p>new chat</p>}
				</div>
				{extend && (
					<div className="recent">
						<p className="recent-title capitalize">recent</p>
						{prevPrompts.map((item, index) => {
							return (
								<div
									className="recent-entry"
									key={index}
									onClick={() => loadPrompt(item)}
								>
									<img src={assets.message_icon} alt="Message Icon" />
									<p>{item.slice(0, 18)}...</p>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<div className="bottom capitalize">
				<div className="bottom-item recent-entry">
					<img src={assets.question_icon} alt="Question Icon" />
					{extend && <p>help</p>}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.history_icon} alt="History Icon" />
					{extend && <p>activity</p>}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.setting_icon} alt="Setting Icon" />
					{extend && <p>setting</p>}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
