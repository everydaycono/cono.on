# Pages 테이블

Pages 테이블은 페이지 관리를 위한 정보를 저장합니다.

## 컬럼 목록

| 컬럼명         | 데이터 타입  | 기본값 | 설명                     |
| -------------- | ------------ | ------ | ------------------------ |
| page_id        | INT          |        | 고유한 페이지 ID         |
| title          | VARCHAR(255) |        | 페이지 제목              |
| content        | TEXT         |        | 페이지 컨텐츠            |
| parent_page_id | INT          | NULL   | 상위 페이지 ID (외래 키) |

## 외래 키

- parent_page_id: Pages(page_id) 참조

## ERD Diagram

<img src="./assets/ERD.png" alt="ERD" style="width: 300px;"/>
