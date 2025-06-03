import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { desktop, experiments, mobile } from "./demos";
import { DemoList } from "./DemoList";

import "@overreact/engine/styles.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {experiments.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
        {mobile.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
        {desktop.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
        <Route path="/" Component={DemoList} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

