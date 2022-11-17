import Model from "../models/whiteboard";

const create = async () => {
  const whiteboard = await Model.create({});
  return Model.findOne({ _id: whiteboard._id });
};

const WhiteboardRespository = { create };
export default WhiteboardRespository;
