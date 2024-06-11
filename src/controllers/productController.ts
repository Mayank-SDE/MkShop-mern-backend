import { NextFunction, Request, Response } from 'express';
import {
  BaseQueryType,
  NewProductRequestBody,
  SearchRequestQuery,
  UpdateProductRequestBody,
} from '../types/productType.js';
import ErrorHandler from '../utils/utilityClass.js';
import { Product } from '../models/product.js';
import { rm } from 'fs';
import { nodeCache } from '../app.js';
import { invalidateCache } from '../utils/invalidateCache.js';

export const newProduct = async (
  request: Request<{}, {}, NewProductRequestBody>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      price,
      rating,
      discountPercentage,
      stock,
      brand,
      category,
    } = request.body;

    const files = request.files;

    if (!Array.isArray(files) || files.length !== 4) {
      return next(
        new ErrorHandler(
          'Please enter 4 images of the product captured from different angles',
          400
        )
      );
    }

    const imagesPath: string[] = files?.map((file) => file.path);

    if (
      !title ||
      !description ||
      !price ||
      !rating ||
      !discountPercentage ||
      !stock ||
      !brand ||
      !category
    ) {
      imagesPath.map((path) => {
        rm(path, () => {
          console.log('Deleted');
        });
      });
      return next(
        new ErrorHandler(
          'Please enter all the following product details correctly.',
          400
        )
      );
    }

    await Product.create({
      title,
      description,
      price: Number(price),
      rating: Number(rating),
      discountPercentage: Number(discountPercentage),
      stock: Number(stock),
      brand: category.trim().replace(/\s+/g, '-').toUpperCase(),
      category: category.trim().replace(/\s+/g, '-').toUpperCase(),
      thumbnail: imagesPath[0],
      images: imagesPath,
    });
    invalidateCache({ product: true, admin: true });

    return response.status(201).json({
      success: true,
      message: 'Products created successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

//Revalidate on new,update or delete products and on New order
export const getLatestProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let products = [];

    if (nodeCache.has('latest-products')) {
      products = JSON.parse(nodeCache.get('latest-products') as string);
    } else {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
      nodeCache.set('latest-products', JSON.stringify(products));
    }

    return response.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(error);
  }
};
export const getBrandsByCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { category } = request.query;
    let brands;

    if (category && category !== '') {
      brands = await Product.distinct('brand', { category });
    } else {
      brands = await Product.distinct('brand');
    }

    return response.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    return next(error);
  }
};
export const getCategoriesByBrand = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { brand } = request.query;
    let categories;

    if (brand && brand !== '') {
      categories = await Product.distinct('category', { brand });
    } else {
      categories = await Product.distinct('category');
    }

    return response.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return next(error);
  }
};

//Revalidate on new,update or delete products and on New order
export const getAllProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let products;
    if (nodeCache.has('products')) {
      products = JSON.parse(nodeCache.get('products') as string);
    } else {
      products = await Product.find({});
      nodeCache.set('products', JSON.stringify(products));
    }

    return response.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(error);
  }
};
//Revalidate on new,update or delete products and on New order
export const getSingleProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let product;

    const id = request.params.id;
    if (nodeCache.has(`product-${id}`)) {
      product = JSON.parse(nodeCache.get(`product-${id}`) as string);
    } else {
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
  } catch (error) {
    return next(error);
  }
};

export const deleteSingleProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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

    invalidateCache({
      product: true,
      admin: true,
      productId: String(product._id),
    });
    return response.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const updateSingleProduct = async (
  request: Request<{ id: string }, {}, UpdateProductRequestBody>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      price,
      rating,
      discountPercentage,
      stock,
      brand,
      category,
    } = request.body;

    const product = await Product.findById(request.params.id);

    if (!product) {
      return next(new ErrorHandler('Invalid product id', 404));
    }

    const files = request.files;
    if (Array.isArray(files)) {
      const imagesPath: string[] = files?.map((file) => file.path);

      if (imagesPath && imagesPath.length !== 4) {
        imagesPath.map((path) => {
          rm(path, () => {
            console.log('Deleting unneccassary images from database.');
          });
        });
        return next(
          new ErrorHandler(
            'Please enter 4 images of the product captured from different angles',
            400
          )
        );
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
    invalidateCache({
      product: true,
      admin: true,
      productId: String(product._id),
    });
    return response.status(201).json({
      success: true,
      message: 'Products updated successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

export const getSearchedProducts = async (
  request: Request<{}, {}, {}, SearchRequestQuery>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      search,
      sort,
      category,
      price,
      brand,
      page: queryPage,
    } = request.query;

    const page = Number(queryPage) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = limit * (page - 1);

    const baseQuery: BaseQueryType = {};

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

    const [products, totalProducts] = await Promise.all([
      Product.find(baseQuery)
        .sort(sort && { price: sort === 'asc' ? 1 : -1 })
        .limit(limit)
        .skip(skip),
      Product.countDocuments(baseQuery),
    ]);

    const totalPage = Math.ceil(totalProducts / limit);

    return response.status(200).json({
      success: true,
      products,
      totalPage,
    });
  } catch (error) {
    return next(error);
  }
};

/*
export const postAllProducts = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { products } = request.body;

    products.forEach(
      async (product: {
        category: string;
        brand: string;
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        thumbnail: string;
        images: string[];
      }) => {
        const databaseProduct = await Product.create({
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images,
        });
        databaseProduct.save();
      }
    );

    return response.status(201).json({
      success: true,
      message: 'Products created successfully.',
    });
  } catch (error) {
    return next(error);
  }
};
*/
