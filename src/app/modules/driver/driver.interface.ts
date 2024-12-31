import { Types } from 'mongoose';

export type TDriver = {
  user: Types.ObjectId;
  email: string;
  vehicleType?: string;
  movingTeamMember?: string;
  nidPicture?: string;
  nidNumber?: string;
  driverLicense?: string;
  driverLicenseNumber?: string;
  routePermit?: string;
  driverPicture?: string;
  vehicleRegistrationNumber?: string;
  vehiclePicture?: string;
  gloves?: boolean;
  trollies?: number;
  boxes?: number;
};
