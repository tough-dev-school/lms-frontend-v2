import getUserName from "@/utils/getUserName.js";

describe("getUserName", () => {
  let user;

  beforeEach(() => {
    user = { first_name: "John", last_name: "Doe" };
  });

  it("User has first name and last name", () => {
    const userName = getUserName(user);

    expect(userName).toEqual("John Doe");
  });

  it("User has not first name and last name", () => {
    user = {};

    const userName = getUserName(user);

    expect(userName).toEqual("Anonymous");
  });

  it("User has only first name", () => {
    user = { ...user, last_name: undefined };

    const userName = getUserName(user);

    expect(userName).toEqual("John");
  });

  it("User has only last name", () => {
    user = { ...user, first_name: undefined };

    const userName = getUserName(user);

    expect(userName).toEqual("Doe");
  });

  it.each`
    a            | b              | expected
    ${123}       | ${"number"}    | ${"Anonymous"}
    ${"123"}     | ${"string"}    | ${"Anonymous"}
    ${null}      | ${"object"}    | ${"Anonymous"}
    ${undefined} | ${"undefined"} | ${"Anonymous"}
  `("Wrong argument: $a ($b)", ({ a, expected }) => {
    const userName = getUserName(a);

    expect(userName).toBe(expected);
  });
});
