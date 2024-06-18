import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";

import defaultFile from "../defaultFile.json";
import KeyIcon from "../lib/KeyIcon";
import "./Home.css";

function Home() {
	const [contents, setContent] = useState(defaultFile);

	const readUserPreferences = async () => {
		const contents = await readTextFile("config\\UserPreferences.json", {
			dir: BaseDirectory.AppConfig,
		});

		let parsedContents = JSON.parse(contents);

		setContent(parsedContents);
	};

	useEffect(() => {
		readUserPreferences();
	}, []);

	const keyIcons = contents.keys.map((key, index) => (
		<KeyIcon
			color={key.colors}
			appIcon={key.appIcon}
			actionIcon={key.actionIcon}
			keyID={index.toString()}
			key={index}
		/>
	));

	return (
		<div>
			<div className="key-wrapper">
				<div className="key-container">{keyIcons}</div>
			</div>

			<div className="mode-selector-wrapper">
				<div className="mode-selector">
					<button className="mode-selector-button selected">1</button>
					<button className="mode-selector-button">2</button>
					<button className="mode-selector-button">3</button>
					<div className="selected-mode"></div>
				</div>
			</div>
		</div>
	);
}

export default Home;
