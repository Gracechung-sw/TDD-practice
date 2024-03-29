const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

//Mock함수 생성
productModel.create = jest.fn();

//beforeEach
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Product Controller Create', () => {
  beforeEach(() => {
    // Mock 데이터 넣어주기
    req.body = newProduct;
  });

  it('should have a createProduct function', () => {
    //product 데이터 생성을 위한 함수가 있는지 여부를 확인하기 위한 테스트 코드
    expect(typeof productController.createProduct).toBe('function');
  });

  it('should call Product.create', () => {
    //createProduct 함수를 호출할 때 Product Model의 Create 메소드가 호출이 되는지를 확인 해주기 위한 테스트 코드
    productController.createProduct(req, res, next); //productController.createProduct이 호출 될 때,
    expect(productModel.create).toBeCalledWith(newProduct);
    //그런데 이 테스트에서는 productModel에 의존적이어서는 안된다. 그래서 Mock함수를 사용한다.
  });

  it('should return 201 response code', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy(); //node-mocks-http모듈에서 제공하는 matcher(toBeTruthy())로, 결과값이 잘 전달되었는지 확인
  });

  it('should return json body in response', async () => {
    //가짜 함수가 어떤 결과값을 반환할 지 mockReturnValue를 사용해서 직접 알려준다.
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct); //node-mocks-http모듈에서 제공하는 _getJSONData로, 결과값이 잘 전달되었는지 확인
  });

  it('should handle errors', async () => {
    //에러 발생시 적절한 에러 메세지를 반환하는가 등 error 처리를 위한 단위 테스트

    //원래는 mongoDB에서 발생시키는 에러메세지인데, 여기선 MongoDB에서 처리하는 부분은 문제가 없다는 것을 가정하는 단위 테스트이기 때문에
    const errorMessage = { message: 'description property missing' }; //에러 메세지를 임의로 만들어줌
    const rejectedPromise = Promise.reject(errorMessage); //비동기에 대한 결과값
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});
