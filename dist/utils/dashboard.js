import { Product } from '../models/product.js';
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0) {
        return thisMonth * 100;
    }
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
export const getInventories = async ({ categories, productsCount, }) => {
    const categoriesCountPromise = categories.map((category) => {
        return Product.countDocuments({ category });
    });
    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount = [];
    categories.forEach((category, index) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[index] / productsCount) * 100),
        });
    });
    return categoryCount;
};
export const getChartData = ({ length, documentArray, today, property, }) => {
    const data = new Array(length).fill(0);
    documentArray.forEach((element) => {
        const creationDate = element.createdAt;
        const monthDifference = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDifference < length) {
            if (property) {
                data[length - monthDifference - 1] += element[property];
            }
            else {
                data[length - monthDifference - 1] += 1;
            }
        }
    });
    return data;
};
