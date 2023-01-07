import { RequestHandler } from "express";
import { ErrorStatus, MeResponseLocals } from "../../@types";
import LeafletRepository from "../../repositories/leaflet";
import { createError } from "../../utils/helpers/create-error";

const leafletAccess: RequestHandler<
  {},
  {},
  { id: string },
  {},
  MeResponseLocals
> = async (request, response, next) => {
  const { id } = request.body;
  const { _id: userId } = response.locals;

  if (!id) {
    next(createError(ErrorStatus.BAD_REQUEST, "You must provide leaflet id."));
    return;
  }

  const leaflet = await LeafletRepository.findOne(id);
  if (!leaflet) {
    next(
      createError(ErrorStatus.NOT_FOUND, "Leaflet with this id does not exist.")
    );
    return;
  }

  if (!(leaflet.user._id.toString() === userId.toString())) {
    console.log(leaflet.user._id);
    console.log(userId);
    next(createError(ErrorStatus.FORBIDDEN, "This leaflet is not yours."));
    return;
  }

  next();
};

const LeafletValidator = { leafletAccess };
export default LeafletValidator;
