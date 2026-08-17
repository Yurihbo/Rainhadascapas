export type AdministrativeWeek = {
  number: number;
  value: string;
  label: string;
  range: string;
  current: boolean;
};

/**
 * Weeks are operational blocks inside the calendar month: 01–07, 08–14,
 * 15–21, and so on. This intentionally is not an ISO week-of-year number.
 */
export function getAdministrativeWeeks(referenceDate = new Date()): AdministrativeWeek[] {
  const monthNumber = referenceDate.getMonth() + 1;
  const month = String(monthNumber).padStart(2, "0");
  const year = referenceDate.getFullYear();
  const lastDay = new Date(year, monthNumber, 0).getDate();
  const currentWeek = Math.ceil(referenceDate.getDate() / 7);

  return Array.from({ length: currentWeek }, (_, index) => {
    const number = index + 1;
    const start = (number - 1) * 7 + 1;
    const end = Math.min(number * 7, lastDay);
    return {
      number,
      value: `${year}-${month}-${String(number).padStart(2, "0")}`,
      label: `MÊS ${month} · SEMANA ${String(number).padStart(2, "0")}`,
      range: `${String(start).padStart(2, "0")}–${String(end).padStart(2, "0")}/${month}/${year}`,
      current: number === currentWeek,
    };
  });
}

export function getCurrentAdministrativePeriod(referenceDate = new Date()) {
  const current = getAdministrativeWeeks(referenceDate).at(-1);
  const date = referenceDate.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const time = referenceDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return { label: current?.label ?? "MÊS 01 · SEMANA 01", dateTime: `${date} · ${time}` };
}
