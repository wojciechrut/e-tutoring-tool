import {
  adjustBrushToOptions,
  defaultOptions,
  Options,
} from "./fabric-helpers";
import { useEffect, useReducer } from "react";
import { Canvas } from "fabric/fabric-impl";

enum ActionKind {
  SET_STROKE,
  SET_FILL,
  SET_STROKE_WIDTH,
  SET_FONT_SIZE,
}

type StringPayloadAction = {
  type: ActionKind.SET_STROKE | ActionKind.SET_FILL;
  payload: string;
};

type NumberPayloadAction = {
  type: ActionKind.SET_STROKE_WIDTH | ActionKind.SET_FONT_SIZE;
  payload: number;
};

type Action = StringPayloadAction | NumberPayloadAction;

const reducer = (state: Options, action: Action): Options => {
  const { payload, type } = action;
  switch (type) {
    case ActionKind.SET_STROKE:
      return {
        ...state,
        stroke: payload,
      };
    case ActionKind.SET_STROKE_WIDTH:
      return {
        ...state,
        strokeWidth: payload,
      };
    case ActionKind.SET_FILL:
      return {
        ...state,
        fill: payload,
      };
    case ActionKind.SET_FONT_SIZE:
      return {
        ...state,
        fontSize: payload,
      };
    default:
      return state;
  }
};

export const useWhiteboardOptions = (canvas: Canvas | null) => {
  const [options, dispatch] = useReducer(reducer, defaultOptions);

  const setStroke = (color: string) => {
    dispatch({ type: ActionKind.SET_STROKE, payload: color });
  };

  const setStrokeWidth = (width: number) => {
    dispatch({ type: ActionKind.SET_STROKE_WIDTH, payload: width });
  };

  const setFill = (fillColor: string | false) => {
    dispatch({
      type: ActionKind.SET_FILL,
      payload: fillColor || "transparent",
    });
  };

  const setFontSize = (fontSize: number) => {
    dispatch({ type: ActionKind.SET_FONT_SIZE, payload: fontSize });
  };

  useEffect(() => {
    if (canvas) {
      adjustBrushToOptions(canvas, options);
    }
  }, [options, canvas]);

  return { options, setStroke, setStrokeWidth, setFill, setFontSize };
};
