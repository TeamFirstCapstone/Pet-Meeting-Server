# Pet-Meeting-Server
Backend of Pet Meeting
이 레포지토리는 최종 작업 레포지토리가 아닙니다
https://github.com/TeamFirstCapstone/Pet-Meeting-Server-1/ 가 최종 레포지토리입니다.

# 기술 스택
 Docker
 Node.js
 Express
 MySQL
 Redis
 JEST(서버 클라이언트 테스트 모두 본인이 진행)
 서버와 WAS 차이 담는 이미지
 https://user-images.githubusercontent.com/46518769/103343021-5f72a780-4ace-11eb-9903-ca087f1b058b.png
 웹서버로 Nginx이용, Nginx는 WAS 아님 
 인스턴스는 Amozon elasticbeanstalk 이용
 
# Postman API
 RESTful 원칙으로 설계
 프론트엔드와 협업을 위해 쓴 API 문서 링크 

https://documenter.getpostman.com/view/9643962/TVmHDf39

# DB 구조

<img src="https://user-images.githubusercontent.com/46518769/103257024-dc205b80-49d2-11eb-9134-4ec95f456bb3.png" width="80%"> </img>
 

__test__: For unit tests. Jest will detect automatically.

1 api: For OAuth or something.

2 config: This folder is not in github. Because this folder includes some amount of secret keys.

3 loaders: It is used for making essential function file clear. All predefined codes are on this folder.

4 models: For connecting database. Requesting data to DB and making object from received data.

5 node_moudles: this folder must not be uploaded on github. Check .gitignore

6 Routes: express.router!

7 services: specific business function must be included. We make unit test code only for functions in services folder 

# Redis를 사용한 이유
socket.io만으로는 힘든 양방향 채팅을 구현하기 

## 코드 리팩토링 시 개선 방향

Prisma로 GraphQL 도입해보기
risma는 어플리케이션에서 요청하는 모델을 graphql로 정의할 수 있다는 장점을 가지고 있습니다. Prisma는 전통적인 ORM들을 대체하고 데이터 베이스들의 workflow를 간단하게 만들어주기에 도입을 고민 중입니다. 


