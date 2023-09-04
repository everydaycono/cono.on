CREATE TABLE
    IF NOT EXISTS pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        parent_page_id INT DEFAULT NULL
    );

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (1, 'A', '페이지 A', NULL);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (2, 'B', '페이지 B', NULL);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (3, 'C', '페이지 C', NULL);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (4, 'Apple', 'Apple', 1);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (5, 'Armond', 'Armond', 1);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (6, 'Banana', 'Banana', 2);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (7, 'Benz', 'Benz page', 2);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (8, 'Apple watch', 'apple watch', 4);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (9, 'Apple mango', 'apple mango', 4);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (10, 'Apple hip', 'apple hip', 4);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (11, 'Armond chocolate', 'Armond', 5);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (12, 'Armond nugget', 'Armond nugget', 5);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (13, 'S1', 'apple watch 1', 8);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (14, 'S2', 'apple watch 2', 8);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (15, 'S3', 'apple watch 3', 8);

INSERT INTO
    pages (id, title, content, parent_page_id)
VALUES
    (16, 'S4', 'apple watch 4', 8);