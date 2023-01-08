export function getNumberExceptUnit(str: string, unit: string) {
  return Number(str.split(unit)[0] || '0');
}

export function getPXNumber(str: string) {
  return getNumberExceptUnit(str, 'px');
}
