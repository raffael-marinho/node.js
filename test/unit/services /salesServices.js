const { expect } = require("chai");
const sinon = require('sinon');
const salesService = require("../../../services/salesServices");
const salesModel = require('../../../models/salesModel');
const ProductsModel = require('../../../models/productsModel');
const mocks = require('../helpers/mocks');
const connection = require("../../../models/connection");

describe('Service - Rota "/sales"', () => {
  describe('Valida a função create', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[{ insertId: 1 }]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Valida se cria a venda', async () => {
      const result = await salesService.returnSales(mocks.createSale);
      expect(result[0]).to.have.property('saleId');
    });
  });

  describe('Valida a funçôes get', () => {
    describe('Valida a função getAll', () => {
      before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.salesDB]);
    });

      after(() => {
      connection.execute.restore();
    });

      it('Valida o retorno ddas vendas', async () => {
        const result = await salesService.returnSales();
        expect(result).to.deep.equal(mocks.sales);
      });
    });
    describe('Valida a função getById!', () => {
      before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.updateSaleDB]);
    });

      after(() => {
      connection.execute.restore();
    });

      it('Valida se retorna o produto pelo id', async () => {
        const result = await salesService.returnSales(1);
        expect(result[0]).to.have.property('saleId');
      });
    });
  });

  describe('Valida a função update', () => {
    const { id, sales } = mocks.updateSale;
    before(() => {
      sinon.stub(connection, 'execute').resolves([[mocks.salesDBUpdate]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Valida se atualiza o produto', async () => {
      const result = await salesService.returnUpdateSales(sales, id);
      expect(result).to.deep.equal(mocks.salesDBUpdate);
    });
  });

  describe('Valida se produto é deletado!', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[mocks.deleteSale]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Valida se deleta o produto', async () => {
      const result = await salesService.returnDeleteSales(1);
      expect(result).to.deep.equal(true);
    });
  });
});