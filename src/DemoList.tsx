import { Link } from "react-router-dom";
import { Device } from "@overreact/engine";
import { mobile, desktop, experiments } from "./demos";

export const DemoList = () => {
  return (
    <Device>
      <div className="w-full h-full overflow-auto">
        <div className="w-full min-h-full p-12 pt-8 box-border bg-white leading-10 text-lg">
          <Heading>Experiments</Heading>
          <OrderedList>
            {experiments.map(({ name, path }) => (
              <DemoLink key={path} path={path}>{name}</DemoLink>
            ))}
          </OrderedList>

          <Heading>Mobile Demos</Heading>
          <OrderedList>
            {mobile.map(({ name, path }) => (
              <DemoLink key={path} path={path}>{name}</DemoLink>
            ))}
          </OrderedList>
          
          <Heading>Desktop-only Demos</Heading>
          <OrderedList>
            {desktop.map(({ name, path }) => (
              <DemoLink key={path} path={path}>{name}</DemoLink>
            ))}
          </OrderedList>
        </div>
      </div>
    </Device>
  );
}

const Heading: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="text-2xl mb-4 mt-8">{children}</h1>;
};

const OrderedList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ul className="ml-8 list-disc text-slate-400">{children}</ul>;
};

const DemoLink: React.FC<{ path: string; children: string }> = ({ path, children }) => {
  return (
    <li className="pl-2">
      <Link to={path} className="text-blue-500">{children}</Link>
    </li>
  );
};
