import type { ExperienceEntry } from "@/data/experience";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="timeline-entry flex items-start gap-4 mb-12 relative">
      <div className={`flex-1 ${isLeft ? "text-right pr-6" : "opacity-0 pointer-events-none"} hidden md:block`}>
        {isLeft && (
          <>
            <p className="text-sm font-bold text-accent">{entry.period}</p>
            <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
            <p className="text-xs text-text-muted mt-1">{entry.role}</p>
            <ul className="mt-2 space-y-1">
              {entry.description.map((desc, i) => (
                <li key={i} className="text-xs text-text-secondary">{desc}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="timeline-dot flex-shrink-0 w-3 h-3 rounded-full bg-accent border-2 border-bg-primary relative z-10 mt-1" />
      <div className={`flex-1 ${!isLeft ? "pl-6" : "opacity-0 pointer-events-none"} hidden md:block`}>
        {!isLeft && (
          <>
            <p className="text-sm font-bold text-accent">{entry.period}</p>
            <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
            <p className="text-xs text-text-muted mt-1">{entry.role}</p>
            <ul className="mt-2 space-y-1">
              {entry.description.map((desc, i) => (
                <li key={i} className="text-xs text-text-secondary">{desc}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex-1 pl-4 md:hidden">
        <p className="text-sm font-bold text-accent">{entry.period}</p>
        <h3 className="text-lg font-bold text-text-primary mt-1">{entry.company}</h3>
        <p className="text-xs text-text-muted mt-1">{entry.role}</p>
        <ul className="mt-2 space-y-1">
          {entry.description.map((desc, i) => (
            <li key={i} className="text-xs text-text-secondary">{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
