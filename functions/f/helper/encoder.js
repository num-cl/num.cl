const escapeRegExp = (str) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

const create = (chars) => {
  const charCodes = chars.map((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

  const charToCode = {};
  const codeToChar = {};
  chars.forEach((c, i) => {
    charToCode[c] = charCodes[i];
    codeToChar[charCodes[i]] = c;
  });

  const charsRegex = new RegExp(`[${escapeRegExp(chars.join(''))}]`, 'g');
  const charCodesRegex = new RegExp(charCodes.join('|'), 'g');

  const encode = (str) => str.replace(charsRegex, (match) => charToCode[match]);
  const decode = (str) => str.replace(charCodesRegex, (match) => codeToChar[match]);

  return {encode, decode};
};

const {
  encode,
  decode,
} = create('.$[]#/% '.split(''));

exports.encode = function(string) {
  return encode(decode(string));
};

exports.decode = function(string) {
  return decode(string);
};
