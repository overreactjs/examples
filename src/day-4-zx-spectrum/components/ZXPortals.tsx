import { CSSProperties } from "react";

const LIGHTEN: CSSProperties = { background: 'black', mixBlendMode: 'lighten' };
const DARKEN: CSSProperties = { background: 'white', mixBlendMode: 'darken' };

export const ZXPortals = () => {
  return (
    <>
      <div className="zx-wrapper">
        <div className="zx-wrapper" id="portal-paper" />
        <div className="zx-wrapper" id="portal-paper-sprite" style={LIGHTEN} />
      </div>
      <div className="zx-wrapper" style={DARKEN}>
        <div className="zx-wrapper" id="portal-pen" />
        <div className="zx-wrapper" id="portal-pen-sprite" style={{ ...LIGHTEN, filter: 'invert(1)' }} />
      </div>
    </>
  );
};
