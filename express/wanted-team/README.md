# [팀 과제] 노션에서 브로드 크럼스(Breadcrumbs) 만들기

## 소개

<p>
이 프로젝트는 [팀 과제] 노션에서 브로드 크럼스(Breadcrumbs) 만들기와 관련된 내용입니다.<br>
목표는 노션과 유사한 페이지 관리 API를 구현하는 것이며, 각 페이지에는 제목, 컨텐츠 및 서브 페이지가 포함됩니다.<br>
또한 특정 페이지에 대한 브로드 크럼스 정보를 반환합니다.
</p>

## 설치 및 사용법

아래 단계를 따라 프로젝트를 설치하고 사용할 수 있습니다.

1. 프로젝트를 클론합니다.
2. 필요한 package 설치합니다.

   ```bash
   npm install
   ```

3. db 실행 (docker-compose)

   ```bash
   docker compose up
   ```

4. 프로젝트를 실행합니다.

   ```bash
   npm run start
   ```

## 테이블 구조

pages 테이블은 페이지 관리를 위한 정보를 저장합니다.

### 컬럼 목록

| 컬럼명         | 데이터 타입  | 기본값 | 설명                     |
| -------------- | ------------ | ------ | ------------------------ |
| page_id        | INT          |        | 고유한 페이지 ID         |
| title          | VARCHAR(255) |        | 페이지 제목              |
| content        | TEXT         |        | 페이지 컨텐츠            |
| parent_page_id | INT          | NULL   | 상위 페이지 ID (외래 키) |

### 외래 키

- parent_page_id: Pages(page_id) 참조

### ERD Diagram

<img src="./assets/ERD.png" alt="ERD" style="width: 300px;"/>

## 기능 목록

이 프로젝트의 기능 목록은 다음과 같습니다:

- 페이지 관리 API 구현
- 페이지는 제목, 컨텐츠 및 서브 페이지를 가질 수 있음
- 특정 페이지에 대한 브로드 크럼스 정보 반환
- 자세한 API 목록은 [API_Reference.md](API_Reference.md) 에서 확인할수 있습니다.

## 접근 방법

- 현재 page 에서 부모와 연결되어있는 row 를 찾고 부모가 없을때 까지 반복을 하여 breadcrumbs 를 받아오기.
- 어플리케이션에서 반복적으로 구현 가능하겟지만 sql 에서 반복적으로 가능한지 찾아봄.
- recursive 를 사용하면 반복적으로 쿼리를 작업할수있음.

## 피드백

- 쿼리 부분 에서 with recursive sql 을 사용해서 접근 다른 방법은 무엇이 있었을까

#### 참고자료

- [스택오버플로우](https://stackoverflow.com/questions/20215744/how-to-create-a-mysql-hierarchical-recursive-query) 링크
- [recursive 참고](https://learnsql.com/blog/sql-recursive-cte/) 링크
