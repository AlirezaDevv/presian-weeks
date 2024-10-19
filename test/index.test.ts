import { getPersianWeek, TransferDateEnum } from "../src/index";

describe("test getPersianWeek function for diffrent arguments", () => {
  it("should return current week with year argument", () => {
    const currentWeek = getPersianWeek();
    expect(currentWeek).toHaveProperty("weekDetails");
    expect(currentWeek).toHaveProperty("monthName");
    expect(currentWeek).toHaveProperty("year");
  });

  it("should return current week with year and weeks arguments", () => {
    const currentWeek = getPersianWeek( 2);
    expect(currentWeek).toHaveProperty("weekDetails");
    expect(currentWeek).toHaveProperty("monthName");
    expect(currentWeek).toHaveProperty("year");
  });

  it("should return current week with year and weeks and direction arguments", () => {
    const currentWeek = getPersianWeek(
      
      3,
      TransferDateEnum.back
    );
    expect(currentWeek).toHaveProperty("weekDetails");
    expect(currentWeek).toHaveProperty("monthName");
    expect(currentWeek).toHaveProperty("year");
  });
});
