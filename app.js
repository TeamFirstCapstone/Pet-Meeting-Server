// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();

// 설정 파일에 들어있는 port 정보 사용하여 포트 설정
app.set('port', process.env.PORT || 4000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// // public 폴더를 static으로 오픈
// app.use('/public', static(path.join(__dirname, './public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

var cors = require('cors')

app.use(cors())

// const indexRouter = require("./routes/index");
const user = require("./routes/user");
const {loaders} = require("./loaders/index");

// const { mysqlConnection } = loaders({ expressApp: app });

// app.use("/", indexRouter);
app.use("/", user); // /user로 프론트와 함께 바꿀 것!

// app.listen(process.env.PORT, (err) => {
//   if (err) console.log(err);
//   else console.log(`Your server is ready on port ${process.env.PORT}`);
// });

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});
 