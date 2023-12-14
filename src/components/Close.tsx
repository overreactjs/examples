import { Link } from "react-router-dom"

export const Close: React.FC = () => {
  return (
    <Link className="absolute top-0 left-0 w-4 h-4 p-8 box-content mix-blend-difference" to="/">
      <svg className="w-full h-full" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.071 1.92896L1.92891 16.0711" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <path d="M16.1422 16.1422L2.00002 2.00001" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </Link>
  );
};
