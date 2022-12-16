import { Object } from "fabric/fabric-impl";
import api from "services/api";

enum Paths {
  ADD_OBJECT = "whiteboard",
  MODIFY_OBJECT = "whiteboard",
  REMOVE_OBJECTS = "whiteboard/removeObjects",
}

const addObject = async (whiteboardId: string, object: Object) => {
  const parsed = object.toJSON(["data"]);
  await api.put(`${Paths.ADD_OBJECT}/${whiteboardId}`, { object: parsed });
};

const modifyObject = async (whiteboardId: string, object: Object) => {
  const parsed = object.toJSON(["data"]);
  await api.patch(`${Paths.MODIFY_OBJECT}/${whiteboardId}`, { object: parsed });
};

const removeObjects = async (
  whiteboardId: string,
  objectIds: Array<string>
) => {
  await api.patch(`${Paths.REMOVE_OBJECTS}/${whiteboardId}`, { objectIds });
};

const WhiteboardService = { addObject, modifyObject, removeObjects };
export default WhiteboardService;
