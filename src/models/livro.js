const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    titulo: {
        type: String,
        required: 'É obrigatório.',
    },
    num_paginas: {
        type: Number,
        required: 'É obrigatório.',
    },
    isbn: {
        type: String,
        required: 'É obrigatório.',
        unique: true,
    },
    editora: {
        type: String,
        required: 'É obrigatório.',
    },
},
{
    timestamps: true
});

const livroSchema = mongoose.models.livro || mongoose.model('livro', schema);

module.exports = livroSchema;