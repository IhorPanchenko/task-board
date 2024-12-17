import { useRoutes } from "react-router-dom";
import Routes from "./routes/routes";

function App() {
  const element = useRoutes(Routes);
  return <>{element}</>;
}

export default App;
