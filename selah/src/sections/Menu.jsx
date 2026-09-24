import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Coffee,
  Sparkles,
} from 'lucide-react'

const API_URL =
  'http://localhost:5000/api'

const CATEGORY_ORDER = [
  'Burgers',
  'Fresh Pizza',
  'Sandwiches & Sides',
  'Hot Brews',
  'Fresh Juices',
  'Cold & Soft Drinks',
  'Traditional Dishes',
  'Eggs & Quick Bites',
  'Pasta & Rice',
  'Fresh Salads',
  'Tibs & Stews',
  'Firfir Selection',
  'Combos (Half & Half)',
]

function Menu() {
  const [menuSections, setMenuSections] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  /*
  |--------------------------------------------------------------------------
  | LOAD MENU
  |--------------------------------------------------------------------------
  */

  const loadMenu = async () => {
    try {
      const response = await fetch(
        `${API_URL}/menu`,
      )

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`,
        )
      }

      const data =
        await response.json()

      if (
        !data.success ||
        !Array.isArray(data.menu)
      ) {
        throw new Error(
          'Invalid menu data',
        )
      }

      /*
      Only display available items.
      */

      const availableItems =
        data.menu.filter(
          (item) =>
            item.available !== false,
        )

      /*
      Group items.
      */

      const grouped = {}

      availableItems.forEach(
        (item) => {
          const category =
            item.category?.trim()

          if (!category) return

          if (!grouped[category]) {
            grouped[category] = []
          }

          grouped[category].push(item)
        },
      )

      /*
      Sort items.
      */

      Object.keys(grouped).forEach(
        (category) => {
          grouped[category].sort(
            (a, b) =>
              (Number(a.order) || 0) -
              (Number(b.order) || 0),
          )
        },
      )

      /*
      Build sections in original order.
      */

      const sections = []

      CATEGORY_ORDER.forEach(
        (category) => {
          const databaseCategory =
            Object.keys(
              grouped,
            ).find(
              (key) =>
                key.toLowerCase() ===
                category.toLowerCase(),
            )

          if (
            databaseCategory &&
            grouped[databaseCategory]
              .length > 0
          ) {
            sections.push({
              title: category,
              items:
                grouped[
                  databaseCategory
                ],
            })
          }
        },
      )

      /*
      Add any completely new categories
      created by admin.
      */

      Object.keys(grouped).forEach(
        (category) => {
          const exists =
            sections.some(
              (section) =>
                section.title.toLowerCase() ===
                category.toLowerCase(),
            )

          if (!exists) {
            sections.push({
              title: category,
              items:
                grouped[category],
            })
          }
        },
      )

      setMenuSections(
        sections,
      )

      setError('')
    } catch (err) {
      console.error(
        'MENU LOAD ERROR:',
        err,
      )

      setError(
        'Unable to load the menu.',
      )
    } finally {
      setLoading(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadMenu()
  }, [])

  /*
  |--------------------------------------------------------------------------
  | REFRESH WHEN TAB GETS FOCUS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleFocus = () => {
      loadMenu()
    }

    window.addEventListener(
      'focus',
      handleFocus,
    )

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus,
      )
    }
  }, [])

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#2c211b] py-24 text-[#f5efe6] sm:py-32"
    >
      {/* Decorative circles */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full border border-[#a65d3b]/10" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full border border-[#d8a27f]/10" />

      <div className="container-selah relative z-10">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="group inline-flex cursor-default items-center gap-2 rounded-full border border-[#f5efe6]/10 bg-[#f5efe6]/5 px-4 py-2 transition-all duration-500 hover:border-[#d8a27f]/40 hover:bg-[#f5efe6]/10">
            <Sparkles
              size={14}
              className="text-[#d8a27f] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8a27f]">
              From the kitchen
            </span>
          </div>

          <h2 className="mt-5 font-display text-4xl leading-tight transition-colors duration-500 hover:text-[#d8c7b0] sm:text-5xl lg:text-6xl">
            Something for every moment.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#f5efe6]/60 sm:text-base">
            From traditional Ethiopian
            favorites to fresh pizza,
            comforting breakfasts,
            coffee and refreshing drinks
            — explore the Selah menu.
          </p>

          <div className="group mt-7 inline-flex cursor-default items-center gap-2 rounded-full border border-[#f5efe6]/15 bg-[#f5efe6]/5 px-5 py-2 text-xs font-medium tracking-wide text-[#f5efe6]/60 transition-all duration-500 hover:border-[#d8a27f]/40 hover:bg-[#d8a27f]/10 hover:text-[#f5efe6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a27f] transition-transform duration-500 group-hover:scale-150" />

            All prices are in ETB
          </div>
        </div>

        {/* Menu carousel */}

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-[#2c211b] to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-[#2c211b] to-transparent" />

          <div
            className="
              flex
              gap-6
              overflow-x-auto
              px-3
              pb-8
              snap-x
              snap-mandatory
              scroll-smooth
              [scrollbar-width:none]
              [-ms-overflow-style:none]
            "
          >
            {/* Loading */}

            {loading && (
              <div className="flex min-h-[300px] w-full items-center justify-center">
                <div className="flex items-center gap-3 text-[#f5efe6]/60">
                  <Coffee
                    size={20}
                    className="animate-pulse text-[#d8a27f]"
                  />

                  <span>
                    Loading Selah menu...
                  </span>
                </div>
              </div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="flex min-h-[300px] w-full items-center justify-center">
                <div className="text-center">
                  <Coffee
                    size={25}
                    className="mx-auto mb-3 text-[#d8a27f]"
                  />

                  <p className="text-[#f5efe6]/60">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={loadMenu}
                    className="mt-4 rounded-full border border-[#d8a27f]/30 px-5 py-2 text-xs text-[#d8a27f] transition hover:bg-[#d8a27f]/10"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Menu cards */}

            {!loading &&
              !error &&
              menuSections.map(
                (
                  section,
                  sectionIndex,
                ) => (
                  <article
                    key={section.title}
                    className="
                      group
                      relative
                      w-[310px]
                      shrink-0
                      snap-start
                      overflow-hidden
                      rounded-[2rem]
                      border
                      border-[#f5efe6]/10
                      bg-[#f5efe6]/[0.045]
                      p-6
                      transition-all
                      duration-500
                      ease-out
                      hover:-translate-y-3
                      hover:border-[#a65d3b]/50
                      hover:bg-[#f5efe6]/[0.07]
                      hover:shadow-2xl
                      hover:shadow-black/20
                      sm:w-[360px]
                      sm:p-8
                    "
                  >
                    {/* Glow */}

                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#a65d3b]/0 blur-3xl transition-all duration-700 group-hover:bg-[#a65d3b]/20" />

                    {/* Number */}

                    <div className="absolute right-6 top-6">
                      <span className="font-display text-5xl text-[#f5efe6]/[0.04] transition-all duration-500 group-hover:text-[#a65d3b]/20">
                        {String(
                          sectionIndex + 1,
                        ).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Category */}

                    <div className="relative z-10 mb-7">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-8 bg-[#a65d3b] transition-all duration-500 group-hover:w-14" />

                        <Coffee
                          size={17}
                          className="text-[#d8a27f] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                        />
                      </div>

                      <h3 className="font-display text-2xl text-[#f5efe6] transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#d8c7b0]">
                        {section.title}
                      </h3>

                      <div className="mt-3 h-px w-full bg-[#f5efe6]/10" />
                    </div>

                    {/* Items */}

                    <div className="relative z-10 space-y-1">
                      {section.items.map(
                        (
                          item,
                          itemIndex,
                        ) => (
                          <div
                            key={
                              item._id ||
                              `${section.title}-${item.name}-${itemIndex}`
                            }
                            className="group/item flex items-baseline gap-3 rounded-lg border-b border-[#f5efe6]/[0.06] px-2 py-3 transition-all duration-300 last:border-0 hover:bg-[#f5efe6]/[0.05] hover:px-3"
                          >
                            {/* Number */}

                            <span className="w-5 shrink-0 text-[10px] font-semibold text-[#f5efe6]/20 transition-colors duration-300 group-hover/item:text-[#d8a27f]">
                              {String(
                                itemIndex + 1,
                              ).padStart(2, '0')}
                            </span>

                            {/* Name */}

                            <span className="text-sm leading-6 text-[#f5efe6]/70 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-[#f5efe6]">
                              {item.name}
                            </span>

                            {/* Dots */}

                            <span className="min-w-3 flex-1 border-b border-dotted border-[#f5efe6]/10 transition-colors duration-300 group-hover/item:border-[#a65d3b]/40" />

                            {/* Price */}

                            <span className="shrink-0 text-sm font-semibold text-[#d8a27f] transition-all duration-300 group-hover/item:scale-105 group-hover/item:text-[#f5c0a1]">
                              {item.price}
                            </span>
                          </div>
                        ),
                      )}
                    </div>

                    {/* Footer */}

                    <div className="relative z-10 mt-7 flex items-center justify-between border-t border-[#f5efe6]/10 pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5efe6]/30 transition-colors duration-300 group-hover:text-[#f5efe6]/50">
                        Selah menu
                      </span>

                      <ArrowRight
                        size={15}
                        className="text-[#d8a27f] transition-all duration-500 group-hover:translate-x-2"
                      />
                    </div>
                  </article>
                ),
              )}
          </div>
        </div>

        {/* Swipe instruction */}

        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-[#f5efe6]/15" />

          <span className="text-xs text-[#f5efe6]/35 transition-colors duration-300 hover:text-[#d8a27f]">
            Swipe to explore the menu
          </span>

          <ArrowRight
            size={14}
            className="animate-pulse text-[#d8a27f]"
          />

          <div className="h-px w-8 bg-[#f5efe6]/15" />
        </div>

        {/* Quote */}

        <div className="mt-16 text-center">
          <p className="font-display text-xl italic text-[#f5efe6]/40 transition-all duration-500 hover:text-[#d8a27f]">
            Slow down, take a sip, and let
            the moment linger.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Menu