import { Object } from "fabric/fabric-impl";
import api from "services/api";

enum Paths {
  ADD_OBJECT = "whiteboard",
}

const addObject = async (whiteboardId: string, object: Object) => {
  await api.put(`${Paths.ADD_OBJECT}/${whiteboardId}`, { object });
};

const WhiteboardService = { addObject };
export default WhiteboardService;
