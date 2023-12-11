import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { demos } from "./demos";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {demos.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
        <Route path="/" Component={DemoList} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

function DemoList() {
  return (
    <div className="p-12">
      <h1 className="text-2xl mb-4">Demos</h1>
      <ol className="mx-8 list-decimal text-slate-400">
        {demos.map(({ name, path }) => (
          <li key={path} className="pl-2">
            <Link to={path} className="text-blue-500">{name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}