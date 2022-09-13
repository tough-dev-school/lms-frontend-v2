import { shallowMount } from "@vue/test-utils";

import UiLink from "@/components/ui-kit/UiLink.vue";

describe("UiButton", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(UiLink, {
      stubs: ["router-link"],
      ...options,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('Render "a" tag without prop "to"', () => {
    createComponent();

    expect(wrapper.html()).toMatch("<a");
  });

  it('Render "router-link" when pass prop "to"', () => {
    createComponent({ propsData: { to: "/" } });

    expect(wrapper.html()).toMatch("<router-link");
  });

  it("Click event should emitted by click", async () => {
    const onClick = jest.fn();
    createComponent({ listeners: { click: onClick } });

    wrapper.find("a").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });
});
