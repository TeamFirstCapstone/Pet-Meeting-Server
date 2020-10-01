var pool = require('../loaders/pool')

// 사용자를 인증하는 함수
var authUser = function(username, password, callback) {
    console.log('authUser 호출됨 : ' + username + ', ' + password );
	
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
          
        var columns = ['username', 'password'];
        var tablename = 'User';
 
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

module.exports = authUser;