import express from 'express'

import {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js'

import protect from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()


/*
PUBLIC ROUTES
*/

router.get('/', getGallery)

router.get('/:id', getGalleryItem)


/*
ADMIN ROUTES
*/

router.post(
  '/',
  protect,
  upload.single('image'),
  createGalleryItem,
)

router.put(
  '/:id',
  protect,
  upload.single('image'),
  updateGalleryItem,
)

router.delete(
  '/:id',
  protect,
  deleteGalleryItem,
)

export default router