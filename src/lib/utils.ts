type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

const timePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})\s(?<timezone>[+-]\d{4})/;

export function getParsedDate(date: string): Date | undefined {
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
    return new Date(`${components.year}-${components.month}-${components.day}T${components.hour}:${components.minute}:${components.second}Z`)
  }

  return undefined
}

export function formatDate(date: string | Date, dateStyle: DateStyle = 'long', locales = 'en-US'): string  {
  const dateValue = new Date(date)

  if (dateValue) {
    return new Intl.DateTimeFormat(locales, { dateStyle }).format(dateValue)
  }

  return date.toString()
}

export function getFormatedDate(date: string, dateStyle: DateStyle = 'long') {
  return formatDate(getParsedDate(date) || date, dateStyle)
}
