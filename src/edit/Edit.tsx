import { convertFileSrc } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { useState, useEffect } from "react";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

import "./Edit.css";

function Edit({ onBack, keyID }: { onBack: VoidFunction; keyID: string }) {
	const [mode, setMode] = useState(0);
	const [key, setKey] = useState("");
	const [isListening, setListening] = useState(false);
	const [color1, setColor1] = useState("#383838");
	const [color2, setColor2] = useState("#5c5c5c");
	const [appIcon, setAppIcon] = useState("");
	const [actionIcon, setActionIcon] = useState("");

	const loadUserPreferences = async () => {
		const contents = await readTextFile("config\\UserPreferences.json", {
			dir: BaseDirectory.AppConfig,
		});

		let parsedContents = JSON.parse(contents);

		let ourData = parsedContents.keys[parseInt(keyID)];

		setMode(ourData.mode);
		setColor1(ourData.colors[0]);
		setColor2(ourData.colors[1]);
		setAppIcon(ourData.appIcon);
		setActionIcon(ourData.actionIcon);
	};

	const openImg = async (e: any) => {
		const selected = await open({
			multiple: false,
			filters: [
				{
					name: "Image",
					extensions: ["png", "jpeg", "svg"],
				},
			],
		});

		if (Array.isArray(selected)) {
			return;
		} else if (selected === null) {
			e.target.id == "app-btn" || e.target.id == "app-img"
				? setAppIcon("")
				: setActionIcon("");
		} else {
			let assetURL = convertFileSrc(selected);

			e.target.id == "app-btn" || e.target.id == "app-img"
				? setAppIcon(assetURL)
				: setActionIcon(assetURL);
		}
	};

	const saveData = async () => {
		let keyContents = {
			name: "wip",
			mode: mode,
			modeData: "wip",
			colors: [color1, color2],
			appIcon: appIcon,
			actionIcon: actionIcon,
		};

		const contents = await readTextFile("config\\UserPreferences.json", {
			dir: BaseDirectory.AppConfig,
		});

		let parsedContents = JSON.parse(contents);

		parsedContents.keys[parseInt(keyID)] = keyContents;

		await writeTextFile(
			"config\\UserPreferences.json",
			JSON.stringify(parsedContents, null, "\t"),
			{ dir: BaseDirectory.AppConfig }
		);
	};

	const backPage = () => {
		onBack();
	};

	const selectMacro = (e: any) => {
		setMode(parseInt(e.target.id));
	};

	const selectColor1 = (e: any) => {
		setColor1(e.target.value);
	};

	const selectColor2 = (e: any) => {
		setColor2(e.target.value);
	};

	//todo fix
	//these are both used to bind keybinds
	const keybindButton = () => {
		console.log("keybtn");
		!isListening && setKey("");
		setListening(true);
	};

	const onKeyDown = (event: any) => {
		if (event.repeat) {
			return;
		}

		if (isListening) {
			event.preventDefault();

			setKey(event.code);
			//setListening(false);
		}
	};

	const onKeyUp = () => {
		setListening(false);
	};

	useEffect(() => {
		loadUserPreferences();

		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
		};
	}, [isListening]);

	return (
		<div>
			<button className="back-arrow" onClick={backPage}>
				&lt;-
			</button>
			<button className="save-button" onClick={saveData}>
				Save
			</button>
			<div className="edit-wrapper">
				<div
					className="edit-key-wrapper"
					style={
						{
							"--color1": color1,
							"--color2": color2,
						} as React.CSSProperties
					}
				>
					<div className="key-icon">
						<button
							id="app-btn"
							onClick={openImg}
							className={
                `app-icon 
                  ${ appIcon == "" && "empty" }`
              }
						>
							{appIcon != "" && (
								<img
									id="app-img"
									className="app-icon-img"
									src={appIcon}
								></img>
							)}
						</button>
						<button
							onClick={openImg}
							className={
                `action-icon 
                ${ actionIcon == "" &&  "empty" }`
              }
						>
							{actionIcon != "" && (
								<img
									className="action-icon-img"
									src={actionIcon}
								></img>
							)}
						</button>
					</div>
					<div className="color-container">
						<div className="color-wrapper color1">
							<input
								type="color"
								className="color-input"
								id="color1"
								onInput={selectColor1}
								value={color1}
							></input>
						</div>
						<div className="color-wrapper color2">
							<input
								type="color"
								className="color-input"
								id="color2"
								onInput={selectColor2}
								value={color2}
							></input>
						</div>
					</div>
				</div>
				<div className="edit-controls">
					<input className="name-input"></input>
					<div className="macro-selector-wrapper">
						<div className="macro-selector">
							<button
								id="0"
								className={`macro-selector-button ${
									mode == 0  && "selected"
								}`}
								onClick={selectMacro}
							>
								Keybind
							</button>
							<button
								id="1"
								className={`macro-selector-button ${
									mode == 1 && "selected"
								}`}
								onClick={selectMacro}
							>
								Script
							</button>
							<button
								id="2"
								className={`macro-selector-button ${
									mode == 2 && "selected"
								}`}
								onClick={selectMacro}
							>
								Command
							</button>
							<div
								className="selected-macro"
								style={{ left: mode * 100 }}
							></div>
						</div>
					</div>

					<div className="modes">
						{mode == 0 && (
							<div className="mode-wrapper">
								<h1 className="keybind-text">Key:</h1>
								<button
									className="keybind-button"
									onClick={keybindButton}
								>
									{key}
								</button>
							</div>
						)}
						{mode == 1 && (
							<div className="mode-wrapper">
								<h1 className="keybind-text">Script:</h1>
								<button
									className="keybind-button"
									onClick={keybindButton}
								>
									upload file
								</button>
							</div>
						)}
						{mode == 2 && (
							<div className="mode-wrapper">
								<textarea className="command-input"></textarea>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Edit;
