var express                 = require('express');
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');
var paypal                  = require('paypal-rest-sdk');

//Paypal configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ae3y21jP2fusVePryxulbtyj0zB_3e2D85OzKxNlY7QOR2hHWirw1wbZLIhSgDrK_AZW6d1FgsN-nj3W',
  'client_secret': 'EHvJRtJk_Ha_p5IvF6WUKPpy7y647lwa-XQPJKdWv3e8qXJgm0llHUxUGpyLx3NmMau7Xn-Fa5XpZQsk'
});

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice.toFixed(2)
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice.toFixed(2), bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice.toFixed(2);

    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/checkout/checkout-success",
          "cancel_url": "http://localhost:3000/checkout/checkout-cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Guitar(s)",
                  "sku": "001",
                  "price": totalPrice,
                  "currency": "CAD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "CAD",
              "total": totalPrice
          },
          "description": "Guitars from GuitarPick"
      }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

    /*var didPaymentSucceed = Math.random()
    //FOR NOW
    if (didPaymentSucceed >= 0.5){
       //either of these two could work
       //res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-success')
     }
    else {
       //either of these two could work
       //res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-cancel')
    }
    */
});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;
    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;
