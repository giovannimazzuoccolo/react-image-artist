import React, { useReducer, useRef } from 'react';
import {
  drawingState,
  ImageCanvasActions,
  initialDrawingState,
  drawStatus,
  Tool,
} from './ImageCanvas.types';
import Imagesvg from './ImageSVG';
import Pens from '../Pens/Pens';
import Markers from '../Markers/Markers';
import Highlighters from '../Highlighters/Highlighters';
import Tools from '../Tools/Tools';

interface ImagecanvasProps {
  image?: string;
  pen?: boolean;
  highlighter?: boolean;
  marker?: boolean;
  clear?: boolean;
  props?: any;
}

const Imagecanvas: React.SFC<ImagecanvasProps> = ({
  image,
  pen,
  marker,
  highlighter,
  clear,
  props,
}) => {
  const containerRef = useRef(null);

  function reducer(
    state: drawingState,
    action: ImageCanvasActions
  ): drawingState {
    switch (action.type) {
      case 'ACTION_DOWN':
        return {
          ...state,
          position: action.position,
          drawState: drawStatus.DOWN,
        };

      case 'ACTION_UP':
        return {
          ...state,
          drawState: drawStatus.UP,
        };
      case 'ADD_MARKER':
        return {
          ...state,
          markerPaths: {
            ...state.markerPaths,
            ...action.path,
          },
        };
      case 'ADD_HIGHLIGHTER':
        return {
          ...state,
          highlighterPaths: {
            ...state.highlighterPaths,
            ...action.path,
          },
        };
      case 'ADD_PEN':
        const newpens = state.penPaths;
        newpens.push(action.path);
        return {
          ...state,
          penPaths: newpens,
        };
      case 'CHANGE_TOOL':
        return {
          ...state,
          tool: action.tool,
        };
      case 'CLEAR':
        return {
          ...state,
          penPaths: [],
          highlighterPaths: [],
          markerPaths: [],
        };

      default:
        return state;
    }
  }

  const [
    { color, drawState, penPaths, markerPaths, highlighterPaths, tool },
    dispatch,
  ] = useReducer(reducer, initialDrawingState);

  function changeTool(tool: Tool) {
    dispatch({ type: 'CHANGE_TOOL', tool });
  }

  function switcher(tool: Tool, pos: pos, color: string): ImageCanvasActions {
    switch (tool) {
      case Tool.PEN:
        return { type: 'ADD_PEN', path: { ...pos, color } };
      case Tool.HIGHLIGHTER:
        return { type: 'ADD_HIGHLIGHTER', path: { ...pos, color } };
      case Tool.MARKER:
        return { type: 'ADD_MARKER', path: { ...pos, color } };
      default:
        return { type: 'ADD_PEN', path: { ...pos, color } };
    }
  }

  function handleDown(_e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    _e.preventDefault();

    const pos = { x: _e.clientX, y: _e.clientY };

    dispatch({ type: 'ACTION_DOWN', position: pos });

    const action = switcher(tool, pos, color);
    // return the selected tool
    dispatch(action);
  }

  function handleMove(_e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    _e.preventDefault();

    const pos = { x: _e.clientX, y: _e.clientY };
    if (drawState === drawStatus.DOWN) {
      switch (tool) {
        case Tool.PEN:
          return dispatch({ type: 'ADD_PEN', path: { ...pos, color } });
        case Tool.MARKER:
          return dispatch({ type: 'ADD_MARKER', path: { ...pos, color } });
        case Tool.HIGHLIGHTER:
          return dispatch({ type: 'ADD_HIGHLIGHTER', path: { ...pos, color } });
      }
    }
    if (drawState === drawStatus.UP) {
      dispatch({ type: 'ACTION_UP' });
    }
  }

  function handleUp(_e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    _e.preventDefault();

    //const pos = { x: _e.clientX, y: _e.clientY };
    dispatch({ type: 'ACTION_UP' });
  }

  function clearCanvas() {
    dispatch({ type: 'CLEAR' });
  }

  return (
    <div ref={containerRef} {...props}>
      <svg
        width="100%"
        height="100%"
        onMouseDown={e => handleDown(e)}
        onMouseMove={e => handleMove(e)}
        onMouseUp={e =>
          handleUp(e)
        } /*
        onTouchStart={e => handleDown(e, 'TOUCH')
        onTouchEnd={e => handleUp(e, 'TOUCH')}
        onTouchMove={e => handleMove(e, 'TOUCH')}*/
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Highlighters paths={highlighterPaths} />
        <Markers paths={markerPaths} />
        <Pens paths={penPaths} />
        <Imagesvg href={image} />
      </svg>
      <Tools
        pen={pen}
        highlighter={highlighter}
        marker={marker}
        clear={clear}
        clearFunc={clearCanvas}
        changeTool={changeTool}
        selectedTool={tool}
      />
    </div>
  );
};

export default Imagecanvas;
