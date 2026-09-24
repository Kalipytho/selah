import Menu from '../models/Menu.js'

const CATEGORY_ORDER = [
  'Burgers',
  'Fresh Pizza',
  'Sandwiches & Sides',
  'Hot Brews',
  'Fresh Juices',
  'Cold & Soft Drinks',
  'Traditional Dishes',
  'Eggs & Quick Bites',
  'Pasta & Rice',
  'Fresh Salads',
  'Tibs & Stews',
  'Firfir Selection',
  'Combos (Half & Half)',
]

/*
|--------------------------------------------------------------------------
| GET ALL MENU ITEMS
|--------------------------------------------------------------------------
*/

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find().lean()

    menu.sort((a, b) => {
      const categoryA =
        CATEGORY_ORDER.indexOf(a.category)

      const categoryB =
        CATEGORY_ORDER.indexOf(b.category)

      const categoryPositionA =
        categoryA === -1 ? 999 : categoryA

      const categoryPositionB =
        categoryB === -1 ? 999 : categoryB

      if (
        categoryPositionA !==
        categoryPositionB
      ) {
        return (
          categoryPositionA -
          categoryPositionB
        )
      }

      const orderA =
        Number(a.order) || 0

      const orderB =
        Number(b.order) || 0

      return orderA - orderB
    })

    res.json({
      success: true,
      menu,
    })
  } catch (error) {
    console.error(
      'GET MENU ERROR:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Could not load menu',
    })
  }
}

/*
|--------------------------------------------------------------------------
| CREATE MENU ITEM
|--------------------------------------------------------------------------
*/

export const createMenuItem = async (
  req,
  res,
) => {
  try {
    const {
      category,
      name,
      price,
      order,
      available,
    } = req.body

    if (
      !category ||
      !name ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Category, name and price are required',
      })
    }

    /*
    Find the last item in this category.
    */

    const lastItem = await Menu.findOne({
      category: category.trim(),
    })
      .sort({ order: -1 })
      .lean()

    const nextOrder = lastItem
      ? Number(lastItem.order || 0) + 1
      : 1

    const item = await Menu.create({
      category: category.trim(),
      name: name.trim(),
      price: String(price).trim(),

      order:
        order !== undefined &&
        order !== null &&
        order !== ''
          ? Number(order)
          : nextOrder,

      available:
        available !== false,
    })

    res.status(201).json({
      success: true,
      message:
        'Menu item created successfully',
      menu: item,
    })
  } catch (error) {
    console.error(
      'CREATE MENU ERROR:',
      error,
    )

    res.status(500).json({
      success: false,
      message:
        'Could not create menu item',
    })
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE MENU ITEM
|--------------------------------------------------------------------------
*/

export const updateMenuItem = async (
  req,
  res,
) => {
  try {
    const item = await Menu.findById(
      req.params.id,
    )

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      })
    }

    const {
      category,
      name,
      price,
      order,
      available,
    } = req.body

    if (category !== undefined) {
      item.category =
        String(category).trim()
    }

    if (name !== undefined) {
      item.name =
        String(name).trim()
    }

    if (price !== undefined) {
      item.price =
        String(price).trim()
    }

    if (order !== undefined) {
      item.order =
        Number(order) || 0
    }

    if (available !== undefined) {
      item.available =
        available
    }

    await item.save()

    res.json({
      success: true,
      message:
        'Menu item updated successfully',
      menu: item,
    })
  } catch (error) {
    console.error(
      'UPDATE MENU ERROR:',
      error,
    )

    res.status(500).json({
      success: false,
      message:
        'Could not update menu item',
    })
  }
}

/*
|--------------------------------------------------------------------------
| DELETE MENU ITEM
|--------------------------------------------------------------------------
*/

export const deleteMenuItem = async (
  req,
  res,
) => {
  try {
    const item = await Menu.findById(
      req.params.id,
    )

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      })
    }

    await Menu.findByIdAndDelete(
      req.params.id,
    )

    res.json({
      success: true,
      message:
        'Menu item deleted successfully',
    })
  } catch (error) {
    console.error(
      'DELETE MENU ERROR:',
      error,
    )

    res.status(500).json({
      success: false,
      message:
        'Could not delete menu item',
    })
  }
}