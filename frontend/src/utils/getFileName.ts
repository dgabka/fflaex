export const getFileName = (filepath: string): string => {
  const match = filepath.match(/.*\/(.*)$/);

  if (match && match[1]) {
    return match[1]
  }

  return ''
}
