# Django

#### 일단 Django 서버 켜야 합니다!
viss_backend directory에서 (manage.py가 있는 directory)

    python manage.py runserver

실행 후, 아래와 같은 화면이 터미널에 찍히면 성공 !

    Watching for file changes with StatReloader
    Performing system checks...

    WS_secured server: ws://127.0.0.1:3001
    WS_unsecured server: ws://127.0.0.1:3002
    System check identified no issues (0 silenced).
    August 17, 2021 - 22:52:07
    Django version 3.2.4, using settings 'testdjango.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.

# nodeJs - Websocket

nodeJS 깔려있어야 합니당
https://nodejs.org/ko/ 고고

    npm install -g create-react-app
    npm run start

=> react 서버가 실행될 거에용

npm run start에서 
>react-scripts 은(는) 내부 또는 외부 명령 실행할 수 있는 프로그램 또는 배치 파일이 아닙니다

라는 에러가 뜬다면, https://thespoiler.tistory.com/21 링크대로 해보시기 !

-------------------------------------------------------------------------------------------

### 자동으로 실행된 브라우저에 *여러 버튼*과 아래 *회색 RESPONSE 영역*이 뜨고 F12의 console창에 여러 *warning*과 함께
    connection established
라는 로그가 뜨면 장고 서버와 연결 성공 !