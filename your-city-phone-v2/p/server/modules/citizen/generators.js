const digits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
export const makeNik = () => '3273' + digits(12);
export const makePhone = () => '0812' + digits(8);
