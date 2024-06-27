import './TopBar.css'
import { appWindow } from '@tauri-apps/api/window';
import closeIcon from "/svg/close.svg";
import minimizeIcon from "/svg/minimize.svg";

function TopBar () {
    const minimize = async () => {
        await appWindow.minimize()
    }

    const close = async () => {
        await appWindow.close()
    }



    return (
        <div data-tauri-drag-region={true} className="topbar-wrapper" >
            <button className='topbar-button minimize-btn' onClick={minimize}>
                <img className='icon' src={minimizeIcon}></img>
            </button>
            <button className='topbar-button close-btn' onClick={close}>
                <img className='icon' src={closeIcon}></img>
            </button>
        </div>
    )
}

export default TopBar