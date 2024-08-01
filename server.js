const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

//Database(MySql) configulation
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "shopdee"
    }
)
db.connect()

//Middleware (Body parser)
app.use(express.json())
app.use(express.urlencoded ({extended: true}))


//Login
app.post('/api/login', function(req, res){
    const {username, password} = req.body
    const sql = 'SELECT * FROM customer WHERE username = ? AND password = ?'

    db.query(sql, [username, password], function(err, result){
        if(err) throw err
        
        if(result.length > 0){
            let customer = result[0]
            customer['message'] = "เข้าสู่ระบบสำเร็จ"
            customer['status'] = true

            res.send(customer)
        }else{
            res.send({"message":"กรุณาระบุรหัสผ่านใหม่อีกครั้ง", "status":false} )
        }        
    })    
} )



//Web server
app.listen(port, function() {
    console.log(`Example app listening on port ${port}`)
})
