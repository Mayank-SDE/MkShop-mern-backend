import express from 'express';
import { adminOnly, loggedInOnly } from '../middlewares/auth.js';
import { multipleUpload } from '../middlewares/multer.js';
import { deleteSingleProduct, getAllProducts, getBrandsByCategory, getCategoriesByBrand, getLatestProducts, getSearchedProducts, getSingleProduct, newProduct, 
// postAllProducts,
updateSingleProduct, } from '../controllers/productController.js';
const router = express.Router();
/*
//route - /api/v1/product/all
router.post('/all', postAllProducts);
*/
//route - /api/v1/product/new
router.post('/new', loggedInOnly, adminOnly, multipleUpload, newProduct);
//route - /api/v1/product/latest
router.get('/latest', getLatestProducts);
//route - /api/v1/product/all with filters
router.get('/all', getSearchedProducts);
//route - /api/v1/product/categories
router.get('/categories', getCategoriesByBrand);
//route - /api/v1/product/brands
router.get('/brands', getBrandsByCategory);
//route - /api/v1/product/admin-products
router.get('/admin-products', loggedInOnly, adminOnly, getAllProducts);
//route - /api/v1/product/:id
router
    .route('/:id')
    .get(getSingleProduct)
    .delete(loggedInOnly, adminOnly, deleteSingleProduct)
    .put(loggedInOnly, adminOnly, multipleUpload, updateSingleProduct);
//route - /api/v1/product/all
// router.get('/all', getproducts);
export default router;
