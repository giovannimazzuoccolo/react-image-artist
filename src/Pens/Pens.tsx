import * as React from 'react';
import { path } from 'ImageCanvas/ImageCanvas.types';

interface IPensProps {
  paths: path[];
}

const Pens: React.SFC<IPensProps> = ({ paths }) => {
  const pathData =
    'M ' +
    paths
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(' L ');

  const color = paths.map(p => p.color);

  return (
    <path
      className="path"
      stroke={color[0]}
      strokeWidth="6"
      fill="none"
      d={pathData}
      //data-id={props.id}
      //onClick={() => props.setSelection && props.setSelection(props.id)}
    />
  );
};

export default Pens;
