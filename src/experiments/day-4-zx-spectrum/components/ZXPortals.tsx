import { CSSProperties } from "react";

const LIGHTEN: CSSProperties = { background: 'black', mixBlendMode: 'lighten' };
const DARKEN: CSSProperties = { background: 'white', mixBlendMode: 'darken' };

export const ZXPortals = () => {
  return (
    <>
      <div className="day-4-zx-wrapper">
        <div className="day-4-zx-wrapper" id="portal-paper" />
        <div className="day-4-zx-wrapper" id="portal-paper-sprite" style={LIGHTEN} />
      </div>
      <div className="day-4-zx-wrapper" style={DARKEN}>
        <div className="day-4-zx-wrapper" id="portal-pen" />
        <div className="day-4-zx-wrapper" id="portal-pen-sprite" style={{ ...LIGHTEN, filter: 'invert(1)' }} />
      </div>
    </>
  );
};
