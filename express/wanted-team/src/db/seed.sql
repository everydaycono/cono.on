CREATE TABLE
    pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        parent_page_id INT,
        FOREIGN KEY (parent_page_id) REFERENCES pages (id)
    );

INSERT INTO
    pages (title, content, parent_page_id)
VALUES
    ('목표', 'root 페이지 콘텐츠', NULL);

-- sub page A 추가
INSERT INTO
    pages (title, content, parent_page_id)
VALUES
    ('plan', '2023-09-03 subpage', 15);

-- sub page A-1 추가
INSERT INTO
    pages (title, content, parent_page_id)
VALUES
    ('A-1', 'A-1 페이지 콘텐츠', 2);

-- sub page A-1-a 추가
INSERT INTO
    pages (title, content, parent_page_id)
VALUES
    ('A-1-a', 'A-1-a 페이지 콘텐츠', 3);