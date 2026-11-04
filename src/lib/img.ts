import type { ImageMetadata } from 'astro';

// Photos are referenced by file name (without extension) from the data files.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.webp', { eager: true });
const byName = Object.fromEntries(Object.entries(files).map(([p, m]) => [p.split('/').pop()!.replace('.webp', ''), m.default]));

export function photo(name: string): ImageMetadata {
  const img = byName[name];
  if (!img) throw new Error(`Missing photo: ${name}`);
  return img;
}
