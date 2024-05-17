import { Document } from 'mongoose';
import { Product } from '../models/product.js';

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth === 0) {
    return thisMonth * 100;
  }
  const percent = (thisMonth / lastMonth) * 100;
  return Number(percent.toFixed(0));
};

export const getInventories = async ({
  categories,
  productsCount,
}: {
  categories: string[];
  productsCount: number;
}) => {
  const categoriesCountPromise = categories.map((category) => {
    return Product.countDocuments({ category });
  });
  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];
  categories.forEach((category, index) => {
    categoryCount.push({
      [category]: Math.round((categoriesCount[index] / productsCount) * 100),
    });
  });

  return categoryCount;
};

interface MyDocument extends Document {
  createdAt: Date;
  discount?: number;
  total?: number;
}

type getChartDataProps = {
  length: number;
  documentArray: MyDocument[];
  today: Date;
  property?: 'discount' | 'total';
};

export const getChartData = ({
  length,
  documentArray,
  today,
  property,
}: getChartDataProps) => {
  const data = new Array(length).fill(0);

  documentArray.forEach((element) => {
    const creationDate = element.createdAt;
    const monthDifference =
      (today.getMonth() - creationDate.getMonth() + 12) % 12;
    if (monthDifference < length) {
      if (property) {
        data[length - monthDifference - 1] += element[property]!;
      } else {
        data[length - monthDifference - 1] += 1;
      }
    }
  });

  return data;
};
