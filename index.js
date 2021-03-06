var express = require('express');
var app = express();

var fortune = require('./lib/fortune');

//set handlebars view-engine
var handlebars = require('express-handlebars')
    .create({
        defaultLayout:'main',
        helpers:{
            section:function (name,options) {
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

//disable 'x-powered-by' value in the response body
app.disable('x-powered-by');

//set static resources path
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

//test page
app.use(function (req,res,next) {
    res.locals.showTests = app.get('env') !== 'production' &&
            req.query.test === '1';
    next();
});

app.get('/',function(req,res){
    res.render('home');
});

app.get('/about',function(req,res){
    res.render('about',{
        fortune:fortune.getFortune(),
        pageTestScript:'/qa/tests-about.js'
    });
});

app.get('/tours/hood-river',function (req,res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate',function (req,res) {
    res.render('tours/request-group-rate');
});

app.get('/nursery-rhyme',function (req,res) {
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function (req,res) {
   res.json({
       animal:'squirrel',
       bodyPart:'tail',
       adjective:'bushy',
       noun:'heck'
   })
});

function getWeatherData() {
    return {
        locations:[
            {
                name:'Portland',
                forecastUrl:'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl:'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather:'Overcast',
                temp:'54.1 F (12.3 C)'
            },
            {
                name:'Bend',
                forecastUrl:'http://www.wunderground.com/US/OR/Bend.html',
                weather:'Partly Cloudy',
                temp:'55.0 F (12.8 C)'
            },
            {
                name:'Manzanita',
                forecastUrl:'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl:'http://icons-ak.wxung.com/ic/c/k/rain.gif',
                weather:'Light Rain',
                temp:'55.0 F (12.8 C)'
            }
        ]
    }
}

app.use(function (req,res,next) {
   if(!res.locals.partials) res.locals.partials = {};
   res.locals.partials.weather = getWeatherData();
   next();
});

//404 catch-all Processor
app.use(function(req,res){
    res.status(404);
    res.render('404');
});
//500 catch-all Processor
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});