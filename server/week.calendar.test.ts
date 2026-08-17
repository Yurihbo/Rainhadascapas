import { describe, expect, it } from "vitest";
import { getAdministrativeWeeks, getCurrentAdministrativePeriod } from "../client/src/lib/calendar";

describe("calendário administrativo", () => {
  it("usa blocos de sete dias dentro do mês", () => {
    const weeks = getAdministrativeWeeks(new Date(2026, 7, 17, 12, 0));
    expect(weeks).toHaveLength(3);
    expect(weeks.at(-1)).toMatchObject({
      number: 3,
      label: "MÊS 08 · SEMANA 03",
      range: "15–21/08/2026",
      current: true,
    });
    expect(getCurrentAdministrativePeriod(new Date(2026, 7, 17, 22, 9)).label).toBe("MÊS 08 · SEMANA 03");
  });

  it("adiciona a quarta semana quando o calendário chega ao dia 22", () => {
    const weeks = getAdministrativeWeeks(new Date(2026, 7, 22, 9, 0));
    expect(weeks.map((week) => week.number)).toEqual([1, 2, 3, 4]);
    expect(weeks.at(-1)?.range).toBe("22–28/08/2026");
  });

  it("reinicia a numeração no início do mês seguinte", () => {
    const weeks = getAdministrativeWeeks(new Date(2026, 8, 1, 9, 0));
    expect(weeks).toHaveLength(1);
    expect(weeks[0]).toMatchObject({ label: "MÊS 09 · SEMANA 01", range: "01–07/09/2026", current: true });
  });
});
