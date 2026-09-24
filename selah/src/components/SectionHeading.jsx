function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-2xl">
      <p
        className={`mb-4 text-xs font-bold uppercase tracking-[0.28em] ${
          light ? 'text-[#d8c7b0]' : 'text-[#a65d3b]'
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`font-display text-4xl leading-tight sm:text-5xl ${
          light ? 'text-[#f5efe6]' : 'text-[#2c211b]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base leading-7 ${
            light ? 'text-[#f5efe6]/65' : 'text-[#2c211b]/60'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading