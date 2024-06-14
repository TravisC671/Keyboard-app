//import { invoke } from "@tauri-apps/api/tauri";
import { exists, BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";

import Main from "./main/Main";
import Edit from "./edit/Edit";
import keys from "./defaultFile.json";

import "./App.css";

function App() {
	/*async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    }*/

	const [page, setPage] = useState(0);
	const [openedKey, setOpenedKey] = useState("0");

  const backPage = () => {
    setPage(0);
  };

  //set page on key click
  const onKeyOpen = (keyID: string) => {
    setPage(1);
    setOpenedKey(keyID);
  };

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
		<div>
			{page == 0 ? (
				<Main onKeyOpen={onKeyOpen} />
			) : (
				<Edit keyID={openedKey} onBack={backPage} />
			)}
		</div>
	);
}

export default App;
