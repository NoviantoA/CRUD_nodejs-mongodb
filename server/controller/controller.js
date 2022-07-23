var Userdb = require("../model/model");

// buat dan simpan user
exports.create = (req, res) => {
  // request validasi
  if (!req.body) {
    res.status(400).send({ message: "Field Tidak Boleh Kosong" });
    return;
  }

  //   user baru
  const user = new Userdb({
    nama: req.body.nama,
    email: req.body.email,
    jenis_kelamin: req.body.jenis_kelamin,
    status: req.body.status,
  });

  //   simpan user ke database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi Error Pada Saat Pembuatan User",
      });
    });
};

// mendapatkan kembali dan mengembalikan semua user/mengembalikan kembali dan return satu user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Tidak menemukan user dengan id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error ketika mendapatkan kembali data user dengan id" + id,
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Terjadi error pada saat mengambil informasi user",
        });
      });
  }
};

// update user berdasarkan user id
exports.update = (req, res) => {
  if (req.bbody) {
    return res.status(400).send({ message: "Data tidak boleh kosong" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Tidak dapat mengupdate user dengan ${id}. Mungkin user tidak terdaftar`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Terjadi kesalahan saat mengupdate user",
      });
    });
};

// hapus user dengan memanfaatkan user id
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Tidak dapat meghapus id ${id}. Mungkin id salah `,
        });
      } else {
        res.send({
          message: "User berhasil dihapus",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Tidak dapat menghaus id = " + id });
    });
};
