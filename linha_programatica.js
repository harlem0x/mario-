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
