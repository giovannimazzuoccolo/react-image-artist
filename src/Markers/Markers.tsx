import * as React from 'react';
import { path } from 'ImageCanvas/ImageCanvas.types';

interface IMarkersProps {
  paths: path[];
}

const Markers: React.SFC<IMarkersProps> = ({ paths }) => {
  const pathData =
    'M ' +
    paths
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(' L ');

  const color = paths.map(p => p.color + '33');

  return (
    <path
      className="path"
      stroke={color[0]}
      strokeWidth="13"
      fill="none"
      d={pathData}
      //data-id={props.id}
      //onClick={() => props.setSelection && props.setSelection(props.id)}
    />
  );
};

export default Markers;
