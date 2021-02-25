const express = require('express');
const router = express.Router(); //express.Router 클래스를 이용해서 Router 모듈로 작성하기
const productController = require('./controller/products');

//Route 정의
router.post('/', productController.createProduct);
// router.get('/', productController.getProducts);
// router.get('/:productId', productController.getProductById);
// router.put('/:productId', productController.updateProduct);
// router.delete('/:productId', productController.deleteProduct);

module.exports = router; //기본앱(server.js)에서 사용할 수 있도록 export
