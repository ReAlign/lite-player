import { isNumber } from './type';

export const formatSeconds = (seconds: any): string => {
  const BASE = 60;
  const _seconds = Number(seconds);

  if (isNumber(_seconds)) {
    if (_seconds > -1) {
      const hour = `${Math.floor(_seconds / BASE / BASE)}`.padStart(2, '0');
      const min = `${Math.floor((_seconds / BASE) % BASE)}`.padStart(2, '0');
      const sec = `${Math.floor(_seconds % BASE)}`.padStart(2, '0');

      return `${hour}:${min}:${sec}`;
    } else {
      return '';
    }
  } else {
    return '';
  }
};
