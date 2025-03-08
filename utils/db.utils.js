const mysql = require('mysql2');

// MySQL connection
// const appDb = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'fcm'
// });

const appDb = mysql.createConnection({
    host: 'localhost',
    user: 'littsvcc_user_debopam_root',
    password: '1cH_=emIAIPh',
    database: 'littsvcc_fcm_push'
});

try {
    appDb.connect(err => {
        if (err) {
            console.error('Database connection failed:', err.stack);
            return;
        }
        console.log('Connected to Database.');
    });
} catch (err) {
  console.error(err);
  process.exit(1);
}

module.exports = { appDb };
