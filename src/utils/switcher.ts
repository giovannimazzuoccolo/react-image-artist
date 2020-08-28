import { Tool, pos } from 'ImageCanvas/ImageCanvas.types';

export function switcher(tool: Tool, pos: pos, color: string) {
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
