const mocks = require("../helpers/mocks");
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require("../../../models/connection");
const {
  products,
  productsId,
  insertProducts,
  updateProducts,
  // deleteProducts,
  getProductByName,
} = require("../../../models/productsModel");
const product = require('../../../models/productsModel')
describe("Retornar todo os produtos", () => {
  before(() => {
    sinon.stub(connection, "execute").resolves([mocks.allProducts]);
  });
  after(() => {
    connection.execute.restore();
  });
  it("Valida se todos os produtos estão sendo retornados", async () => {
    const comparizon = await products();
    expect(comparizon).to.be.equal(mocks.allProducts);
  });
});

describe("Busca um produto por id", () => {
  before(() => {
    sinon.stub(connection, "execute").resolves([mocks.findProductId]);
  });
  after(() => {
    connection.execute.restore();
  });
  it("Valida se produto foi deletado corretamente", async () => {
    const result = await productsId(1);
    expect(result).to.deep.equal(mocks.findProductId);
  });
});

describe("Products Model", () => {
  describe("Inserir um produto na tabela products", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se produto foi inserido", async () => {
      const insertId = await insertProducts(mocks.createProduct);
      expect(insertId[0].insertId).to.be.equal(1);
    });
  });

  describe("Atualiza um produtos", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.updateProduct]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se o produto atualizado está sendo retornado", async () => {
      const result = await updateProducts(mocks.updateProduct.id, mocks.updateProduct.name, mocks.updateProduct.quantity);
      // console.log(result ,'aqui');
      expect(result).to.be.equal(mocks.updateProduct);
    });
  });

  describe("Deleta um produtos", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{id: 1}]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se produto foi deletado corretamente", async () => {
      const result = await product.deleteProducts(1);
      // console.log(result);
      expect(result).not.to.be.equal(false);
    });
  });

  describe("Busca um produto por name", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.findProductName]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se produto foi buscado pelo name corretamente", async () => {
      const result = await getProductByName("Armadura do Homem de Ferro");
      expect(result).to.deep.equal(mocks.findProductName);
    });
  });

  describe("Busca um produto por id e exibe todas as colunas", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.getProductById]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se produto foi buscado corretamente", async () => {
      const result = await productsId(1);
      expect(result).to.deep.equal(mocks.getProductById);
    });
  });
});
