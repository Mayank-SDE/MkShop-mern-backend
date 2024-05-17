import { nodeCache } from '../app.js';
import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import { Order } from '../models/order.js';
import { calculatePercentage, getChartData, getInventories, } from '../utils/dashboard.js';
export const getDashboardStats = async (request, response, next) => {
    try {
        let stats = {};
        if (nodeCache.has('admin-stats')) {
            stats = JSON.parse(nodeCache.get('admin-stats'));
        }
        else {
            const today = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const thisMonth = {
                start: new Date(today.getFullYear(), today.getMonth(), 1),
                end: today,
            };
            const lastMonth = {
                start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
                end: new Date(today.getFullYear(), today.getMonth(), 0),
            };
            const thisMonthProductsPromise = Product.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end,
                },
            });
            const lastMonthProductsPromise = Product.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end,
                },
            });
            const thisMonthUsersPromise = User.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end,
                },
            });
            const lastMonthUsersPromise = User.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end,
                },
            });
            const thisMonthOrdersPromise = Order.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end,
                },
            });
            const lastMonthOrdersPromise = Order.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end,
                },
            });
            const lastSixMonthOrdersPromise = Order.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today,
                },
            });
            const latestTransactionPromise = Order.find({})
                .select(['orderItems', 'discount', 'total', 'status'])
                .limit(4);
            const [thisMonthProducts, thisMonthUsers, thisMonthOrders, lastMonthProducts, lastMonthUsers, lastMonthOrders, productsCount, usersCount, allOrders, lastSixMonthOrders, categories, femaleUsersCount, latestTransaction,] = await Promise.all([
                thisMonthProductsPromise,
                thisMonthUsersPromise,
                thisMonthOrdersPromise,
                lastMonthProductsPromise,
                lastMonthUsersPromise,
                lastMonthOrdersPromise,
                Product.countDocuments(),
                User.countDocuments(),
                Order.find({}).select('total'),
                lastSixMonthOrdersPromise,
                Product.distinct('category'),
                User.countDocuments({ gender: 'female' }),
                latestTransactionPromise,
            ]);
            const thisMonthRevenue = thisMonthOrders.reduce((total, order) => {
                return order.total + total;
            }, 0);
            const lastMonthRevenue = lastMonthOrders.reduce((total, order) => {
                return order.total + total;
            }, 0);
            const changePercent = {
                revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
                product: calculatePercentage(thisMonthProducts.length, lastMonthProducts.length),
                user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
                order: calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
            };
            const revenue = allOrders.reduce((total, order) => {
                return total + (order.total || 0);
            }, 0);
            const counts = {
                revenue,
                user: usersCount,
                product: productsCount,
                order: allOrders.length,
            };
            const orderMonthsCount = new Array(6).fill(0);
            const orderMonthlyRevenue = new Array(6).fill(0);
            lastSixMonthOrders.forEach((order) => {
                const creationDate = order.createdAt;
                const monthDifference = (today.getMonth() - creationDate.getMonth() + 12) % 12;
                if (monthDifference < 6) {
                    orderMonthsCount[6 - monthDifference - 1] += 1;
                    orderMonthlyRevenue[6 - monthDifference - 1] += order.total;
                }
            });
            const categoryCount = await getInventories({
                categories,
                productsCount,
            });
            const userRatio = {
                male: usersCount - femaleUsersCount,
                female: femaleUsersCount,
            };
            const modifyLatestTransaction = latestTransaction.map((transaction) => {
                return {
                    _id: transaction._id,
                    discoutn: transaction.discount,
                    amount: transaction.total,
                    quantity: transaction.orderItems.length,
                    status: transaction.status,
                };
            });
            stats = {
                categoryCount,
                changePercent,
                counts,
                chart: {
                    order: orderMonthsCount,
                    revenue: orderMonthlyRevenue,
                },
                userRatio,
                latestTransaction: modifyLatestTransaction,
            };
            nodeCache.set('admin-stats', JSON.stringify(stats));
        }
        return response.status(200).json({
            success: true,
            stats,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getPieCharts = async (request, response, next) => {
    try {
        let pieCharts = {};
        const key = 'admin-pie-chart';
        if (nodeCache.has(key)) {
            pieCharts = JSON.parse(nodeCache.get(key));
        }
        else {
            const allOrdersPromise = Order.find({}).select([
                'total',
                'discount',
                'subTotal',
                'tax',
                'shippingCharges',
            ]);
            const [placedOrders, pickedOrders, packedOrders, shippedOrders, deliveredOrders, categories, productsCount, productsInStock, allOrders, allUsers, customerCount, adminCount,] = await Promise.all([
                Order.countDocuments({ status: 'placed' }),
                Order.countDocuments({ status: 'picked' }),
                Order.countDocuments({ status: 'packed' }),
                Order.countDocuments({ status: 'shipped' }),
                Order.countDocuments({ status: 'delivered' }),
                Product.distinct('category'),
                Product.countDocuments({}),
                Product.countDocuments({
                    stock: {
                        $gte: 1,
                    },
                }),
                allOrdersPromise,
                User.find({}).select(['dob']),
                User.countDocuments({ role: 'user' }),
                User.countDocuments({ role: 'admin' }),
            ]);
            const orderFullfillmentRatio = {
                placed: placedOrders,
                picked: pickedOrders,
                packed: packedOrders,
                shipped: shippedOrders,
                delivered: deliveredOrders,
            };
            const productCategories = await getInventories({
                categories,
                productsCount,
            });
            const stockAvailability = {
                inStock: productsInStock,
                outOfStock: productsCount - productsInStock,
            };
            const grossIncome = allOrders.reduce((prev, order) => {
                return prev + (order.total || 0);
            }, 0);
            const discount = allOrders.reduce((prev, order) => {
                return prev + (order.discount || 0);
            }, 0);
            const productionCost = allOrders.reduce((prev, order) => {
                return prev + (order.shippingCharges || 0);
            }, 0);
            const burnt = allOrders.reduce((prev, order) => {
                return prev + (order.tax || 0);
            }, 0);
            const marketingCost = Math.round(grossIncome * (30 / 100));
            const netMargin = grossIncome - marketingCost - burnt - productionCost - discount;
            const revenueDistribution = {
                netMargin,
                discount,
                productionCost,
                burnt,
                marketingCost,
            };
            const adminCustomer = {
                admin: adminCount,
                customer: customerCount,
            };
            const usersAgeGroup = {
                teen: allUsers.filter((user) => user.age < 20).length,
                adult: allUsers.filter((user) => user.age >= 20 && user.age < 60)
                    .length,
                old: allUsers.filter((user) => user.age >= 60).length,
            };
            pieCharts = {
                orderFullfillmentRatio,
                productCategories,
                stockAvailability,
                revenueDistribution,
                adminCustomer,
                usersAgeGroup,
            };
            nodeCache.set(key, JSON.stringify(pieCharts));
        }
        return response.status(200).json({
            success: true,
            pieCharts,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getBarCharts = async (request, response, next) => {
    try {
        let barCharts = {};
        const key = 'admin-bar-chart';
        if (nodeCache.has(key)) {
            barCharts = JSON.parse(nodeCache.get(key));
        }
        else {
            const today = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const twelveMonthsAgo = new Date();
            twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
            const lastSixMonthProductsPromise = Product.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today,
                },
            }).select('createdAt');
            const lastSixMonthUsersPromise = User.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today,
                },
            }).select('createdAt');
            const lastTwelveMonthOrdersPromise = Order.find({
                createdAt: {
                    $gte: twelveMonthsAgo,
                    $lte: today,
                },
            }).select('createdAt');
            const [sixMonthProducts, sixMonthUsers, twelveMonthOrders] = await Promise.all([
                lastSixMonthProductsPromise,
                lastSixMonthUsersPromise,
                lastTwelveMonthOrdersPromise,
            ]);
            const productCounts = getChartData({
                length: 6,
                documentArray: sixMonthProducts,
                today,
            });
            const userCounts = getChartData({
                length: 6,
                documentArray: sixMonthUsers,
                today,
            });
            const orderCounts = getChartData({
                length: 12,
                documentArray: twelveMonthOrders,
                today,
            });
            barCharts = {
                users: userCounts,
                products: productCounts,
                orders: orderCounts,
            };
            nodeCache.set(key, JSON.stringify(barCharts));
        }
        return response.status(200).json({
            success: true,
            barCharts,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getLineCharts = async (request, response, next) => {
    try {
        let barCharts = {};
        const key = 'admin-line-chart';
        if (nodeCache.has(key)) {
            barCharts = JSON.parse(nodeCache.get(key));
        }
        else {
            const today = new Date();
            const twelveMonthsAgo = new Date();
            twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
            const baseQuery = {
                createdAt: {
                    $gte: twelveMonthsAgo,
                    $lte: today,
                },
            };
            const [twelveMonthProducts, twelveMonthUsers, twelveMonthOrders] = await Promise.all([
                Product.find(baseQuery).select('createdAt'),
                User.find(baseQuery).select('createdAt'),
                Order.find(baseQuery).select(['createdAt', 'discount', 'total']),
            ]);
            const productCounts = getChartData({
                length: 12,
                documentArray: twelveMonthProducts,
                today,
            });
            const userCounts = getChartData({
                length: 12,
                documentArray: twelveMonthUsers,
                today,
            });
            const discount = getChartData({
                length: 12,
                documentArray: twelveMonthOrders,
                today,
                property: 'discount',
            });
            const revenue = getChartData({
                length: 12,
                documentArray: twelveMonthOrders,
                today,
                property: 'total',
            });
            barCharts = {
                users: userCounts,
                products: productCounts,
                discount,
                revenue,
            };
            nodeCache.set(key, JSON.stringify(barCharts));
        }
        return response.status(200).json({
            success: true,
            barCharts,
        });
    }
    catch (error) {
        return next(error);
    }
};
