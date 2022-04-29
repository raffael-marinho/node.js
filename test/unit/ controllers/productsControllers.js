const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/products');
const connection = require('../../../models/connection');
const ProductsService = require('../../../services/productsServices');
const mocks = require('../helpers/mocks');

describe('Testa os controllers da rota /Products', () => {
  const res = {};
  const req = {};

  describe('Testa a função getAll', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(mocks.allProducts);
      sinon.stub(ProductsService, 'returnproducts').resolves(mocks.allProducts)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });

    after(() => {
      ProductsService.returnproducts.restore();
      connection.execute.restore();
    });

    it('valida resposta HTTP status 200', async () => {
      await ProductsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('valida se retorna todos os produtos', async () => {
      await ProductsController.getAll(req, res);
      expect(res.json.calledWith(mocks.allProducts)).to.be.equal(false);
    });
  });

  describe('Testa a função getById', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição getById', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([mocks.allProducts[0]]);
        sinon.stub(ProductsService, 'returnproductsId').resolves(mocks.getProductById);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 1 })
      });

      after(() => {
        ProductsService.returnproductsId.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 200', async () => {
        await ProductsController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto pelo id', async () => {
        await ProductsController.getById(req, res);
        expect(res.json.calledWith(mocks.getProductById[0])).to.be.equal(true);
      });
    });

    describe('Testa se houve rejeição na requisição getById', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
        sinon.stub(ProductsService, 'returnproductsId').resolves(mocks.getProductById);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 8 })
      });

      after(() => {
        ProductsService.returnproductsId.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 404', async () => {
        const response = await ProductsController.getById(req, res);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('valida se teve a resposta correta da mensagem de erro', async () => {
        const response = await ProductsController.getById(req, res);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função create', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição create', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
        sinon.stub(ProductsService, 'returnProductsIsert').resolves(1);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.body = mocks.createProduct;
      });

      after(() => {
        ProductsService.returnProductsIsert.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 201', async () => {
        await ProductsController.insertProduct(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto criado', async () => {
        await ProductsController.insertProduct(req, res);
        expect(res.json.calledWith(mocks.createProductSucess)).to.be.equal(false);
      });
    });

    describe('Testa se houve rejeição na requisição create', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
        sinon.stub(ProductsService, 'returnProductsIsert').resolves(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = mocks.createProduct;
      });

      after(() => {
        ProductsService.returnProductsIsert.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 409', async () => {
        try {
          await ProductsController.insertProduct(req, res);
        } catch (error) {
          expect(error.status).to.be.equal(409);
        }
      });

      it('valida se teve a resposta correta da mensagem de erro', async () => {
        try {
          await ProductsController.insertProduct(req, res);
        } catch (error) {
          expect(error.message).to.be.equals('Product already exists');
        }
      });
    });
  });

  describe('Testa a função update', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição update', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[mocks.updateProduct]]);
        sinon.stub(ProductsService, 'returnUpdateProducts').resolves([mocks.updateProduct]);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 2 });
        req.body = mocks.updateProductReq;
      });

      after(() => {
        ProductsService.returnUpdateProducts.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 200', async () => {
        await ProductsController.updateProduct(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto criado', async () => {
        await ProductsController.updateProduct(req, res);
        expect(res.json.calledWith(mocks.updateProduct)).to.be.equal(false);
      });
    });

    describe('Testa se houve rejeição na requisição update', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[mocks.updateProduct]]);
        sinon.stub(ProductsService, 'returnUpdateProducts').resolves([mocks.updateProduct]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 2 });
        req.body = mocks.updateProductReq;
      });

      after(() => {
        ProductsService.returnUpdateProducts.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 404', async () => {
        try {
          await ProductsController.updateProduct(req, res);
        } catch (error) {
          expect(error.status).to.be.equal(404);
        }
      });

      it('valida se teve a resposta correta da mensagem de erro', async () => {
        try {
          await ProductsController.updateProduct(req, res);
        } catch (error) {
          expect(error.message).to.be.equals('Product not found');
        }
      });
    });
  });

  describe('Testa a função delete', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição delete', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[{}]]);
        sinon.stub(ProductsService, 'returnDeleteProducts').resolves();
        res.status = sinon.stub().returns(res)
        res.sendStatus = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        res.end = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 1 });
      });

      after(() => {
        ProductsService.returnDeleteProducts.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 204', async () => {
        await ProductsController.deleteProduct(req, res);
        expect(res.sendStatus.calledWith(204)).to.be.equal(true);
      });
    });

    describe('Testa se houve rejeição na requisição delete', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
        sinon.stub(ProductsService, 'returnDeleteProducts').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        res.end = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 1 });
      });

      after(() => {
        ProductsService.returnDeleteProducts.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 404', async () => {
        try {
          await ProductsController.deleteProduct(req, res);
        } catch (error) {
          expect(error.status).to.be.equal(404);
        }
      });

      it('valida se teve a resposta correta da mensagem de erro', async () => {
        try {
          await ProductsController.deleteProduct(req, res);
        } catch (error) {
          expect(error.message).to.be.equals('Product not found');
        }
      });
    });
  });
});
