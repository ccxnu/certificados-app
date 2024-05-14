import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "certikke",
});

export class CertModel {
  static async getCertAll() {
    const [certs] = await connection.query(`
    SELECT id, nombre, apellido, saldo FROM certificados
     ORDER BY id ASC
    LIMIT 10
  `);
    return certs;
  }

  static async getCertById({ id }) {
    const [cert] = await connection.query(
      `SELECT id, nombre, apellido, saldo FROM certificados WHERE id = ?`,
      [id],
    );

    if (cert.length === 0) return null;

    return cert[0];
  }

  // TODO

  /*static async createCert({ input }) {}

  static async deleteCert({ id }) {}

  static async updateCert({ id, input }) {}*/
}
