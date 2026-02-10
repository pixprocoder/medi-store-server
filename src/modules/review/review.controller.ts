import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }

    const { id } = req.params;
    const result = await reviewService.createReview(
      req.body,
      id as string,
      user.id as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Review Add Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e} ` || "Review Add Fail",
    });
  }
};
const getMedicineReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const result = await reviewService.getMedicineReviews(id as string);

    if (result.length === 0) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        message: "Review Not Found For This Medicine",
        success: true,
        data: result,
      });
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Review Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e} ` || "Review add Fail",
    });
  }
};
const getOwnReviews = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return;
    }
    const result = await reviewService.getOwnReviews(user.id as string);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Review Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e} ` || "Review add Fail",
    });
  }
};

const updateOwnReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user is required");
    }
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const result = await reviewService.updateOwnReview(
      req.body,
      id as string,
      user.id as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Update Review Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e} ` || "Failed to Update.",
    });
  }
};
const deleteOwnReview = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user is required");
    }
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const result = await reviewService.deleteOwnReview(
      id as string,
      user.id as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Review delete Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `${e} ` || "Failed to delete.",
    });
  }
};

export const reviewController = {
  createReview,
  getOwnReviews,
  getMedicineReviews,
  updateOwnReview,
  deleteOwnReview,
};
