const { json } = require("express/lib/response");
const tesseract = require("node-tesseract-ocr");

const ekstrak = async (req, res) => {
  const config = {
    lang: "ind",
    oem: 1,
    psm: 3,
  };

  tesseract
    .recognize(req.file.path, config)
    .then((text) => {
      // console.log("Result:", text);

      var nik = text.match(/\w{16}\?/);
      var nama = text.match(/Nama : \w+.*\w?.*\w?/);
      var tempatLahir = text.match(
        /Tempat\/[a-zA-Z]+\s:\s[a-zA-Z]+\s?[a-zA-Z]+.*?\s?[a-zA-Z]+.*?/
      );
      var tanggalLahir = text.match(/\d{2}-\d{2}-\d{4}/);

      // console.log(nik[0]);
      // console.log(nama[0].substring(7));
      // console.log(tempatLahir[0].substring(18))
      // console.log(tanggalLahir);

      let person = {
        NIK: nik[0],
        NAMA: nama[0].substring(7),
        TEMPATLAHIR: tempatLahir[0].substring(18),
        TANGGALAHIR: tanggalLahir,
      };

      res.render("index", { hasil: text });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  ekstrak,
};
