export class Viewport {
  width: number;
  height: number;
  threshold: number;
  constructor(width: number, height: number, threshold: number) {
    this.width = width;
    this.height = height;
    this.threshold = threshold;
  }
}

export const DESKTOP_VIEWPORT = new Viewport(1440, 900, 0.01);
export const TABLET_VIEWPORT = new Viewport(768, 1024, 0.01);
export const MOBILE_VIEWPORT = new Viewport(320, 560, 0.01);

export const VIEWPORTS = [DESKTOP_VIEWPORT, TABLET_VIEWPORT, MOBILE_VIEWPORT];
