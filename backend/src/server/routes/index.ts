import { Router } from 'express';
import userAuthMiddleware from '../middleware/userAuth';
import PrivateRoutes from './private';
import PublicRoutes from './public';

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

router.use(PublicRoutes);
router.use(userAuthMiddleware, PrivateRoutes);

export default router;
