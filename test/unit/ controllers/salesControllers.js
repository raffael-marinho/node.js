const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/sales');
const connection = require('../../../models/connection');
const SalesService = require('../../../services/salesServices');
const mocks = require('../helpers/mocks');

describe('Testa os controllers da rota /Sales', () => {
  const res = {};
  const req = {};

  describe('Testa a função getAll', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([mocks.sales]);
      sinon.stub(SalesService, 'returnSales').resolves(mocks.sales)
      res.sendStatus = sinon.stub().returns(res)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      res.send = sinon.stub().returns(res)
    });

    after(() => {
      SalesService.returnSales.restore();
      connection.execute.restore();
    });

    it('valida resposta HTTP status 200', async () => {
      await SalesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('valida se retorna todas as vendas', async () => {
      await SalesController.getAll(req, res);
      expect(res.send.calledWith(mocks.sales)).to.be.equal(false);
    });
  });

  describe('Testa a função getById', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição getById', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[mocks.sale]]);
        sinon.stub(SalesService, 'returnSalesId').resolves(mocks.sale);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 1 })
      });

      after(() => {
        SalesService.returnSalesId.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 200', async () => {
        await SalesController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno da venda pelo id', async () => {
        await SalesController.getById(req, res);
        expect(res.json.calledWith(mocks.sale)).to.be.equal(false);
      });
    });

    describe('Testa se houve rejeição na requisição getById', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
        sinon.stub(SalesService, 'returnSalesId').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 8 });
      });

      after(() => {
        SalesService.returnSalesId.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 404', async () => {
        const response = await SalesController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('valida se teve a resposta correta da mensagem de erro', async () => {
        const response = await SalesController.getById(req, res);
        expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      });
    });
  });

  describe('Testa se houve sucesso na requisição create', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[mocks.sale]]);
      sinon.stub(SalesService, 'returnInsertSales').resolves(mocks.sale);
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      req.body = [mocks.createProduct];
    });

    after(() => {
      SalesService.returnInsertSales.restore();
      connection.execute.restore();
    });

    it('valida resposta HTTP status 201', async () => {
      await SalesController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
    it('valida se traz o retorno da venda criada', async () => {
      await SalesController.create(req, res);
      expect(res.json.calledWith(mocks.sale)).to.be.equal(false);
    });
  });

  describe('Testa se houve sucesso na requisição update', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[mocks.sales]]);
      sinon.stub(SalesService, 'returnUpdateSales').resolves(mocks.salesDBUpdate);
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      req.params = sinon.stub().returns({ id: 1 });
      req.body = mocks.updateSaleReq;
    });

    after(() => {
      SalesService.returnUpdateSales.restore();
      connection.execute.restore();
    });

    it('valida resposta HTTP status 200', async () => {
      await SalesController.update(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('valida se traz o retorno da venda é atualizada', async () => {
      await SalesController.update(req, res);
      expect(res.json.calledWith(mocks.salesDBUpdate)).to.be.equal(false);
    });
  });

  describe('Testa a função delete', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição delete', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[{}]]);
        sinon.stub(SalesService, 'returnDeleteSales').resolves();
        res.status = sinon.stub().returns(res)
        res.sendStatus = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        res.end = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 1 });
      });

      after(() => {
        SalesService.returnDeleteSales.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 204', async () => {
        await SalesController.deleteSales(req, res);
        expect(res.sendStatus.calledWith(204)).to.be.equal(true);
      });
    });

    describe('Testa se houve rejeição na requisição delete', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
        sinon.stub(SalesService, 'returnDeleteSales').resolves();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        res.end = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 8 });
      });

      after(() => {
        SalesService.returnDeleteSales.restore();
        connection.execute.restore();
      });

      it('valida resposta HTTP status 404', async () => {
        const response = await SalesController.deleteSales(req, res);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('valida se teve a resposta correta da mensagem de erro', async () => {
        const response = await SalesController.deleteSales(req, res);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      });
    });
  });
});