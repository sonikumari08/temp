var http = require('http');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
 const flash = require('connect-flash');
const session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fs = require('fs')
const handlebars = require('express-handlebars');
var expressValidator = require('express-validator');
const passport = require('passport');
const config = require('./config/database');




var app = express();

//passport config
require('./config/passport')(passport);

var categories = require('./models/category.js');
var chat = require('./models/chat.js');
var notification = require('./models/notification.js');
var order = require('./models/order.js');
var orderHistory = require('./models/orderHistory.js');
var payment = require('./models/payment.js');
var paymentHistory = require('./models/paymentHistory.js');
var service = require('./models/service.js');
var userprofile = require('./models/userprofile.js');
var users = require('./models/user.js');



mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);


// connect mongoose
const db = 'mongodb://localhost:27017/savetax'; 



mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

categories.createCollection();
chat.createCollection();
notification.createCollection();
order.createCollection();
orderHistory.createCollection();
payment.createCollection();
paymentHistory.createCollection();
service.createCollection();
userprofile.createCollection();
users.createCollection();


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//body parse
app.use(express.urlencoded({extended: false}));

//express session
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// global vars

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

});
    // app.get('/views' , function(req,res){
    //   categories.find({} , function(err , docs){
    //     if(err) res.json(err);
    //     else res.render('category.html',{categories:docs})

//   });
// });
app.use(expressValidator());  //this line to be addded
app.use(jsonParser);
app.use(urlencodedParser);
app.use(router);
var port = 9000;
app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views"
}));
app.listen(port, function() {
    console.log('start at port ' + port);
});
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');






// login and registration
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/category', require('./routes/category'));

// admin dashboard // routes


//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');



app.get('/dashboard', function(req, res) {
    res.render('./dashboard/admin/index2.hbs'); // or res.render('index.ejs');
});

app.get('/login', function(req, res) {
    res.render('login.hbs', { title: "Login" }); // or res.render('index.ejs');
});
// app.post('/login', function(req, res) {
//     if (req.body.email &&
//         req.body.username &&
//         req.body.password &&
//         req.body.passwordConf) {
//         var userData = {
//                 email: req.body.email,
//                 username: req.body.username,
//                 password: req.body.password,
//             }
//             use schema.create to insert data into the db
//         User.create(userData, function(err, user) {
//             if (err) {
//                 return res.send(err)
//             } else {
//                 return res.send('logged in');
//             }
//         });
//     }
//     or res.render('index.ejs');
// });




app.get('/index', function(req, res) {
    res.render('./dashboard/admin/index.html'); // or res.render('index.ejs');
});

app.get('/registration', function(req, res) {
    res.render('registration.hbs'); // or res.render('index.ejs');
});
// app.get('/dashboard', function (req, res) {
//   res.render('index2'); // or res.render('index.ejs');
// });





app.get('/adpage', function(req, res) {

    res.render('./dashboard/admin/adpage.hbs');
});
app.get('/analytic', function(req, res) {

    res.render('./dashboard/admin/analytic.hbs');
});
app.get('./dashboard/category', function(req, res) {

    res.render('./dashboard/admin/category.hbs');
});

app.get('views/index', function(req, res) {
    index.find({}, function(err, docs) {
        if (err) res.json(err);
        else res.render('./views/index.hbs', { title: "Index" })
    });
});

//admin 



app.get('/blog', function(req, res) {
    res.render('./dashboard/admin/editblog.hbs'); // or res.render('index.ejs');
});


app.get('/contact', function(req, res) {
    res.render('./dashboard/admin/contact.hbs'); // or res.render('index.ejs');
});
app.get('/helpdesk', function(req, res) {
    res.render('./dashboard/admin/helpdesk.hbs'); // or res.render('index.ejs');
});
app.get('/pressrelease', function(req, res) {
    res.render('./dashboard/admin/pressrelease.hbs'); // or res.render('index.ejs');
});
app.get('/about', function(req, res) {
    res.render('./dashboard/admin/about.hbs'); // or res.render('index.ejs');
});

app.get('/notification', function(req, res) {
    res.render('./dashboard/admin/notification.hbs'); // or res.render('index.ejs');
});


app.get('/shop_and_establishment_Registration', function(req, res) {
    res.render('./dashboard/admin/services/shopANDestablishment.hbs'); // or res.render('index.ejs');
});
app.get('/SSI/MSME_Registration', function(req, res) {
    res.render('./dashboard/admin/services/msme.hbs'); // or res.render('index.ejs');
});
app.get('/importer/exporter_Code', function(req, res) {
    res.render('./dashboard/admin/services/importerCode.hbs'); // or res.render('index.ejs');
});
app.get('/ISO_Certification', function(req, res) {
    res.render('./dashboard/admin/services/ISO.hbs'); // or res.render('index.ejs');
});
app.get('/Trade_License', function(req, res) {
    res.render('./dashboard/admin/services/trade.hbs'); // or res.render('index.ejs');
});
app.get('/NGO', function(req, res) {
    res.render('./dashboard/admin/services/NGO.hbs'); // or res.render('index.ejs');
});
app.get('/Trademark_Registration', function(req, res) {
    res.render('./dashboard/admin/services/trademark.hbs'); // or res.render('index.ejs');
});
app.get('/Account', function(req, res) {
    res.render('./dashboard/admin/services/accounts.hbs'); // or res.render('index.ejs');
});
app.get('/Copyrights', function(req, res) {
    res.render('./dashboard/admin/services/copyright.hbs'); // or res.render('index.ejs');
});
app.get('/Web_And_App', function(req, res) {
    res.render('./dashboard/admin/services/web-and-app.hbs'); // or res.render('index.ejs');
});
app.get('/Name_Change', function(req, res) {
    res.render('./dashboard/admin/services/nameChange.hbs'); // or res.render('index.ejs');
});
app.get('/Will_Probate', function(req, res) {
    res.render('./dashboard/admin/services/will.hbs'); // or res.render('index.ejs');
});
app.get('/Legal_Heir', function(req, res) {
    res.render('./dashboard/admin/services/legalHeir.hbs'); // or res.render('index.ejs');
});
app.get('/Succession', function(req, res) {
    res.render('./dashboard/admin/services/succession.hbs'); // or res.render('index.ejs');
});
app.get('/Relinquish', function(req, res) {
    res.render('./dashboard/admin/services/relinquish.hbs'); // or res.render('index.ejs');
});
app.get('/Public', function(req, res) {
    res.render('./dashboard/admin/services/public.hbs'); // or res.render('index.ejs');
});
app.get('/PropertyVerify', function(req, res) {
    res.render('./dashboard/admin/services/propertyVerify.hbs'); // or res.render('index.ejs');
});
app.get('/propertyRegistration', function(req, res) {
    res.render('./dashboard/admin/services/propertyReg.hbs'); // or res.render('index.ejs');
});
app.get('/MoneyRecovery', function(req, res) {
    res.render('./dashboard/admin/services/moneyRecovery.hbs'); // or res.render('index.ejs');
});
app.get('/GenderChange', function(req, res) {
    res.render('./dashboard/admin/services/genderChange.hbs'); // or res.render('index.ejs');
});
app.get('/Conjugal', function(req, res) {
    res.render('./dashboard/admin/services/conjugal.hbs'); // or res.render('index.ejs');
});
app.get('/Complaints', function(req, res) {
    res.render('./dashboard/admin/services/complaine.hbs'); // or res.render('index.ejs');
});
app.get('/Caste', function(req, res) {
    res.render('./dashboard/admin/services/caste.hbs'); // or res.render('index.ejs');
});
app.get('/CaveatPetition', function(req, res) {
    res.render('./dashboard/admin/services/CaveatPetition.hbs'); // or res.render('index.ejs');
});


//fetch data from db into category.ejs

app.get('/dashboard/category', function(req, res) {
    categories.find({}, function(err, docs) {
        if (err)
            res.json(err);
        else
            res.render('./dashboard/admin/category.hbs', { categories: docs })
    });
});
// Create a new category
//  app.post('/dashboard/category', (req, res) => {
//     console.log(req.body)
//   })

app.post('/dashboard/category', function(req, res) {
    if (req.body.id &&
        req.body.name &&
        req.body.parent_id) {
        var userData = {
                id: req.body.id,
                name: req.body.name,
                parent_id: req.body.parent_id,

            }
            //use schema.create to insert data into the db
        User.create(userData, function(err, user) {
            if (err) {
                return res.send(err)
            } else {
                return res.send('saved');
            }
        });
    }
    // or res.render('category.ejs');
});


app.get('/dashboard/customer', function(req, res) {
    res.render('./dashboard/customer/customerpage.hbs'); // or res.render('index.ejs');
});


app.get('/customer/profile', function(req, res) {
    res.render('./dashboard/customer/pro.hbs'); // or res.render('index.ejs');
});