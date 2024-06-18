import { useState } from 'react';
import './Action.css'
import Keybind from '../keybind/Keybind';

function Action () {
	const [keybind, setKeyBind] = useState("");
	const [mode, setMode] = useState(0);

    const updateKeyBind = (fromKeybind: string) => {
		setKeyBind(fromKeybind);
	};

    const selectMacro = (e: any) => {
		setMode(parseInt(e.target.id));
	};

    const actionDropdownOptions = [
        'Press',
        'Double Tap',
        'Hold'
    ]

    let dropdownContents = actionDropdownOptions.map((value, index ) => {
        return <option value={value} key={index}>{value}</option>
    })

    return (
        <div className="action-wrapper">
            <div className="action-dropdown-container">
                <div style={{display: 'flex'}}>
                    <h2 className="action-dropdown-text">Action: </h2>
                    <select id="action-options">
                        {dropdownContents}
                    </select>
                </div>
                <button className='delete-action'>X</button>
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
						initialKeybind={keybind}
						setKeyBind={updateKeyBind}
					/>
				)}
				{mode == 1 && (
					<div className="mode-wrapper">
						<h1 className="keybind-text">Script:</h1>
						<button className="keybind-button">
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
    )
}

export default Action