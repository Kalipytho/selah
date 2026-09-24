import express from 'express'

import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get('/', getMenu)

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.post(
  '/',
  protect,
  createMenuItem,
)

router.put(
  '/:id',
  protect,
  updateMenuItem,
)

router.delete(
  '/:id',
  protect,
  deleteMenuItem,
)

export default router