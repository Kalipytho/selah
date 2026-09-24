import Settings from '../models/Settings.js'

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne()

    if (!settings) {
      settings = await Settings.create({})
    }

    res.json({
      success: true,
      settings,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Could not load settings',
    })
  }
}

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne()

    if (!settings) {
      settings = await Settings.create(req.body)
    } else {
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
          settings[key] = req.body[key]
        }
      })

      await settings.save()
    }

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Could not update settings',
    })
  }
}