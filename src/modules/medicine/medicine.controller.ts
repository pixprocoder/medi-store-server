import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../helpers/sendResponseHelper.js";
import { medicineService } from "./medicine.service.js";

const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getCategories();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Categories Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (e) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed To Fetch Categories",
    });
  }
};
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
      throw new Error("id is required");
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
  getCategories,
  getMedicines,
  getSingleMedicine,
};
