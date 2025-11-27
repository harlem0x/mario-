# linha_programaticaController.js

const linhaProgramaticaModel = require('../models/linha_programaticaModel');

module.exports = {

    listar: async (req, res) => {
        const dados = await linhaProgramaticaModel.getAll();
        res.render('consultas/linha_programatica', { dados });
    },

    filtrar: async (req, res) => {
        const { nome } = req.body;
        const dados = await linhaProgramaticaModel.filterByName(nome);
        res.render('consultas/linha_programatica', { dados });
    },

    cadastrar: async (req, res) => {
        const { nome } = req.body;
        await linhaProgramaticaModel.add(nome);
        res.redirect('/linha_programatica');
    },

    mostrar: async (req, res) => {
        const id = req.params.id;
        const registro = await linhaProgramaticaModel.getById(id);
        res.render('details/linha_programatica', { registro });
    },

    formEditar: async (req, res) => {
        const id = req.params.id;
        const registro = await linhaProgramaticaModel.getById(id);
        res.render('forms/linha_programatica', { linha_programatica: registro, isEdit: true });
    },

    editar: async (req, res) => {
        const id = req.params.id;
        const { nome } = req.body;
        await linhaProgramaticaModel.update(id, nome);
        res.redirect('/linha_programatica');
    },

    deletar: async (req, res) => {
        const id = req.params.id;
        await linhaProgramaticaModel.delete(id);
        res.redirect('/linha_programatica');
    },

    confirmarDelete: async (req, res) => {
        const id = req.params.id;
        const registro = await linhaProgramaticaModel.getById(id);
        res.render('confirm_delete', { registro });
    }

};





models

#const db = require('../db'); // ajuste se seu arquivo for outro

module.exports = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM linha_programatica");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM linha_programatica WHERE id_linha = ?", [id]);
        return rows[0];
    },

    add: async (nome) => {
        await db.query("INSERT INTO linha_programatica (nome) VALUES (?)", [nome]);
    },

    update: async (id, nome) => {
        await db.query("UPDATE linha_programatica SET nome = ? WHERE id_linha = ?", [nome, id]);
    },

    delete: async (id) => {
        await db.query("DELETE FROM linha_programatica WHERE id_linha = ?", [id]);
    },

    filterByName: async (nome) => {
        const [rows] = await db.query("SELECT * FROM linha_programatica WHERE nome LIKE ?", [`%${nome}%`]);
        return rows;
    }

};

router 
const express = require('express');
const router = express.Router();

const linha_programaticaController = require('../controllers/linha_programaticaController');

// Listar tudo
router.get('/', linha_programaticaController.listar);

// Página de filtro
router.get('/filtro', (req, res) => {
    res.render('filtro');
});

// Formulário de cadastro
router.get('/forms/linha_programatica', (req, res) => {
    res.render('forms/linha_programatica', { 
        linha_programatica: { id_linha: '', nome_linha: '' },
        isEdit: false 
    });
});

// Página de consultas
router.get('/consultas/linha_programatica', linha_programaticaController.listar);

// Filtrar
router.post('/filtro', linha_programaticaController.filtrar);

// Página genérica cadastrar
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});

// Ação cadastrar
router.post('/cadastrar', linha_programaticaController.cadastrar);

// Mostrar registro
router.get('/:id', linha_programaticaController.mostrar);

// Formulário de edição
router.get('/:id/edit', linha_programaticaController.formEditar);

// Ação editar
router.post('/:id/edit', linha_programaticaController.editar);

// Ação deletar
router.post('/:id/delete', linha_programaticaController.deletar);

// Página confirmação exclusão
router.get('/:id/confirm-delete', linha_programaticaController.confirmarDelete);

module.exports = router;


