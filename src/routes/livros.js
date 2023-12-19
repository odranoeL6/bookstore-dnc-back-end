const express = require('express');
const conectarBD = require('../middlewares/conectarBD.js');
const mensagemErro = require('../functions/mensagemErro.js');
const livroSchema = require('../models/livro.js');
const router = express.Router();

router.post('/cadastro', conectarBD, async function (req, res) {
  try {
    let { titulo, num_paginas, isbn, editora } = req.body;
    const respostaDB = await livroSchema.create({ titulo, num_paginas, isbn, editora })

    res.status(200).json({
      status: "ok",
      statusMensagem: "Livro criado com sucesso.",
      resposta: respostaDB,
    })
  } catch (error) {
    return mensagemErro(res, error);
  }
});

router.put('/edicao/:id', conectarBD, async function (req, res) {
  try {
    let livroID = req.params.id;
    let { titulo, num_paginas, isbn, editora } = req.body;
    const livroExiste = await livroSchema.findOne({ _id: livroID });
    if (!livroExiste) {
      throw new Error("Livro não encontrado.");
    }
    const respostaDB = await livroSchema.updateOne({ _id: livroID }, { titulo, num_paginas, isbn, editora });

    if (respostaDB?.modifiedCount > 0) {
      const dataLivro = await livroSchema.findOne({ _id: livroID });
      res.status(200).json({
        status: "ok",
        statusMensagem: "Livro editado com sucesso.",
        resposta: dataLivro,
      })
    }

  } catch (error) {
    return mensagemErro(res, error);
  }
});

router.get('/', conectarBD, async function (req, res) {
  try {

    const respostaDB = await livroSchema.find();

    res.status(200).json({
      status: "ok",
      statusMensagem: "Livro(s) listado(s) com sucesso.",
      resposta: respostaDB,
    })
  } catch (error) {
    return mensagemErro(res, error);
  }
});

router.get('/:id', conectarBD, async function (req, res) {
  try {

    const livroID = req.params.id;
    const respostaDB = await livroSchema.findOne({_id: livroID});

    res.status(200).json({
      status: "ok",
      statusMensagem: "Livro listado com sucesso.",
      resposta: respostaDB,
    })
  } catch (error) {
    return mensagemErro(res, error);
  }
});

router.delete('/:id', conectarBD, async function (req, res) {
  try {

    let livroID = req.params.id;
    const livroExiste = await livroSchema.findOne({ _id: livroID });
    if (!livroExiste) {
      throw new Error("Livro não encontrado.");
    }

    const respostaDB = await livroSchema.deleteOne({_id: livroID});

    res.status(200).json({
      status: "ok",
      statusMensagem: "Livro deletado com sucesso.",
      resposta: respostaDB,
    })
  } catch (error) {
    return mensagemErro(res, error);
  }
});

module.exports = router;
