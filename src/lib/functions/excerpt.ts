// First prose paragraph of a markdown post, trimmed to a meta-description length
export function getExcerpt(markdown: string, maxLength = 155): string | undefined {
  const body = markdown.replace(/^---[\s\S]*?---/, '')
  const line = body
    .split('\n')
    .map(i => i.trim())
    .find(i => i && !/^(#|<|!|\{|```|\||>)/.test(i))

  if (!line) { return }

  const text = line
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\{:[^}]*\}|<[^>]*>|[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) { return text }

  return text.slice(0, text.lastIndexOf(' ', maxLength - 1)) + '…'
}
