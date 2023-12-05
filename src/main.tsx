import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MultiplayerDemo } from "./MultiplayerDemo";
import { PhysicsDemo } from "./PhysicsDemo";
import { PlatformerDemo } from "./PlatformerDemo";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/multiplayer" Component={MultiplayerDemo} />
        <Route path="/physics" Component={PhysicsDemo} />
        <Route path="/platformer" Component={PlatformerDemo} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
