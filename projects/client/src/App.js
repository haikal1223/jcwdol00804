import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Page from "./Components/Page";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Page>
  );
}

export default App;
