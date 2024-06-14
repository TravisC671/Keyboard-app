import "./KeyIcon.css";

function KeyIcon({
  openKeyPage,
  keyID,
  color,
  appIcon,
  actionIcon
}: {
  openKeyPage: (keyID: string) => void;
  keyID: string;
  color: string[];
  appIcon: string;
  actionIcon:string
}) {

  const keyClick = () => {
    openKeyPage(keyID);
  };

  return (
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
  );
}

export default KeyIcon;
