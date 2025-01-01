/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { TDriver } from './driver.interface';
import { Driver } from './driver.model';
import unlinkFile from '../../../shared/unlinkFile';
import path from 'path';

const updateDriverProfile = async (id: string, payload: Partial<TDriver>) => {
  const existUser = await await User.isExistUserById(id);

  if (!existUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const isExistDriver = await Driver.findOne({ user: id });

  if (!isExistDriver) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Driver doesn't exist!");
  }
  // Delete old files if new ones are uploaded
  const fieldsToDelete = [
    'nidPicture',
    'driverLicense',
    'routePermit',
    'driverPicture',
    'vehiclePicture',
  ];
  // fieldsToDelete.forEach(field => {
  //   if (
  //     payload[field as keyof Partial<TDriver>] &&
  //     isExistDriver[field as keyof Partial<TDriver>]
  //   ) {
  //     unlinkFile(isExistDriver[field as keyof Partial<TDriver>] as string);
  //   }
  // });

  fieldsToDelete.forEach(field => {
    if (
      payload[field as keyof Partial<TDriver>] &&
      isExistDriver[field as keyof Partial<TDriver>]
    ) {
      unlinkFile(
        path.join(
          process.cwd(),
          'uploads',
          isExistDriver[field as keyof Partial<TDriver>] as string,
        ),
      );
    }
  });

  // Update user with new data
  const updateDoc = await Driver.findOneAndUpdate(
    { _id: isExistDriver._id },
    payload,
    {
      new: true,
    },
  );

  return updateDoc;
  //   return updateDoc;
};

export const driverServices = { updateDriverProfile };

/*
const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>,
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  // Delete old files if new ones are uploaded
  const fieldsToDelete = [
    'image',
    'nidPicture',
    'driverLicense',
    'routePermit',
    'driverPicture',
    'vehiclePicture',
  ];
  fieldsToDelete.forEach(field => {
    if (
      payload[field as keyof Partial<IUser>] &&
      isExistUser[field as keyof Partial<IUser>]
    ) {
      unlinkFile(isExistUser[field as keyof Partial<IUser>] as string);
    }
  });

  // Update user with new data
  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

*/
