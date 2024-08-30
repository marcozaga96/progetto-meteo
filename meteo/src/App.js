import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import AllMeteo from "./components/AllMeteo";
import MeteoDetails from "./components/MeteoDetails";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Search />
      <main>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<AllMeteo />} />
          <Route path="/details/:id" element={<MeteoDetails />} />
        </Routes>
      </main>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
