import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("file"),
    updateUserAvatarController.handle
);

export { usersRoutes };
