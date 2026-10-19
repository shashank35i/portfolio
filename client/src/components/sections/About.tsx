import { motion } from "framer-motion";
import { content } from "@/content/content";

const stats = [
  { value: "23", label: "OpsPilot AI REST endpoints" },
  { value: "43", label: "OpsPilot AI unit and integration tests" },
  { value: "288/s", label: "Requests sustained in load test" },
  { value: "531", label: "LeetCode problems solved" },
];

const strengths = [
  "Java 17, Spring Boot & Spring Security",
  "Role-safe APIs and access control",
  "Kafka delivery guarantees & Redis caching",
  "Load testing and measurable performance",
];

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } });

export function About() {
  return <section id="about" data-section-theme="stone" className="relative overflow-hidden bg-[#f0ede5] py-24 text-[#181715] md:py-32">
    <div className="pointer-events-none absolute right-0 top-0 h-full w-[30%] border-l border-black/[.06]" />
    <div className="container relative mx-auto px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center gap-4"><span className="font-mono text-[10px] uppercase tracking-[.27em] text-[#bd472b]">About</span><span className="h-px flex-1 bg-black/15" /><span className="hidden font-mono text-[10px] uppercase tracking-[.17em] text-black/55 sm:block">Java · Spring Boot · Backend engineering</span></div>
        <div className="grid gap-12 lg:grid-cols-[.84fr_1.16fr] lg:gap-20">
          <div className="relative">
            <motion.p {...fade(.02)} className="mb-5 text-[15px] font-medium tracking-[-.02em] text-[#484640] sm:text-[17px]">Shashank Preetham Pendyala</motion.p>
            <motion.h2 {...fade(.04)} className="max-w-xl text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[.87] tracking-[-.075em]">Secure APIs.<br /><span className="font-serif font-medium italic text-[#bd472b]">Measured performance.</span></motion.h2>
            <motion.p {...fade(.1)} className="mt-7 max-w-sm border-l-2 border-[#bd472b] pl-4 text-[14px] leading-7 text-[#57544f]">{content.about.now}</motion.p>
          </div>
          <motion.div {...fade(.12)} className="space-y-5 pt-1 text-[15px] leading-[1.85] text-[#484640] sm:text-[16px]">
            {content.about.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </motion.div>
        </div>

        <motion.div {...fade(.18)} className="mt-16 grid border-y border-black/20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }, index) => <div key={label} className={`relative py-5 sm:px-5 sm:py-7 lg:px-6 ${index < 3 ? "border-b border-black/10 sm:border-r lg:border-b-0" : ""} ${index === 1 ? "sm:border-r-0 lg:border-r" : ""} ${index === 2 ? "sm:border-b-0" : ""}`}>
            <div className="flex items-baseline gap-4 sm:block"><span className="font-display text-4xl font-semibold tracking-[-.06em] text-[#181715] sm:text-5xl">{value}</span><span className="text-[12px] leading-5 text-[#77736b] sm:mt-2 sm:block">{label}</span></div>
          </div>)}
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[.55fr_1.45fr] lg:gap-14">
          <motion.p {...fade(.2)} className="font-mono text-[10px] uppercase tracking-[.24em] text-[#9c4a34]">Core strengths</motion.p>
          <motion.ul {...fade(.24)} className="grid divide-y divide-black/10 border-y border-black/15 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            {strengths.map((strength, index) => <li key={strength} className={`flex min-h-[74px] items-center gap-4 py-4 sm:px-5 ${index > 1 ? "sm:border-t sm:border-black/10" : ""} ${index % 2 === 0 ? "sm:pl-0" : ""}`}>
              <span className="h-1.5 w-1.5 shrink-0 bg-[#bd472b]"/><span className="text-[13px] font-medium text-[#393833]">{strength}</span>
            </li>)}
          </motion.ul>
        </div>
      </div>
    </div>
  </section>;
}
