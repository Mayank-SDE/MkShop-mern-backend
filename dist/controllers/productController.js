import ErrorHandler from '../utils/utilityClass.js';
import { Product } from '../models/product.js';
import { rm } from 'fs';
import { nodeCache } from '../app.js';
import { invalidateCache } from '../utils/invalidateCache.js';
export const newProduct = async (request, response, next) => {
    try {
        const { title, description, price, rating, discountPercentage, stock, brand, category, } = request.body;
        const files = request.files;
        if (!Array.isArray(files) || files.length !== 4) {
            return next(new ErrorHandler('Please enter 4 images of the product captured from different angles', 400));
        }
        const imagesPath = files?.map((file) => file.path);
        if (!title ||
            !description ||
            !price ||
            !rating ||
            !discountPercentage ||
            !stock ||
            !brand ||
            !category) {
            imagesPath.map((path) => {
                rm(path, () => {
                    console.log('Deleted');
                });
            });
            return next(new ErrorHandler('Please enter all the following product details correctly.', 400));
        }
        await Product.create({
            title,
            description,
            price,
            rating,
            discountPercentage,
            stock,
            brand,
            category: category.trim().replace(/\s+/g, '-').toUpperCase(),
            thumbnail: imagesPath[0],
            images: imagesPath,
        });
        await invalidateCache({ product: true });
        return response.status(201).json({
            success: true,
            message: 'Products created successfully.',
        });
    }
    catch (error) {
        return next(error);
    }
};
//Revalidate on new,update or delete products and on New order
export const getLatestProducts = async (request, response, next) => {
    try {
        let products = [];
        if (nodeCache.has('latest-products')) {
            products = JSON.parse(nodeCache.get('latest-products'));
        }
        else {
            products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
            nodeCache.set('latest-products', JSON.stringify(products));
        }
        return response.status(200).json({
            success: true,
            products,
        });
    }
    catch (error) {
        return next(error);
    }
};
//Revalidate on new,update or delete products and on New order
export const getAllCategories = async (request, response, next) => {
    try {
        let categories;
        if (nodeCache.has('categories')) {
            categories = JSON.parse(nodeCache.get('categories'));
        }
        else {
            categories = await Product.distinct('category');
            nodeCache.set('categories', JSON.stringify(categories));
        }
        return response.status(200).json({
            success: true,
            categories,
        });
    }
    catch (error) {
        return next(error);
    }
};
//Revalidate on new,update or delete products and on New order
export const getAllBrands = async (request, response, next) => {
    try {
        let brands;
        if (nodeCache.has('brands')) {
            brands = JSON.parse(nodeCache.get('brand'));
        }
        else {
            brands = await Product.distinct('brand');
            nodeCache.set('brands', JSON.stringify(brands));
        }
        return response.status(200).json({
            success: true,
            brands,
        });
    }
    catch (error) {
        return next(error);
    }
};
//Revalidate on new,update or delete products and on New order
export const getAllProducts = async (request, response, next) => {
    try {
        let products;
        if (nodeCache.has('products')) {
            products = JSON.parse(nodeCache.get('products'));
        }
        else {
            products = await Product.find({});
            nodeCache.set('products', JSON.stringify(products));
        }
        return response.status(200).json({
            success: true,
            products,
        });
    }
    catch (error) {
        return next(error);
    }
};
//Revalidate on new,update or delete products and on New order
export const getSingleProduct = async (request, response, next) => {
    try {
        let product;
        const id = request.params.id;
        if (nodeCache.has(`product-${id}`)) {
            product = JSON.parse(nodeCache.get(`product-${id}`));
        }
        else {
            product = await Product.findById(id);
            nodeCache.set(`product-${id}`, JSON.stringify(product));
        }
        if (!product) {
            return next(new ErrorHandler('Invalid product id', 404));
        }
        return response.status(200).json({
            success: true,
            product,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const deleteSingleProduct = async (request, response, next) => {
    try {
        const { id } = request.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Invalid product id', 404));
        }
        product.images.map((path) => {
            rm(path, () => {
                console.log('Product images deleted succesfully.');
            });
        });
        await product.deleteOne();
        await invalidateCache({ product: true, productId: String(product._id) });
        return response.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    }
    catch (error) {
        return next(error);
    }
};
export const updateSingleProduct = async (request, response, next) => {
    try {
        const { title, description, price, rating, discountPercentage, stock, brand, category, } = request.body;
        const product = await Product.findById(request.params.id);
        if (!product) {
            return next(new ErrorHandler('Invalid product id', 404));
        }
        const files = request.files;
        if (Array.isArray(files)) {
            const imagesPath = files?.map((file) => file.path);
            if (imagesPath && imagesPath.length !== 4) {
                imagesPath.map((path) => {
                    rm(path, () => {
                        console.log('Deleting unneccassary images from database.');
                    });
                });
                return next(new ErrorHandler('Please enter 4 images of the product captured from different angles', 400));
            }
            if (imagesPath) {
                product.images.map((path) => {
                    rm(path, () => {
                        console.log('Old images deleted from database.');
                    });
                });
                product.images = imagesPath;
                product.thumbnail = imagesPath[0];
            }
        }
        if (title) {
            product.title = title;
        }
        if (category) {
            product.category = category;
        }
        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }
        if (rating) {
            product.rating = rating;
        }
        if (discountPercentage) {
            product.discountPercentage = discountPercentage;
        }
        if (stock) {
            product.stock = stock;
        }
        if (brand) {
            product.brand = brand;
        }
        await product.save();
        await invalidateCache({ product: true, productId: String(product._id) });
        return response.status(201).json({
            success: true,
            message: 'Products updated successfully.',
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getSearchedProducts = async (request, response, next) => {
    try {
        const { search, sort, category, price, brand } = request.query;
        const page = Number(request.query.page) || 1;
        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = Number(limit * (page - 1));
        const baseQuery = {};
        if (search) {
            baseQuery.title = {
                $regex: search,
                $options: 'i',
            };
        }
        if (price) {
            baseQuery.price = {
                $lte: Number(price),
            };
        }
        if (category) {
            baseQuery.category = category;
        }
        if (brand) {
            baseQuery.brand = brand;
        }
        const [products, filteredOnlyProducts] = await Promise.all([
            Product.find(baseQuery)
                .sort(sort && { price: sort === 'asc' ? 1 : -1 })
                .limit(limit)
                .skip(skip),
            Product.find(baseQuery),
        ]);
        const totalPage = Math.ceil(filteredOnlyProducts.length / limit);
        return response.status(200).json({
            success: true,
            products,
            totalPage,
        });
    }
    catch (error) {
        return next(error);
    }
};
