import { z } from 'zod';

const updateDriverProfile = z.object({
  vehicleType: z.string(),
  movingTeamMember: z.string(),
  nidNumber: z.string(),
  driverLicenseNumber: z.string(),
  vehicleRegistrationNumber: z.string(),
  gloves: z.boolean(),
  trollies: z.number(),
  boxes: z.number(),
});

export const driverValidations = {
  updateDriverProfile,
};
