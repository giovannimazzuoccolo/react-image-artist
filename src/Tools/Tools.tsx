import React from 'react';
import { Tool } from '../ImageCanvas/ImageCanvas.types';
//import '../css/_base.css';

/*
.button {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #e0e0e0;
  background-color: #eee;
  font: 400 13px/18px Helvetica, arial;
  margin-right: 4px;
  cursor: pointer;
  outline: none;
}

.button--state-active {
  background: rgb(69, 69, 255);
  color: #ededed;
}

*/

interface IToolsProps {
  pen?: boolean;
  marker?: boolean;
  highlighter?: boolean;
  clear?: boolean;
  selectedTool: Tool;
  changeTool: Function;
}

const Tools: React.SFC<IToolsProps> = ({
  pen,
  marker,
  highlighter,
  clear,
  selectedTool,
  changeTool,
}) => {
  function isSelected(tool: Tool): string {
    if (tool === selectedTool) {
      return 'button--state-active';
    } else {
      return '';
    }
  }

  return (
    <div className="tool-list" draggable>
      {pen && (
        <button
          className={`button ${isSelected(Tool.PEN)}`}
          onClick={() => changeTool(Tool.PEN)}
        >
          Pen
        </button>
      )}
      {marker && (
        <button
          className={`button ${isSelected(Tool.MARKER)}`}
          onClick={() => changeTool(Tool.MARKER)}
        >
          Marker
        </button>
      )}
      {highlighter && (
        <button
          className={`button ${isSelected(Tool.HIGHLIGHTER)}`}
          onClick={() => changeTool(Tool.HIGHLIGHTER)}
        >
          Highlighter
        </button>
      )}
      {clear && (
        <button
          className={`button ${isSelected(Tool.HIGHLIGHTER)}`}
          onClick={() => changeTool(Tool.HIGHLIGHTER)}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Tools;
