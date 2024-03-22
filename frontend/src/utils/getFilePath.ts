export const stripNameFromPath = (filepath: string): string => {
  const match = filepath.match(/.*\//)

  if (match) {
    return match[0]
  }

  return ''
}
