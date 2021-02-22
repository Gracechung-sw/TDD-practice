const productController = require('../../controller/products');
const productModel = require('../../models/Product');

//Mock함수 생성
productModel.create = jest.fn();

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    //product 데이터 생성을 위한 함수가 있는지 여부를 확인하기 위한 테스트 코드
    expect(typeof productController.createProduct).toBe('function');
  });

  it('should call Product.create', () => {
    //createProduct 함수를 호출할 때 Product Model의 Create 메소드가 호출이 되는지를 확인 해주기 위한 테스트 코드
    productController.createProduct(); //productController.createProduct이 호출 될 때,
    expect(productModel.create).toBeCalled(); //productModel.create가 호출되는지
    //그런데 이 테스트에서는 productModel에 의존적이어서는 안된다. 그래서 Mock함수를 사용한다.
  });
});
