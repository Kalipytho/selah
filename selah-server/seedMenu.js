import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Menu from './models/Menu.js'

dotenv.config()

const menuData = [
  // =====================================================
  // 1. BURGERS
  // =====================================================
  {
    category: 'Burgers',
    items: [
      { name: 'Chicken Burger', price: '700 ETB' },
      { name: 'Double Burger', price: '590 ETB' },
      { name: 'Special Burger', price: '570 ETB' },
      { name: 'Cheese Burger', price: '550 ETB' },
      { name: 'Beef Burger', price: '520 ETB' },
    ],
  },

  // =====================================================
  // 2. FRESH PIZZA
  // =====================================================
  {
    category: 'Fresh Pizza',
    items: [
      { name: 'Special House Pizza', price: '700 ETB' },
      { name: 'Tuna with Cheese Pizza', price: '700 ETB' },
      { name: 'Margherita Pizza', price: '680 ETB' },
      { name: 'Chicken / Beef Pizza', price: '650 ETB' },
      { name: 'Pizza be Atkilt (Veggie)', price: '600 ETB' },
      { name: 'Four Seasons Pizza', price: '550 ETB' },
      { name: 'Mini Personal Pizza', price: '600 ETB' },
    ],
  },

  // =====================================================
  // 3. SANDWICHES & SIDES
  // =====================================================
  {
    category: 'Sandwiches & Sides',
    items: [
      { name: 'Club Sandwich (Full)', price: '580 ETB' },
      { name: 'Club Sandwich (Half)', price: '290 ETB' },
      { name: 'Beef Sandwich', price: '450 ETB' },
      { name: 'Chicken Sandwich', price: '400 ETB' },
      { name: 'Tuna Sandwich', price: '300 ETB' },
      { name: 'Egg Sandwich', price: '270 ETB' },
      { name: 'Vegetable Sandwich', price: '220 ETB' },
      { name: 'Fries / Sambusa Combo', price: '250 / 230 ETB' },
    ],
  },

  // =====================================================
  // 4. HOT BREWS
  // =====================================================
  {
    category: 'Hot Brews',
    items: [
      { name: 'Shay (Tea)', price: '40 ETB' },
      { name: 'Keredede Shay', price: '40 ETB' },
      { name: 'Tosign Shay', price: '40 ETB' },
      { name: 'Kerela Shay', price: '40 ETB' },
      { name: 'Arengwade Shay', price: '40 ETB' },
      { name: 'Buna (Jebena Coffee)', price: '50 ETB' },
      { name: 'Espresso / Machine', price: '60 ETB' },
      { name: 'Keher Tea', price: '60 ETB' },
      { name: 'Zenjebal Shay (Ginger)', price: '60 ETB' },
      { name: 'Lemon Tea', price: '60 ETB' },
      { name: 'Acholini Tea', price: '110 ETB' },
      { name: 'Macchiato', price: '110 ETB' },
      { name: 'Fruit Tea (Orange/Pineapple)', price: '110 ETB' },
      { name: 'Wetet (Milk)', price: '120 ETB' },
      { name: 'Milk Tea', price: '120 ETB' },
      { name: 'Special Spiced Tea', price: '140 ETB' },
      { name: 'Vegan Macchiato', price: '150 ETB' },
      { name: 'Cappuccino', price: '150 ETB' },
      { name: 'Hot Chocolate / Berry', price: '150 ETB' },
    ],
  },

  // =====================================================
  // 5. FRESH JUICES
  // =====================================================
  {
    category: 'Fresh Juices',
    items: [
      { name: 'Special House Juice', price: '280 ETB' },
      { name: 'Fresh Avocado Juice', price: '240 ETB' },
      { name: 'Fresh Papaya Juice', price: '200 ETB' },
      { name: 'Fresh Pineapple Juice', price: '200 ETB' },
      { name: 'Layered Espresso Juice', price: '200 ETB' },
    ],
  },

  // =====================================================
  // 6. COLD & SOFT DRINKS
  // =====================================================
  {
    category: 'Cold & Soft Drinks',
    items: [
      { name: 'Ambo / Malta Guinness', price: '85 ETB' },
      { name: 'Soft Drinks', price: '75 ETB' },
      { name: 'Bottled Water (2L / 1L / 0.5L)', price: '70 / 60 / 40 ETB' },
      { name: 'Iced Coffee / Latte', price: '—' },
      { name: 'Iced Tea', price: '—' },
    ],
  },

  // =====================================================
  // 7. TRADITIONAL DISHES
  // =====================================================
  {
    category: 'Traditional Dishes',
    items: [
      { name: 'Normal Ful', price: '160 ETB' },
      { name: 'Special Ful', price: '200 ETB' },
      { name: 'Normal Fetira', price: '230 ETB' },
      { name: 'Special Fetira', price: '270 ETB' },
      { name: 'Normal Chechebsa', price: '210 ETB' },
      { name: 'Chechebsa by Teff', price: '210 ETB' },
      { name: 'Special Chechebsa', price: '230 ETB' },
      { name: 'Special with Teff', price: '230 ETB' },
      { name: 'Suf Fitfit', price: '120 ETB' },
    ],
  },

  // =====================================================
  // 8. EGGS & QUICK BITES
  // =====================================================
  {
    category: 'Eggs & Quick Bites',
    items: [
      { name: 'Plain Omelet', price: '320 ETB' },
      { name: 'Special Omelet', price: '350 ETB' },
      { name: 'Scrambled with Beef', price: '300 ETB' },
      { name: 'Egg Firfir', price: '180 ETB' },
      { name: 'French Toast', price: '200 ETB' },
      { name: 'Normal Ertib', price: '150 ETB' },
      { name: 'Special Ertib', price: '200 ETB' },
      { name: 'Pancake / Pastry', price: '100 / 70 ETB' },
    ],
  },

  // =====================================================
  // 9. PASTA & RICE
  // =====================================================
  {
    category: 'Pasta & Rice',
    items: [
      { name: 'Pasta / Rice with Meat', price: '320 ETB' },
      { name: 'Pasta / Rice with Veggie', price: '200 ETB' },
      { name: 'Pasta / Rice with Silis', price: '190 ETB' },
    ],
  },

  // =====================================================
  // 10. FRESH SALADS
  // =====================================================
  {
    category: 'Fresh Salads',
    items: [
      { name: 'Special House Salad', price: '350 ETB' },
      { name: 'Mixed Salad', price: '350 ETB' },
      { name: 'Tuna Salad', price: '350 ETB' },
      { name: 'Tomato Salad', price: '150 ETB' },
      { name: 'Timatim Lebleb', price: '150 ETB' },
    ],
  },

  // =====================================================
  // 11. TIBS & STEWS
  // =====================================================
  {
    category: 'Tibs & Stews',
    items: [
      { name: 'Lamb Tibs', price: '550 ETB' },
      { name: 'Tenderloin Beef Tibs', price: '380 ETB' },
      { name: 'Traditional Dulet', price: '380 ETB' },
      { name: 'Bozena Shiro', price: '380 ETB' },
      { name: 'Tegabino Shiro', price: '200 ETB' },
    ],
  },

  // =====================================================
  // 12. FIRFIR SELECTION
  // =====================================================
  {
    category: 'Firfir Selection',
    items: [
      { name: 'Morning Special Firfir', price: '540 ETB' },
      { name: 'Special Meat Firfir', price: '430 ETB' },
      { name: 'Beef Kuanta Firfir', price: '380 ETB' },
      { name: 'Beef Tibs Firfir', price: '330 ETB' },
      { name: 'Special Fasting Firfir', price: '280 ETB' },
      { name: 'Special Firfir', price: '250 ETB' },
      { name: 'Firfir with Spiced Butter', price: '210 ETB' },
      { name: 'Dabo Firfir', price: '170 ETB' },
      { name: 'Plain Fasting Firfir', price: '170 ETB' },
    ],
  },

  // =====================================================
  // 13. COMBOS (HALF & HALF)
  // =====================================================
  {
    category: 'Combos (Half & Half)',
    items: [
      { name: 'Kuanta & Egg Firfir', price: '480 ETB' },
      { name: 'Bozena & Lamb Tibs', price: '490 ETB' },
      { name: 'Lamb Tibs & Dulet', price: '520 ETB' },
      { name: 'Pasta & Chikna Tibs', price: '500 ETB' },
      { name: 'Tegabino & Kuanta', price: '390 ETB' },
      { name: 'Tibs Firfir & Silis', price: '340 ETB' },
      { name: 'Pasta Meat & Egg Firfir', price: '310 ETB' },
      { name: 'Veg Pasta & Tegabino', price: '250 ETB' },
      { name: 'Tegabino & Fasting Firfir', price: '240 ETB' },
      { name: 'Pasta Silis & Tegabino', price: '240 ETB' },
      { name: 'Tegabino & Silis', price: '220 ETB' },
      { name: 'Pasta Silis & Firfir', price: '210 ETB' },
      { name: 'Fasting Firfir & Silis', price: '200 ETB' },
    ],
  },
]

const seedMenu = async () => {
  try {
    // -----------------------------------------------------
    // Connect to MongoDB
    // -----------------------------------------------------
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from your .env file')
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log('========================================')
    console.log('Connected to MongoDB')
    console.log('Starting Selah menu import...')
    console.log('========================================')

    // -----------------------------------------------------
    // Check existing menu
    // -----------------------------------------------------
    const existingCount = await Menu.countDocuments()

    if (existingCount > 0) {
      console.log('')
      console.log(`Menu already contains ${existingCount} items.`)
      console.log('Seed cancelled to prevent duplicate menu items.')
      console.log('')
      console.log('If you want to completely replace the existing menu,')
      console.log('delete the existing Menu documents first.')
      console.log('')

      await mongoose.disconnect()
      process.exit(0)
    }

    // -----------------------------------------------------
    // Convert categories/items into MongoDB documents
    // -----------------------------------------------------
    const documents = []

    menuData.forEach((category, categoryIndex) => {
      category.items.forEach((item, itemIndex) => {
        documents.push({
          category: category.category,
          name: item.name,
          price: item.price,

          // Keeps the original category order
          // and item order inside each category.
          order: (categoryIndex + 1) * 100 + (itemIndex + 1),

          available: true,
        })
      })
    })

    // -----------------------------------------------------
    // Insert all menu items
    // -----------------------------------------------------
    await Menu.insertMany(documents)

    // -----------------------------------------------------
    // Success information
    // -----------------------------------------------------
    console.log('')
    console.log('========================================')
    console.log('SELah MENU IMPORT SUCCESSFUL')
    console.log('========================================')
    console.log(`Categories: ${menuData.length}`)
    console.log(`Menu items: ${documents.length}`)
    console.log('========================================')
    console.log('')

    menuData.forEach((category) => {
      console.log(`${category.category}: ${category.items.length} items`)
    })

    console.log('')
    console.log('Your original Selah menu is now in MongoDB.')
    console.log('')

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('')
    console.error('========================================')
    console.error('MENU IMPORT FAILED')
    console.error('========================================')
    console.error(error.message)
    console.error('========================================')
    console.error('')

    await mongoose.disconnect().catch(() => {})
    process.exit(1)
  }
}

seedMenu()