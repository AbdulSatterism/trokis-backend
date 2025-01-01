/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { driverController } from './driver.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { driverValidations } from './driver.validation';

const router = express.Router();

// router.post(
//   '/update-driver-profile',
//   auth(USER_ROLES.DRIVER, USER_ROLES.ADMIN),
//   driverController.updateDriverProfile,
// );

router.post(
  '/update-driver-profile',
  fileUploadHandler(),
  auth(USER_ROLES.ADMIN, USER_ROLES.DRIVER),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the body if it contains data in stringified JSON format
      let validatedData;
      if (req.body.data) {
        validatedData = driverValidations.updateDriverProfile.parse(
          JSON.parse(req.body.data),
        );
      }

      // Handle image updates if files are uploaded
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        // Assuming `fileUploadHandler` stores files in req.files
        const uploadedFiles = req.files.map((file: any) => file.path);
        validatedData = {
          ...validatedData,
          image: uploadedFiles[0], // Update the specific image field
        };
      }

      // Pass the validated data to the controller
      req.body = validatedData;
      await driverController.updateDriverProfile(req, res, next);
    } catch (error) {
      next(error);
    }
  },
);

export const driverRoutes = router;
