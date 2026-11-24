import {useEffect, useState} from 'react';

interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target: December 10, 2026 at 00:00:00 local time
const TARGET_TIMESTAMP = new Date(2026, 11, 10, 0, 0, 0).getTime();

function computeTimeRemaining(): TimeRemaining {
  const now = Date.now();
  const totalMs = Math.max(0, TARGET_TIMESTAMP - now);

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);

  return {totalMs, days, hours, minutes, seconds};
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function CountdownTimer() {
  const [remaining, setRemaining] = useState<TimeRemaining>(() => computeTimeRemaining());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(computeTimeRemaining());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const isLaunched = remaining.totalMs <= 0;

  const units = [
    {label: 'Days', value: padTwo(remaining.days)},
    {label: 'Hours', value: padTwo(remaining.hours)},
    {label: 'Minutes', value: padTwo(remaining.minutes)},
    {label: 'Seconds', value: padTwo(remaining.seconds)},
  ];

  if (isLaunched) {
    return (
      <div
        className="border border-[#2C1610]/15 bg-[#F4EAD7]/70 px-6 py-6 rounded-sm"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-2xl sm:text-3xl font-medium text-[#2C1610]">
          The Inaugural Launch Has Arrived
        </p>
        <p className="mt-1.5 text-sm text-[#5C4033]">
          Priyontor officially opened on December 10, 2026. Welcome to where heritage meets heart.
        </p>
      </div>
    );
  }

  return (
    <div aria-label="Countdown to December 10, 2026">
      <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-[#2C1610]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#2C1610]/15">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="py-4 sm:py-5 px-3 sm:px-5 first:pl-0 last:pr-0 flex flex-col justify-between"
          >
            <span
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-none tracking-tight text-[#2C1610] tabular-nums"
              style={{fontVariantNumeric: 'tabular-nums'}}
            >
              {unit.value}
            </span>
            <span className="mt-2 text-xs font-medium tracking-wide text-[#6E4F3D]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6E4F3D]">
        <span>Launch Date: December 10, 2026</span>
        <span aria-hidden="true">·</span>
        <span>00:00 Local Time</span>
      </div>
    </div>
  );
}
