import { getCurrentWeek, TransferDateEnum } from "../src/index";

describe("test getCurrentWeek function for diffrent arguments", () => {
  it("should return current week with year argument", () => {
    const currentWeek = getCurrentWeek({ day: 1, mounth: 1, year: 2021 });
    expect(currentWeek).toHaveProperty("dateDetails");
    expect(currentWeek).toHaveProperty("monthName");
    expect(currentWeek).toHaveProperty("year");
  });

  it("should return current week with year and weeks arguments", () => {
    const currentWeek = getCurrentWeek({ day: 1, mounth: 1, year: 2021 }, 2);
    expect(currentWeek).toHaveProperty("dateDetails");
    expect(currentWeek).toHaveProperty("monthName");
    expect(currentWeek).toHaveProperty("year");
  });

  it("should return current week with year and weeks and direction arguments", () => {
    const currentWeek = getCurrentWeek(
      { day: 1, mounth: 1, year: 2021 },
      3,
      TransferDateEnum.back
    );
    expect(currentWeek).toHaveProperty("dateDetails");
    expect(currentWeek).toHaveProperty("monthName");
    expect(currentWeek).toHaveProperty("year");
  });
});
