import Model from "../models/whiteboard";

const create = async () => {
  const whiteboard = await Model.create({});
  return Model.findOne({ _id: whiteboard._id });
};

const addObject = async (_id: string, object: Object) => {
  console.log({ object });
  await Model.updateOne(
    { _id },
    {
      $push: { objects: object },
    }
  );
};

const WhiteboardRepository = { create, addObject };
export default WhiteboardRepository;
