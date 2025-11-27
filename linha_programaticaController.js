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
