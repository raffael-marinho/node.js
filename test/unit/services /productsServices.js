const mocks = require("../helpers/mocks");
const sinonChai = require("sinon-chai");
const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const productsModel = require('../../../models/productsModel');
const productservices = require('../../../services/productsServices');
const connection = require("../../../models/connection");

chai.use(sinonChai);
describe('Service - Rota "/products"', () => {
  describe('Valida a função create', () => {
    describe('Valida se existe um produto com mesmo nome', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.createProduct.name]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se nome ja existe', async () => {
        const result = await productservices.returnProductsIsert(mocks.createProduct.name, mocks.createProduct.quantity);
        console.log(result);
      });
    });
    describe('Valida se produto é criado!', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.createProduct.name]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se cria o produto', async () => {
        const result = await productservices.returnProductsIsert('osj', mocks.createProduct.quantity);
        expect(result).to.be.equal(false);
      });
    });
  });

  describe('Valida as funçôes get', () => {
    describe('Valida a função getAll', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.allProducts]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida o retorno dos produtos', async () => {
        const result = await productservices.returnproducts();
        expect(result).to.deep.equal(mocks.allProducts);
      });
    });
    describe('Valida a função getById!', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.allProducts][0]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se retorna o produto pelo id', async () => {
        const result = await productservices.returnproductsId(1);
        expect(result).to.deep.equal(mocks.findProductId);
      });
    });
  });

  describe('Valida a função update', () => {
    const { id, name, quantity } = mocks.updateProduct;
    describe('Valida se existe um produto com mesmo id', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se id ja existe', async () => {
        const result = await productservices.returnUpdateProducts(id, name, quantity);
        expect(result).to.be.equal(false);
      });
    });
    describe('Valida se produto é atualizado!', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[{id: 1}]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se atualiza o produto', async () => {
        const result = await productservices.returnUpdateProducts(id, name, quantity);
        expect(result).to.deep.equal(mocks.updateProduct);
      });
    });
  });

  describe('Valida a função delete', () => {
    describe('Valida se existe um produto com mesmo id', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se id ja existe', async () => {
        const result = await productservices.returnDeleteProducts(1);
        expect(result).to.be.equal(false);
      });
    });
    describe('Valida se produto é deletado!', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.createProduct.name]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Valida se deleta o produto', async () => {
        const result = await productservices.returnDeleteProducts(1);
        expect(result).to.be.equal(true);
      });
    });
  });
});