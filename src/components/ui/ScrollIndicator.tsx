export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
      <span className="text-[9px] tracking-[3px] text-text-muted uppercase">Scroll</span>
      <div className="w-5 h-8 border-[1.5px] border-accent rounded-full relative">
        <div className="w-[3px] h-2 bg-accent rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-bounce" />
      </div>
    </div>
  );
}
