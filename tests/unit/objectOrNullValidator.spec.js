import objectOrNullValidator from "@/utils/objectOrNullValidator.js";

describe("objectOrNullValidator", () => {
  it.each([null, { a: "b" }, new Date()])("Passes on %s", (input) => {
    expect(objectOrNullValidator(input)).toBeTruthy();
  });

  it.each([undefined, ["a", "b"], console.log, "хуй"])("Fails on %s", (input) => {
    expect(objectOrNullValidator(input)).toBeFalsy();
  });
});
