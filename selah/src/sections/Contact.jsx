import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const API_URL = 'https://selah-qsla.onrender.com/api'

function Contact() {
  const [settings, setSettings] = useState({
    businessName: 'Selah Coffee',
    email: 'zkaya8780@gmail.com',
    phone1: '0911796148',
    phone2: '0988193029',
    phone3: '0953152075',
    location: 'Lebu · Addis Ababa',
    telegram: 'https://t.me/selahcoffee',
    openingHours: '7:00 AM — 9:00 PM',
  })

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Load settings from Admin Settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${API_URL}/settings`)

        if (!response.ok) {
          throw new Error('Could not load settings')
        }

        const data = await response.json()

        if (data.success && data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
          }))
        }
      } catch (error) {
        console.error('Failed to load contact settings:', error)
      }
    }

    loadSettings()
  }, [])

  // Update form fields
  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit contact form
  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus('sending')
    setErrorMessage('')

    try {
      const formData = new FormData()

      formData.append('access_key', '581fafc9-4993-40cd-8b3b-09be72aefe8f')
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('message', form.message)
      formData.append(
        'subject',
        `New message from ${settings.businessName || 'Selah Coffee'} website`
      )
      formData.append('replyto', form.email)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')

        setForm({
          name: '',
          email: '',
          message: '',
        })

        setTimeout(() => {
          setStatus('idle')
        }, 5000)
      } else {
        setStatus('error')
        setErrorMessage(
          data.message || 'Something went wrong. Please try again.'
        )
      }
    } catch (error) {
      console.error(error)

      setStatus('error')
      setErrorMessage(
        'Something went wrong. Please check your connection and try again.'
      )
    }
  }

  // Create map URL from the location setting
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.location || 'Lebu, Addis Ababa, Ethiopia'
  )}`

  // Telegram URL
  const telegramUrl =
    settings.telegram || 'https://t.me/selahcoffee'

  // Telegram display name
  const telegramDisplay = telegramUrl
    .replace('https://t.me/', '@')
    .replace('http://t.me/', '@')
    .replace('t.me/', '@')

  // Location display
  const locationParts = (settings.location || 'Lebu · Addis Ababa').split(' · ')

  return (
    <section
      id="contact"
      className="relative z-[20] overflow-hidden bg-[#f5efe6] py-24 sm:py-32"
    >
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#a65d3b]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#394337]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[20%] top-[10%] h-24 w-24 rounded-full border border-[#a65d3b]/10" />

      <div className="container-selah relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* LEFT SIDE */}
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Come say hello."
              description="Have a question, want to share an idea, or simply want to say hello? We would love to hear from you."
            />

            {/* Contact information */}
            <div className="mt-10 space-y-4">
              {/* Location */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-3xl border border-[#2c211b]/10 bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#394337] text-[#f5efe6] transition duration-300 group-hover:scale-110">
                  <MapPin size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65d3b]">
                    Location
                  </p>

                  <p className="mt-1 text-base font-medium text-[#2c211b]">
                    {locationParts[0] || settings.location}
                    {locationParts.length > 1 && (
                      <>
                        <br />
                        {locationParts.slice(1).join(' · ')}
                      </>
                    )}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="mt-1 text-[#2c211b]/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a65d3b]"
                />
              </a>

              {/* Phone */}
              <div className="group rounded-3xl border border-[#2c211b]/10 bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#394337] text-[#f5efe6] transition duration-300 group-hover:scale-110">
                    <Phone size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65d3b]">
                      Call us
                    </p>

                    <div className="mt-1 space-y-1">
                      {settings.phone1 && (
                        <a
                          href={`tel:${settings.phone1}`}
                          className="block text-base font-medium text-[#2c211b] transition hover:text-[#a65d3b]"
                        >
                          {settings.phone1}
                        </a>
                      )}

                      {settings.phone2 && (
                        <a
                          href={`tel:${settings.phone2}`}
                          className="block text-base font-medium text-[#2c211b] transition hover:text-[#a65d3b]"
                        >
                          {settings.phone2}
                        </a>
                      )}

                      {settings.phone3 && (
                        <a
                          href={`tel:${settings.phone3}`}
                          className="block text-base font-medium text-[#2c211b] transition hover:text-[#a65d3b]"
                        >
                          {settings.phone3}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${settings.email}`}
                className="group flex items-start gap-4 rounded-3xl border border-[#2c211b]/10 bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#394337] text-[#f5efe6] transition duration-300 group-hover:scale-110">
                  <Mail size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65d3b]">
                    Email
                  </p>

                  <p className="mt-1 break-all text-base font-medium text-[#2c211b] transition group-hover:text-[#a65d3b]">
                    {settings.email}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-[#2c211b]/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a65d3b]"
                />
              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-3xl border border-[#2c211b]/10 bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#394337] text-[#f5efe6] transition duration-300 group-hover:scale-110">
                  <MessageCircle size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65d3b]">
                    Telegram
                  </p>

                  <p className="mt-1 text-base font-medium text-[#2c211b] transition group-hover:text-[#a65d3b]">
                    {telegramDisplay}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-[#2c211b]/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a65d3b]"
                />
              </a>
            </div>

            {/* Quick actions */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-[#394337] px-5 py-4 text-sm font-semibold text-[#f5efe6] transition duration-300 hover:-translate-y-1 hover:bg-[#2c211b] hover:shadow-lg"
              >
                <MessageCircle size={18} />
                Message on Telegram
                <ArrowUpRight
                  size={16}
                  className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-[#2c211b]/15 bg-white/70 px-5 py-4 text-sm font-semibold text-[#2c211b] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <Mail size={18} />
                Send an email
                <ArrowUpRight
                  size={16}
                  className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>

            {/* Opening hours */}
            <div className="mt-7 flex items-center gap-4 rounded-3xl bg-[#2c211b] p-5 text-[#f5efe6] shadow-xl">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#a65d3b]">
                <Clock3 size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5efe6]/60">
                  Opening hours
                </p>

                <p className="mt-1 text-base font-medium">
                  {settings.openingHours}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="relative">
            <div className="rounded-[2rem] bg-[#2c211b] p-6 shadow-2xl sm:p-8 lg:p-10">
              {/* Form header */}
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a65d3b] text-[#f5efe6]">
                  <Send size={20} />
                </div>

                <h3 className="font-display text-3xl text-[#f5efe6]">
                  Let&apos;s talk.
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#f5efe6]/60">
                  Send us a message and we&apos;ll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#f5efe6]/80"
                  >
                    Your name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-[#f5efe6]/10 bg-[#f5efe6]/5 px-5 py-4 text-sm text-[#f5efe6] outline-none transition duration-300 placeholder:text-[#f5efe6]/30 focus:border-[#a65d3b] focus:bg-[#f5efe6]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#f5efe6]/80"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#f5efe6]/10 bg-[#f5efe6]/5 px-5 py-4 text-sm text-[#f5efe6] outline-none transition duration-300 placeholder:text-[#f5efe6]/30 focus:border-[#a65d3b] focus:bg-[#f5efe6]/10"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#f5efe6]/80"
                  >
                    Your message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us what is on your mind..."
                    className="w-full resize-none rounded-2xl border border-[#f5efe6]/10 bg-[#f5efe6]/5 px-5 py-4 text-sm text-[#f5efe6] outline-none transition duration-300 placeholder:text-[#f5efe6]/30 focus:border-[#a65d3b] focus:bg-[#f5efe6]/10"
                  />
                </div>

                {/* Success message */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 rounded-2xl border border-green-400/20 bg-green-400/10 px-4 py-4 text-sm text-green-300">
                    <CheckCircle size={19} />
                    <span>
                      Your message has been sent successfully. Thank you!
                    </span>
                  </div>
                )}

                {/* Error message */}
                {status === 'error' && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-4 text-sm text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#a65d3b] px-6 py-4 text-sm font-semibold text-[#f5efe6] transition duration-300 hover:-translate-y-1 hover:bg-[#b96b47] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'sending' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f5efe6]/30 border-t-[#f5efe6]" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight
                          size={17}
                          className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </>
                    )}
                  </span>

                  {/* Shine effect */}
                  <span className="absolute inset-y-0 -left-20 w-12 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[110%]" />
                </button>
              </form>

              {/* Form footer */}
              <div className="mt-8 border-t border-[#f5efe6]/10 pt-6">
                <p className="text-center text-xs leading-5 text-[#f5efe6]/40">
                  We respect your privacy and only use your information to
                  respond to your message.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-20 text-center">
          <div className="mx-auto mb-5 h-px w-16 bg-[#a65d3b]/40" />

          <p className="font-display text-xl italic text-[#2c211b]/70 sm:text-2xl">
            &quot;Good coffee. Good people. Good moments.&quot;
          </p>

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#a65d3b]">
            {settings.businessName}
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes contactMessage {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default Contact