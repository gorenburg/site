import { base } from '$app/paths'

export function getPreviewImageUrl(path: string): string {
  if (path.includes('/images/')) {
    return base + path
  }

  return path
}
