import React from "react";
import "./App.css";

import Header from "./components/header.js";
import Item from "./components/item.js";
import Footer from "./components/footer.js";

function App() {
  return (
    <div className="todo">
      {Header()}
      {Item()}
      {Footer()}
    </div>
  );
}

export default App;
