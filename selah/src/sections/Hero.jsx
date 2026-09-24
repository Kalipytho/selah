import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'

import useSettings from '../hooks/useSettings'

function Hero() {
  const { settings, loading } = useSettings()

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.location
  )}`

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#2c211b]"
    >
      {/* =========================================
          BACKGROUND IMAGE
      ========================================== */}

      <img
        src="/gallery/gallery-1.jpg"
        alt={settings.businessName}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* =========================================
          DARK OVERLAY
      ========================================== */}

      <div className="absolute inset-0 bg-[#2c211b]/65" />

      {/* =========================================
          SOFT GRADIENT
      ========================================== */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#2c211b]/90 via-[#2c211b]/55 to-transparent" />

      {/* =========================================
          HERO CONTENT
      ========================================== */}

      <div className="container-selah relative z-10 flex min-h-screen items-center px-0 pb-20 pt-28">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* =====================================
              LEFT SIDE — TEXT
          ====================================== */}

          <div className="max-w-2xl text-[#f5efe6]">

            {/* =================================
                SMALL LABEL
            ================================== */}

            <div
              className="
                group mb-6 inline-flex cursor-default
                items-center gap-2
                rounded-full
                border border-[#f5efe6]/20
                bg-[#f5efe6]/10
                px-4 py-2
                backdrop-blur-sm
                transition-all duration-500
                hover:-translate-y-1
                hover:border-[#d8c7b0]/50
                hover:bg-[#f5efe6]/15
                hover:shadow-lg
                hover:shadow-black/10
              "
            >
              <span
                className="
                  h-1.5 w-1.5 rounded-full
                  bg-[#d8c7b0]
                  transition-all duration-500
                  group-hover:scale-150
                  group-hover:shadow-[0_0_12px_#d8c7b0]
                "
              />

              <span
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.22em]
                  text-[#f5efe6]/80
                  transition-colors duration-500
                  group-hover:text-[#f5efe6]
                "
              >
                Coffee • Connection • Slow Moments
              </span>
            </div>

            {/* =================================
                MAIN HEADING
            ================================== */}

            <h1
              className="
                font-display
                text-5xl
                leading-[0.95]
                tracking-[-0.03em]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              {/* PAUSE */}

              <span
                className="
                  group block cursor-default
                  transition-all duration-500
                  hover:translate-x-2
                  hover:text-[#d8c7b0]
                "
              >
                Pause
                <span
                  className="
                    transition-colors duration-500
                    group-hover:text-[#a65d3b]
                  "
                >
                  .
                </span>
              </span>

              {/* SIP */}

              <span
                className="
                  group block cursor-default
                  text-[#d8c7b0]
                  transition-all duration-500
                  hover:translate-x-4
                  hover:text-[#f5efe6]
                "
              >
                Sip
                <span
                  className="
                    transition-colors duration-500
                    group-hover:text-[#a65d3b]
                  "
                >
                  .
                </span>
              </span>

              {/* REFLECT */}

              <span
                className="
                  group block cursor-default
                  transition-all duration-500
                  hover:translate-x-2
                  hover:text-[#d8c7b0]
                "
              >
                Reflect
                <span
                  className="
                    transition-colors duration-500
                    group-hover:text-[#a65d3b]
                  "
                >
                  .
                </span>
              </span>
            </h1>

            {/* =================================
                DESCRIPTION
            ================================== */}

            <p
              className="
                group mt-7 max-w-xl cursor-default
                text-base leading-7
                text-[#f5efe6]/75
                transition-all duration-500
                hover:translate-x-1
                hover:text-[#f5efe6]/95
                sm:text-lg
              "
            >
              {settings.aboutText}
            </p>

            {/* =================================
                BUTTONS
            ================================== */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              {/* MENU BUTTON */}

              <a
                href="#menu"
                className="
                  group inline-flex
                  items-center justify-center gap-2
                  rounded-full
                  bg-[#f5efe6]
                  px-6 py-3.5
                  text-sm font-semibold
                  text-[#2c211b]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-xl
                  hover:shadow-black/20
                "
              >
                <span
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  Explore our menu
                </span>

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>

              {/* CONTACT BUTTON */}

              <a
                href="#contact"
                className="
                  group inline-flex
                  items-center justify-center gap-2
                  rounded-full
                  border border-[#f5efe6]/30
                  bg-[#f5efe6]/5
                  px-6 py-3.5
                  text-sm font-semibold
                  text-[#f5efe6]
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#f5efe6]/60
                  hover:bg-[#f5efe6]/10
                  hover:shadow-xl
                  hover:shadow-black/10
                "
              >
                <span
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  Come say hello
                </span>

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            </div>

            {/* =================================
                LOCATION
            ================================== */}

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group mt-7 inline-flex
                items-center gap-2
                text-sm
                text-[#f5efe6]/60
                transition-all duration-300
                hover:translate-x-1
                hover:text-[#f5efe6]
              "
            >
              <MapPin
                size={16}
                className="
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:scale-110
                  group-hover:text-[#d8c7b0]
                "
              />

              <span
                className="
                  border-b border-transparent
                  transition-all duration-300
                  group-hover:border-[#d8c7b0]
                "
              >
                {settings.location}
              </span>
            </a>
          </div>

          {/* =====================================
              RIGHT SIDE — LOGO
          ====================================== */}

          <div className="flex items-center justify-center lg:justify-end">

            <div className="group relative flex items-center justify-center">

              {/* SOFT LOGO GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  h-64 w-64
                  rounded-full
                  bg-white/0
                  blur-3xl
                  transition-all duration-700
                  group-hover:bg-white/10
                  sm:h-80 sm:w-80
                  lg:h-[390px] lg:w-[390px]
                "
              />

              {/* LOGO */}

              <img
                src="/selah-logo.png"
                alt={`${settings.businessName} — Pause and Reflect`}
                className="
                  relative z-10
                  h-64 w-64
                  object-contain
                  transition-all duration-700
                  ease-out
                  group-hover:scale-110
                  group-hover:-translate-y-2
                  group-hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]
                  sm:h-80 sm:w-80
                  lg:h-[390px] lg:w-[390px]
                "
              />

            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SCROLL INDICATOR
      ========================================== */}

      <a
        href="#story"
        className="
          group absolute
          bottom-7 left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-[#f5efe6]/60
          transition-all duration-300
          hover:-translate-y-1
          hover:text-[#f5efe6]
          sm:flex
        "
      >
        <span
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.25em]
          "
        >
          Scroll
        </span>

        <ArrowDown
          size={16}
          className="
            transition-transform duration-300
            group-hover:translate-y-1
          "
        />
      </a>

    </section>
  )
}

export default Hero