export function getFilenameSuffix(filename: string) {
  const l1 = filename.lastIndexOf('.'),
    l2 = filename.length;
  if (l1 <= 0) {
    return null;
  }
  return filename.substring(l1, l2);
}