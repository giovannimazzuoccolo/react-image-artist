export type path = { x: number; y: number; color: string };

export type save = { path: path; tool: Tool };

export type pos = { x: number; y: number };

export enum drawStatus {
  'UP',
  'DOWN',
  'PRESSURE',
}

export enum Tool {
  'NONE',
  'PEN',
  'MARKER',
  'HIGHLIGHTER',
}

export type drawingState = {
  position: pos;
  drawState: drawStatus;
  color: string;
  tool: Tool;
  save: save[];
  penPaths: path[];
  markerPaths: path[];
  highlighterPaths: path[];
};

export type ImageCanvasActions =
  | { type: 'CLEAR' }
  | { type: 'UNDO' }
  | { type: 'ACTION_DOWN'; position: pos }
  | { type: 'ACTION_DRAWING'; position: pos }
  | { type: 'ACTION_PRESSURE'; position: pos }
  | { type: 'ACTION_UP' }
  | { type: 'CHANGE_TOOL'; tool: Tool }
  | { type: 'ADD_PEN'; path: path }
  | { type: 'SAVE'; path: path[]; tool: Tool }
  | { type: 'ADD_MARKER'; path: path }
  | { type: 'ADD_HIGHLIGHTER'; path: path };

export const initialDrawingState = {
  position: { x: 0, y: 0 },
  drawState: drawStatus.UP,
  color: '#000',
  penPaths: [],
  markerPaths: [],
  tool: Tool.NONE,
  highlighterPaths: [],
  save: [],
};
