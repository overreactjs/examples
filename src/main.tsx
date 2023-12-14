import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { mobile, desktop } from "./demos";
import { Device } from "@engine";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
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

function DemoList() {
  const activateDeviceMotionEvents = () => {
    if ((DeviceMotionEvent as any).requestPermission) {
      (DeviceMotionEvent as any).requestPermission();
    }
  };

  return (
    <Device>
      <div className="w-full min-h-full p-12 box-border bg-white leading-8">
        <h1 className="text-2xl mb-4">Mobile Demos</h1>
        <ol className="mx-8 list-decimal text-slate-400">
          {mobile.map(({ name, path }) => (
            <li key={path} className="pl-2">
              <Link to={path} className="text-blue-500">{name}</Link>
            </li>
          ))}
        </ol>
        <h1 className="text-2xl mb-4 mt-8">Desktop Demos</h1>
        <ol className="mx-8 list-decimal text-slate-400">
          {desktop.map(({ name, path }) => (
            <li key={path} className="pl-2">
              <Link to={path} className="text-blue-500">{name}</Link>
            </li>
          ))}
        </ol>
        <h1 className="text-2xl mb-4 mt-8">Setup</h1>
        <ul className="mx-8 list-disc text-slate-400">
          <li className="pl-2">
            <button className="text-slate-800" onClick={activateDeviceMotionEvents}>Activate device motion events</button>
          </li>
        </ul>
      </div>
    </Device>
  );
}