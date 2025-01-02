import React from "react";
import "./index.css";
import Openai from "./pages/Openai";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App flex flex-col h-screen overflow-hidden">
      <Navbar />
      <Openai />
    </div>
  );
};

export default App;
