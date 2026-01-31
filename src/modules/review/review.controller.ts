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
      message: `${e} ` || "Review add Fail",
    });
  }
};

export const reviewController = {
  createReview,
};
