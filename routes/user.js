const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()


// var pool = require('../loaders/mysql')

var pool_src = require('../config/index')
var mysql = require('mysql');
var pool = mysql.createPool(pool_src);

// var pool = require('../loaders/mysql')

// 로그인 처리 함수
// router.route('/process/login').post(function(req, res) {
router.route('/login').post(function(req, res) {
    // console.log('/process/login 호출됨.');

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
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                
                return;
            }
            
            // 조회된 레코드가 있으면 성공 응답 전송
            if (rows) {
                console.dir(rows);

                // 조회 결과에서 사용자 이메일 확인
                var email = rows[0].email;
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');
                res.write('<div><p>사용자 이름 : ' + paramUsername + '</p></div>');
                res.write('<div><p>사용자 이메일 : ' + email + '</p></div>');
                res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
                res.end();
            
            } else {  // 조회된 레코드가 없는 경우 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인  실패</h1>');
                res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
                res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
                res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
        res.end();
    }
    
});

// 사용자를 인증하는 함수
var authUser = function(username, password, callback) {
	console.log('authUser 호출됨 : ' + username + ', ' + password);
	
	// 커넥션 풀에서 연결 객체를 가져옴
	pool.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            callback(err, null);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
          
        var columns = ['username', 'password', 'email'];
        var tablename = 'user';
 
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where username = ? and password = ?", [columns, tablename, username, password], function(err, rows) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', username, password);
    	    	callback(null, rows);
            } else {
            	console.log("일치하는 사용자를 찾지 못함.");
    	    	callback(null, null);
            }
        });

        conn.on('error', function(err) {      
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);
            
            callback(err, null);
      });
    });
	
}

// 사용자 추가 라우팅 함수
// router.route('/process/adduser').post(function(req, res) {
router.route('/register').post(function(req, res) {
    // console.log('/process/adduser 호출됨.');

    var paramUsername = req.body.username || req.query.username;
    var paramPassword = req.body.password || req.query.password;
    var paramEmail = req.body.email || req.query.email;
    // var paramAge = req.body.age || req.query.age;
    
    console.log('요청 파라미터 : ' + paramUsername + ', ' + paramPassword + ', ' + paramEmail);
    
    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        addUser(paramUsername, paramPassword, paramEmail, function(err, addedUser) {
            // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
            if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                
                return;
            }
            
            // 결과 객체 있으면 성공 응답 전송
            if (addedUser) {
                console.dir(addedUser);

                console.log('inserted ' + result.affectedRows + ' rows');
                
                var insertUsername = result.insertUsername;
                console.log('추가한 레코드의 아이디 : ' + insertUsername);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가  실패</h2>');
                res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
    
});


//사용자를 등록하는 함수
var addUser = function(username, password, email, callback) {
    console.log('addUser 호출됨 : ' + username + ', ' + password + ', ' + email);
    
    // 커넥션 풀에서 연결 객체를 가져옴
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            
            callback(err, null);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        // 데이터를 객체로 만듦
        var data = {username:username, password:password, email:email};
        
        // SQL 문을 실행함
        var exec = conn.query('insert into petmeeting.user set ?', data, function(err, result) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (err) {
                console.log('SQL 실행 시 에러 발생함.');
                console.dir(err);
                
                callback(err, null);
                
                return;
            }
            
            callback(null, result);
            
        });
        
        conn.on('error', function(err) {      
                console.log('데이터베이스 연결 시 에러 발생함.');
                console.dir(err);
                
                callback(err, null);
        });
    });
    
}

module.exports = router
