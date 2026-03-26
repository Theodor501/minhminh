import type { ExperienceEntry } from "@/data/experience";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const isLeft = index % 2 === 0;

  const content = (
    <div className="card-soft p-5">
      <p className="text-sm font-bold text-accent">{entry.period}</p>
      <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
      <p className="text-xs text-text-muted mt-1 font-medium">{entry.role}</p>
      <ul className="mt-2 space-y-1">
        {entry.description.map((desc, i) => (
          <li key={i} className="text-xs text-text-secondary">{desc}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="timeline-entry flex items-start gap-4 mb-8 relative">
      <div className={`flex-1 ${isLeft ? "pr-6" : "opacity-0 pointer-events-none"} hidden md:block`}>
        {isLeft && content}
      </div>
      <div className="timeline-dot flex-shrink-0 w-3.5 h-3.5 rounded-full bg-accent border-[3px] border-white shadow-[0_0_0_2px_rgba(59,94,232,0.3)] relative z-10 mt-2" />
      <div className={`flex-1 ${!isLeft ? "pl-6" : "opacity-0 pointer-events-none"} hidden md:block`}>
        {!isLeft && content}
      </div>
      <div className="flex-1 pl-4 md:hidden">
        {content}
      </div>
    </div>
  );
}
