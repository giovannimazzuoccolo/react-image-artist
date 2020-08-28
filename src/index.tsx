import React, { FC, HTMLAttributes, ReactChild } from 'react';
import Imagecanvas from './ImageCanvas/ImageCanvas';
import './css/_base.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Container: FC<Props> = ({ children }) => {
  return (
    <div className="canvas--container">
      <Imagecanvas pen highlighter marker clear />

      {children || `the snozzberries taste like snozzberries`}
    </div>
  );
};
