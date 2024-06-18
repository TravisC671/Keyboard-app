import { Link } from "react-router-dom";
import "./KeyIcon.css";

function KeyIcon({
  keyID,
  color,
  appIcon,
  actionIcon
}: {
  keyID: string;
  color: string[];
  appIcon: string;
  actionIcon:string
}) {

  const keyClick = () => {
    //use key id
  };

  return (
    <Link to={`key/${keyID}`}>
      <button
        onClick={keyClick}
        style={
          { 
            "--color1": color[0], 
            "--color2": color[1] 
          } as React.CSSProperties
        }
        className="key"
        >
        {appIcon != "" && (
          <img id="app-img" className={`${actionIcon != "" ? 'small' : ''} key-app-icon-img`} src={appIcon}></img>
        )}
        {actionIcon != "" && (
          <img className="key-action-icon-img" src={actionIcon}></img>
        )}
      </button>
    </Link>
  );
}

export default KeyIcon;
