import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'Selah Coffee',
    },

    email: {
      type: String,
      default: 'zkaya8780@gmail.com',
    },

    phone1: {
      type: String,
      default: '0911796148',
    },

    phone2: {
      type: String,
      default: '0988193029',
    },

    phone3: {
      type: String,
      default: '0953152075',
    },

    location: {
      type: String,
      default: 'Lebu · Addis Ababa, Ethiopia',
    },

    telegram: {
      type: String,
      default: 'https://t.me/selahcoffee',
    },

    openingHours: {
      type: String,
      default: 'Open daily · 7:00 AM — 9:00 PM',
    },

    aboutText: {
      type: String,
      default:
        'A place to pause, reflect, connect, and enjoy carefully prepared coffee.',
    },

    // ==================================================
    // OUR STORY
    // ==================================================

    storyEyebrow: {
      type: String,
      default: 'Our story',
    },

    storyTitle: {
      type: String,
      default:
        'Coffee is the beginning. Connection is the reason.',
    },

    storyDescription: {
      type: String,
      default:
        "Selah was created around a simple idea: coffee tastes better when you have time to enjoy it. Inspired by Ethiopia's deep coffee culture, we bring together thoughtful brewing, honest ingredients, and an atmosphere that invites conversation.",
    },

    storyImage: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85',
    },

    storyCardText: {
      type: String,
      default:
        'Rooted in coffee. Built around people.',
    },

    storyValue1Title: {
      type: String,
      default: 'Thoughtful',
    },

    storyValue1Text: {
      type: String,
      default:
        'Carefully selected beans and ingredients.',
    },

    storyValue2Title: {
      type: String,
      default: 'Crafted',
    },

    storyValue2Text: {
      type: String,
      default:
        'Every cup gets the attention it deserves.',
    },

    storyValue3Title: {
      type: String,
      default: 'Human',
    },

    storyValue3Text: {
      type: String,
      default:
        'A place made for people, not just coffee.',
    },
  },
  {
    timestamps: true,
  }
)

const Settings = mongoose.model('Settings', settingsSchema)

export default Settings