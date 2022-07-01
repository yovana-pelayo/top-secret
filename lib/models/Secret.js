const pool = require('../utils/pool');

class Secret {
  id;
  title;
  description;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.created_at = row.created_at;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM secrets');
    console.log('get all secrets', rows);
    return rows.map((row) => new Secret(row));
  }
}
module.exports = { Secret };
