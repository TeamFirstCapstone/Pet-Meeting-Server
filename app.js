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

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, './public')));
 
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

const user = require("./routes/user");

app.use("/", user); // routes에 user 외의 기능들이 추가되면 /user로 프론트와 함께 바꿀 것!
 
// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
  console.log("프로세스가 종료됩니다.");
});

app.on('close', function () {
console.log("Express 서버 객체가 종료됩니다.");
});

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
 });
 
 app.use( expressErrorHandler.httpError(404) );
 app.use( errorHandler );

 // Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});