import {
  ArrowUpRight,
  Clock3,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const experiences = [
  {
    icon: CoffeeIcon,
    number: '01',
    title: 'Slow mornings',
    text: 'Start the day with a carefully brewed cup and nowhere you need to rush.',
  },
  {
    icon: MessageCircle,
    number: '02',
    title: 'Good conversations',
    text: 'A comfortable space for catching up, meeting someone new, or simply being present.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Small rituals',
    text: 'From the first pour to the last sip, we believe the little moments matter.',
  },
]

function CoffeeIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
      <path d="M17 10h1a3 3 0 0 1 0 6h-1" />
      <path d="M7 4c0 1 .8 1.2.8 2.2" />
      <path d="M11 4c0 1 .8 1.2.8 2.2" />
    </svg>
  )
}

function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#394337] py-24 text-[#f5efe6] sm:py-32"
    >
      {/* =================================
          BACKGROUND DECORATIONS
      ================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full border border-white/[0.04]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full border border-white/[0.04]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8c7b0]/[0.025] blur-3xl" />

      {/* Small decorative dots */}
      <div className="pointer-events-none absolute right-[15%] top-24 h-2 w-2 rounded-full bg-[#d8c7b0]/30" />
      <div className="pointer-events-none absolute left-[12%] bottom-32 h-1.5 w-1.5 rounded-full bg-[#a65d3b]/40" />

      <div className="container-selah relative z-10">

        {/* =================================
            HEADER
        ================================== */}

        <div className="group transition-all duration-500 hover:translate-x-1">
          <SectionHeading
            eyebrow="The Selah experience"
            title="Come for the coffee. Stay for everything around it."
            description="We designed Selah to feel less like somewhere you pass through and more like somewhere you belong."
            light
          />
        </div>

        {/* =================================
            EXPERIENCE CARDS
        ================================== */}

        <div className="mt-16 grid gap-4 md:grid-cols-3">

          {experiences.map((experience) => {
            const Icon = experience.icon

            return (
              <article
                key={experience.title}
                className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#394337] p-8 shadow-lg shadow-black/5 transition-all duration-700 ease-out hover:-translate-y-3 hover:border-[#d8c7b0]/25 hover:bg-[#414b3e] hover:shadow-2xl hover:shadow-black/20 sm:p-10"
              >

                {/* =================================
                    CARD GLOW
                ================================== */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#d8c7b0]/0 blur-3xl transition-all duration-700 group-hover:bg-[#d8c7b0]/10" />

                <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#a65d3b]/0 blur-3xl transition-all duration-700 group-hover:bg-[#a65d3b]/10" />

                {/* =================================
                    NUMBER
                ================================== */}

                <span className="absolute right-7 top-5 font-display text-7xl font-medium text-white/[0.035] transition-all duration-700 group-hover:translate-x-1 group-hover:text-[#d8c7b0]/10">
                  {experience.number}
                </span>

                {/* =================================
                    ICON
                ================================== */}

                <div className="relative z-10 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#f5efe6]/[0.07] text-[#d8c7b0] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-[#d8c7b0]/30 group-hover:bg-[#d8c7b0]/15 group-hover:text-white group-hover:shadow-lg">
                    <Icon
                      size={24}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Arrow */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                {/* =================================
                    CARD CONTENT
                ================================== */}

                <div className="relative z-10 mt-10">

                  <h3 className="font-display text-2xl transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#d8c7b0]">
                    {experience.title}
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#a65d3b] transition-all duration-500 group-hover:w-20" />

                  <p className="mt-5 text-sm leading-7 text-white/55 transition-all duration-500 group-hover:text-white/75">
                    {experience.text}
                  </p>
                </div>

                {/* =================================
                    BOTTOM LABEL
                ================================== */}

                <div className="absolute bottom-7 left-8 right-8 flex items-center justify-between border-t border-white/[0.07] pt-4 sm:left-10 sm:right-10">

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25 transition-colors duration-500 group-hover:text-white/45">
                    Selah moment
                  </span>

                  <span className="text-xs text-[#d8c7b0]/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#d8c7b0]">
                    {experience.number}
                  </span>
                </div>

              </article>
            )
          })}

        </div>

        {/* =================================
            BOTTOM INFO
        ================================== */}

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">

            {/* Opening hours */}
            <div className="group flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:rotate-6 group-hover:border-[#d8c7b0]/30 group-hover:bg-[#d8c7b0]/10">
                <Clock3
                  size={18}
                  className="text-[#d8c7b0] transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Opening hours
                </p>

                <p className="mt-1 text-sm text-white/55 transition-colors duration-300 group-hover:text-white/80">
                  Open daily · 7:00 AM — 9:00 PM
                </p>
              </div>

            </div>

            {/* Center decoration */}
            <div className="hidden items-center gap-3 lg:flex">
              <span className="h-px w-10 bg-white/10" />

              <span className="h-1.5 w-1.5 rounded-full bg-[#a65d3b]" />

              <span className="h-px w-10 bg-white/10" />
            </div>

            {/* Quote */}
            <div className="group cursor-default">

              <p className="font-display text-xl italic text-[#d8c7b0] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#f5efe6]">
                Take your time.
              </p>

              <p className="mt-1 text-right text-[10px] uppercase tracking-[0.2em] text-white/20 transition-colors duration-300 group-hover:text-white/35">
                — Selah
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Experience