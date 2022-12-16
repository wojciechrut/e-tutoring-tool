import Model from "../models/whiteboard";

const create = async () => {
  const whiteboard = await Model.create({});
  return Model.findOne({ _id: whiteboard._id });
};

const addObject = async (_id: string, object: Object) => {
  await Model.updateOne(
    { _id },
    {
      $push: { objects: object },
    }
  );
};

const modifyObject = async (
  _id: string,
  object: Object & { data: { id: string } }
) => {
  if (!object.data || !object.data.id) return;
  await Model.updateOne(
    { _id, "objects.data.id": object.data.id },
    {
      $set: { "objects.$": object },
    }
  );
};

const removeObjects = async (_id: string, objectIds: Array<string>) => {
  await Model.updateOne(
    { _id },
    {
      $pull: { objects: { "data.id": { $in: objectIds } } },
    }
  );
};
const WhiteboardRepository = { create, addObject, modifyObject, removeObjects };
export default WhiteboardRepository;
