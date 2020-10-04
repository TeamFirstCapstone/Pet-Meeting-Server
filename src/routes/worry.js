import {Router} from 'express'
import WorryController from '../controllers/WorryController';

const router=Router();
// to do 
router.post('/list/worries',WorryController.createParameterWorry)

