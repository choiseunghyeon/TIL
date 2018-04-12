# MiddleWare and some modules

**Description**

Today I Learned what middleware is and some modules(express-error-handler and cookie-parser)

**Node.js**

      //Express 기본 모듈
      let express = require('express')
        , http = require('http')
        , path = require('path');

      //Express 외장 모듈
      let bodyParser = require('body-parser')
        , static = require('serve-static')
        //라우터에서 찾지 못한 경로에 대해서 에러 메시지 출력 및 에러 페이지 응답
        , expressErrorHandler = require('express-error-handler')
        // 쿠키란 사용자 브라우저에 저장 되는 값이다. 쿠키를 설정 및 파싱 할 수 있음
        , cookieParser = require('cookie-parser');

      let app = express();

      //라우터 객체 참조
      let router = express.Router();

      //모든 router 처리 끝난 후 404 오류 페이지 처리
      let errorHandler = expressErrorHandler({
        static: {
          '404': './public/404.html'
        }
      });

      router.route('/showCookie').get(function(req,res){
        console.log('/showCookie 호출됨.');

        res.send(req.cookies);
      });
      router.route('/setCookie').get(function(req,res){
        console.log('/setCookie 호출됨.');

        //쿠키 설정
        res.cookie('user', {
          id:'choi',
          authorized: true
        });

        //redirect로 응답
        res.redirect('/showCookie');
      });


      //bodyParser를 사용해 application/x-www-form-urlencoded 파싱
      app.use(bodyParser.urlencoded({extended: false}));

      //bodyParser를 사용해 application/json 파싱
      app.use(bodyParser.json());

      app.use(static(path.join(__dirname,'public')));

      //쿠키 파싱
      app.use(cookieParser());

      app.use('/',router);

      //등록되지 않은 패스에 대한 페이지 오류 응답
      app.use( expressErrorHandler.httpError(404) );
      app.use( errorHandler )

      http.createServer(app).listen(3000, function(){
        console.log('익스프레스 서버를 시작했습니다. : ',3000);
      })

**What I Learned**

- middleware는 순차적으로 실행된다. 절차적 프로그래밍과 비슷하다. 
