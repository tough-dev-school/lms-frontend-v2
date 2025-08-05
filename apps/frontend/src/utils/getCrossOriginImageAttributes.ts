import type { ImgHTMLAttributes } from 'vue';

/** Images should be cross-origin in order to avoid opaque responses when we implement offline caching
 *
 * See https://developer.chrome.com/docs/workbox/caching-resources-during-runtime#opaque_responses_and_the_navigatorstorage_api
 */
export function getCrossOriginImgAttrs(
  src: string,
): Pick<ImgHTMLAttributes, 'src' | 'crossorigin'> {
  // Some of our data still contains HTTP image links, but it's safe to assume they all point to our CDN
  // which supports HTTPS and CORS.
  return {
    crossorigin: 'anonymous',
    src: src.replace('http:', 'https:'),
  };
}
