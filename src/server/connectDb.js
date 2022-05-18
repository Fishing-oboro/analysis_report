  const express = require('express');
  const mysql = require('mysql2');
  const app = express();
  const port = process.env.PORT || 4000;

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'testuser001',
    password: 'Analysis-Report0904',
    database: 'analysis_report'
  });

  app.get('/message', (req, res) => {
    res.json(req.params);
  })

  app.get('/api', (req, res) => {
    connection.query(
      'select * from `test`',
      function(err, results, fields){
        if(err){
          console.log('error');
        }
        res.json({message: results[0].title});
      }
    );
    console.log('success');
  });

  app.get('/user', (req, res) => {
    
    connection.query(
      'select * from `user` where (name=? or email=?) and pass=?',
      [req.query.user_name, req.query.email, req.query.pass],
      function(err, results, fields){
        if(err){
          console.log('error');
        }
        res.json(results);
      }
    );
    console.log('success');
  });

  app.get('/:user_id/subject', (req, res) => {
    const user_id = req.params['user_id'];
    connection.query(
      'select * from `subject` where id in (select subject_id from `user_subject` where user_id=? )',
      [user_id],
      function(err, results, fields){
        if(err){
          console.log('error');
        }
        res.json(results);
      }
    );
    console.log('success');
  });

  app.get('/:subject_id/report', (req, res) => {
    const subject_id = req.params['subject_id'];
    connection.query(
      'select * from `report` where subject_id=?',
      [subject_id],
      function(err, results, fields){
        if(err){
          console.log('error');
        }
        res.json(results);
      }
    );
    console.log('success');
  });

  app.get('/:user_id/:report_id/data', (req, res) => {
    const user_id = req.params['user_id'];
    const report_id = req.params['report_id'];
    connection.query(
      'select json_text from `user_report` where user_id=? and report_id=?',
      [user_id, report_id],
      function(err, results, fields){
        if(err){
          console.log('error');
        }
        res.json(results);
      }
    );
    console.log('success');
  });

  app.listen(port, () => {
    console.log(`listening on *:${port}`);
  })

  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // });


  // ubuntuで利用
  // /etc/init.d/mysql restart
  // react側で利用
  // fetch("http://localhost:4000/posts")
  //     .then(response => response.json())
  //     .then(posts => this.setState({ posts }));
  // posts.data

