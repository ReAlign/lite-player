const typeOf = (o: any) => ({}).toString.call(o).slice(8, -1).toLowerCase();

export const isNumber = (o) => typeOf(o) === 'number';
