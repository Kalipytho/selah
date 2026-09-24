import { useState } from 'react'
import { Menu, X, MapPin, MessageCircle } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#story' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-selah pt-4">

        <nav className="rounded-2xl border border-[#2c211b]/10 bg-[#f5efe6]/95 px-4 py-3 shadow-lg shadow-[#2c211b]/5 backdrop-blur-md sm:px-6">

          <div className="flex items-center justify-between gap-4">

            {/* =====================================
                LOGO
                The container does NOT hover.
                Only the logo image hovers.
            ====================================== */}

            <a
              href="#home"
              onClick={closeMenu}
              className="group relative flex shrink-0 items-center"
            >

              {/* Logo container stays completely still */}

              <div className="relative">

                {/* Logo */}

                <img
                  src="/selaha-logo.png"
                  alt="Selah Coffee"
                  className="
                    relative z-10
                    h-12 w-auto
                    object-contain

                    transition-all
                    duration-500
                    ease-out

                    group-hover:scale-110
                    group-hover:-translate-y-1
                    group-hover:drop-shadow-[0_6px_10px_rgba(44,33,27,0.25)]

                    sm:h-14
                  "
                />

              </div>

            </a>


            {/* =====================================
                DESKTOP NAVIGATION
            ====================================== */}

            <div className="hidden items-center gap-6 lg:flex">

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    group relative
                    py-2
                    text-sm font-medium
                    text-[#2c211b]/70
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:text-[#a65d3b]
                  "
                >
                  {link.name}

                  {/* Animated underline */}

                  <span
                    className="
                      absolute
                      bottom-0 left-1/2
                      h-[2px]
                      w-0
                      -translate-x-1/2
                      rounded-full
                      bg-[#a65d3b]
                      transition-all duration-300
                      group-hover:w-full
                    "
                  />
                </a>
              ))}

            </div>


            {/* =====================================
                DESKTOP ACTIONS
            ====================================== */}

            <div className="hidden items-center gap-2 lg:flex">

              {/* TELEGRAM */}

              <a
                href="https://t.me/selahcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border border-[#2c211b]/10
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[#2c211b]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#a65d3b]/30
                  hover:bg-[#a65d3b]/5
                  hover:text-[#a65d3b]
                  hover:shadow-md
                "
              >
                <MessageCircle
                  size={16}
                  className="
                    transition-transform duration-300
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                />

                Telegram
              </a>


              {/* LOCATION */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=Selah+Coffee+Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#2c211b]
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[#f5efe6]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#6f4e37]
                  hover:shadow-lg
                "
              >
                <MapPin
                  size={16}
                  className="
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    group-hover:scale-110
                  "
                />

                Location
              </a>

            </div>


            {/* =====================================
                MOBILE MENU BUTTON
            ====================================== */}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="
                inline-flex
                h-11 w-11
                items-center justify-center
                rounded-full
                border border-[#2c211b]/10
                text-[#2c211b]
                transition-all duration-300
                hover:-rotate-3
                hover:bg-[#2c211b]
                hover:text-[#f5efe6]
                lg:hidden
              "
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>

          </div>


          {/* =========================================
              MOBILE NAVIGATION
          ========================================== */}

          {isOpen && (
            <div className="border-t border-[#2c211b]/10 pt-4 lg:hidden">

              {/* MOBILE LINKS */}

              <div className="flex flex-col gap-1">

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-xl
                      px-4 py-3
                      text-sm font-medium
                      text-[#2c211b]/75
                      transition-all duration-300
                      hover:translate-x-1
                      hover:bg-[#2c211b]/5
                      hover:text-[#a65d3b]
                    "
                  >
                    <span className="relative z-10">
                      {link.name}
                    </span>

                    {/* Left hover indicator */}

                    <span
                      className="
                        absolute
                        left-0 top-0
                        h-full w-1
                        -translate-x-full
                        rounded-r-full
                        bg-[#a65d3b]
                        transition-transform duration-300
                        group-hover:translate-x-0
                      "
                    />
                  </a>
                ))}

              </div>


              {/* =================================
                  MOBILE ACTIONS
              ================================== */}

              <div className="mt-3 grid grid-cols-2 gap-2">

                {/* TELEGRAM */}

                <a
                  href="https://t.me/selahcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border border-[#2c211b]/10
                    px-4 py-3
                    text-sm font-semibold
                    text-[#2c211b]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#a65d3b]/30
                    hover:bg-[#a65d3b]/5
                    hover:text-[#a65d3b]
                  "
                >
                  <MessageCircle
                    size={16}
                    className="
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  />

                  Telegram
                </a>


                {/* LOCATION */}

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Selah+Coffee+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#2c211b]
                    px-4 py-3
                    text-sm font-semibold
                    text-[#f5efe6]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-[#6f4e37]
                    hover:shadow-lg
                  "
                >
                  <MapPin
                    size={16}
                    className="
                      transition-transform duration-300
                      group-hover:-translate-y-0.5
                      group-hover:scale-110
                    "
                  />

                  Location
                </a>

              </div>
            </div>
          )}

        </nav>
      </div>
    </header>
  )
}

export default Navbar