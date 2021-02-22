const productController = require('../../controller/products');

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    //product 데이터 생성을 위한 함수가 있는지 여부를 확인하기 위한 테스트 코드
    expect(typeof productController.createProduct).toBe('function');
  });
});
