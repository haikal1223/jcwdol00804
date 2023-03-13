import "./App.css";
import Home from './Pages/Home';
import Footer from "./Components/Footer";
import Page from "./Components/Page";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Page>
  );
}

export default App;
