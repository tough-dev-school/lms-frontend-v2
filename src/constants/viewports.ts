export class Viewport {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export const DESKTOP_VIEWPORT = new Viewport(1440, 900);
export const TABLET_VIEWPORT = new Viewport(768, 1024);
export const MOBILE_VIEWPORT = new Viewport(320, 560);

export const VIEWPORTS = [DESKTOP_VIEWPORT, TABLET_VIEWPORT, MOBILE_VIEWPORT];
