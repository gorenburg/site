type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

const timePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})\s(?<timezone>[+-]\d{4})/;

export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'en-US'): string {
  const match = date.match(timePattern)

  if (match) {
    const { groups } = match
    const components = {
      year: groups?.year,
      month: groups?.month,
      day: groups?.day,
      hour: groups?.hour,
      minute: groups?.minute,
      second: groups?.second,
      timezone: groups?.timezone
    }
    const dateToFormat = new Date(`${components.year}-${components.month}-${components.day}T${components.hour}:${components.minute}:${components.second}`)
    return new Intl.DateTimeFormat(locales, { dateStyle }).format(dateToFormat)
  }

  return ''
}
