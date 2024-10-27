import Header from "./components/Header/Header";

import Footer from "./components/Footer/Footer";
import "./App.css";

import Contextprovider from "./Context/Context";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardDetails from "./pages/CardDetails";

function App() {
  return (
    <>
      <Contextprovider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<CardDetails />}>
              <Route path=":cardId" element={<CardDetails />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Contextprovider>
    </>
  );
}

export default App;
