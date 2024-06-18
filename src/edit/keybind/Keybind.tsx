import { useEffect, useState } from "react"


function Keybind({initialKeybind, setKeyBind}: {initialKeybind:String, setKeyBind: (keybind: string) => void}) {
    const [key, setKey] = useState<String[]>([]);
    const [isListening, setListening] = useState(false);



    const assignKeybind = () => {
        setKey([])
        setListening(true);
    }

    const keyDown = (e: KeyboardEvent) => {
        if (!isListening) {return}
        if (e.repeat) {return}
        e.preventDefault()

        setKey((prevArray) => [
            ...prevArray, e.code
        ])
    }

    const keyUp = () => {
        if (!isListening) {return}
        setKeyBind(key.join("+").toString())
        setListening(false)
    }

    useEffect(()=> {
        document.addEventListener('keydown', keyDown)
        document.addEventListener('keyup', keyUp)

        return(() => {
            document.removeEventListener('keydown', keyDown)
            document.removeEventListener('keyup', keyUp)
        })
    })


    return (
        <div className="mode-wrapper">
        <h1 className="keybind-text">Key:</h1>
        <button
            className="keybind-button"
            onClick={assignKeybind}
        >
            {key.length != 0 ? key.join("+").toString() : initialKeybind}
        </button>
    </div>
    )
}
export default Keybind