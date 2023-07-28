const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
 });

// Implementation from https://web.archive.org/web/20160310093832/http://people.eku.edu/styere/Encrypt/JS-AES.html

var S_enc = new Array(
   0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16);
var S_dec = new Array(
   0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d);
function I(x, y) { return (x * 4) + y; }
function aes_mul(a, b) {
   var res = 0;
   while (a > 0) {
      if ((a & 1) != 0)
         res = res ^ b;
      a >>>= 1;
      b <<= 1;
   }
   var hbit = 0x10000;
   var modulus = 0x11b00;
   while (hbit >= 0x100) {
      if ((res & hbit) != 0)
         res ^= modulus;
      hbit >>= 1;
      modulus >>= 1;
   }
   return res;
}
function SubWord(word_ary) {
   var i;
   for (i = 0; i < 16; i++)
      word_ary[i] = S_enc[word_ary[i]];
   return word_ary;
}
function RotWord(word_ary) {
   return new Array(word_ary[1], word_ary[2], word_ary[3], word_ary[0]);
}
function Rcon(exp) {
   var val = 2;
   var result = 1;
   exp--;
   while (exp > 0) {
      if ((exp & 1) != 0)
         result = aes_mul(result, val);
      val = aes_mul(val, val);
      exp >>= 1;
   }
   return result;
}
function key_expand(key) {
   var temp = new Array(4);
   var i, j;
   var w = new Array(4 * 11);
   for (i = 0; i < 16; i++) {
      w[i] = key[i];
   }
   i = 4;
   while (i < 44) {
      for (j = 0; j < 4; j++)
         temp[j] = w[(i - 1) * 4 + j];
      if (i % 4 == 0) {
         temp = RotWord(temp);
         temp = SubWord(temp);
         temp[0] ^= Rcon(i >>> 2);
      }
      for (j = 0; j < 4; j++)
         w[i * 4 + j] = w[(i - 4) * 4 + j] ^ temp[j];
      i++;
   }
   return w;
}
function SubBytes(state, Sbox) {
   var i;
   for (i = 0; i < 16; i++)
      state[i] = Sbox[state[i]];
   return state;
}
function ShiftRows(state) {
   var t0, t1, t2, t3;
   t0 = state[10];
   t1 = state[11];
   t2 = state[12];
   t3 = state[13];
   state[10] = t1;
   state[11] = t2;
   state[12] = t3;
   state[13] = t0;
   t0 = state[20];
   t1 = state[21];
   t2 = state[22];
   t3 = state[23];
   state[20] = t2;
   state[21] = t3;
   state[22] = t0;
   state[23] = t1;
   t0 = state[30];
   t1 = state[31];
   t2 = state[32];
   t3 = state[33];
   state[30] = t3;
   state[31] = t0;
   state[32] = t1;
   state[33] = t2;
   return state;
}
function InvShiftRows(state) {
   var t0, t1, t2, t3;
   t0 = state[10];
   t1 = state[11];
   t2 = state[12];
   t3 = state[13];
   state[10] = t3;
   state[11] = t0;
   state[12] = t1;
   state[13] = t2;
   t0 = state[20];
   t1 = state[21];
   t2 = state[22];
   t3 = state[23];
   state[20] = t2;
   state[21] = t3;
   state[22] = t0;
   state[23] = t1;
   t0 = state[30];
   t1 = state[31];
   t2 = state[32];
   t3 = state[33];
   state[30] = t1;
   state[31] = t2;
   state[32] = t3;
   state[33] = t0;
   return state;
}
function MixColumns(state) {
   var col;
   var c0, c1, c2, c3;
   for (col = 0; col < 4; col++) {
      c0 = state[I(0, col)];
      c1 = state[I(1, col)];
      c2 = state[I(2, col)];
      c3 = state[I(3, col)];
      state[I(0, col)] = aes_mul(2, c0) ^ aes_mul(3, c1) ^ c2 ^ c3;
      state[I(1, col)] = c0 ^ aes_mul(2, c1) ^ aes_mul(3, c2) ^ c3;
      state[I(2, col)] = c0 ^ c1 ^ aes_mul(2, c2) ^ aes_mul(3, c3);
      state[I(3, col)] = aes_mul(3, c0) ^ c1 ^ c2 ^ aes_mul(2, c3);
   }
   return state;
}
function InvMixColumns(state) {
   var col;
   var c0, c1, c2, c3;
   for (col = 0; col < 4; col++) {
      c0 = state[I(0, col)];
      c1 = state[I(1, col)];
      c2 = state[I(2, col)];
      c3 = state[I(3, col)];
      state[I(0, col)] = aes_mul(0x0e, c0) ^ aes_mul(0x0b, c1)
         ^ aes_mul(0x0d, c2) ^ aes_mul(0x09, c3);
      state[I(1, col)] = aes_mul(0x09, c0) ^ aes_mul(0x0e, c1)
         ^ aes_mul(0x0b, c2) ^ aes_mul(0x0d, c3);
      state[I(2, col)] = aes_mul(0x0d, c0) ^ aes_mul(0x09, c1)
         ^ aes_mul(0x0e, c2) ^ aes_mul(0x0b, c3);
      state[I(3, col)] = aes_mul(0x0b, c0) ^ aes_mul(0x0d, c1)
         ^ aes_mul(0x09, c2) ^ aes_mul(0x0e, c3);
   }
   return state;
}
function AddRoundKey(state, w, base) {
   var col;
   for (col = 0; col < 4; col++) {
      state[I(0, col)] ^= w[base + col * 4];
      state[I(1, col)] ^= w[base + col * 4 + 1];
      state[I(2, col)] ^= w[base + col * 4 + 2];
      state[I(3, col)] ^= w[base + col * 4 + 3];
   }
   return state;
}
function transpose(msg) {
   var row, col;
   var state = new Array(16);
   for (row = 0; row < 4; row++)
      for (col = 0; col < 4; col++)
         state[I(row, col)] = msg[I(col, row)];
   return state;
}
var AES_output = new Array(16);
function aes_encrypt(msg, key) {
   var w = new Array(44);
   var state = new Array(16);
   var round;
   w = key_expand(key);
   state = transpose(msg);
   state = AddRoundKey(state, w, 0);
   for (round = 1; round < 10; round++) {
      state = SubBytes(state, S_enc);
      state = ShiftRows(state);
      state = MixColumns(state);
      state = AddRoundKey(state, w, round * 4 * 4);
   }
   SubBytes(state, S_enc);
   ShiftRows(state);
   AddRoundKey(state, w, 10 * 4 * 4);
   AES_output = transpose(state);
   return AES_output;
}
function aes_decrypt(msg, key) {
   var w = new Array(44);
   var state = new Array(16);
   var round;
   w = key_expand(key);
   state = transpose(msg);
   state = AddRoundKey(state, w, 10 * 4 * 4);
   for (round = 9; round >= 1; round--) {
      state = InvShiftRows(state);
      state = SubBytes(state, S_dec);
      state = AddRoundKey(state, w, round * 4 * 4);
      state = InvMixColumns(state);
   }
   InvShiftRows(state);
   SubBytes(state, S_dec);
   AddRoundKey(state, w, 0);
   AES_output = transpose(state);
   return AES_output;
}

var key = new Array(16);
for (var i = 0; i < 16; i++) {
   key[i] = Math.floor(Math.random() * 256);
}

var flag = "some_secret_flag"
var flag_array = new Array(16);

for (var i = 0; i < flag.length; i++) {
   flag_array[i] = flag.charCodeAt(i);
}
for (var i = flag.length; i < 16; i++) {
   flag_array[i] = 0;
}

var encrypted_flag = aes_encrypt(flag_array, key);
var encrypted_flag_hex = "";

for (var i = 0; i < encrypted_flag.length; i++) {
   encrypted_flag_hex += ("0" + encrypted_flag[i].toString(16)).substr(-2);
}

console.log("Encrypted flag: " + encrypted_flag_hex);

readline.question('Encode your own message: ', message => {
   message = message.substring(0, 16);
   
   var message_array = new Array(16);
   for (var i = 0; i < message.length; i++) {
      message_array[i] = message.charCodeAt(i);
   }
   for (var i = message.length; i < 16; i++) {
      message_array[i] = 0;
   }
   
   var encrypted = aes_encrypt(message_array, key);
   
   var encrypted_hex = "";
   for (var i = 0; i < encrypted_flag.length; i++) {
      encrypted_hex += ("0" + encrypted[i].toString(16)).substr(-2);
   }
   
   console.log("Encrypted message: " + encrypted_hex);
   
   var decrypted = aes_decrypt(encrypted, key);
   var message_decrypted = "";
   for (var i = 0; i < decrypted.length; i++) {
      message_decrypted += ("0" + decrypted[i].toString(16)).substr(-2);
   }
   
   console.log("Decrypted message: " + message_decrypted);
   readline.close();
 });
