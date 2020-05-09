var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

Product.remove({}, function(err){ //remove existing product documents
  if(err) {
     console.log('ERROR: Remove failed')
     return
   }

var products = [

    new Product({
        imagePath   : 'https://www.long-mcquade.com/files/16869/xmd_LesPaulCstmPRO_EB_Splash.jpg.pagespeed.ic.DdrY7IO0ge.webp',
        title       : 'Epiphone LP Custom Pro',
        description : 'Midnight Black electric guitar',
        price       : 769.95
    }),
    new Product({
        imagePath   : 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/i/b/ibanez-grx20-ca-candy-apple-electric-guitar.jpg',
        title       : 'Ibanez GRX20-CA',
        description : 'Candy apple electric guitar',
        price       : 319.99
    }),
    new Product({
        imagePath   : 'https://www.long-mcquade.com/files/14928/md_0145102332_frt_wlg_001.jpg',
        title       : 'Fender Standard Tele',
        description : 'Maple Neck in Brown Sunburst',
        price       : 779.99
    }),
    new Product({
        imagePath   : 'https://www.long-mcquade.com/files/94620/md_7b6f45f7ef325dbc066bb3a70c1602ff.JPG',
        title       : 'Paul Reed Smith',
        description : 'SE Santana Standard Electric Guitar - Vintage Cherry',
        price       : 649.95
    }),
    new Product({
        imagePath   : 'https://www.long-mcquade.com/files/3613/md_0303025507_xl.jpg',
        title       : 'Squier Classic Vibe 50s Tele',
        description : 'Vintage Blonde - 1950s fave guiter with its versatile sound, ease of playing and reasonable cost.',
        price       : 519.99
    }),
    new Product({
        imagePath   : 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/i/b/ibanez-rgix6fdlb-iron-label-northern-lights-burst-2018_1.jpg',
        title       : 'Ibanez RGIX6FDLB Iron Label Northern Lights Burst',
        description : 'The ergonomics are pure, brilliant Ibanez, with three-piece Nitro Wizard neck and rock solid Gibraltar Standard II bridge.',
        price       : 1239.99
    }),
    new Product({
        imagePath   : 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/g/u/guild-jetstar-seafoam-green-front.jpg',
        title       : 'Guild Jetstar Seafoam Green',
        description : 'Solid mahogany body, Jetstar shape, Gloss Sea Foam Green Polyurethane finish, twin LB-1 pickups, Tune-O-Matic bridge, Vintage Style Nickel tuners',
        price       : 819.99
    }),
    new Product({
        imagePath   : 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/f/e/fender_eric_johnson_thinline_stratocaster_vintage_white.jpg',
        title       : 'Fender Eric Johnson Thinline Stratocaster Vintage White',
        description : 'The Fender Eric Johnson Thinline Stratocaster is here presented in beautiful Vintage White. This particular example plays and feels beautiful.',
        price       : 2198.95
    }),
    new Product({
        imagePath   : 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/r/e/reverend-airsonic-hb-metallic-silver-freeze-front.jpg',
        title       : 'Reverend Airsonic HB Metallic Silver Freeze',
        description : 'The latest product of Reverends constant drive for innovation, the Airsonic HB in Metallic Silver Freeze blends the sustain of a solid body with the rich tone of a semi-acoustic.',
        price       : 1319.99
    }),
    new Product({
        imagePath   : 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/s/u/supro-2030ts-hampton-flame-maple-tobacco-sunburst-front.jpg',
        title       : 'Supro 2030TS Hampton Flame Maple Tobacco Sunburst',
        description : 'A stunning modern take on the classic 1960s Supro electric guitar. The mighty reproduction gold foil pickups provide the guitars sonic signature, while the flame maple sunburst top ensures it will stand out on any stage. ',
        price       : 579.98
    })
];

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result) {
        if (i === products.length - 1){
            exit();
        }
    });
  }
})

var newUser = new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Cuneyt Celebican',
    admin       : true
});
var newUser1 = new User({
    username    : 'bart@bart.com',
    password    : 'EatMyShorts',
    fullname    : 'Bart Simpson',
    admin       : false
});
var newUser2 = new User({
    username    : 'homer@homer.com',
    password    : 'Doh!',
    fullname    : 'Homer Simpson',
    admin       : false
});
User.createUser(newUser, function(err, user){
    if(err) throw err;
    console.log(user);
});
User.createUser(newUser1, function(err, user){
    if(err) throw err;
    console.log(user);
});
User.createUser(newUser2, function(err, user){
    if(err) throw err;
    console.log(user);
});

function exit() {
    mongoose.disconnect();
}
