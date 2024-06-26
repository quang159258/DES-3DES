function ETripleDes_CBC(Plain_txt, BigKey, IV) {
  var Binary_Plain = Txt_to_Bin(Plain_txt);
  IV = Hex_to_Bin(IV);
  var previousCipher = IV;
  $("#Result").append(`<div id="Encrypt"></div>`);
  var desk = $("#Encrypt");
  desk.append(
    "<h4>Nội dung: " +
      Bin_to_Hex(Binary_Plain) +
      " ( Hex ) <br>" +
      "</h4>Được chia thành các Block 64 bits:<br>"
  );
  var Block_64 = [];
  var Number_Block = 0;
  for (
    Number_Block = 0;
    Number_Block < parseInt((Binary_Plain.length / 64).toString());
    Number_Block++
  ) {
    Block_64[Number_Block] = Binary_Plain.substring(
      Number_Block * 64,
      (Number_Block + 1) * 64
    );
    desk.append(
      "Block thứ " +
        (Number_Block + 1) +
        "= " +
        Bin_to_Hex(Block_64[Number_Block]) +
        " ( Hex ) " +
        Block_64[Number_Block] +
        "<br>"
    );
  }
  if (Binary_Plain.length % 64 != 0) {
    Block_64[Number_Block] = Binary_Plain.substring(
      Number_Block * 64,
      Binary_Plain.length
    );
    desk.append(
      "Block thứ " +
        (Number_Block + 1) +
        "= " +
        Bin_to_Hex(Block_64[Number_Block]) +
        " ( Hex ) " +
        Block_64[Number_Block] +
        "<br>"
    );
    var Padding_length = (64 - Block_64[Number_Block].length) / 8;
    Block_64[Number_Block] = AddPadding_Binary(
      Block_64[Number_Block],
      Padding_length
    );
    Number_Block++;
    desk.append("<h4>Nội dung sau khi thêm padding</h4>");
    for (var i = 0; i < Number_Block; i++)
      desk.append(
        "Block thứ " +
          (i + 1) +
          "= " +
          Bin_to_Hex(Block_64[i]) +
          " ( Hex ) " +
          Block_64[i] +
          "<br>"
      );
  }

  var Key_64 = [];
  BigKey = Hex_to_Bin(BigKey);
  for (var i = 0; i < 3; i++) {
    Key_64[i] = BigKey.substring(i * 64, (i + 1) * 64);
  }
  var FirstEncrypt = [];
  var SecondDencrypt = [];
  var Result = "";
  desk.append("<h4>Giải thuật 3DES:</h4>");
  for (var j = 0; j < Number_Block; j++) {
    desk.append("<h4>Block thứ " + (j + 1) + ":</h4>");

    Block_64[j] = XOR(Block_64[j], previousCipher);

    FirstEncrypt[j] = Encrypt(Block_64[j], Key_64[0]);
    desk.append(
      "Sau khi mã hóa với Key 1: " +
        Bin_to_Hex(FirstEncrypt[j]) +
        " ( Hex ) " +
        FirstEncrypt[j] +
        "<br>"
    );
    SecondDencrypt[j] = Dencrypt(FirstEncrypt[j], Key_64[1]);
    desk.append(
      "Sau khi giải mã với Key 2: " +
        Bin_to_Hex(SecondDencrypt[j]) +
        " ( Hex ) " +
        SecondDencrypt[j] +
        "<br>"
    );
    Result += Encrypt(SecondDencrypt[j], Key_64[2]);
    desk.append(
      "Sau khi mã hóa với Key 3: " +
        Bin_to_Hex(Result.substring(j * 64, (j + 1) * 64)) +
        " ( Hex ) " +
        Result.substring(j * 64, (j + 1) * 64) +
        "<br>"
    );
    previousCipher = Result.substring(j * 64, (j + 1) * 64);
  }
  desk.append("<h4>Kết quả mã hóa: </h4>" + Bin_to_Hex(Result) + " ( Hex ) ");
  return Bin_to_Hex(Result);
}
function DTripleDes_CBC(Cipher_txt, BigKey, IV) {
  var Binary_Cipher = Hex_to_Bin(Cipher_txt);
  var Block_64 = [];
  IV = Hex_to_Bin(IV);
  var previousCipher = IV;
  $("#Result").append(`<div id="Encrypt"></div>`);
  var desk = $("#Encrypt");
  desk.append(
    "<h4>Nội dung: " +
      Bin_to_Hex(Binary_Cipher) +
      " ( Hex ) <br>" +
      "</h4>Được chia thành các Block 64 bits:<br>"
  );
  var Number_Block = 0;
  for (
    Number_Block = 0;
    Number_Block < parseInt((Binary_Cipher.length / 64).toString());
    Number_Block++
  ) {
    Block_64[Number_Block] = Binary_Cipher.substring(
      Number_Block * 64,
      (Number_Block + 1) * 64
    );
    desk.append(
      "Block thứ " +
        (Number_Block + 1) +
        "= " +
        Bin_to_Hex(Block_64[Number_Block]) +
        " ( Hex ) " +
        Block_64[Number_Block] +
        "<br>"
    );
  }
  var Key_64 = [];
  BigKey = Hex_to_Bin(BigKey);
  for (var i = 0; i < 3; i++) {
    Key_64[i] = BigKey.substring(i * 64, (i + 1) * 64);
  }
  var FirstDencrypt = [];
  var SecondEncrypt = [];
  var Result = [];
  var EncryptedBlock;
  desk.append("<h4>Giải thuật 3DES:</h4>");
  for (var j = 0; j < Number_Block; j++) {
    desk.append("<h4>Block thứ " + (j + 1) + ":</h4>");

    EncryptedBlock = Block_64[j];

    FirstDencrypt[j] = Dencrypt(Block_64[j], Key_64[2]);
    desk.append(
      "Sau khi giải mã với Key 3: " +
        Bin_to_Hex(FirstDencrypt[j]) +
        " ( Hex ) " +
        FirstDencrypt[j] +
        "<br>"
    );
    SecondEncrypt[j] = Encrypt(FirstDencrypt[j], Key_64[1]);
    desk.append(
      "Sau khi mã hóa với Key 2: " +
        Bin_to_Hex(SecondEncrypt[j]) +
        " ( Hex ) " +
        SecondEncrypt[j] +
        "<br>"
    );
    Result[j] = Dencrypt(SecondEncrypt[j], Key_64[0]);
    Result[j] = XOR(Result[j], previousCipher);
    previousCipher = EncryptedBlock;
    desk.append(
      "Sau khi giải mã với Key 1: " +
        Bin_to_Hex(Result[j]) +
        " ( Hex ) " +
        Result[j] +
        "<br>"
    );
  }
  var tmp = Result[Result.length - 1];
  Result[Result.length - 1] = RemovePadding_Binary(Result[Result.length - 1]);
  if (tmp != Result[Result.length - 1]) {
    desk.append(
      "<h4>Block thứ " +
        Number_Block +
        " sau khi xóa Padding: </h4>" +
        Bin_to_Hex(Result[Result.length - 1]) +
        " ( Hex ) " +
        Result[Result.length - 1]
    );
  }
  var R = "";
  for (var i = 0; i < Result.length; i++) R += Bin_to_Text(Result[i]);
  desk.append("<h4>Kết quả giải mã: </h4>" + "<h3>" + R + "</h3>");

  return R;
}

function ETripleDes_ECB(Plain_txt, BigKey) {
  var Binary_Plain = Txt_to_Bin(Plain_txt);
  $("#Result").append(`<div id="Encrypt"></div>`);
  var desk = $("#Encrypt");
  desk.append(
    "<h4>Nội dung: " +
      Bin_to_Hex(Binary_Plain) +
      " ( Hex ) <br>" +
      "</h4>Được chia thành các Block 64 bits:<br>"
  );
  var Block_64 = [];
  var Number_Block = 0;
  for (
    Number_Block = 0;
    Number_Block < parseInt((Binary_Plain.length / 64).toString());
    Number_Block++
  ) {
    Block_64[Number_Block] = Binary_Plain.substring(
      Number_Block * 64,
      (Number_Block + 1) * 64
    );
    desk.append(
      "Block thứ " +
        (Number_Block + 1) +
        "= " +
        Bin_to_Hex(Block_64[Number_Block]) +
        " ( Hex ) " +
        Block_64[Number_Block] +
        "<br>"
    );
  }
  if (Binary_Plain.length % 64 != 0) {
    Block_64[Number_Block] = Binary_Plain.substring(
      Number_Block * 64,
      Binary_Plain.length
    );
    desk.append(
      "Block thứ " +
        (Number_Block + 1) +
        "= " +
        Bin_to_Hex(Block_64[Number_Block]) +
        " ( Hex ) " +
        Block_64[Number_Block] +
        "<br>"
    );
    var Padding_length = (64 - Block_64[Number_Block].length) / 8;
    Block_64[Number_Block] = AddPadding_Binary(
      Block_64[Number_Block],
      Padding_length
    );
    Number_Block++;
    desk.append("<h4>Nội dung sau khi thêm padding</h4>");
    for (var i = 0; i < Number_Block; i++)
      desk.append(
        "Block thứ " +
          (i + 1) +
          "= " +
          Bin_to_Hex(Block_64[i]) +
          " ( Hex ) " +
          Block_64[i] +
          "<br>"
      );
  }

  var Key_64 = [];
  BigKey = Hex_to_Bin(BigKey);
  for (var i = 0; i < 3; i++) {
    Key_64[i] = BigKey.substring(i * 64, (i + 1) * 64);
  }
  var FirstEncrypt = [];
  var SecondDencrypt = [];
  var Result = "";
  desk.append("<h4>Giải thuật 3DES:</h4>");
  for (var j = 0; j < Number_Block; j++) {
    desk.append("<h4>Block thứ " + (j + 1) + ":</h4>");
    FirstEncrypt[j] = Encrypt(Block_64[j], Key_64[0]);
    desk.append(
      "Sau khi mã hóa với Key 1: " +
        Bin_to_Hex(FirstEncrypt[j]) +
        " ( Hex ) " +
        FirstEncrypt[j] +
        "<br>"
    );
    SecondDencrypt[j] = Dencrypt(FirstEncrypt[j], Key_64[1]);
    desk.append(
      "Sau khi giải mã với Key 2: " +
        Bin_to_Hex(SecondDencrypt[j]) +
        " ( Hex ) " +
        SecondDencrypt[j] +
        "<br>"
    );
    Result += Encrypt(SecondDencrypt[j], Key_64[2]);
    desk.append(
      "Sau khi mã hóa với Key 3: " +
        Bin_to_Hex(Result.substring(j * 64, (j + 1) * 64)) +
        " ( Hex ) " +
        Result.substring(j * 64, (j + 1) * 64) +
        "<br>"
    );
  }
  desk.append("<h4>Kết quả mã hóa: </h4>" + Bin_to_Hex(Result) + " ( Hex ) ");
  return Bin_to_Hex(Result);
}
function DTripleDes_ECB(Cipher_txt, BigKey) {
  var Binary_Cipher = Hex_to_Bin(Cipher_txt);
  var Block_64 = [];
  $("#Result").append(`<div id="Encrypt"></div>`);
  var desk = $("#Encrypt");
  desk.append(
    "<h4>Nội dung: " +
      Bin_to_Hex(Binary_Cipher) +
      " ( Hex ) <br>" +
      "</h4>Được chia thành các Block 64 bits:<br>"
  );
  var Number_Block = 0;
  for (
    Number_Block = 0;
    Number_Block < parseInt((Binary_Cipher.length / 64).toString());
    Number_Block++
  ) {
    Block_64[Number_Block] = Binary_Cipher.substring(
      Number_Block * 64,
      (Number_Block + 1) * 64
    );
    desk.append(
      "Block thứ " +
        (Number_Block + 1) +
        "= " +
        Bin_to_Hex(Block_64[Number_Block]) +
        " ( Hex ) " +
        Block_64[Number_Block] +
        "<br>"
    );
  }
  var Key_64 = [];
  BigKey = Hex_to_Bin(BigKey);
  for (var i = 0; i < 3; i++) {
    Key_64[i] = BigKey.substring(i * 64, (i + 1) * 64);
  }
  var FirstDencrypt = [];
  var SecondEncrypt = [];
  var Result = [];
  desk.append("<h4>Giải thuật 3DES:</h4>");
  for (var j = 0; j < Number_Block; j++) {
    desk.append("<h4>Block thứ " + (j + 1) + ":</h4>");
    FirstDencrypt[j] = Dencrypt(Block_64[j], Key_64[2]);
    desk.append(
      "Sau khi giải mã với Key 3: " +
        Bin_to_Hex(FirstDencrypt[j]) +
        " ( Hex ) " +
        FirstDencrypt[j] +
        "<br>"
    );
    SecondEncrypt[j] = Encrypt(FirstDencrypt[j], Key_64[1]);
    desk.append(
      "Sau khi mã hóa với Key 2: " +
        Bin_to_Hex(SecondEncrypt[j]) +
        " ( Hex ) " +
        SecondEncrypt[j] +
        "<br>"
    );
    Result[j] = Dencrypt(SecondEncrypt[j], Key_64[0]);
    desk.append(
      "Sau khi giải mã với Key 1: " +
        Bin_to_Hex(Result[j]) +
        " ( Hex ) " +
        Result[j] +
        "<br>"
    );
  }
  var tmp = Result[Result.length - 1];
  Result[Result.length - 1] = RemovePadding_Binary(Result[Result.length - 1]);
  if (tmp != Result[Result.length - 1]) {
    desk.append(
      "<h4>Block thứ " +
        Number_Block +
        " sau khi xóa Padding: </h4>" +
        Bin_to_Hex(Result[Result.length - 1]) +
        " ( Hex ) " +
        Result[Result.length - 1]
    );
  }
  var R = "";
  for (var i = 0; i < Result.length; i++) R += Bin_to_Text(Result[i]);
  desk.append("<h4>Kết quả giải mã: </h4>" + "<h3>" + R + "</h3>");

  return R;
}
document
  .querySelector("#Encryption")
  .addEventListener("click", function (event) {
    var input = $("#InputText").val().trim();
    var BigKey = $("#InputKey").val().trim();
    var Validated = $("#Validated");
    Validated.html("");
    var isvalid = true;
    var mode = $("#EncryptionModeSelect").val();
    if (
      input.length === 0 ||
      BigKey.length === 0 ||
      BigKey.length % 2 == 1 ||
      BigKey.length > 48
    ) {
      isvalid = false;
      Validated.append(
        "<span>Sai kích thước văn bản hoặc khóa để mã hóa</span>"
      );
    }
    if (!isHexadecimal(BigKey)) {
      isvalid = false;
      Validated.append("<span>Key không là mã Hex</span>");
    }
    if (mode === "CBC") {
      var IV = $("#InputIV").val().trim();
      if (IV.length === 0 || IV.length % 2 == 1 || IV.length > 16) {
        isvalid = false;
        Validated.append(
          "<span>Sai kích thước văn bản hoặc khóa để mã hóa</span>"
        );
      }
      if (!isHexadecimal(IV)) {
        isvalid = false;
        Validated.append("<span>Key hoặc IV không là mã Hex</span>");
      }
      if (!isvalid) {
        event.preventDefault();
        return;
      }
      if (BigKey.length < 16) {
        BigKey = AddPadding_Hex(BigKey, (16 - BigKey.length) / 2);
      } else if (BigKey.length > 16 && BigKey.length < 32) {
        BigKey = AddPadding_Hex(BigKey, (32 - BigKey.length) / 2);
      } else if (BigKey.length > 32)
        BigKey = AddPadding_Hex(BigKey, (48 - BigKey.length) / 2);
      if (IV.length < 16) {
        IV = AddPadding_Hex(IV, (16 - IV.length) / 2);
      }
      switch (BigKey.length) {
        case 16:
          var tmp = BigKey.trim();
          BigKey = tmp + tmp + tmp;
          break;
        case 32:
          BigKey = BigKey + BigKey.substring(0, 16);
          break;
        default:
          break;
      }
      if (!CheckOptionKey(BigKey)) {
        Validated.append("<span>Key sai chiến lược</span>");
        event.preventDefault();
        return;
      }
      $("#Result").html("");
      $("#Result").append("<h4>Nội dung cần mã hóa: " + input + "</h4>");
      for (var i = 0; i < 3; i++)
        $("#Result").append(
          "<div> Key " +
            (i + 1) +
            "= " +
            BigKey.substring(i * 16, (i + 1) * 16) +
            "</div>"
        );
      $("#Result").append("<div>Mã IV = " + IV + "</div>");
      ETripleDes_CBC(input, BigKey, IV);
    } else {
      if (!isvalid) {
        event.preventDefault();
        return;
      }

      if (BigKey.length < 16) {
        BigKey = AddPadding_Hex(BigKey, (16 - BigKey.length) / 2);
      } else if (BigKey.length > 16 && BigKey.length < 32) {
        BigKey = AddPadding_Hex(BigKey, (32 - BigKey.length) / 2);
      } else if (BigKey.length > 32)
        BigKey = AddPadding_Hex(BigKey, (48 - BigKey.length) / 2);
      switch (BigKey.length) {
        case 16:
          var tmp = BigKey.trim();
          BigKey = tmp + tmp + tmp;
          break;
        case 32:
          BigKey = BigKey + BigKey.substring(0, 16);
          break;
        default:
          break;
      }

      if (!CheckOptionKey(BigKey)) {
        Validated.append("<span>Key sai chiến lược</span>");
        event.preventDefault();
        return;
      }
      $("#Result").html("");
      $("#Result").append("<h4>Nội dung cần mã hóa: " + input + "</h4>");
      for (var i = 0; i < 3; i++)
        $("#Result").append(
          "<div> Key " +
            (i + 1) +
            "= " +
            BigKey.substring(i * 16, (i + 1) * 16) +
            "</div>"
        );
      ETripleDes_ECB(input, BigKey);
    }
  });

document
  .querySelector("#Dencryption")
  .addEventListener("click", function (event) {
    var input = $("#InputText").val().trim();
    var BigKey = $("#InputKey").val().trim();
    var IV = $("#InputIV").val().trim();
    var Validated = $("#Validated");
    Validated.html("");
    var isvalid = true;
    var mode = $("#EncryptionModeSelect").val();
    if (
      input.length === 0 ||
      BigKey.length === 0 ||
      BigKey.length % 2 == 1 ||
      BigKey.length > 48
    ) {
      isvalid = false;
      Validated.append(
        "<span>Sai kích thước văn bản hoặc khóa để giải mã</span><br>"
      );
    }
    if (!isHexadecimal(input) && !isBinary(input)) {
      isvalid = false;
      Validated.append("<span>Không phải là mã Hex hay mã nhị phân</span>");
    }
    if (!isHexadecimal(BigKey)) {
      isvalid = false;
      Validated.append("<span>Key không là mã Hex</span>");
    }
    if (mode === "CBC") {
      var IV = $("#InputIV").val().trim();
      if (IV.length === 0 || IV.length % 2 == 1 || IV.length > 16) {
        isvalid = false;
        Validated.append(
          "<span>Sai kích thước văn bản hoặc khóa để mã hóa</span>"
        );
      }
      if (!isHexadecimal(IV)) {
        isvalid = false;
        Validated.append("<span>IV không là mã Hex</span>");
      }
      if (!isvalid) {
        event.preventDefault();
        return;
      }

      if (isBinary(input)) input = Bin_to_Hex(input);
      if (BigKey.length < 16) {
        BigKey = AddPadding_Hex(BigKey, (16 - BigKey.length) / 2);
      }
      if (IV.length < 16) {
        IV = AddPadding_Hex(IV, (16 - IV.length) / 2);
      } else if (BigKey.length > 16 && BigKey.length < 32) {
        BigKey = AddPadding_Hex(BigKey, (32 - BigKey.length) / 2);
      } else if (BigKey.length > 32)
        BigKey = AddPadding_Hex(BigKey, (48 - BigKey.length) / 2);
      switch (BigKey.length) {
        case 16:
          var tmp = BigKey;
          BigKey = tmp + tmp + tmp;
          break;
        case 32:
          BigKey = BigKey + BigKey.substring(0, 16);
          break;
        default:
          break;
      }
      if (!CheckOptionKey(BigKey)) {
        Validated.append("<span>Key sai chiến lược</span>");
        event.preventDefault();
        return;
      }
      $("#Result").html("");
      $("#Result").append("<h4>Nội dung cần giải mã: " + input + "</h4>");
      for (var i = 0; i < 3; i++)
        $("#Result").append(
          "<div> Key " +
            (i + 1) +
            "= " +
            BigKey.substring(i * 16, (i + 1) * 16) +
            "</div>"
        );
      $("#Result").append("<div>Mã IV = " + IV + "</div>");
      DTripleDes_CBC(input, BigKey, IV);
    } else {
      if (!isvalid) {
        event.preventDefault();
        return;
      }

      if (isBinary(input)) input = Bin_to_Hex(input);

      if (BigKey.length < 16) {
        BigKey = AddPadding_Hex(BigKey, (16 - BigKey.length) / 2);
      } else if (BigKey.length > 16 && BigKey.length < 32) {
        BigKey = AddPadding_Hex(BigKey, (32 - BigKey.length) / 2);
      } else if (BigKey.length > 32)
        BigKey = AddPadding_Hex(BigKey, (48 - BigKey.length) / 2);
      switch (BigKey.length) {
        case 16:
          var tmp = BigKey;
          BigKey = tmp + tmp + tmp;
          break;
        case 32:
          BigKey = BigKey + BigKey.substring(0, 16);
          break;
        default:
          break;
      }
      if (!CheckOptionKey(BigKey)) {
        Validated.append("<span>Key sai chiến lược</span>");
        event.preventDefault();
        return;
      }
      $("#Result").html("");
      $("#Result").append("<h4>Nội dung cần giải mã: " + input + "</h4>");
      for (var i = 0; i < 3; i++)
        $("#Result").append(
          "<div> Key " +
            (i + 1) +
            "= " +
            BigKey.substring(i * 16, (i + 1) * 16) +
            "</div>"
        );
      DTripleDes_ECB(input, BigKey);
    }
  });

function CheckOptionKey(BigKey) {
  var K1 = BigKey.substring(0, 16);
  var K2 = BigKey.substring(16, 32);
  var K3 = BigKey.substring(32, 48);
  if (K1 == K2 && K2 == K3) return true;
  if (K1 == K3 && K1 != K2) return true;
  if (K1 != K2 && K2 != K3) return true;
  return false;
}
