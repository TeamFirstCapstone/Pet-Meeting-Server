const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
var mysql = require('mysql');

var pool = require('../loaders/pool')

// var pool_option = require('../config/pool_option')
// var pool = mysql.createPool(pool_option)

var authUser = require('../functions/authUser')
var addUser = require('../functions/addUser')

// 로그인 처리 함수
router.route('/login').post(function(req, res) {

    // 요청 파라미터 확인
    var paramUsername = req.body.username || req.query.username;
    var paramPassword = req.body.password || req.query.password;
    
    console.log('요청 파라미터 : ' + paramUsername + ', ' + paramPassword);
    
    // pool 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
    if (pool) {
        authUser(paramUsername, paramPassword, function(err, rows) {
            // 에러 발생 시, 클라이언트로 에러 전송
            if (err) {
                console.error('사용자 로그인 중 에러 발생 : ' + err.stack);
                
                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                // res.write('<p>' + err.stack + '</p>');
                // res.end();
                
                return;
            }
            
            // 조회된 레코드가 있으면 성공 응답 전송
            if (rows) {
                console.dir(rows);

                // 조회 결과에서 사용자 이메일 확인
                var email = rows[0].email;
                
                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h1>로그인 성공</h1>');
                // res.write('<div><p>사용자 이름 : ' + paramUsername + '</p></div>');
                // res.write('<div><p>사용자 이메일 : ' + email + '</p></div>');
                // res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
                // res.end();
            
            } else {  // 조회된 레코드가 없는 경우 실패 응답 전송
                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h1>로그인  실패</h1>');
                // res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
                // res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
                // res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        // res.write('<h2>데이터베이스 연결 실패</h2>');
        // res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
        // res.end();
    }
    
});



// 사용자 추가 라우팅 함수
router.route('/signup').post(function(req, res) {

    const today = new Date()

    var paramUsername = req.body.username || req.query.username;
    var paramPassword = req.body.password || req.query.password;
    var paramEmail = req.body.email || req.query.email;
    var paramPhone = req.body.phone || req.query.phone;
    // var paramCreated = today;
    
    console.log('요청 파라미터 : ' + paramUsername + ', ' + paramPassword 
    + ', ' + paramEmail + ', ' +paramPhone );
    
    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        addUser(paramUsername, paramPassword, paramEmail,paramPhone, function(err, addedUser) {
            // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
            if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h2>사용자 추가 중 에러 발생</h2>');
                // res.write('<p>' + err.stack + '</p>');
                // res.end();
                
                return;
            }
            
            // // 결과 객체 있으면 성공 응답 전송
            if (addedUser) {
                console.dir(addedUser);

                // console.log('inserted ' + result.affectedRows + ' rows');
                
                // var insertUsername = result.insertUsername;
                // console.log('추가한 레코드의 아이디 : ' + insertUsername);
                
                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h2>사용자 추가 성공</h2>');
                // res.end();
            } else {
                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h2>사용자 추가  실패</h2>');
                // res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        // res.write('<h2>데이터베이스 연결 실패</h2>');
        // res.end();
    }
    
});

module.exports = router