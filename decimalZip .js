const decimalZip = (a, b) => {
  const MAX_INT = 100000000;
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Only integers are allowed');
  }
  if (a < 0 || b < 0) {
    throw new Error('Only positive integers are allowed');
  }
  if (a > MAX_INT || b > MAX_INT) {
    throw new Error(`Integer value should not exceed ${MAX_INT}`);
  }
  
  const sa = String(a).split('');
  const sb = String(b).split('');
  let result = '';
  for (let i = 0; i < sa.length || i < sb.length; i++) {
    if (i < sa.length) {
      result += sa[i];
    }
    if (i < sb.length) {
      result += sb[i];
    }
  }
  const intResult = parseInt(result);
  if (intResult > MAX_INT) {
    return -1;
  }
  
  return intResult;
};

decimalZip(12,56);     // => 1526
decimalZip(12345,678); // => 16273845
decimalZip(123,67890); // => 16273890