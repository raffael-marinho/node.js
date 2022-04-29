const allProducts = [
  {
    name: "Martelo de Thor",
    quantity: 10,
  },
  {
    name: "Traje de encolhimento",
    quantity: 20,
  },
  {
    name: "Escudo do Capitão América",
    quantity: 30,
  }
];

const findProductName = {
  name: "Traje de encolhimento",
  quantity: 20,
};

const findProductId = {
  name: "Martelo de Thor",
  quantity: 10,
}

const createProductSucess = {
  id: 1,
  name: "Martelo de Thor",
  quantity: 10,
};

const createProduct = {
  name: "Martelo de Thor",
  quantity: 10,
};

const getProductById = {
  id: 2,
  name: "Armadura do Homem de Ferro",
  quantity: 5,
};

const updateProductReq = {
  name: "Armadura do Homem de Ferro",
  quantity: 5,
};

const updateProduct = {
  id: 2,
  name: "Armadura do Homem de Ferro",
  quantity: 5,
};

const deleteProducts = 1;

const sale = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 3
    },
  ],
};

const salesDB = [
  {
    sale_id: 1,
    date: '2021-09-09T04:54:29.000Z',
    product_id: 1,
    quantity: 2
  },
  {
    sale_id: 1,
    date: '2021-09-09T04:54:54.000Z',
    product_id: 2,
    quantity: 2
  }
]

const salesByIdDB = [
  {
    date: '2021-09-09T04:54:29.000Z',
    product_id: 1,
    quantity: 2
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    product_id: 2,
    quantity: 2
  }
]

const salesDBUpdate = {
  saleId: 1,
  itemUpdated: [
    {
      productId: 1,
      quantity: 6
    },
  ],
}

const sales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  }
]

const createSale = [
  {
    productId: 1,
    quantity: 3,
  },
];

const updateSaleDB = [
  {
    product_id: 1,
    quantity: 6
  },
];

const updateSaleReq = [
  {
    productId: 1,
    quantity: 6
  }
];

const updateSale = {
  id: 1,
  sales: [
    {
      productId: 1,
      quantity: 6
    }
  ],
};

const deleteSale = 1;

const getFindById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  }
]

module.exports = {
  findProductId,
  getProductById,
  findProductName,
  allProducts,
  createProductSucess,
  createProduct,
  updateProduct,
  updateProductReq,
  deleteProducts,
  sale,
  salesDB,
  sales,
  salesDBUpdate,
  createSale,
  updateSale,
  updateSaleReq,
  updateSaleDB,
  deleteSale,
  getFindById,
  salesByIdDB,
}