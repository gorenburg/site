export function slugify(string: string): string {
  return string.replaceAll(' ', '-')
}