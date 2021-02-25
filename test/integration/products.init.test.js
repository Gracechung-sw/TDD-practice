const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json'); // 테스트용으로 넣어줄 데이터

// 통합 테스트케이스 만들기
it('POST /api/products', async () => {
  //supertest
  const response = await request(app) //해당 API결과 비동기로 결과를 반환해주기 때문에 여기서도 받아줘야하며
    .post('/api/products') //해당 API의 엔드포인트와 요청이 이것이므로
    .send(newProduct); // 해당 API에 보내줘야하는 것이 있으므로 (const createdProduct = await productModel.create(req.body);)
  //이렇게 했을 때 예상 결과가,
  expect(response.statusCode).toBe(201); // API 결과 상태코드가 201이어야 하므로 (res.status(201).json(createdProduct);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});
