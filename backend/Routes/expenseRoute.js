import express from 'express';
import { dltExp, expAdd, updExp, viewExp,findExp } from '../controllers/expenceController.js';

const router=express.Router();

router.post('/add',expAdd)
router.get('/view',viewExp);
router.get('/find/:id',findExp)
router.put('/update/:id',updExp);
router.delete('/delete/:id',dltExp)
export default router;