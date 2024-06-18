import { useRouteError } from "react-router-dom";
import "./App.css";


export default function ErrorPage() {
  const error:any = useRouteError();
  console.error(error, window.location);

  return (
    <div id="error-page">
      <h1 style={{'color': 'white'}}>Oops!</h1>
      <p style={{'color': 'white'}}>Sorry, an unexpected error has occurred.</p>
      <p style={{'color': 'white'}}>
        <i style={{'color': 'white'}}>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}