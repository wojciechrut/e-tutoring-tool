import { defaultOptions, Options } from "./fabric-helpers";
import { useReducer } from "react";

enum ActionKind {
  SET_STROKE,
  SET_FILL,
  SET_STROKE_WIDTH,
}

type StringPayloadAction = {
  type: ActionKind.SET_STROKE | ActionKind.SET_FILL;
  payload: string;
};

type NumberPayloadAction = {
  type: ActionKind.SET_STROKE_WIDTH;
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
    default:
      return state;
  }
};

export const useWhiteboardOptions = () => {
  const [options, dispatch] = useReducer(reducer, defaultOptions);

  const setStroke = (color: string) =>
    dispatch({ type: ActionKind.SET_STROKE, payload: color });

  const setStrokeWidth = (width: number) =>
    dispatch({ type: ActionKind.SET_STROKE_WIDTH, payload: width });

  return { options, setStroke, setStrokeWidth };
};
