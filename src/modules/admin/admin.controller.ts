import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper";
import { adminService } from "./admin.service";

// user management
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
// medicine management
const getMedicines = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user is required");
    }

    const result = await adminService.getMedicines();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Medicine Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to Fetch",
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllOrders();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "All Orders Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to Fetch",
    });
  }
};
const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getOrderById(id as string);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Order detail Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to Fetch",
    });
  }
};
// category management
const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getOrderById(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Category Created",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to Create",
    });
  }
};
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.updateCategory(req.body, id as string);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Category Created",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to Update",
    });
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteCategory(id as string);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Category deleted",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed to delete",
    });
  }
};
export const adminController = {
  getAllUser,
  updateUserStatus,
  getMedicines,
  getAllOrders,
  getOrderById,
  createCategory,
  updateCategory,
  deleteCategory,
};
