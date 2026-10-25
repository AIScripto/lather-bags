export const formatInitials = (raw: string) => raw.split("").join(".");

export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;

const dayFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

function addWorkingDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

/** Leaves the bench in 2 working days, then 3–7 working days in transit. */
export function deliveryWindow(from = new Date()) {
  return `${dayFormat.format(addWorkingDays(from, 5))} – ${dayFormat.format(addWorkingDays(from, 9))}`;
}
