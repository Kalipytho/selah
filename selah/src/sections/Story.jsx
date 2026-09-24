import { Coffee, Heart, Leaf } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import useSettings from '../hooks/useSettings'

function Story() {
  const { settings, loading } = useSettings()

  if (loading) {
    return (
      <section
        id="story"
        className="relative overflow-hidden bg-[#f5efe6] py-24 sm:py-32"
      >
        <div className="container-selah">
          <div className="min-h-[500px] animate-pulse rounded-[2rem] bg-[#2c211b]/5" />
        </div>
      </section>
    )
  }

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#f5efe6] py-24 sm:py-32"
    >
      <div className="container-selah">

        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

          {/* =========================================
              LEFT SIDE — IMAGE
          ========================================== */}

          <div className="relative">

            {/* Decorative circle */}

            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full border border-[#a65d3b]/20 transition-all duration-700 hover:scale-125 hover:border-[#a65d3b]/50" />

            {/* Image wrapper */}

            <div className="group relative overflow-hidden rounded-[2rem] shadow-xl">

              <img
                src={settings.storyImage}
                alt={settings.storyTitle}
                className="relative h-[500px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Image overlay */}

              <div className="absolute inset-0 bg-[#2c211b]/0 transition-all duration-500 group-hover:bg-[#2c211b]/15" />

              {/* Image shine */}

              <div className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[150%] group-hover:opacity-100" />

            </div>

            {/* =====================================
                FLOATING CARD
            ====================================== */}

            <div className="group absolute -bottom-7 -right-5 max-w-[210px] cursor-default rounded-2xl bg-[#394337] p-6 text-[#f5efe6] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl">

              <Coffee
                size={22}
                className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
              />

              <p className="mt-4 font-display text-xl transition-colors duration-500 group-hover:text-[#d8c7b0]">
                {settings.storyCardText}
              </p>

            </div>

          </div>

          {/* =========================================
              RIGHT SIDE — TEXT
          ========================================== */}

          <div>

            <div className="transition-all duration-500 hover:translate-x-1">

              <SectionHeading
                eyebrow={settings.storyEyebrow}
                title={settings.storyTitle}
                description={settings.storyDescription}
              />

            </div>

            {/* =====================================
                VALUES
            ====================================== */}

            <div className="mt-10 grid gap-5 sm:grid-cols-3">

              {/* THOUGHTFUL */}

              <div className="group cursor-default rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a65d3b]/10 transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#a65d3b]">

                  <Leaf
                    className="text-[#a65d3b] transition-colors duration-500 group-hover:text-white"
                    size={24}
                  />

                </div>

                <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-[#a65d3b]">
                  {settings.storyValue1Title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#2c211b]/55 transition-colors duration-300 group-hover:text-[#2c211b]/75">
                  {settings.storyValue1Text}
                </p>

              </div>

              {/* CRAFTED */}

              <div className="group cursor-default rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a65d3b]/10 transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#a65d3b]">

                  <Coffee
                    className="text-[#a65d3b] transition-colors duration-500 group-hover:text-white"
                    size={24}
                  />

                </div>

                <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-[#a65d3b]">
                  {settings.storyValue2Title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#2c211b]/55 transition-colors duration-300 group-hover:text-[#2c211b]/75">
                  {settings.storyValue2Text}
                </p>

              </div>

              {/* HUMAN */}

              <div className="group cursor-default rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a65d3b]/10 transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#a65d3b]">

                  <Heart
                    className="text-[#a65d3b] transition-colors duration-500 group-hover:text-white"
                    size={24}
                  />

                </div>

                <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-[#a65d3b]">
                  {settings.storyValue3Title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#2c211b]/55 transition-colors duration-300 group-hover:text-[#2c211b]/75">
                  {settings.storyValue3Text}
                </p>

              </div>

            </div>

            {/* =====================================
                BUTTON
            ====================================== */}

            <div className="mt-10">

              <Button href="#experience">
                Our experience
              </Button>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Story