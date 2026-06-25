export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-cloud transition-colors duration-500" />
      <div className="absolute -left-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-brand-400/20 blur-[130px] dark:bg-brand-600/25" />
      <div className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-indigo-400/20 blur-[130px] dark:bg-indigo-700/25" />
      <div className="absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-sky-400/15 blur-[130px] dark:bg-blue-800/25" />
      <div className="absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
    </div>
  )
}
