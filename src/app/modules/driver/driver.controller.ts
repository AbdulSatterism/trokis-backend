/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { driverServices } from './driver.services';
import path from 'path';

//update profile
const updateDriverProfile = catchAsync(async (req, res) => {
  const id = req?.user.id;

  //   let image;
  //   if (req.files && 'image' in req.files && req.files.image[0]) {
  //     image = `/images/${req.files.image[0].filename}`;
  //   }

  //   const value = {
  //     image,
  //     ...req.body,
  //   };

  // Process uploaded files
  // const uploadedFiles: Record<string, string> = {};
  // if (req.files) {
  //   const files = req.files as Record<string, Express.Multer.File[]>;
  //   for (const key in files) {
  //     if (files[key] && files[key][0]) {
  //       uploadedFiles[key] = `/${files[key][0].path}`;
  //     }
  //   }
  // }

  // Process uploaded files
  const uploadedFiles: Record<string, string> = {};
  if (req.files) {
    const files = req.files as Record<string, Express.Multer.File[]>;
    for (const key in files) {
      if (files[key] && files[key][0]) {
        // Store relative paths (e.g., /images/filename.jpg or /pdf/filename.pdf)
        const relativePath = path.join(
          '/',
          files[key][0].destination.split('uploads')[1], // Extract folder (images/pdf)
          files[key][0].filename,
        );
        uploadedFiles[key] = relativePath.replace(/\\/g, '/'); // Normalize path separators
      }
    }
  }

  // Combine uploaded files with request body
  const value = {
    ...uploadedFiles,
    ...req.body,
  };

  const result = await driverServices.updateDriverProfile(id, value);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const driverController = { updateDriverProfile };

/*
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    // Process uploaded files
    const uploadedFiles: Record<string, string> = {};
    if (req.files) {
      const files = req.files as Record<string, Express.Multer.File[]>;
      for (const key in files) {
        if (files[key] && files[key][0]) {
          uploadedFiles[key] = `/${files[key][0].path}`;
        }
      }
    }

    // Combine uploaded files with request body
    const value = {
      ...uploadedFiles,
      ...req.body,
    };

    const result = await UserService.updateProfileToDB(user, value);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  },
);
*/
