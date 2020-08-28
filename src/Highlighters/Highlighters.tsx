import * as React from 'react';
import { path } from 'ImageCanvas/ImageCanvas.types';

interface IHighlightersProps {
  paths: path[];
}

const Highlighters: React.SFC<IHighlightersProps> = ({ paths }) => {
  const pathData =
    'M ' +
    paths
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(' L ');

  const color = paths.map(p => p.color + 'EE');

  return (
    <path
      className="path"
      stroke={color[0]}
      strokeWidth="22"
      fill="none"
      d={pathData}
      //data-id={props.id}
      //onClick={() => props.setSelection && props.setSelection(props.id)}
    />
  );
};

export default Highlighters;
