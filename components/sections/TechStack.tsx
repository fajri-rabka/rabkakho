import { TechStackGrid, TechStackTitle } from "@/components/ui/TechStackGrid";

export function TechStack() {
  return (
    <section
      className="w-full relative border-t-[1px] border-on-background/30 bg-background overflow-visible"
      id="tech-stack"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 border-b-[1px] border-on-background/30 overflow-visible gap-0">
        
        {/* HEADER (Spans 5 cols) */}
        <div className="lg:col-span-5 border-r-[1px] border-on-background/30 p-6 md:p-12 min-h-[300px] flex flex-col justify-end overflow-visible rounded-none">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 block mb-6">
            [TECHNOLOGY_ECOSYSTEM]
          </span>
          <TechStackTitle />
        </div>

        {/* GRID (Spans 7 cols) */}
        <div className="lg:col-span-7 bg-background overflow-visible border-t-[1px] lg:border-t-0 border-on-background/30 rounded-none">
          <TechStackGrid />
        </div>
      </div>
    </section>
  );
}
