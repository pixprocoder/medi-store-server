import { IUser } from "./../../types/user.types";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper";
import { adminService } from "./admin.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user is required");
    }
    const result = await adminService.getAllUser();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "User Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to fetch users",
    });
  }
};
const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user is required");
    }

    const { id } = req.params;

    //@ts-ignore
    const result = await adminService.updateUserStatus(req.body, user, id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Update Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to update",
    });
  }
};

export const adminController = {
  getAllUser,
  updateUserStatus,
};
