import { useEffect, useState } from 'react'

const API_URL = 'https://selah-qsla.onrender.com/api'

const DEFAULT_SETTINGS = {
  // Business
  businessName: 'Selah Coffee',
  email: 'zkaya8780@gmail.com',
  phone1: '0911796148',
  phone2: '0988193029',
  phone3: '0953152075',
  location: 'Lebu · Addis Ababa, Ethiopia',
  telegram: 'https://t.me/selahcoffee',
  openingHours: 'Open daily · 7:00 AM — 9:00 PM',
  aboutText:
    'A place to pause, reflect, connect, and enjoy carefully prepared coffee.',

  // Story
  storyEyebrow: 'Our story',
  storyTitle: 'Coffee is the beginning. Connection is the reason.',
  storyDescription:
    "Selah was created around a simple idea: coffee tastes better when you have time to enjoy it. Inspired by Ethiopia's deep coffee culture, we bring together thoughtful brewing, honest ingredients, and an atmosphere that invites conversation.",

  storyImage:
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85',

  storyCardText:
    'Rooted in coffee. Built around people.',

  storyValue1Title: 'Thoughtful',
  storyValue1Text:
    'Every detail has a purpose.',

  storyValue2Title: 'Crafted',
  storyValue2Text:
    'Simple ingredients, carefully prepared.',

  storyValue3Title: 'Human',
  storyValue3Text:
    'Made for conversations and connection.',
}

function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_URL}/settings`, {
        cache: 'no-store',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Could not load settings'
        )
      }

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(data.settings || {}),
      })
    } catch (error) {
      console.error('Settings error:', error)

      setError(
        error.message || 'Could not load settings'
      )

      // Keep default values if the server is unavailable
      setSettings(DEFAULT_SETTINGS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  return {
    settings,
    loading,
    error,
    refreshSettings: loadSettings,
  }
}

export default useSettings