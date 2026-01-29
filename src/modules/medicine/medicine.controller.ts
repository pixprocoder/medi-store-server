import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await medicineService.createMedicine(
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
// get medicine
const getMedicines = async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getMedicines();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Medicines Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Fetch Medicine",
    });
  }
};
const getSingleMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      throw new Error("is is required");
    }
    const result = await medicineService.getSingleMedicine(id as string);

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
      message: "Failed To Fetch Medicine",
    });
  }
};

export const medicineController = {
  createMedicine,
  getMedicines,
  getSingleMedicine,
};
