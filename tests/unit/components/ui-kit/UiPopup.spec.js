import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

import UiPopup from "@/components/ui-kit/UiPopup.vue";

const ESC_KEY_CODE = 27;
const MOCK_BUTTON_TEXT = {
  OK: "OK",
  CANCEL: "CANCEL",
};

describe("UiPopup", () => {
  let wrapper;

  const findOverlay = () => wrapper.findAll("div").wrappers.at(0);
  const findButtonClose = () => wrapper.find("[aria-label='закрыть']");
  const findButtonByText = (text) => wrapper.findAll("button").wrappers.find((w) => w.text() === text);

  const openPopup = () => wrapper.vm.open();

  const createComponent = () => {
    wrapper = shallowMount(UiPopup, {
      scopedSlots: {
        default(props) {
          return (
            <div>
              <button onClick={props.close}>{MOCK_BUTTON_TEXT.CANCEL}</button>
              <button onClick={props.confirm}>{MOCK_BUTTON_TEXT.OK}</button>
            </div>
          );
        },
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is not exists when initiallized", () => {
    createComponent();
    const overlay = findOverlay();

    expect(overlay).toBeUndefined();
  });

  it("is exists when after open invoke", async () => {
    createComponent();

    openPopup();
    await nextTick();

    expect(findOverlay().exists()).toBe(true);
  });

  it("closed by ESC press", async () => {
    createComponent();
    openPopup();
    await nextTick();

    const event = new KeyboardEvent("keydown", {
      keyCode: ESC_KEY_CODE,
    });

    document.dispatchEvent(event);
    await nextTick();

    expect(findOverlay()).toBeUndefined();
  });

  it.each`
    description                       | finder
    ${"button close click"}           | ${findButtonClose}
    ${"overlay click"}                | ${findOverlay}
    ${"scoped slot close callback"}   | ${() => findButtonByText(MOCK_BUTTON_TEXT.CANCEL)}
    ${"scoped slot confirm callback"} | ${() => findButtonByText(MOCK_BUTTON_TEXT.OK)}
  `("closed by $description", async ({ finder }) => {
    createComponent();
    openPopup();
    await nextTick();

    const element = finder();
    await element.trigger("click");

    expect(findOverlay()).toBeUndefined();
  });

  it.each`
    description                     | finder
    ${"button close click"}         | ${findButtonClose}
    ${"overlay click"}              | ${findOverlay}
    ${"scoped slot close callback"} | ${() => findButtonByText(MOCK_BUTTON_TEXT.CANCEL)}
  `("promise result after closed by $description", async ({ finder }) => {
    createComponent();
    const promise = openPopup();
    await nextTick();

    const element = finder();
    element.trigger("click");
    const result = await promise;

    expect(result).toBe(false);
  });

  it("promise result after closed by ESC press", async () => {
    createComponent();
    const promise = openPopup();
    await nextTick();

    const event = new KeyboardEvent("keydown", {
      keyCode: ESC_KEY_CODE,
    });

    document.dispatchEvent(event);
    const result = await promise;

    expect(result).toBe(false);
  });

  it("promise result after confirm modal", async () => {
    createComponent();
    const promise = openPopup();
    await nextTick();

    findButtonByText(MOCK_BUTTON_TEXT.OK).trigger("click");
    const result = await promise;

    expect(result).toBe(true);
  });

  it("removes attached event listener when destroyed", async () => {
    jest.spyOn(document, "addEventListener");
    jest.spyOn(document, "removeEventListener");
    createComponent();

    openPopup();
    await nextTick();
    const [, keyDownListener] = document.addEventListener.mock.calls.find(([key]) => key === "keydown");

    expect(document.removeEventListener).not.toHaveBeenCalledWith("keydown", keyDownListener);

    await findButtonClose().trigger("click");

    expect(document.removeEventListener).toHaveBeenCalledWith("keydown", keyDownListener);
  });
});
