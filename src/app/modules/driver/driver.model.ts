import { Schema, model } from 'mongoose';
import { TDriver } from './driver.interface';

const driverSchema = new Schema<TDriver>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  email: { type: String },
  vehicleType: { type: String, default: '' },
  movingTeamMember: { type: String, default: '' },
  nidPicture: { type: String, default: '' },
  nidNumber: { type: String, default: '' },
  driverLicense: { type: String, default: '' },
  driverLicenseNumber: { type: String, default: '' },
  routePermit: { type: String, default: '' },
  driverPicture: { type: String, default: '' },
  vehicleRegistrationNumber: { type: String, default: '' },
  vehiclePicture: { type: String, default: '' },
  gloves: { type: Boolean, default: false },
  trollies: { type: Number, default: 0 },
  boxes: { type: Number, default: 0 },
});

export const Driver = model<TDriver>('Driver', driverSchema);
