import {
  BarChart3,
  Coffee,
  Image,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

function AdminSidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      name: 'Gallery',
      icon: Image,
      href: '/admin/gallery',
    },
    {
      name: 'Menu',
      icon: Coffee,
      href: '/admin/menu',
    },
    {
      name: 'Messages',
      icon: MessageCircle,
      href: '/admin/messages',
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/admin/settings',
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('selah_admin_token')
    localStorage.removeItem('selah_admin')

    window.location.href = '/admin/login'
  }

  return (
    <>
      {/* =========================================
          MOBILE OVERLAY
      ========================================== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#2c211b]/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[min(82vw,288px)] flex-col
          overflow-hidden
          bg-[#2c211b] text-[#f5efe6]
          shadow-2xl shadow-black/20
          transition-transform duration-300 ease-out
          lg:w-72
          lg:translate-x-0
          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* =========================================
            LOGO HEADER
        ========================================== */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:h-24 sm:px-7">

          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="group flex min-w-0 items-center"
          >
            <img
              src="/selahll.png"
              alt="Selah Coffee"
              className="
                h-12 w-auto max-w-[150px]
                object-contain
                transition-all duration-500
                group-hover:scale-105
                group-hover:-translate-y-0.5
                sm:h-14
              "
            />
          </NavLink>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              text-white/45
              transition-all duration-200
              hover:bg-white/10
              hover:text-white
              active:scale-95
              lg:hidden
            "
          >
            <X size={20} strokeWidth={2} />
          </button>

        </div>

        {/* =========================================
            ADMIN LABEL
        ========================================== */}
        <div className="shrink-0 px-5 pb-4 pt-6 sm:px-7 sm:pb-5 sm:pt-7">

          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8c7b0]/40">
            Administration
          </p>

          <p className="mt-1 text-xs text-white/25">
            Selah Coffee
          </p>

        </div>

        {/* =========================================
            NAVIGATION
        ========================================== */}
        <nav
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-3
            pb-4
            sm:px-4
          "
          aria-label="Admin navigation"
        >

          <div className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    group relative
                    flex min-h-[48px]
                    items-center gap-3
                    rounded-2xl
                    px-4 py-3
                    text-sm font-medium
                    transition-all duration-200
                    active:scale-[0.98]
                    ${
                      isActive
                        ? 'bg-[#f5efe6] text-[#2c211b] shadow-lg shadow-black/10'
                        : 'text-white/50 hover:bg-white/[0.06] hover:text-[#f5efe6]'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span
                          className="
                            absolute left-0
                            h-6 w-1
                            rounded-r-full
                            bg-[#a65d3b]
                          "
                        />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.9}
                        className={`
                          shrink-0
                          transition-all duration-200
                          ${
                            isActive
                              ? 'text-[#a65d3b]'
                              : 'text-white/30 group-hover:scale-110 group-hover:text-[#d8c7b0]'
                          }
                        `}
                      />

                      <span className="truncate">
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              )
            })}

          </div>

        </nav>

        {/* =========================================
            BOTTOM SECTION
        ========================================== */}
        <div className="shrink-0 border-t border-white/10 p-3 sm:p-4">

          {/* View website */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="
              group
              mb-1
              flex min-h-[46px]
              items-center gap-3
              rounded-2xl
              px-4 py-3
              text-sm
              text-white/40
              transition-all duration-200
              hover:bg-white/[0.06]
              hover:text-white
              active:scale-[0.98]
            "
          >
            <BarChart3
              size={18}
              className="shrink-0 transition-transform duration-200 group-hover:scale-110"
            />

            <span>View Website</span>
          </NavLink>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex w-full min-h-[46px]
              items-center gap-3
              rounded-2xl
              px-4 py-3
              text-left
              text-sm
              text-white/40
              transition-all duration-200
              hover:bg-[#a65d3b]/10
              hover:text-[#d8c7b0]
              active:scale-[0.98]
            "
          >
            <LogOut
              size={18}
              className="
                shrink-0
                transition-transform duration-300
                group-hover:-translate-x-0.5
              "
            />

            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  )
}

export default AdminSidebar