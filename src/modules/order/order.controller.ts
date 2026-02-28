import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await orderService.createOrder(req.body, user.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Order Created Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e || "Failed Create Order"} `,
    });
  }
};
const getOwnOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user is require");
    }
    const result = await orderService.getOwnOrders(user.id as string);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Order Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e} || "Failed To Fetch Order"`,
    });
  }
};
const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user id is required");
    }
    const { id } = req.params;
    if (!id) {
      throw new Error(" id is required");
    }
    const result = await orderService.getOrderDetails(
      id as string,
      user.id as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Order Details Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e}` || "Failed To Fetch Order Details",
    });
  }
};
export const orderController = {
  getOwnOrders,
  getOrderDetails,
  createOrder,
};
