import getSocialUsernameFromURL from "@/utils/getSocialUsernameFromURL.js";

describe("getSocialUsernameFromURL", () => {
  it.each`
    url                                         | username
    ${"https://github.com/f213"}                | ${"f213"}
    ${"https://github.com/f213/"}               | ${"f213"}
    ${"github.com/f213"}                        | ${"f213"}
    ${"github.com/f213/"}                       | ${"f213"}
    ${"f213"}                                   | ${"f213"}
    ${"https://github.com/weird/f213"}          | ${"f213"}
    ${"https://github.com/weird/f213/"}         | ${"f213"}
    ${"https://linkedin.com/p/f213/"}           | ${"f213"}
    ${"https://linkedin.com/p/100000000500000"} | ${"100000000500000"}
  `("$url -> $username", ({ url, username }) => {
    expect(getSocialUsernameFromURL(url)).toEqual(username);
  });
});
