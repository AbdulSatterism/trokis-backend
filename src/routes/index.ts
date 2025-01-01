import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';

import { UserRoutes } from '../app/modules/user/user.route';
import { driverRoutes } from '../app/modules/driver/driver.route';
const router = express.Router();

const apiRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/driver', route: driverRoutes },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
