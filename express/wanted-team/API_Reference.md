# API 목록

이 파일은 프로젝트에서 사용되는 API 목록을 제공합니다.

## GET (Breadcrumbs 반환)

### 1. root 의 Breadcrumbs 반환

- 엔드포인트: `GET /`
- 설명: notion api root 의 Breadcrumbs 를 반환 합니다.
- 반환 :
  1. breadcrumbs 정보
  2. 페이지 제목
  3. 페이지 컨텐츠
  4. 서브페이지 리스트.

### 2. 해당 id 의 Breadcrumbs 반환

- 엔드포인트: `GET /:id`
- 설명: notion api id 의 Breadcrumbs 를 반환 합니다.
- 반환 :
  1. breadcrumbs 정보 : _ex["Wanted","notion-api","sub-breadcrumbs"]_
  2. 페이지 제목 : sub-breadcrumbs
  3. 페이지 컨텐츠 : sub-breadcrumbs content
  4. 서브페이지 리스트

### 3. root 에 페이지 생성

- 엔드포인트: `POST /`
- 설명: notion api root 페이지에 서브페이지를 생성.
- 반환 :
  1. message : "Page Created successfully"

### 4. id page 에 서브 페이지 생성

- 엔드포인트: `POST create/:id`
- 설명: notion id 페이지에 서브페이지를 생성 :id.
- 반환 :
  1. message : "Sub Page Created successfully"

### 5. pages 전체 삭제

- 엔드포인트: `DELETE /delete`
- 설명: notion 페이지 전체 삭제
- 반환 :
  1. message : "Delete successfully"
