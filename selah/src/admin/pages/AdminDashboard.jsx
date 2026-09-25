import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Coffee,
  Image,
  Menu,
  MessageCircle,
  Plus,
  Settings,
} from 'lucide-react'

import AdminSidebar from '../components/AdminSidebar'

const API_URL = 'https://selah-qsla.onrender.com/api'

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [galleryCount, setGalleryCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('selah_admin_token')
    const savedAdmin = localStorage.getItem('selah_admin')

    if (!token) {
      window.location.href = '/admin/login'
      return
    }

    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin))
      } catch {
        localStorage.removeItem('selah_admin')
      }
    }

    const loadGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/gallery`)
        const data = await response.json()

        if (data.success) {
          setGalleryCount(data.gallery.length)
        }
      } catch (error) {
        console.error('Could not load gallery:', error)
      }
    }

    loadGallery()
  }, [])

  const stats = [
    {
      title: 'Gallery Photos',
      value: galleryCount,
      icon: Image,
      href: '/admin/gallery',
    },
    {
      title: 'Menu Items',
      value: '—',
      icon: Coffee,
      href: '/admin/menu',
    },
    {
      title: 'Messages',
      value: '—',
      icon: MessageCircle,
      href: '/admin/messages',
    },
    {
      title: 'Settings',
      value: '—',
      icon: Settings,
      href: '/admin/settings',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5efe6] text-[#2c211b]">

      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="lg:pl-72">

        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-[#2c211b]/10 bg-[#f5efe6]/90 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2c211b]/10 bg-white text-[#2c211b] transition hover:bg-[#2c211b] hover:text-[#f5efe6] lg:hidden"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2c211b]/35">
                  Selah Admin
                </p>

                <h1 className="mt-1 font-display text-xl sm:text-2xl">
                  Dashboard
                </h1>
              </div>

            </div>

            <div className="hidden items-center gap-3 sm:flex">

              <div className="text-right">
                <p className="text-sm font-semibold">
                  {admin?.name || 'Selah Admin'}
                </p>

                <p className="text-xs text-[#2c211b]/40">
                  {admin?.email || 'Administrator'}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2c211b] font-display text-lg text-[#f5efe6]">
                S
              </div>

            </div>

          </div>

        </header>

        {/* Dashboard content */}
        <main className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">

          {/* Welcome */}
          <section className="relative overflow-hidden rounded-[2rem] bg-[#2c211b] p-7 text-[#f5efe6] shadow-xl shadow-[#2c211b]/10 sm:p-10">

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d8c7b0]/10" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#a65d3b]/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl">

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8c7b0]/60">
                Welcome back
              </p>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                Manage your Selah website.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                Update your gallery, menu, contact information, and other
                website content from one place.
              </p>

              <a
                href="/admin/gallery"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#f5efe6] px-5 py-3 text-sm font-semibold text-[#2c211b] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                Manage gallery

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

            </div>

          </section>

          {/* Stats */}
          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <a
                  key={stat.title}
                  href={stat.href}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#2c211b]/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#a65d3b]/20 hover:shadow-xl hover:shadow-[#2c211b]/5"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5efe6] text-[#a65d3b] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={20} />
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-[#2c211b]/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a65d3b]"
                    />

                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/35">
                    {stat.title}
                  </p>

                  <p className="mt-2 font-display text-4xl">
                    {stat.value}
                  </p>

                </a>
              )
            })}

          </section>

          {/* Quick actions */}
          <section className="mt-10">

            <div className="flex items-end justify-between gap-5">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a65d3b]">
                  Quick actions
                </p>

                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  What would you like to update?
                </h2>
              </div>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {/* Gallery */}
              <a
                href="/admin/gallery"
                className="group flex items-center justify-between rounded-[1.5rem] border border-[#2c211b]/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#a65d3b]/20 hover:shadow-xl"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5efe6] text-[#a65d3b]">
                    <Image size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Add gallery photo
                    </h3>

                    <p className="mt-1 text-xs text-[#2c211b]/40">
                      Upload a new photo to your website.
                    </p>
                  </div>

                </div>

                <Plus
                  size={20}
                  className="text-[#2c211b]/25 transition-all duration-300 group-hover:rotate-90 group-hover:text-[#a65d3b]"
                />

              </a>

              {/* Menu */}
              <a
                href="/admin/menu"
                className="group flex items-center justify-between rounded-[1.5rem] border border-[#2c211b]/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#a65d3b]/20 hover:shadow-xl"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5efe6] text-[#a65d3b]">
                    <Coffee size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Manage menu
                    </h3>

                    <p className="mt-1 text-xs text-[#2c211b]/40">
                      Update food, drinks, and prices.
                    </p>
                  </div>

                </div>

                <Plus
                  size={20}
                  className="text-[#2c211b]/25 transition-all duration-300 group-hover:rotate-90 group-hover:text-[#a65d3b]"
                />

              </a>

            </div>

          </section>

          {/* Information */}
          <section className="mt-10 rounded-[1.5rem] border border-[#2c211b]/10 bg-white p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2c211b]/35">
                  Website status
                </p>

                <h2 className="mt-2 font-display text-2xl">
                  Selah Coffee website
                </h2>
              </div>

              <div className="flex items-center gap-2">

                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6f4e37] opacity-40" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#6f4e37]" />
                </span>

                <span className="text-sm font-medium text-[#2c211b]/60">
                  Backend connected
                </span>

              </div>

            </div>

            <div className="mt-6 border-t border-[#2c211b]/10 pt-6">

              <p className="text-sm leading-7 text-[#2c211b]/50">
                Your administration panel is connected to the Selah backend.
                Gallery content can be managed here once the gallery manager
                is added.
              </p>

            </div>

          </section>

        </main>

      </div>

    </div>
  )
}

export default AdminDashboard