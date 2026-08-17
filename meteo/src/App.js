import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <main>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
