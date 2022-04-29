const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');
const mocks = require('../helpers/mocks');

describe("Sales Model", () => {
  describe("Inserir uma venda na tabela sales e sales_products", () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[{ insertId: 1 }]]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se a venda foi realizada", async () => {
      const result = await SalesModel.insertSales(mocks.createSale);
      expect(result).to.have.property('id');
      expect(result).to.have.property('itemsSold');
      expect(result.itemsSold).to.deep.equal(mocks.createSale);
    });
  });

  describe('Retornar todas as vendas', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.salesDB]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se todas as vendas estão sendo retornados', async () => {
      const sales = await SalesModel.sales();
      expect(sales.map(sale => {

        return {date: sale.date, quantity: sale.quantity, saleId: sale.sale_id, productId: sale.product_id};
      })).to.deep.equal(mocks.sales);
    });
  });

  describe('Atualiza uma venda', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.updateSaleDB]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se a venda foi atualizada', async () => {
      const result = await SalesModel.updateSales(mocks.updateSale.sales, mocks.updateSale.id);
      expect(result).to.have.property('saleId');
      expect(result).to.have.property('itemUpdated');
    });
  });

  describe('Deleta uma venda', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[mocks.deleteSale]]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se produto foi deletado', async () => {
      const result = await SalesModel.deleteSales(1);
      expect(result).to.be.equal(true);
    });
  });

  describe('Valida busca da venda por id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.salesByIdDB]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida venda por id', async () => {
      const sale = await SalesModel.salesId(1);
      expect(sale.map(s => ({productId: s.product_id, quantity: s.quantity, date: s.date}))).to.deep.equal(mocks.getFindById);
    });
  });

  describe('Busca uma venda por id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([1]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se a venda foi localizada', async () => {
      const id = await SalesModel.salesId(1);
      expect(id).to.be.equal(1);
    });
  });
});