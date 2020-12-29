# Pet-Meeting-Server
Backend of Pet Meeting
# 기술 스택
 Docker
 Node.js
 Express
 MySQL
 Redis
 JEST
 
# Postman API
 RESTful 원칙으로 설계
https://documenter.getpostman.com/view/9643962/TVmHDf39

# DB 구조

https://user-images.githubusercontent.com/46518769/103257024-dc205b80-49d2-11eb-9134-4ec95f456bb3.png
 

__test__: For unit tests. Jest will detect automatically.

1 api: For OAuth or something.

2 config: This folder is not in github. Because this folder includes some amount of secret keys.

3 loaders: It is used for making essential function file clear. All predefined codes are on this folder.

4 models: For connecting database. Requesting data to DB and making object from received data.

5 node_moudles: this folder must not be uploaded on github. Check .gitignore

6 Routes: express.router!

7 services: specific business function must be included. We make unit test code only for functions in services folder 


## 코드 리팩토링 시 개선 방향

Prisma로 GraphQL 도입해보기
