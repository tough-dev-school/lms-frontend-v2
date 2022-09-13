import store from "@/store/";
import MockDate from "mockdate";

const validToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTgxNDA4MDUsImV4cCI6MTY0OTY3NjgwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.bRAl5_pojgOV9UH9S0YXXd2STQdxm7g6Calrx1bNdf4";

const invalidToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTgxNDA4MDUsImV4cCI6MTU4NjYwNDgwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.xU630aE4tv3TePODch468Of0eFiisoVcsuq1wttazLU";

describe("IsAuthenticated getter", () => {
  beforeAll(() => {
    MockDate.set("2021-01-15 15:30:45");
  });
  beforeEach(() => {
    store.commit("auth/RESET");
  });

  it("Is false by default", () => {
    expect(store.getters["auth/isAuthenticated"]).toBeFalsy();
  });

  it("Is false when user is authenticated but there is no token", () => {
    store.commit("auth/SET_USER", { test: "test" });
    expect(store.getters["auth/isAuthenticated"]).toBeFalsy();
  });

  it("Is false when there is a token, but we have not the user object", () => {
    store.commit("auth/SET_TOKEN", validToken);
    expect(store.getters["auth/isAuthenticated"]).toBeFalsy();
  });

  it("Is true when there is a user and the token", () => {
    store.commit("auth/SET_USER", { test: "test" });
    store.commit("auth/SET_TOKEN", validToken);
    expect(store.getters["auth/isAuthenticated"]).toBeTruthy();
  });

  it("Is false when token is invalid", () => {
    store.commit("auth/SET_USER", { test: "test" });
    store.commit("auth/SET_TOKEN", invalidToken);

    expect(store.getters["auth/isAuthenticated"]).toBeFalsy();
  });
});
