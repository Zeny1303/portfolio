import React from 'react'

export default function StackedSkillCard({ category, index, cardRef, total }) {
  const CategoryIcon = category.icon

  return (
    <article
      ref={cardRef}
      data-card-index={index}
      className="horizontal-skill-card relative shrink-0 w-[85vw] sm:w-[55vw] md:w-[42vw] lg:w-[36vw] max-w-[500px] h-[500px] sm:h-[540px] rounded-[2.2rem] bg-[#0d0e15]/95 border backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden group transition-all duration-500 hover:-translate-y-2"
      style={{
        borderColor: category.borderColor,
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px ${category.glowColor}`,
      }}
    >
      {/* Background Accent Mesh / Subtle Gradient */}
      <div
        className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${category.gradient} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-700`}
      />

      <div>
        {/* Card Header Bar */}
        <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300"
              style={{ color: category.accentColor }}
            >
              {CategoryIcon && <CategoryIcon className="w-6 h-6" />}
            </div>
            <span
              className="text-xs font-semibold tracking-widest uppercase font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10"
              style={{ color: category.accentColor }}
            >
              {category.number} / 0{total}
            </span>
          </div>

          {/* Large Number Display */}
          <div
            className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tighter opacity-80"
            style={{ color: category.accentColor }}
          >
            {category.number}
          </div>
        </div>

        {/* Title & Description */}
        <div className="relative z-10 space-y-2.5 mb-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {category.title}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed line-clamp-3">
            {category.description}
          </p>
        </div>
      </div>

      {/* Technology Badges Grid */}
      <div className="relative z-10">
        <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-3 font-mono">
          Technologies & Tools
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {category.skills.map((skill, sIdx) => {
            const SkillIcon = skill.icon
            return (
              <div
                key={sIdx}
                className={`skill-badge inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border backdrop-blur-md transition-all duration-300 cursor-default hover:scale-105 ${category.badgeBg}`}
              >
                {SkillIcon && (
                  <SkillIcon className={`w-4 h-4 ${category.iconColor}`} />
                )}
                <span>{skill.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Accent Glow Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, ${category.accentColor}, transparent)`,
        }}
      />
    </article>
  )
}
