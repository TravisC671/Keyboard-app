import { useRef, useState } from "react";
import "./Action.css";
import Keybind from "../keybind/Keybind";
import { actionType } from "../../types";

function Action({ id, updateAction, removeAction, initialType }: {
	id: number;
	updateAction: (id: number, actionInput: actionType) => void;
	removeAction: (id: number) => void;
	initialType: actionType
}) {
	const [modeData, setModeData] = useState(initialType.actionData);
	const [mode, setMode] = useState(initialType.actionMode);
	const dropdownRef = useRef<HTMLSelectElement>(null)
	const commandTextAreaRef = useRef<HTMLTextAreaElement>(null)

	const updateKeyBind = (fromKeybind: string) => {
		setModeData(fromKeybind);
		updateAction(id, {action: "Press", actionMode: 0, actionData: fromKeybind});
	};

	const updateActionComponent = (currentMode:any = mode) => {
		if (dropdownRef.current == null) return;

		//currentMode is replaced with events in div elements
		if ( typeof(currentMode) != 'number') {
			currentMode = mode
		}

		if (mode == 2 && commandTextAreaRef.current != null) {
			updateAction(id, {action: dropdownRef.current.value, actionMode: currentMode, actionData: commandTextAreaRef.current.value})
			return;
		}

		updateAction(id, {action: dropdownRef.current.value, actionMode: currentMode, actionData: modeData})
	}

	const selectMacro = (e: any) => {
		/*TODO there is a bug that causes the keybind element to show the command 
		 data when switching from one to another*/
		setModeData('')
		setMode(parseInt(e.target.id));
		updateActionComponent(parseInt(e.target.id))
	};

	const actionDropdownOptions = ["Press", "Double Tap", "Hold"];

	let dropdownContents = actionDropdownOptions.map((value, index) => {
		return (
			<option value={value} key={index}>
				{value}
			</option>
		);
	});

	const destroyAction = () => {
		removeAction(id)
	}

	return (
		<div className="action-wrapper">
			<div className="action-dropdown-container">
				<div style={{ display: "flex" }}>
					<h2 className="action-dropdown-text">Action: </h2>
					<select id="action-options" ref={dropdownRef} onChange={updateActionComponent}>{dropdownContents}</select>
				</div>
				<button className="delete-action" onClick={destroyAction}>X</button>
			</div>
			<div className="macro-selector-wrapper">
				<div className="macro-selector">
					<button
						id="0"
						className={`macro-selector-button ${
							mode == 0 && "selected"
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
						style={{ left: ` calc(100% / 3 * ${mode})` }}
					></div>
				</div>
			</div>
			<div className="modes">
				{mode == 0 && (
					<Keybind
						initialKeybind={mode == 0 ? modeData : ''}
						setKeyBind={updateKeyBind}
					/>
				)}
				{mode == 1 && (
					<div className="mode-wrapper">
						<h1 className="keybind-text">Script:</h1>
						<button className="keybind-button">upload file</button>
					</div>
				)}
				{mode == 2 && (
					<div className="mode-wrapper">
						<textarea className="command-input" ref={commandTextAreaRef} onChange={updateActionComponent}>{initialType.actionMode == 2 ? initialType.actionData : ''}</textarea>
					</div>
				)}
			</div>
		</div>
	);
}

export default Action;
