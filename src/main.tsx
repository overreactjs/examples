import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { demos, experiments } from "./demos";
import { DemoList } from "./DemoList";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {experiments.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
        {demos.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
        <Route path="/" Component={DemoList} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

