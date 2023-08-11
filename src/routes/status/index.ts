import { Request, Response, Router } from 'express';
import { getHealth } from '../../controllers/health.controller';

const statusRouter = Router();

statusRouter.get('/health', getHealth);
statusRouter.get('/liveness', (req: Request, res: Response) => res.send('OK'));
statusRouter.get('/readiness', (req: Request, res: Response) => res.send('OK'));

export default statusRouter;
