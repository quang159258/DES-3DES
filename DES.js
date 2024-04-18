function Bin_to_Hex(s) {
  var hex = "";
  for (var i = 0; i < s.length; i += 4) {
    var k = s.substring(i, i + 4);
    switch (k) {
      case "0000":
        hex += "0";
        break;
      case "0001":
        hex += "1";
        break;
      case "0010":
        hex += "2";
        break;
      case "0011":
        hex += "3";
        break;
      case "0100":
        hex += "4";
        break;
      case "0101":
        hex += "5";
        break;
      case "0110":
        hex += "6";
        break;
      case "0111":
        hex += "7";
        break;
      case "1000":
        hex += "8";
        break;
      case "1001":
        hex += "9";
        break;
      case "1010":
        hex += "A";
        break;
      case "1011":
        hex += "B";
        break;
      case "1100":
        hex += "C";
        break;
      case "1101":
        hex += "D";
        break;
      case "1110":
        hex += "E";
        break;
      case "1111":
        hex += "F";
        break;
      default:
        break;
    }
  }
  return hex;
}
function Dec_to_Hex(n) {
  return n.toString(16).toUpperCase();
}
function Hex_to_Bin(s) {
  var bin = "";
  for (var i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "0":
        bin += "0000";
        break;
      case "1":
        bin += "0001";
        break;
      case "2":
        bin += "0010";
        break;
      case "3":
        bin += "0011";
        break;
      case "4":
        bin += "0100";
        break;
      case "5":
        bin += "0101";
        break;
      case "6":
        bin += "0110";
        break;
      case "7":
        bin += "0111";
        break;
      case "8":
        bin += "1000";
        break;
      case "9":
        bin += "1001";
        break;
      case "A":
      case "a":
        bin += "1010";
        break;
      case "B":
      case "b":
        bin += "1011";
        break;
      case "C":
      case "c":
        bin += "1100";
        break;
      case "D":
      case "d":
        bin += "1101";
        break;
      case "E":
      case "e":
        bin += "1110";
        break;
      case "F":
      case "f":
        bin += "1111";
        break;
      default:
        break;
    }
  }
  return bin;
}
function Bin_to_Dec(s) {
  var dec = 0;
  dec = parseInt(s, 2);
  return dec;
}
function Dec_to_Bin(n) {
  var bin = "";
  while (n > 0) {
    bin = (n % 2) + bin;
    n = Math.floor(n / 2);
  }
  while (bin.length < 4) bin = "0" + bin;
  return bin;
}
function Txt_to_Bin(s) {
  var R = "";
  for (var i = 0; i < s.length; i++) {
    for (let j = 7; j >= 0; j--) {
      R += (s.charCodeAt(i) >> j) & 1;
    }
  }
  return R;
}
function Shift_Bits(s, n) {
  var k = "";
  for (var i = n; i < s.length; i++) k += s[i];
  for (var i = 0; i < n; i++) k += s[i];
  return k;
}
function XOR(s1, s2) {
  var k = "";
  for (var i = 0; i < s1.length; i++) {
    if (s1[i] == s2[i]) k += "0";
    else k += "1";
  }
  return k;
}
function Seg_to_8(R_XOR_K) {
  var Seg_R_XOR_K = [];
  for (var i = 0; i < 48; i += 6) {
    Seg_R_XOR_K[i / 6] = R_XOR_K.substring(i, i + 6);
  }
  return Seg_R_XOR_K;
}
function Sn_Mapping(Seg, number) {
  var n = Seg[0] + Seg[5];
  n = Bin_to_Dec(n);
  var m = Seg.substring(1, 5);
  m = Bin_to_Dec(m);

  return Dec_to_Bin(S_t[number][n][m]);
}
function f_R_K(R_32, Key_48) {
  R_48 = "";
  for (var i = 0; i < 48; i++) R_48 += R_32[E_t[i] - 1];
  var R_XOR_K = XOR(R_48, Key_48);
  var Seg_R_XOR_K = Seg_to_8(R_XOR_K);
  var Combine_All_Seg_32 = "";
  for (var i = 0; i < 8; i++) {
    Combine_All_Seg_32 += Sn_Mapping(Seg_R_XOR_K[i], i);
  }
  var R = "";
  for (var i = 0; i < 32; i++) {
    R += Combine_All_Seg_32[P[i] - 1];
  }
  return R;
}
function Bin_to_Text(s) {
  var t = "";
  for (var i = 0; i < s.length / 8; i++)
    t += String.fromCharCode(Bin_to_Dec(s.substring(i * 8, (i + 1) * 8)));
  return t;
}
function isHexadecimal(str) {
  var hexRegex = /^[0-9A-Fa-f]+$/;
  if (!hexRegex.test(str)) {
    return false;
  }
  return true;
}
function isBinary(str) {
  var binaryRegex = /^[01]+$/;
  if (!binaryRegex.test(str)) {
    return false;
  }
  return true;
}

const pc_1 = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];
const pc_2 = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];
const No_LeftShift = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
const IP = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];
const IP_1 = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];
const E_t = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];
const S_t = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],
  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],
  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ],
  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ],
  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ],
  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ],
  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ],
  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ],
];
const P = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];
function Encrypt(plain_txt_64, key_64) {
  //KEY
  var key_56 = "";
  var C0_32 = "";
  var D0_32 = "";
  for (var i = 0; i < 56; i++) {
    //Mapping vào PC_1
    key_56 += key_64[pc_1[i] - 1];
  }
  for (var i = 0; i < 28; i++) {
    //Tạo C0
    C0_32 += key_56[i];
  }
  for (var i = 28; i < 56; i++) {
    //Tạo D0
    D0_32 += key_56[i];
  }
  var Cn_32 = [];
  var Dn_32 = [];
  Cn_32[0] = Shift_Bits(C0_32, No_LeftShift[0]); //Tạo C1 và D1
  Dn_32[0] = Shift_Bits(D0_32, No_LeftShift[0]);
  for (var i = 1; i < 16; i++) {
    //Tạo các Cn,Dn (do C1, D1 có rồi)
    Cn_32[i] = Shift_Bits(Cn_32[i - 1], No_LeftShift[i]);
    Dn_32[i] = Shift_Bits(Dn_32[i - 1], No_LeftShift[i]);
  }
  var key_56_temp = []; //Ghép L+R để mapping vào PC_2
  var Key_n_48 = [];
  for (var i = 0; i < 16; i++) {
    key_56_temp[i] = Cn_32[i] + Dn_32[i];
  }
  for (var i = 0; i < 16; i++) {
    //Mapping PC_2 tạo ra Key thứ n
    Key_n_48[i] = "";
    for (var j = 0; j < 48; j++) {
      Key_n_48[i] += key_56_temp[i][pc_2[j] - 1];
    }
  }
  //Plain_TXT
  var IP_64 = "";
  for (var i = 0; i < 64; i++) {
    //Mapping IP
    IP_64 += plain_txt_64[IP[i] - 1];
  }
  var Ln_32 = [];
  var Rn_32 = [];
  var L0 = "";
  var R0 = "";
  //Tìm L0, R0
  for (var i = 0; i < 32; i++) L0 += IP_64[i];
  for (var i = 32; i < 64; i++) R0 += IP_64[i];
  //Tìm R1, L1
  Ln_32[0] = R0;
  Rn_32[0] = XOR(L0, f_R_K(R0, Key_n_48[0])); //Phép XOR giữa L_n-1 và hàm F
  for (var i = 1; i < 16; i++) {
    Ln_32[i] = Rn_32[i - 1];
    Rn_32[i] = XOR(Ln_32[i - 1], f_R_K(Rn_32[i - 1], Key_n_48[i]));
  }

  var R_L = Rn_32[15] + Ln_32[15];
  var Cipher_txt_64 = "";
  for (var i = 0; i < 64; i++) Cipher_txt_64 += R_L[IP_1[i] - 1];
  return Cipher_txt_64;
}
function Dencrypt(cipher_txt_64, key_64) {
  //KEY
  var key_56 = "";
  var C0_32 = "";
  var D0_32 = "";
  for (var i = 0; i < 56; i++) {
    //Mapping vào PC_1
    key_56 += key_64[pc_1[i] - 1];
  }
  for (var i = 0; i < 28; i++) {
    //Tạo C0
    C0_32 += key_56[i];
  }
  for (var i = 28; i < 56; i++) {
    //Tạo D0
    D0_32 += key_56[i];
  }
  var Cn_32 = [];
  var Dn_32 = [];
  Cn_32[0] = Shift_Bits(C0_32, No_LeftShift[0]); //Tạo C1 và D1
  Dn_32[0] = Shift_Bits(D0_32, No_LeftShift[0]);
  for (var i = 1; i < 16; i++) {
    //Tạo các Cn,Dn (do C1, D1 có rồi)
    Cn_32[i] = Shift_Bits(Cn_32[i - 1], No_LeftShift[i]);
    Dn_32[i] = Shift_Bits(Dn_32[i - 1], No_LeftShift[i]);
  }
  var key_56_temp = []; //Ghép L+R để mapping vào PC_2
  var Key_n_48 = [];
  for (var i = 0; i < 16; i++) {
    key_56_temp[i] = Cn_32[i] + Dn_32[i];
  }
  for (var i = 0; i < 16; i++) {
    //Mapping PC_2 tạo ra Key thứ n
    Key_n_48[i] = "";
    for (var j = 0; j < 48; j++) {
      Key_n_48[i] += key_56_temp[i][pc_2[j] - 1];
    }
  }

  //Nghich đảo quá trình mã hóa nên đảo Key lại là xong
  Key_n_48 = Key_n_48.reverse();

  //Cipher_TXT
  var IP_64 = "";
  for (var i = 0; i < 64; i++) {
    //Mapping IP
    IP_64 += cipher_txt_64[IP[i] - 1];
  }
  var Ln_32 = [];
  var Rn_32 = [];
  var L0 = "";
  var R0 = "";
  //Tìm L0, R0
  for (var i = 0; i < 32; i++) L0 += IP_64[i];
  for (var i = 32; i < 64; i++) R0 += IP_64[i];
  //Tìm R1, L1
  Ln_32[0] = R0;
  Rn_32[0] = XOR(L0, f_R_K(R0, Key_n_48[0])); //Phép XOR giữa L_n-1 và hàm F
  for (var i = 1; i < 16; i++) {
    Ln_32[i] = Rn_32[i - 1];
    Rn_32[i] = XOR(Ln_32[i - 1], f_R_K(Rn_32[i - 1], Key_n_48[i]));
  }

  var R_L = Rn_32[15] + Ln_32[15];
  var Plain_txt_64 = "";
  for (var i = 0; i < 64; i++) Plain_txt_64 += R_L[IP_1[i] - 1];
  return Plain_txt_64;
}
function RemovePadding_Binary(s) {
  var Number_Padding = Bin_to_Dec(s.substring(56, 64));
  var check = true;

  if (Number_Padding >= 1 && Number_Padding <= 7) {
    for (var i = 8 - Number_Padding; i < 7; i++) {
      if (Bin_to_Dec(s.substring(i * 8, (i + 1) * 8)) !== Number_Padding) {
        check = false;
        break;
      }
    }
    if (check) s = s.slice(0, (8 - Number_Padding) * 8);
  }
  return s;
}
function AddPadding_Binary(s, n) {
  for (var i = 0; i < n; i++) {
    s += "0000" + Dec_to_Bin(n);
  }
  return s;
}
function AddPadding_Hex(s, n) {
  for (var i = 0; i < n; i++) {
    s += "0" + Dec_to_Hex(n);
  }
  return s;
}
