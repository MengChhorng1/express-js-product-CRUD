const { sql, poolPromise } = require('../config/db');

class Product {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM PRODUCTS');
    return result.recordset;
  }

  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM PRODUCTS WHERE PRODUCTID = @id');
    return result.recordset[0];
  }

  static async create(product) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar(100), product.name)
      .input('price', sql.Decimal(10, 2), product.price)
      .input('stock', sql.Int, product.stock)
      .query(`
        INSERT INTO PRODUCTS (PRODUCTNAME, PRICE, STOCK)
        OUTPUT INSERTED.*
        VALUES (@name, @price, @stock)
      `);
    return result.recordset[0];
  }

  static async update(id, product) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(100), product.name)
      .input('price', sql.Decimal(10, 2), product.price)
      .input('stock', sql.Int, product.stock)
      .query(`
        UPDATE PRODUCTS
        SET PRODUCTNAME = @name, PRICE = @price, STOCK = @stock
        WHERE PRODUCTID = @id
      `);
    return result.rowsAffected[0] > 0;
  }

  static async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM PRODUCTS WHERE PRODUCTID = @id');
    return result.rowsAffected[0] > 0;
  }
}

module.exports = Product;
