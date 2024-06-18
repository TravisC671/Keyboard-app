//import { invoke } from "@tauri-apps/api/tauri";
import { exists, BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { useEffect } from "react";

import Home from "./home/Home";
import keys from "./defaultFile.json";

import "./App.css";

function App() {
	/*async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    }*/

	const checkDirectory = async () => {

		let doesExist = await exists("config\\UserPreferences.json", {
			dir: BaseDirectory.AppData,
		});

		if (!doesExist) {
			await writeTextFile(
				"config\\UserPreferences.json",
				JSON.stringify(keys, null, "\t"),
				{ dir: BaseDirectory.AppConfig }
			);
		}
	};

	useEffect(() => {
		checkDirectory();
	}, []);

	return (
		<Home/>
	);
}

export default App;
