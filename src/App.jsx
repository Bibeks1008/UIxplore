import Header from "./components/Header/Header";

import Footer from "./components/Footer/Footer";
import "./App.css";

import Contextprovider from "./Context/Context";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardDetails from "./pages/CardDetails";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

export default App;
