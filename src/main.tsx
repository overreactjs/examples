import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Device } from "@engine";
import { mobile, desktop } from "./demos";

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
  const activateDeviceEvents = () => {
    if ((DeviceMotionEvent as any).requestPermission) {
      (DeviceMotionEvent as any).requestPermission();
    }
    if ((DeviceOrientationEvent as any).requestPermission) {
      (DeviceOrientationEvent as any).requestPermission();
    }
  };

  return (
    <Device hideClose>
      <div className="w-full min-h-full p-12 pt-8 box-border bg-white leading-10 text-lg">
        <Heading>Mobile Demos</Heading>
        <OrderedList>
          {mobile.map(({ name, path }) => (
            <DemoLink key={path} path={path}>{name}</DemoLink>
          ))}
        </OrderedList>
        
        <Heading>Desktop Demos</Heading>
        <OrderedList>
          {desktop.map(({ name, path }) => (
            <DemoLink key={path} path={path}>{name}</DemoLink>
          ))}
        </OrderedList>

        <Heading>Setup</Heading>
        <UnorderedList>
          <li className="pl-2">
            <button className="text-blue-500" onClick={activateDeviceEvents}>Activate device events</button>
          </li>
        </UnorderedList>
      </div>
    </Device>
  );
}

const Heading: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="text-2xl mb-4 mt-8">{children}</h1>;
};

const OrderedList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ol className="mx-8 list-decimal text-slate-400">{children}</ol>;
};

const UnorderedList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ul className="mx-8 list-disc text-slate-400">{children}</ul>;
};

const DemoLink: React.FC<{ path: string; children: string }> = ({ path, children }) => {
  return (
    <li className="pl-2">
      <Link to={path} className="text-blue-500">{children}</Link>
    </li>
  );
};
