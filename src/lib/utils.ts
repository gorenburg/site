type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'en-US') {
  const dateToFormat = new Date(date.replace(/ /, 'T').replace(/ /, ''))
  return new Intl.DateTimeFormat(locales, { dateStyle }).format(dateToFormat)
}
