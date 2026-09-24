import { useEffect, useState } from 'react'
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Save,
  Send,
  Building2,
  FileText,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react'

import AdminSidebar from '../components/AdminSidebar'

const API_URL = 'http://localhost:5000/api'

const DEFAULT_SETTINGS = {
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
  storyCardText: 'Rooted in coffee. Built around people.',
  storyValue1Title: 'Thoughtful',
  storyValue1Text: 'Carefully selected beans and ingredients.',
  storyValue2Title: 'Crafted',
  storyValue2Text: 'Every cup gets the attention it deserves.',
  storyValue3Title: 'Human',
  storyValue3Text: 'A place made for people, not just coffee.',
}

function AdminSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const token = localStorage.getItem('selah_admin_token')

  // ==================================================
  // LOAD SETTINGS
  // ==================================================

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
          data.message || 'Could not load website settings.'
        )
      }

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(data.settings || {}),
      })
    } catch (error) {
      console.error('Load settings error:', error)

      setError(
        error.message || 'Could not load website settings.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ==================================================
  // CHECK LOGIN + LOAD SETTINGS
  // ==================================================

  useEffect(() => {
    if (!token) {
      window.location.href = '/admin/login'
      return
    }

    loadSettings()
  }, [])

  // ==================================================
  // UPDATE FIELD
  // ==================================================

  const updateField = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }))

    setSuccess('')
    setError('')
  }

  // ==================================================
  // VALIDATE
  // ==================================================

  const validateSettings = () => {
    if (!settings.businessName.trim()) {
      return 'Business name is required.'
    }

    if (!settings.email.trim()) {
      return 'Email address is required.'
    }

    if (!settings.location.trim()) {
      return 'Location is required.'
    }

    if (!settings.aboutText.trim()) {
      return 'About text is required.'
    }

    if (!settings.storyTitle.trim()) {
      return 'Story title is required.'
    }

    if (!settings.storyDescription.trim()) {
      return 'Story description is required.'
    }

    return null
  }

  // ==================================================
  // SAVE SETTINGS
  // ==================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateSettings()

    if (validationError) {
      setError(validationError)
      setSuccess('')
      return
    }

    try {
      setSaving(true)
      setSuccess('')
      setError('')

      const response = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Could not save website settings.'
        )
      }

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(data.settings || {}),
      })

      setSuccess(
        'Settings saved successfully. Your website information has been updated.'
      )
    } catch (error) {
      console.error('Save settings error:', error)

      setError(
        error.message || 'Could not save website settings.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5efe6]">
        <AdminSidebar />

        <main className="lg:pl-72">
          <div className="flex min-h-screen items-center justify-center p-10">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#2c211b]/10 border-t-[#a65d3b]" />

              <p className="mt-4 text-sm text-[#2c211b]/60">
                Loading website settings...
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-[#f5efe6]">
      <AdminSidebar />

      <main className="lg:pl-72">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10">

          {/* HEADER */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a65d3b]">
              Website configuration
            </p>

            <h1 className="mt-2 font-display text-4xl text-[#2c211b]">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#2c211b]/50">
              Manage the information that appears throughout your
              Selah Coffee website.
            </p>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mt-6 rounded-2xl border border-[#394337]/10 bg-[#394337]/10 px-4 py-4 text-sm text-[#394337]">
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mt-6 rounded-2xl border border-[#a65d3b]/10 bg-[#a65d3b]/10 px-4 py-4 text-sm text-[#7c3f29]">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* ==================================================
                BUSINESS INFORMATION
            ================================================== */}

            <section className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              <div className="flex items-center gap-3">
                <Building2
                  size={20}
                  className="text-[#a65d3b]"
                />

                <div>
                  <h2 className="font-display text-2xl text-[#2c211b]">
                    Business information
                  </h2>

                  <p className="mt-1 text-sm text-[#2c211b]/45">
                    Main information about your coffee shop.
                  </p>
                </div>
              </div>

              {/* BUSINESS NAME */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Business name
                </label>

                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) =>
                    updateField(
                      'businessName',
                      e.target.value
                    )
                  }
                  placeholder="Selah Coffee"
                  className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />
              </div>

              {/* ABOUT TEXT */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <FileText
                    size={16}
                    className="text-[#a65d3b]"
                  />

                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                    About text
                  </label>
                </div>

                <textarea
                  rows={5}
                  value={settings.aboutText}
                  onChange={(e) =>
                    updateField(
                      'aboutText',
                      e.target.value
                    )
                  }
                  placeholder="Tell visitors about Selah Coffee..."
                  className="mt-2 w-full resize-none rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm leading-6 text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />

                <p className="mt-2 text-xs text-[#2c211b]/40">
                  This text is used by the public website Hero section.
                </p>
              </div>
            </section>


            {/* ==================================================
                OUR STORY
            ================================================== */}

            <section className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              <div className="flex items-center gap-3">
                <BookOpen
                  size={20}
                  className="text-[#a65d3b]"
                />

                <div>
                  <h2 className="font-display text-2xl text-[#2c211b]">
                    Our Story
                  </h2>

                  <p className="mt-1 text-sm text-[#2c211b]/45">
                    Control the content displayed in the public
                    Our Story section.
                  </p>
                </div>
              </div>


              {/* STORY EYEBROW */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Small heading
                </label>

                <input
                  type="text"
                  value={settings.storyEyebrow}
                  onChange={(e) =>
                    updateField(
                      'storyEyebrow',
                      e.target.value
                    )
                  }
                  placeholder="Our story"
                  className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />
              </div>


              {/* STORY TITLE */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Story title
                </label>

                <input
                  type="text"
                  value={settings.storyTitle}
                  onChange={(e) =>
                    updateField(
                      'storyTitle',
                      e.target.value
                    )
                  }
                  placeholder="Coffee is the beginning. Connection is the reason."
                  className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />
              </div>


              {/* STORY DESCRIPTION */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Story description
                </label>

                <textarea
                  rows={6}
                  value={settings.storyDescription}
                  onChange={(e) =>
                    updateField(
                      'storyDescription',
                      e.target.value
                    )
                  }
                  placeholder="Write your Selah story..."
                  className="mt-2 w-full resize-none rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm leading-6 text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />
              </div>


              {/* STORY IMAGE */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <ImageIcon
                    size={16}
                    className="text-[#a65d3b]"
                  />

                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                    Story image URL
                  </label>
                </div>

                <input
                  type="url"
                  value={settings.storyImage}
                  onChange={(e) =>
                    updateField(
                      'storyImage',
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                  className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />

                {/* IMAGE PREVIEW */}
                {settings.storyImage && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#2c211b]/10">
                    <img
                      src={settings.storyImage}
                      alt="Story preview"
                      className="h-56 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>


              {/* FLOATING CARD TEXT */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Story card text
                </label>

                <input
                  type="text"
                  value={settings.storyCardText}
                  onChange={(e) =>
                    updateField(
                      'storyCardText',
                      e.target.value
                    )
                  }
                  placeholder="Rooted in coffee. Built around people."
                  className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                />
              </div>


              {/* VALUES */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-[#2c211b]">
                  Story values
                </h3>

                <p className="mt-1 text-xs text-[#2c211b]/40">
                  These are the three values displayed in the
                  Our Story section.
                </p>
              </div>


              {/* VALUE 1 */}
              <div className="mt-5 rounded-2xl bg-[#fdfbf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a65d3b]">
                  Value 01
                </p>

                <input
                  type="text"
                  value={settings.storyValue1Title}
                  onChange={(e) =>
                    updateField(
                      'storyValue1Title',
                      e.target.value
                    )
                  }
                  placeholder="Thoughtful"
                  className="mt-4 w-full rounded-xl border border-[#2c211b]/10 bg-white px-4 py-3 text-sm text-[#2c211b] outline-none focus:border-[#a65d3b]/40"
                />

                <textarea
                  rows={3}
                  value={settings.storyValue1Text}
                  onChange={(e) =>
                    updateField(
                      'storyValue1Text',
                      e.target.value
                    )
                  }
                  placeholder="Carefully selected beans and ingredients."
                  className="mt-3 w-full resize-none rounded-xl border border-[#2c211b]/10 bg-white px-4 py-3 text-sm leading-6 text-[#2c211b] outline-none focus:border-[#a65d3b]/40"
                />
              </div>


              {/* VALUE 2 */}
              <div className="mt-4 rounded-2xl bg-[#fdfbf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a65d3b]">
                  Value 02
                </p>

                <input
                  type="text"
                  value={settings.storyValue2Title}
                  onChange={(e) =>
                    updateField(
                      'storyValue2Title',
                      e.target.value
                    )
                  }
                  placeholder="Crafted"
                  className="mt-4 w-full rounded-xl border border-[#2c211b]/10 bg-white px-4 py-3 text-sm text-[#2c211b] outline-none focus:border-[#a65d3b]/40"
                />

                <textarea
                  rows={3}
                  value={settings.storyValue2Text}
                  onChange={(e) =>
                    updateField(
                      'storyValue2Text',
                      e.target.value
                    )
                  }
                  placeholder="Every cup gets the attention it deserves."
                  className="mt-3 w-full resize-none rounded-xl border border-[#2c211b]/10 bg-white px-4 py-3 text-sm leading-6 text-[#2c211b] outline-none focus:border-[#a65d3b]/40"
                />
              </div>


              {/* VALUE 3 */}
              <div className="mt-4 rounded-2xl bg-[#fdfbf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a65d3b]">
                  Value 03
                </p>

                <input
                  type="text"
                  value={settings.storyValue3Title}
                  onChange={(e) =>
                    updateField(
                      'storyValue3Title',
                      e.target.value
                    )
                  }
                  placeholder="Human"
                  className="mt-4 w-full rounded-xl border border-[#2c211b]/10 bg-white px-4 py-3 text-sm text-[#2c211b] outline-none focus:border-[#a65d3b]/40"
                />

                <textarea
                  rows={3}
                  value={settings.storyValue3Text}
                  onChange={(e) =>
                    updateField(
                      'storyValue3Text',
                      e.target.value
                    )
                  }
                  placeholder="A place made for people, not just coffee."
                  className="mt-3 w-full resize-none rounded-xl border border-[#2c211b]/10 bg-white px-4 py-3 text-sm leading-6 text-[#2c211b] outline-none focus:border-[#a65d3b]/40"
                />
              </div>

            </section>


            {/* ==================================================
                CONTACT INFORMATION
            ================================================== */}

            <section className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              <div className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="text-[#a65d3b]"
                />

                <div>
                  <h2 className="font-display text-2xl text-[#2c211b]">
                    Contact information
                  </h2>

                  <p className="mt-1 text-sm text-[#2c211b]/45">
                    Phone numbers and email used by your customers.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {[
                  ['email', 'Email', Mail, 'email@example.com'],
                  ['phone1', 'Phone 1', Phone, '0911796148'],
                  ['phone2', 'Phone 2', Phone, '0988193029'],
                  ['phone3', 'Phone 3', Phone, '0953152075'],
                ].map(
                  ([field, label, Icon, placeholder]) => (
                    <div key={field}>

                      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                        {label}
                      </label>

                      <div className="relative mt-2">

                        <Icon
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2c211b]/30"
                        />

                        <input
                          type={
                            field === 'email'
                              ? 'email'
                              : 'text'
                          }
                          value={settings[field]}
                          onChange={(e) =>
                            updateField(
                              field,
                              e.target.value
                            )
                          }
                          placeholder={placeholder}
                          className="w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] py-3.5 pl-11 pr-4 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                        />

                      </div>
                    </div>
                  )
                )}

              </div>
            </section>


            {/* ==================================================
                LOCATION & SOCIAL
            ================================================== */}

            <section className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              <h2 className="font-display text-2xl text-[#2c211b]">
                Location & social
              </h2>

              <p className="mt-1 text-sm text-[#2c211b]/45">
                Where customers can find and connect with Selah.
              </p>

              {/* LOCATION */}
              <div className="mt-6">

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Location
                </label>

                <div className="relative mt-2">

                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2c211b]/30"
                  />

                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) =>
                      updateField(
                        'location',
                        e.target.value
                      )
                    }
                    placeholder="Lebu · Addis Ababa, Ethiopia"
                    className="w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] py-3.5 pl-11 pr-4 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                  />

                </div>
              </div>


              {/* TELEGRAM */}
              <div className="mt-6">

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                  Telegram link
                </label>

                <div className="relative mt-2">

                  <Send
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2c211b]/30"
                  />

                  <input
                    type="url"
                    value={settings.telegram}
                    onChange={(e) =>
                      updateField(
                        'telegram',
                        e.target.value
                      )
                    }
                    placeholder="https://t.me/selahcoffee"
                    className="w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] py-3.5 pl-11 pr-4 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
                  />

                </div>

                <p className="mt-2 text-xs text-[#2c211b]/40">
                  Customers can use this link to join or contact
                  your Telegram community.
                </p>

              </div>
            </section>


            {/* ==================================================
                OPENING HOURS
            ================================================== */}

            <section className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              <div className="flex items-center gap-3">

                <Clock3
                  size={20}
                  className="text-[#a65d3b]"
                />

                <div>
                  <h2 className="font-display text-2xl text-[#2c211b]">
                    Opening hours
                  </h2>

                  <p className="mt-1 text-sm text-[#2c211b]/45">
                    Tell customers when Selah is open.
                  </p>
                </div>

              </div>

              <input
                type="text"
                value={settings.openingHours}
                onChange={(e) =>
                  updateField(
                    'openingHours',
                    e.target.value
                  )
                }
                placeholder="Open daily · 7:00 AM — 9:00 PM"
                className="mt-6 w-full rounded-2xl border border-[#2c211b]/10 bg-[#fdfbf8] px-4 py-3.5 text-sm text-[#2c211b] outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/5"
              />

            </section>


            {/* ==================================================
                SAVE BUTTON
            ================================================== */}

            <div className="flex flex-wrap items-center gap-4">

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-[#2c211b] px-7 py-3.5 text-sm font-semibold text-[#f5efe6] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#6f4e37] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >

                <Save size={17} />

                {saving
                  ? 'Saving settings...'
                  : 'Save settings'}

              </button>

              {saving && (
                <span className="text-xs text-[#2c211b]/40">
                  Updating your website information...
                </span>
              )}

            </div>

          </form>
        </div>
      </main>
    </div>
  )
}

export default AdminSettings