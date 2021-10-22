var express = require('express');
var router = express.Router();
// const jwt= require('jsonwebtoken');

/* GET users listing. */
// http://localhost:8000/api 
router.get('/', function (req, res, next) {
    res.send('123');
});




// 前台 news 僅供查
// nodejs 專案預設8000
// http://localhost:8000/api/news
// query 是資料庫的句法
router.get('/news', function (req, res, next) {
    req.mysql.query('select * from news', [],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});
// http://localhost:8000/api/news/4
// /news/:newsId 這樣就可以進入mysql相關id資料
router.get('/news/:newsId', function (req, res, next) {
    req.mysql.query('select * from news n join newsContent nc on (n.newsId = nc.newsId) where n.newsId = ?',
        [req.params.newsId],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});

// 前台 products 僅供查
// http://localhost:8000/api/products
router.get('/products', function (req, res, next) {
    req.mysql.query('select * from products', [],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});
// 分類搜尋
// http://localhost:8000/api/products/ACC
router.get('/products/:productClass', function (req, res, next) {
    req.mysql.query('select * from products where productClass = ?',
        [req.params.productClass],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});
// 單一商品詳細介紹頁面
// http://localhost:8000/api/products/id/2
router.get('/products/id/:productId', function (req, res, next) {
    req.mysql.query('select * from products where productId = ?',
        [req.params.productId],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});

// 前台 members 可供增查修
router.get('/members', function (req, res, next) {
    req.mysql.query('select * from customers', [],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});
// 這裡有點執行上的難度，要從登入狀態判定用戶 customerId 為多少
// 決定要給他看到那哪筆會員資料
// http://localhost:8000/api/members/6
router.get('/members/:customerId', function (req, res, next) {
    req.mysql.query('select * from customers where customerId = ?',
        [req.params.customerId],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});
//searching member's all order
router.get('/member-order-history', function(req, res, next){
    req.mysql.query(
        "SELECT c.customerId, o.orderId, CONCAT('#', p.productId, ', ', p.productName, ', ', od.quantity, '件, ', od.productPrice, '元') AS details FROM orderdetails od JOIN orders o USING(orderId) JOIN products p USING(productId) JOIN customers c USING(customerId) ORDER BY customerId",
        [],
        function(err, result){
            res.send(JSON.stringify(result));
        }
    )
})
// 查詢單一會員的 訂單資料
router.get("/cora/:customerId", function (req, res, next) {
    req.mysql.query(
        "SELECT c.customerId, o.orderId, o.orderDate, CONCAT('#', p.productId, ', ', p.productName, ', ', od.quantity, '件, ', od.productPrice, '元') AS details FROM orderdetails od JOIN orders o USING(orderId) JOIN products p USING(productId) JOIN customers c USING(customerId)  WHERE c.customerId = ?",
        [req.params.customerId],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    );
});

// router.get("/cora/order/:customerId", function (req, res, next) {
//     req.mysql.query(
//         "SELECT c.customerId, o.orderId, o.orderDate, CONCAT('#', p.productId, ', ', p.productName, ', ', od.quantity, '件, ', od.productPrice, '元') AS details FROM orderdetails od JOIN orders o USING(orderId) JOIN products p USING(productId) JOIN customers c USING(customerId)  WHERE o.orderId = ?",
//         [req.params.customerId],
//         function (err, result) {
//             res.send(JSON.stringify(result));
//         }
//     );
// });
router.get("/member-order-history/:customerId", function (req, res, next) {
    req.mysql.query(
        "SELECT o.orderId, o.orderDate, SUM(od.productPrice * od.quantity) AS totalPrice FROM orders o JOIN orderdetails od ON (o.orderId = od.orderId) WHERE o.customerId = ? GROUP BY o.orderId",
        [req.params.customerId],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    );
});

// 新增會員資料
router.post('/members', function (req, res, next) {
    req.mysql.query('insert into customers (customerName, customerPassword, customerEmail) values (?, ?, ?)',
        [req.body.customerName, req.body.customerPassword, req.body.customerEmail],
        function (err, result) {
            res.send('member inserted. ');
        }
    )
});
router.put('/members', function (req, res, next) {
    // res.send('update customers set AAA = ?, BBB = ?, CCC = ? where customerId = ?');
    req.mysql.query('update customers set customerName = ?, customerGender = ?, customerPhone = ?, customerEmail = ?, customerAddress = ? where customerId = ?',
        [req.body.customerName, req.body.customerGender, req.body.customerPhone, req.body.customerEmail, req.body.customerAddress, req.body.customerId],
        function (err, result) {
            res.send('member updated. ');
        }
    )
});
// http://localhost:8000/api/orders
router.get("/orders", function (req, res, next) {
    req.mysql.query(
        "SELECT o.orderId, o.orderDate, o.customerId, SUM(od.productPrice * od.quantity) AS totalPrice FROM orders o JOIN orderdetails od ON (o.orderId = od.orderId) GROUP BY o.orderId; SELECT od.orderId, CONCAT(p.productName, ', ', p.productSize, ', ', od.quantity, ', ', (p.productPrice * od.quantity)) AS detail FROM orderdetails od JOIN products p ON (od.productId = p.productId) ORDER BY od.orderId;",
        [],
        function (err, result) {
            console.log(result);
            res.send(JSON.stringify(result));
            // res.render('backend/order.ejs', {list: result[0], odList: result[1]});
        }
    );
});
// 前台 orders 可供增查刪
// 編號八號的會員
// http://localhost:8000/api/orders/8
router.get('/orders/:customerId', function (req, res, next) {
    req.mysql.query('select * from orders where customerId = ?',
        [req.params.customerId],
        function (err, result) {
            res.send(JSON.stringify(result));
        }
    )
});


// 編號八號的會員察看編號二號的訂單
// http://localhost:8000/api/orders/8/2 掛掉
// router.get('/orders/:customerId/:orderId', function (req, res, next) {
//     req.mysql.query('select * from orders where customerId = ? and orderId = ?',
//         [req.params.customerId, req.params.orderId],
//         function (err, result) {
//             res.send(JSON.stringify(result));
//         }
//     )
// });
// router.get("/cora/:customerId", function (req, res, next) {
//     req.mysql.query(
//         "SELECT c.customerId, o.orderId, o.orderDate, CONCAT('#', p.productId, ', ', p.productName, ', ', od.quantity, '件, ', od.productPrice, '元') AS details FROM orderdetails od JOIN orders o USING(orderId) JOIN products p USING(productId) JOIN customers c USING(customerId)  WHERE c.customerId = ?",
//         [req.params.customerId],
//         function (err, result) {
//             res.send(JSON.stringify(result));
//         }
//     );
// });





// router.get("/cora/:customerId/:orderId", function (req, res, next) {
//     req.mysql.query(
//         "SELECT c.customerId, o.orderId, o.orderDate, CONCAT('#', p.productId, ', ', p.productName, ', ', od.quantity, '件, ', od.productPrice, '元') AS details FROM orderdetails od JOIN orders o USING(orderId) JOIN products p USING(productId) JOIN customers c USING(customerId)  WHERE o.orderId = 1",
//         [req.params.customerId, req.params.orderId],
//         function (err, result) {
//             res.send(JSON.stringify(result));
//         }
//     )
// });
// 新增訂單
// router.post('/orders', function (req, res, next) {
//     res.send('insert into orders (customerId, orderDate) values (?, ?);'
//         + 'insert into orderdetails (AAA, BBB, CCC) values (?, ?, ?);'
//         + 'insert into orderdetails (AAA, BBB, CCC) values (?, ?, ?);');

//     req.mysql.query('insert into orders (customerId, orderDate) values (?, ?);',
//         [req.body.customerId, req.body.orderId],
//         function (err, result) {
//         }
//     )
//     req.mysql.query('insert into orderdetails (orderId, productId, productPrice, quantity) values (?, ?, ?, ?);',
//         [req.body.orderId, req.body.productId, req.body.productPrice, req.body.quantity],
//         function (err, result) {
//             res.send('order inserted. ')
//         }
//     )

// });
// 李豪
router.post('/orders', function (req, res, next) {
    req.mysql.query(
        "INSERT INTO orders (customerId, orderDate) VALUES (?, current_timestamp); INSERT INTO orderdetails (`orderId`, `productId`, `productPrice`, `quantity`) VALUES ?; UPDATE orderdetails SET orderId = (SELECT MAX(orderId) FROM orders) WHERE orderId IS null", 
        [req.body.customerId, 
            [
                [null, req.body.productId1, req.body.productPrice1, req.body.quantity1],
                [null, req.body.productId2, req.body.productPrice2, req.body.quantity2],
                [null, req.body.productId3, req.body.productPrice3, req.body.quantity3],
                [null, req.body.productId4, req.body.productPrice4, req.body.quantity4],
                [null, req.body.productId5, req.body.productPrice5, req.body.quantity5],
            ],
        ], 
        function (err, result) {
            res.send('success');
        }
    )
});
router.delete('/orders', function (req, res, next) {
    res.send('delete from orders where orderId = ?');

    req.mysql.query('delete from orders where orderId = ?',
        [req.body.orderId],
        function (err, result) {
            res.send('order deleted. ')
        }
    )
});
// 李豪
//cart details for user
router.get('/cart/order', function(req, res, next){
    req.mysql.query("SELECT c.customerId, o.orderId, c.customerEmail, DATE_FORMAT(o.orderDate,'%Y/%m/%d %k:%i') AS orderDate, c.customerName, c.customerPhone FROM orderdetails od JOIN orders o USING(orderId) JOIN customers c USING(customerId) ORDER BY customerId",
    [],
    function(err, result){
        res.send(JSON.stringify(result));
    }
    )
})

module.exports = router;
