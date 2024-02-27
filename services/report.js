const { QueryTypes } = require('sequelize')
const moment = require('moment')
const constants = require('../utilities/constants')
const Product = require('../models/Product.model')


const getCustomerCountValue = async (connection, params) => {
  try {
    const query = `
      SELECT
        c.mobile,
        COUNT(c.mobile) AS "count",
        SUM(total) - SUM(discount) AS "value"
      FROM public.order o
      INNER JOIN public.customer c
      ON o.customer_id = c.id
        GROUP BY c.mobile
        ORDER BY ${params.orderBy} DESC
        LIMIT ${params.limit};
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      customers: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getZoneCountValue = async (connection, params) => {
  try {
    const query = `
      SELECT
        z.name,
        COUNT(z.name) AS "count",
        SUM(total) - SUM(discount) AS "value"
      FROM public.order o
      INNER JOIN public.zone z
      ON o.zone_id = z.id
        GROUP BY z.name
        ORDER BY ${params.orderBy} DESC
        LIMIT ${params.limit};
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      zones: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getCustomerZoneCount = async (connection, params) => {
  try {
    const query = `
      SELECT
        z.name,
        COUNT(z.name) AS "count"
      FROM public.customer c
      INNER JOIN public.zone z
      ON c.zone_id = z.id
        GROUP BY z.name
        ORDER BY count DESC
        LIMIT ${params.limit};
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      zones: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrdersByCustomer = async (connection, params) => {
  try {
    const query = `SELECT mobile, count FROM public.customer WHERE count IS NOT NULL ORDER BY count DESC LIMIT ${params.limit};`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      customers: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getMoneyByCustomer = async (connection, params) => {
  try {
    const query = `SELECT mobile, spent FROM public.customer WHERE spent IS NOT NULL ORDER BY spent DESC LIMIT ${params.limit};`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      customers: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrderCountValue = async (connection, params) => {
  try {
    let where = ''
    if (params.month && params.year) {
      where = `WHERE TO_CHAR(order_datetime, 'MM') = '${params.month}' AND TO_CHAR(order_datetime, 'YYYY') = '${params.year}'`
    } else if (params.month) {
      where = `WHERE TO_CHAR(order_datetime, 'MM') = '${params.month}'`
    } else if (params.year) {
      where = `WHERE TO_CHAR(order_datetime, 'YYYY') = '${params.year}'`
    }
    const query = `
      SELECT
        TO_CHAR(order_datetime, '${params.by}') AS "by",
        TO_CHAR(order_datetime, '${params.order}') AS "sort",
        COUNT(TO_CHAR(order_datetime, '${params.by}')) AS "count",
        SUM(total) AS "value"
      FROM public.order
        ${where}
        GROUP BY by, sort
        ORDER BY sort;
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getMostSellingProducts = async (connection, params) => {
  try {
    let where = ''
    if (params.month && params.year) {
      where = `WHERE TO_CHAR(order_datetime, 'MM') = '${params.month}' AND TO_CHAR(order_datetime, 'YYYY') = '${params.year}'`
    } else if (params.month) {
      where = `WHERE TO_CHAR(order_datetime, 'MM') = '${params.month}'`
    } else if (params.year) {
      where = `WHERE TO_CHAR(order_datetime, 'YYYY') = '${params.year}'`
    }

    const query = `
      SELECT
          ol.product_id,
          p.title,
          SUM(ol.quantity) AS total_quantity
      FROM 
          order_lineitem ol
      INNER JOIN 
          public.order o ON ol.order_id = o.id
      INNER JOIN 
          product p ON ol.product_id = p.id
      ${where}
      GROUP BY 
          ol.product_id, p.title
      ORDER BY 
          total_quantity DESC
    `;
    
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    const productIds = [];
    const totalQuantities = [];
    const titles = [];

  
    response.forEach((product) => {
      const productId = product.product_id;
      const title = product.title;
      const totalQuantity = parseInt(product.total_quantity)
  
      productIds.push(productId);
      totalQuantities.push(totalQuantity);
      titles.push(title)
    });

    return {
      status: true,
      productId: productIds,
      title: titles,
      totalQuantity: totalQuantities,
      order: response
    };
  } catch (error) {
    console.error('Error fetching most selling product:', error);
    return {
      status: false,
      message: 'Error fetching most selling product'
    };
  }
};



// const getOrders = async (connection, params) => {
//   try {
//     const query = `SELECT
//       DATE_PART('${params.by}', o.order_datetime) AS "by",
//       CASE WHEN d.title IS NULL THEN 'Product' ELSE d.title END,
//       COUNT(ol.order_id),
//       CASE WHEN d.title IS NULL THEN SUM(p.price) ELSE SUM(d.price - d.discount) / COUNT(ol.order_id) END AS "sum"
//     FROM public.order o
//       INNER JOIN public.order_lineitem ol
//       ON o.id = ol.order_id
//       INNER JOIN public.product p
//       ON ol.product_id = p.id
//       LEFT JOIN public.deal d
//       ON ol.deal_id = d.id
//     GROUP BY by, ol.order_id, d.title
//     HAVING DATE_PART('${params.by}', o.order_datetime) = ${params.value}
//     ORDER BY by;`
//     const response = await connection.query(query, { type: QueryTypes.SELECT })

//     return {
//       status: true,
//       orders: response
//     }
//   } catch (error) {
//     return {
//       status: false,
//       message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
//     }
//   }
// }

const getProducts = async (connection, params) => {
  try {
    const query = `
      SELECT
        p.title,
        SUM(ol.quantity) AS "count",
        SUM(ol.price * ol.quantity) AS "value"
      FROM public.order_lineitem ol
      INNER JOIN public.product p
      ON ol.product_id = p.id
        GROUP BY p.id
        HAVING COUNT(p.title) > 0
        ORDER BY ${params.orderBy} DESC;
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      products: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getProductBy = async (connection, params) => {
  try {
    const query = `
      SELECT
        TO_CHAR(o.order_datetime, '${params.by}') AS "by",
        p.title,
        SUM(ol.quantity) AS "count",
        SUM(ol.price * ol.quantity) AS "value"
      FROM public.order o
      INNER JOIN public.order_lineitem ol
      ON o.id = ol.order_id
      INNER JOIN public.product p
      ON p.id = ol.product_id
        WHERE TO_CHAR(o.order_datetime, '${params.by}') = '${params.value}'
        GROUP BY by, p.title
        HAVING COUNT(p.title) > 0
        ORDER BY by, count DESC
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      products: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getSummary = async (connection, params) => {
  try {
    let between = ''
    let format = ''
    switch (params.type) {
      case 'daily':
        format = 'YYYY-MM-DD'
        between = `'${moment().subtract(1, 'day').format(format)}' AND '${moment().format(format)}'`
        break
      case 'weekly':
        format = 'WW'
        between = `'${moment().subtract(1, 'week').format(format)}' AND '${moment().format(format)}'`
        break
      case 'monthly':
        format = 'YYYY-MM'
        between = `'${moment().subtract(1, 'month').format(format)}' AND '${moment().format(format)}'`
        break
      case 'yearly':
        format = 'YYYY'
        between = `'${moment().subtract(1, 'year').format(format)}' AND '${moment().format(format)}'`
        break
      default:
        format = 'YYYY-MM-DD'
        between = `'${moment().subtract(1, 'day').format(format)}' AND '${moment().format(format)}'`
        break
    }

    const query = `
      SELECT
        TO_CHAR(order_datetime, '${format}') AS "by",
        COUNT(id) AS "count",
        SUM(total) - SUM(discount) AS "value"
      FROM public.order
	  	WHERE TO_CHAR(order_datetime, '${format}') BETWEEN ${between}
        GROUP BY by
        ORDER BY by ASC;
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrders = async (connection, params) => {
  try {
    let between = ''
    let format = ''
    switch (params.type) {
      case 'daily':
        format = 'YYYY-MM-DD'
        between = `'${moment().subtract(1, 'day').format(format)}' AND '${moment().format(format)}'`
        break
      case 'weekly':
        format = 'WW'
        between = `'${moment().subtract(1, 'week').format(format)}' AND '${moment().format(format)}'`
        break
      case 'monthly':
        format = 'YYYY-MM'
        between = `'${moment().subtract(1, 'month').format(format)}' AND '${moment().format(format)}'`
        break
      case 'yearly':
        format = 'YYYY'
        between = `'${moment().subtract(1, 'year').format(format)}' AND '${moment().format(format)}'`
        break
      default:
        format = 'YYYY-MM-DD'
        between = `'${moment().subtract(1, 'day').format(format)}' AND '${moment().format(format)}'`
        break
    }

    const query = `
      SELECT
        TO_CHAR(o.order_datetime, '${format}') AS "by",
        COUNT(ol.id) AS "count"
      FROM public.order o
        INNER JOIN public.order_lineitem ol
        ON o.id = ol.order_id
      WHERE TO_CHAR(o.order_datetime, '${format}') BETWEEN ${between}
        GROUP BY by
        ORDER BY by ASC;
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrderCustomerRatio = async (connection, params) => {
  try {
    const orderCountQuery = 'SELECT COUNT(*) FROM public.order LIMIT 1;'
    const orderCountResponse = await connection.query(orderCountQuery, { type: QueryTypes.SELECT })
    const customerCountQuery = 'SELECT COUNT(*) FROM public.customer WHERE id IN(SELECT customer_id FROM public.order) LIMIT 1;'
    const customerCountResponse = await connection.query(customerCountQuery, { type: QueryTypes.SELECT })

    return {
      status: true,
      ratio: (orderCountResponse[0].count / customerCountResponse[0].count).toFixed(2)
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrdersByZone = async (connection, params) => {
  try {
    let query = `
      SELECT
        z.name AS "zone",
        COUNT(o.zone_id) AS "orders"
      FROM public.order o
        INNER JOIN public.zone z
        ON o.zone_id = z.id
      WHERE o.order_status IN ('punched', 'assigned')
      GROUP BY zone
      ORDER BY orders DESC
    `
    if (params.limit) query = `${query} LIMIT ${params.limit}`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrdersByDriver = async (connection, params) => {
  try {
    let query = `
      SELECT
        d.name AS "driver",
        COUNT(o.id) AS "orders",
        SUM(o.total - o.discount) AS "value"
      FROM public.order o
        INNER JOIN public.driver d
        ON o.driver_id = d.id
      WHERE o.order_status = 'delivered'
        AND o.payment_status = 'unpaid'
      GROUP BY driver
      ORDER BY orders DESC
    `
    if (params.limit) query = `${query} LIMIT ${params.limit}`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrdersByActiveDrivers = async (connection, params) => {
  try {
    let query = `
      SELECT
        d.name AS "driver",
        z.name AS "zone",
        COUNT(o.id) AS "orders"
      FROM public.order o
        INNER JOIN public.driver d
        ON o.driver_id = d.id
        INNER JOIN public.zone z
        ON o.zone_id = z.id
      WHERE o.order_datetime > '${moment().subtract(15, 'days').format('YYYY-MM-DD')}'
      GROUP BY driver, zone
      ORDER BY driver, orders DESC
    `
    if (params.limit) query = `${query} LIMIT ${params.limit}`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getIncomeStatement = async (connection, params) => {
  try {
    const where = params.month ? ` WHERE TO_CHAR(date, 'MM') = '${params.month}' ` : ''
    const query = `
      SELECT
        TO_CHAR(date, '${params.by}') AS "by",
        TO_CHAR(date, '${params.order}') AS "sort",
        SUM(total) AS "value"
      FROM public.income_statement
        ${where}
        GROUP BY by, sort
        ORDER BY sort;
    `
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    return {
      status: true,
      income_statements: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { getCustomerCountValue, getZoneCountValue, getCustomerZoneCount, getOrderCountValue, getMostSellingProducts, getProducts, getProductBy, getSummary, getOrders, getOrderCustomerRatio, getOrdersByZone, getOrdersByDriver, getOrdersByActiveDrivers, getIncomeStatement }