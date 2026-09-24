import Gallery from '../models/Gallery.js'
import cloudinary from '../config/cloudinary.js'

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'selah-coffee/gallery',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      },
    )

    uploadStream.end(buffer)
  })
}


/* =========================================
   GET ALL GALLERY IMAGES
========================================= */

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .sort({ order: 1, createdAt: -1 })

    res.json({
      success: true,
      gallery,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Could not load gallery',
    })
  }
}


/* =========================================
   GET SINGLE IMAGE
========================================= */

export const getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      })
    }

    res.json({
      success: true,
      gallery: item,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not load gallery item',
    })
  }
}


/* =========================================
   ADD GALLERY IMAGE
========================================= */

export const createGalleryItem = async (req, res) => {
  try {
    const {
      title,
      description,
      order,
    } = req.body

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      })
    }

    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
    )

    const galleryItem = await Gallery.create({
      title,
      description: description || '',
      imageUrl: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
      order: Number(order) || 0,
    })

    res.status(201).json({
      success: true,
      message: 'Gallery image added successfully',
      gallery: galleryItem,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Could not add gallery image',
    })
  }
}


/* =========================================
   UPDATE GALLERY IMAGE
========================================= */

export const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      })
    }

    const {
      title,
      description,
      order,
    } = req.body

    if (title !== undefined) {
      item.title = title
    }

    if (description !== undefined) {
      item.description = description
    }

    if (order !== undefined) {
      item.order = Number(order)
    }

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
      )

      if (item.publicId) {
        await cloudinary.uploader.destroy(item.publicId)
      }

      item.imageUrl = uploadedImage.secure_url
      item.publicId = uploadedImage.public_id
    }

    await item.save()

    res.json({
      success: true,
      message: 'Gallery image updated successfully',
      gallery: item,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Could not update gallery image',
    })
  }
}


/* =========================================
   DELETE GALLERY IMAGE
========================================= */

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      })
    }

    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId)
    }

    await Gallery.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Gallery image deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Could not delete gallery image',
    })
  }
}