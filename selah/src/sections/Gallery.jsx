import { ArrowUpRight, Eye, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api'

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ================================
  // LOAD GALLERY FROM BACKEND
  // ================================
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_URL}/gallery`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Could not load gallery')
        }

        setGalleryImages(data.gallery || [])
      } catch (error) {
        console.error('Gallery loading error:', error)
        setError('Could not load gallery images.')
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  // ================================
  // ESCAPE KEY FOR MODAL
  // ================================
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // ================================
  // PREVENT BACKGROUND SCROLL
  // ================================
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <section
        id="gallery"
        className="relative overflow-hidden bg-[#f5efe6] py-24 sm:py-32"
      >
        <div className="container-selah">
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#2c211b]/10 border-t-[#a65d3b]" />

              <p className="mt-4 text-sm text-[#2c211b]/50">
                Loading Selah gallery...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ================================
  // ERROR
  // ================================
  if (error) {
    return (
      <section
        id="gallery"
        className="relative overflow-hidden bg-[#f5efe6] py-24 sm:py-32"
      >
        <div className="container-selah">
          <div className="rounded-[2rem] border border-[#a65d3b]/20 bg-white p-10 text-center">
            <p className="text-sm text-[#7c3f29]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-[#2c211b] px-5 py-3 text-sm font-semibold text-[#f5efe6] transition hover:bg-[#6f4e37]"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#f5efe6] py-24 sm:py-32"
    >
      {/* Decorative background circles */}

      <div className="pointer-events-none absolute -left-40 top-32 h-80 w-80 rounded-full border border-[#a65d3b]/10" />

      <div className="pointer-events-none absolute -right-48 bottom-20 h-[500px] w-[500px] rounded-full border border-[#2c211b]/10" />

      <div className="pointer-events-none absolute right-20 top-20 h-24 w-24 rounded-full bg-[#a65d3b]/5 blur-2xl" />

      <div className="container-selah relative z-10">

        {/* =========================
            HEADER
        ========================== */}

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-2xl">

            {/* Eyebrow */}

            <div className="group mb-5 inline-flex cursor-default items-center gap-2 rounded-full border border-[#a65d3b]/15 bg-[#a65d3b]/5 px-4 py-2 transition-all duration-500 hover:-translate-y-1 hover:border-[#a65d3b]/30 hover:bg-[#a65d3b]/10 hover:shadow-md">

              <span className="h-1.5 w-1.5 rounded-full bg-[#a65d3b] transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_12px_#a65d3b]" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a65d3b]">
                Inside Selah
              </span>

            </div>

            {/* Heading */}

            <h2 className="group font-display text-4xl leading-tight text-[#2c211b] sm:text-5xl lg:text-6xl">

              <span className="inline transition-all duration-500 group-hover:text-[#6f4e37]">
                A place worth
              </span>{' '}

              <span className="inline text-[#6f4e37] transition-all duration-500 group-hover:text-[#a65d3b]">
                slowing down
              </span>{' '}

              <span className="inline transition-all duration-500 group-hover:text-[#6f4e37]">
                for.
              </span>

            </h2>

            {/* Description */}

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#2c211b]/55 transition-all duration-500 hover:text-[#2c211b]/75 sm:text-base">
              Step inside Selah and discover a warm space made for coffee,
              conversation, reflection, and good moments.
            </p>

          </div>

          {/* Visit button */}

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#2c211b]/10 bg-white/30 px-5 py-3 text-sm font-semibold text-[#2c211b] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a65d3b]/40 hover:bg-white hover:text-[#a65d3b] hover:shadow-lg"
          >
            <span>Come visit us</span>

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

        </div>

        {/* =========================
            EMPTY GALLERY
        ========================== */}

        {galleryImages.length === 0 ? (

          <div className="mt-14 rounded-[2rem] border border-[#2c211b]/10 bg-white p-12 text-center">

            <h3 className="font-display text-2xl text-[#2c211b]">
              No gallery photos yet.
            </h3>

            <p className="mt-3 text-sm text-[#2c211b]/50">
              Add photos from your admin dashboard.
            </p>

          </div>

        ) : (

          /* =========================
              PHOTO GRID
          ========================== */

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* =========================
                IMAGE 1
            ========================== */}

            {galleryImages[0] && (
              <button
                type="button"
                onClick={() => setSelectedImage(galleryImages[0])}
                className="group relative h-[420px] overflow-hidden rounded-[1.75rem] bg-[#2c211b] text-left shadow-lg shadow-[#2c211b]/5 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2c211b]/15 sm:col-span-2 lg:col-span-2 lg:h-[520px]"
              >

                <img
                  src={galleryImages[0].imageUrl}
                  alt={galleryImages[0].title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-[1deg]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2c211b]/85 via-[#2c211b]/10 to-transparent transition-all duration-700 group-hover:from-[#2c211b]/90 group-hover:via-[#2c211b]/25" />

                <div className="absolute inset-0 bg-[#a65d3b]/0 transition-all duration-700 group-hover:bg-[#a65d3b]/10" />

                <div className="pointer-events-none absolute -left-[120%] top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1200ms] group-hover:left-[150%]" />

                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-xs font-semibold text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-white/40 group-hover:bg-white/15">
                  01
                </div>

                <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Eye size={18} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                  <p className="translate-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8a27f] transition-all duration-500 group-hover:translate-y-0">
                    Selah Coffee
                  </p>

                  <h3 className="font-display mt-2 translate-y-2 text-2xl text-white transition-all duration-500 group-hover:translate-y-0 sm:text-3xl">
                    {galleryImages[0].title}
                  </h3>

                  <p className="mt-2 max-w-md translate-y-2 text-sm leading-6 text-white/70 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {galleryImages[0].description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/50 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span>View photo</span>

                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>

                </div>

              </button>
            )}

            {/* =========================
                IMAGE 2
            ========================== */}

            {galleryImages[1] && (
              <button
                type="button"
                onClick={() => setSelectedImage(galleryImages[1])}
                className="group relative h-[300px] overflow-hidden rounded-[1.75rem] bg-[#2c211b] text-left shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl lg:h-[250px]"
              >

                <img
                  src={galleryImages[1].imageUrl}
                  alt={galleryImages[1].title}
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2c211b]/80 via-transparent to-transparent transition-all duration-500 group-hover:from-[#2c211b]/90" />

                <div className="pointer-events-none absolute -left-[130%] top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1100ms] group-hover:left-[150%]" />

                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/10 text-[10px] font-bold text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110">
                  02
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Eye size={16} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">

                  <h3 className="font-display translate-y-2 text-xl text-white transition-all duration-500 group-hover:translate-y-0">
                    {galleryImages[1].title}
                  </h3>

                  <p className="mt-1 translate-y-2 text-xs text-white/55 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {galleryImages[1].description}
                  </p>

                </div>

              </button>
            )}

            {/* =========================
                IMAGE 3
            ========================== */}

            {galleryImages[2] && (
              <button
                type="button"
                onClick={() => setSelectedImage(galleryImages[2])}
                className="group relative h-[300px] overflow-hidden rounded-[1.75rem] bg-[#2c211b] text-left shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl lg:h-[250px]"
              >

                <img
                  src={galleryImages[2].imageUrl}
                  alt={galleryImages[2].title}
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110 group-hover:-rotate-1"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2c211b]/80 via-transparent to-transparent transition-all duration-500 group-hover:from-[#2c211b]/90" />

                <div className="pointer-events-none absolute -left-[130%] top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1100ms] group-hover:left-[150%]" />

                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/10 text-[10px] font-bold text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110">
                  03
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Eye size={16} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">

                  <h3 className="font-display translate-y-2 text-xl text-white transition-all duration-500 group-hover:translate-y-0">
                    {galleryImages[2].title}
                  </h3>

                  <p className="mt-1 translate-y-2 text-xs text-white/55 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {galleryImages[2].description}
                  </p>

                </div>

              </button>
            )}

            {/* =========================
                IMAGE 4
            ========================== */}

            {galleryImages[3] && (
              <button
                type="button"
                onClick={() => setSelectedImage(galleryImages[3])}
                className="group relative h-[300px] overflow-hidden rounded-[1.75rem] bg-[#2c211b] text-left shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl sm:col-span-2 lg:col-span-2"
              >

                <img
                  src={galleryImages[3].imageUrl}
                  alt={galleryImages[3].title}
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110 group-hover:rotate-[0.7deg]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2c211b]/80 via-transparent to-transparent transition-all duration-500 group-hover:from-[#2c211b]/90" />

                <div className="pointer-events-none absolute -left-[130%] top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1100ms] group-hover:left-[150%]" />

                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-xs font-bold text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110">
                  04
                </div>

                <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Eye size={18} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

                  <h3 className="font-display translate-y-2 text-xl text-white transition-all duration-500 group-hover:translate-y-0 sm:text-2xl">
                    {galleryImages[3].title}
                  </h3>

                  <p className="mt-1 translate-y-2 text-sm text-white/60 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {galleryImages[3].description}
                  </p>

                </div>

              </button>
            )}

            {/* =========================
                IMAGE 5
            ========================== */}

            {galleryImages[4] && (
              <button
                type="button"
                onClick={() => setSelectedImage(galleryImages[4])}
                className="group relative h-[300px] overflow-hidden rounded-[1.75rem] bg-[#2c211b] text-left shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl sm:col-span-2 lg:col-span-2"
              >

                <img
                  src={galleryImages[4].imageUrl}
                  alt={galleryImages[4].title}
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110 group-hover:-rotate-[0.7deg]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2c211b]/80 via-transparent to-transparent transition-all duration-500 group-hover:from-[#2c211b]/90" />

                <div className="pointer-events-none absolute -left-[130%] top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1100ms] group-hover:left-[150%]" />

                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-xs font-bold text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110">
                  05
                </div>

                <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Eye size={18} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

                  <h3 className="font-display translate-y-2 text-xl text-white transition-all duration-500 group-hover:translate-y-0 sm:text-2xl">
                    {galleryImages[4].title}
                  </h3>

                  <p className="mt-1 translate-y-2 text-sm text-white/65 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {galleryImages[4].description}
                  </p>

                </div>

              </button>
            )}

          </div>
        )}

        {/* =========================
            BOTTOM MESSAGE
        ========================== */}

        <div className="mt-12 flex flex-col items-center justify-center">

          <div className="mb-4 flex items-center gap-3">

            <div className="h-px w-10 bg-[#2c211b]/10 transition-all duration-500 hover:w-16" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2c211b]/30">
              Selah moments
            </span>

            <div className="h-px w-10 bg-[#2c211b]/10 transition-all duration-500 hover:w-16" />

          </div>

          <p className="group cursor-default font-display text-lg italic text-[#2c211b]/40 transition-all duration-500 hover:-translate-y-1 hover:text-[#a65d3b]">
            Come in. Take a seat. Stay a while.
          </p>

        </div>

      </div>

      {/* =================================
          FULLSCREEN IMAGE MODAL
      ================================== */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2c211b]/95 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setSelectedImage(null)}
        >

          {/* Decorative circle */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

          {/* Close button */}

          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="group absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:rotate-90 hover:border-white/30 hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close image"
          >
            <X
              size={22}
              className="transition-transform duration-300"
            />
          </button>

          {/* Image container */}

          <div
            className="relative z-20 max-h-[90vh] max-w-6xl animate-[galleryModal_0.45s_ease-out]"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40">

              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[72vh] max-w-full object-contain"
              />

            </div>

            {/* Modal content */}

            <div className="mt-5 text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8a27f]">
                Selah Coffee
              </p>

              <h3 className="font-display mt-2 text-2xl text-white sm:text-3xl">
                {selectedImage.title}
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm text-white/55">
                {selectedImage.description}
              </p>

              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/25">
                Press ESC or click outside to close
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Modal animation */}

      <style>
        {`
          @keyframes galleryModal {
            from {
              opacity: 0;
              transform: scale(0.94) translateY(15px);
            }

            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>

    </section>
  )
}

export default Gallery