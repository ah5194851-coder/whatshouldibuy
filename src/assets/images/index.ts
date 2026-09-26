import heroImg from './hero_product_curation_1790354697983.jpg';
import laptopImg from './cat_laptops_showcase_1790354718502.jpg';
import headphoneImg from './cat_headphones_showcase_1790354735596.jpg';
import cameraImg from './cat_cameras_showcase_1790354748549.jpg';

export { heroImg, laptopImg, headphoneImg, cameraImg };

export const IMAGE_MAP: Record<string, string> = {
  '/src/assets/images/hero_product_curation_1790354697983.jpg': heroImg,
  '/src/assets/images/cat_laptops_showcase_1790354718502.jpg': laptopImg,
  '/src/assets/images/cat_headphones_showcase_1790354735596.jpg': headphoneImg,
  '/src/assets/images/cat_cameras_showcase_1790354748549.jpg': cameraImg,
  'hero_product_curation_1790354697983.jpg': heroImg,
  'cat_laptops_showcase_1790354718502.jpg': laptopImg,
  'cat_headphones_showcase_1790354735596.jpg': headphoneImg,
  'cat_cameras_showcase_1790354748549.jpg': cameraImg,
};

export function resolveImageSrc(src?: string): string {
  if (!src) return heroImg;
  if (IMAGE_MAP[src]) return IMAGE_MAP[src];
  if (src.startsWith('/src/assets/images/')) {
    const filename = src.replace('/src/assets/images/', '');
    if (IMAGE_MAP[filename]) return IMAGE_MAP[filename];
  }
  return src;
}
