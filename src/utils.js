function addSuffix(number, suffix) {
  const lastDigit = number % 10
  const suffixes = ['st', 'nd', 'rd', 'th']

  if (lastDigit === 1) {
    suffix = suffixes[0]
  } else if (lastDigit === 2) {
    suffix = suffixes[1]
  } else if (lastDigit === 3) {
    suffix = suffixes[2]
  } else {
    suffix = suffixes[3]
  }

  return number + suffix
}

const monthNumberToName = (monthNumber) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return monthNames[monthNumber - 1]
}

export const formatNumber = (number) => {
  if (number < 1000) {
    return number.toFixed(2)
  } else if (number < 1000000) {
    return `${(number / 1000).toFixed(2)}k`
  } else {
    return `${(number / 1000000).toFixed(2)}m`
  }
}

export const getDayMonthYear = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return { day: addSuffix(day), month: monthNumberToName(month), year }
}

export const truncateString = (string, max_length = 10, ending = '...') => {
  if (string.length <= max_length) {
    return string
  } else {
    return string.slice(0, max_length) + ending
  }
}
