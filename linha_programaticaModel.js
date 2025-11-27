const db = require('../db'); // ajuste se seu arquivo for outro

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
