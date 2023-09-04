import express from 'express';
import 'dotenv/config';
import connection from './db/config.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

/**
 * GET Root page
 *
 * home 은 서브페이지를 반환합니다.
 * title,content 는 Home Page 를 나타냄.
 */
app.get('/', (req, res) => {
  const query = `SELECT * FROM pages WHERE parent_page_id IS NULL`;

  connection.query(query, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(200).json();
    }
    res.status(200).json({
      breadScrumb: 'Home',
      title: 'Home Page',
      content: 'This is Home Page you can go to other pages with sub-pages',
      subPages: result.map((item) => item.id),
    });
  });
});

/**
 * GET Page by id
 *
 * sub 페이지 의 ID 를 입력하면
 * breadScrumb, title, content 을 리턴함
 */
app.get('/:pageId', (req, res) => {
  const { pageId } = req.params;
  const query = `
    WITH RECURSIVE PagePath AS (
      SELECT id, parent_page_id, content, title
      FROM pages
      WHERE id = ?

      UNION ALL

      SELECT p.id, p.parent_page_id, p.content, p.title
      FROM PagePath AS cp
      JOIN pages AS p ON cp.parent_page_id = p.id
    )
    SELECT id, title, content
    FROM PagePath;
  `;

  connection.query(query, [pageId, pageId], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Page Not Found',
      });
    }

    /**
     * get sub page
     */
    connection.query(
      `SELECT * FROM pages WHERE parent_page_id = ?`,
      [pageId],
      (err, subResult) => {
        if (err) throw err;

        if (subResult.length === 0) {
          console.log(result, '1');
          return res.status(200).json({
            title: result[0].title,
            content: result[0].content,
            breadScrumbPath: `root/${result
              .sort((a, b) => a.id - b.id)
              .map((item) => item.title)
              .join('/')}`,
            breadScrumb: result
              .sort((a, b) => a.id - b.id)
              .map((item) => item.title),
            subPages: 'no sub pages',
          });
        }

        console.log(2);
        res.status(200).json({
          title: 'Home Page',
          content: 'This is Home Page you can go to other pages with sub-pages',
          breadScrumbPath: result
            .sort((a, b) => a.id - b.id)
            .map((item) => item.title)
            .join('/'),
          breadScrumb: result
            .sort((a, b) => a.id - b.id)
            .map((item) => item.title),
          subPages: subResult.map((item) => item.id),
        });
      }
    );
  });
});

/**
 * Handle POST request to create a new page.
 * @param {string} title - The request object body
 * @param {string} content - The request object body
 */
app.post('/', (req, res) => {
  const query = `
  INSERT INTO pages (title, content) VALUES (?, ?)
  `;

  const { title, content } = req.body;
  const values = [title, content];
  connection.query(query, values, (err, result) => {
    if (err) throw err;
    res.send({
      message: 'Page Created successfully',
    });
  });
});

/**
 * Sub Page 에서 page 만들기.
 */
app.post('/create/:pageId', (req, res) => {
  const { pageId } = req.params;

  if (!pageId) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'pageId is required',
    });
  }

  // find db with pageId
  const isPageExistQuery = `SELECT * FROM pages WHERE id = ?`;
  connection.query(isPageExistQuery, [pageId], (err, result) => {
    if (err) throw err;

    /**
     * not  exist with  page id
     */
    if (result.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Page Not Found',
      });
    }

    // create sub page inside pageId
    const creteSubPageQuery = `
    INSERT INTO pages(title,content,parent_page_id) VALUES(?,?,?)
    `;

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'title, content is required',
      });
    }
    const values = [title, content, pageId];
    connection.query(creteSubPageQuery, values, (err, result) => {
      if (err) throw err;

      res.json({
        message: 'Sub Page Created successfully',
        subPageId: result.insertId,
      });
    });
  });
});

app.delete('/delete', (req, res) => {
  const query = `DELETE FROM pages;`;

  connection.query(query, (err, result) => {
    console.log(err);
    if (err) throw err;
    res.send({
      message: 'Delete successfully',
    });
  });
});

/**
 * Database Connection
 */
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  connection.query(
    `
    CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      content TEXT,
      parent_page_id INT DEFAULT NULL
    )    
    `,
    function (err, result) {
      if (err) throw err;
      console.log('Table created');
    }
  );
  app.listen(port, () => {
    console.log(
      `WELCOME TO NOTION BREADCRUMBS API ${process.env.BASE_URL}${port}`
    );
  });
});
