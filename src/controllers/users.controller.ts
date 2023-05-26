import { apiResponse } from "../app/transformers";
import { accessToken } from "../app/config";
import {
  registerSystemUser,
  updateSystemUser,
  loginSystemUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
} from "../services/user.service";
const { systemUserAccessTokenExpiry } = accessToken;

export const get = async (_req, res, next) => {
  try {
    const data = await getAllUsers();
    res.status(200).json(apiResponse(200, data, "System Users Records"));
  } catch (error: any) {
    next(error);
    // res.status(400).json(apiResponse(400, undefined, error.message));
  }
};

// //sign up system user Admin side
export const register = async (req, res, next) => {
  try {
    const savedUser = await registerSystemUser(req.body);

    res
      .status(200)
      .json(apiResponse(200, savedUser, "User created successfully"));
  } catch (err: any) {
    next(err);
  }
};
// //sign up system user Admin side
export const post = async (req, res, next) => {
  try {
    const savedUser = await registerSystemUser(req.body);

    res
      .status(200)
      .json(apiResponse(200, savedUser, "User created successfully"));
  } catch (err: any) {
    next(err);
  }
};

//update user
export const put = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const updated = await updateSystemUser(userId, req.body);
    let msg = `user ${updated.isActive ? "updated" : "deleted"} successfully`;
    res.status(200).json(apiResponse(200, updated, msg));
  } catch (error: any) {
    next(error);
  }
};
export const getOne = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const data = await getSingleUser(userId);
    res.status(200).json(apiResponse(200, data, "user data"));
  } catch (error: any) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const data = await deleteUser(userId);
    res.status(200).json(apiResponse(200, data, "deleted successfully"));
  } catch (error: any) {
    next(error);
  }
};

//login method of admin panel
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, userData } = await loginSystemUser(email, password);
    return res
      .cookie("access-token", accessToken, {
        httpOnly: true,
        maxAge: systemUserAccessTokenExpiry,
      })
      .json(
        apiResponse(
          200,
          {
            accessToken,
            ...userData,
          },
          "LoggedIn Sccessfully"
        )
      );
  } catch (err: any) {
    next(err);
  }
};
