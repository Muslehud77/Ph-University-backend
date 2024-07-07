import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { adminServices } from './admin.service';
import sendResponse from '../../utils/sendResponse';
import { TAdmin } from './admin.interface';

const getAllAdmins = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await adminServices.getAllAdminFromDB(query);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    meta: result.meta,
    data: result.result,
  };

  sendResponse(res, data);
});

const getAdminById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = (await adminServices.getAdminByIdFromDB(id)) as TAdmin;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TAdmin>(res, data);
});

const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { admin } = req.body;
  const result = (await adminServices.updateAdminInDB(id, admin)) as TAdmin;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TAdmin>(res, data);
});

const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await adminServices.deleteAdminFromDB(id);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  };

  sendResponse(res, data);
});

export const adminController = {
  getAdminById,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
