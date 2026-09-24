import { ArrowUpRight } from 'lucide-react'

function Button({ children, href = '#contact', dark = true }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-1 ${
        dark
          ? 'bg-[#2c211b] text-[#f5efe6] hover:bg-[#6f4e37]'
          : 'bg-[#f5efe6] text-[#2c211b] hover:bg-white'
      }`}
    >
      {children}

      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition group-hover:rotate-45">
        <ArrowUpRight size={15} />
      </span>
    </a>
  )
}

export default Button