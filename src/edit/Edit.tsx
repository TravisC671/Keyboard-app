import { convertFileSrc } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { useState, useEffect } from "react";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

import "./Edit.css";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Action from "./action/Action";
import TopBar from "../topbar/TopBar";

import backIcon from "/svg/back.svg";
import { actionType } from "../types";

export async function loader({ params }: { params: any }) {
	let keyID = params.keyid;
	return { keyID };
}



function Edit() {
	const { keyID }: { keyID: string } = useLoaderData() as { keyID: string };

	const [mode, setMode] = useState(0);
	const [color1, setColor1] = useState("#383838");
	const [color2, setColor2] = useState("#5c5c5c");
	const [appIcon, setAppIcon] = useState("");
	const [actionIcon, setActionIcon] = useState("");
	const [keybind, setKeyBind] = useState("");
	const [name, setName] = useState("");
	const [actions, setActions]  = useState<actionType[]>([])

	//let keyID = '0'

	const updateAction = (id: number, actionInput: actionType) => {
		//console.log(id, actionInput)

		setActions((oldArray) => {
			oldArray[id] = actionInput;
			console.log(oldArray)
			return oldArray
		})
	}

	const removeAction = (id: number) => {
		setActions((oldArray) => {
			return oldArray.filter((value, index) => index != id);
		})
	}

	let actionElem = actions.map((actionItem, index) => {
		return <Action key={index} id={index} initialType={actionItem} updateAction={updateAction} removeAction={removeAction} />
	})

	const addAction = () => {
		setActions((old) => [...old, {action: 'Press', actionMode: 0, actionData: ''}])
	}

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
		setKeyBind(ourData.modeData);
		setName(ourData.name);
		setActions(ourData.actions)
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
			name: name,
			actions: actions,
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

	const selectColor1 = (e: any) => {
		setColor1(e.target.value);
	};

	const selectColor2 = (e: any) => {
		setColor2(e.target.value);
	};

	

	useEffect(() => {
		loadUserPreferences();
	}, []);

	return (
		<div>
			<TopBar />
			<Link to={`/index.html`}>
				<button className="back-arrow">
					<img  className="back-arrow-icon" src={backIcon}></img>
				</button>
			</Link>
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
							className={`app-icon 
                  ${appIcon == "" && "empty"}`}
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
							className={`action-icon 
                ${actionIcon == "" && "empty"}`}
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
					<input
						className="name-input"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></input>
					<div className="action-container">
						{actionElem}
						<div className="new-action-btn-center">
							<button className="new-action-btn" onClick={addAction}>+</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Edit;
