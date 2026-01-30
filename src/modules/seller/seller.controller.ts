import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper";
import { sellerService } from "./seller.service";

const createMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await sellerService.createMedicine(
      req.body,
      user.id as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Medicine Created Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Create Medicine",
    });
  }
};
// update
const updateOwnMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { id: medicineId } = req.params;
    if (!medicineId) {
      throw new Error("Id is required");
    }
    const result = await sellerService.updateOwnMedicine(
      req.body,
      medicineId as string,
      user.id,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Medicine Update Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Update Medicine",
    });
  }
};
// delete
const deleteOwnMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { id: medicineId } = req.params;
    if (!medicineId) {
      throw new Error("Id is required");
    }
    const result = await sellerService.deleteOwnMedicine(
      medicineId as string,
      user.id,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Medicine Delete Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Delete Medicine",
    });
  }
};
// get
const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await sellerService.getOrders();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Order Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Fetch Orders",
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id: orderId } = req.params;
    if (!orderId) {
      throw new Error("Id is required");
    }
    const result = await sellerService.updateOrderStatus(
      req.body,
      orderId as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Order Status Update Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Update Order Status",
    });
  }
};

export const sellerController = {
  getOrders,
  createMedicine,
  updateOwnMedicine,
  updateOrderStatus,
  deleteOwnMedicine,
};
