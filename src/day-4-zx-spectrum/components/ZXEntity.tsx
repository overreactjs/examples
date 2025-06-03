import { createPortal } from "react-dom";

type ZXProps = {
  children: React.ReactNode;
}

export const ZXPen: React.FC<ZXProps> = ({ children }) => {
  return children ? createPortal(children, document.getElementById('portal-pen')!) : null;
};

export const ZXPaper: React.FC<ZXProps> = ({ children }) => {
  return children ? createPortal(children, document.getElementById('portal-paper')!) : null;
};

export const ZXPenSprite: React.FC<ZXProps> = ({ children }) => {
  return children ? createPortal(children, document.getElementById('portal-pen-sprite')!) : null;
};

export const ZXPaperSprite: React.FC<ZXProps> = ({ children }) => {
  return children ? createPortal(children, document.getElementById('portal-paper-sprite')!) : null;
};

export const ZXSprite: React.FC<ZXProps> = ({ children }) => {
  return (
    <>
      <ZXPaperSprite>{children}</ZXPaperSprite>
      <ZXPenSprite>{children}</ZXPenSprite>
    </>
  )
};

type ZXEntityProps = {
  pen?: React.ReactNode;
  paper?: React.ReactNode;
  sprite: React.ReactNode;
};

export const ZXEntity: React.FC<ZXEntityProps> = ({ pen, paper, sprite }) => (
  <>
    <ZXPaper>{paper}</ZXPaper>
    <ZXPen>{pen}</ZXPen>
    <ZXSprite>{sprite}</ZXSprite>
  </>
);
