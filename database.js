const express = require("express")
const app = express()
const http = require('http');
const server = http.createServer(app);
const port = 4000
const cors = require("cors")
const { Server } = require("socket.io");
const io = new Server(server);

const sqlite3 = require("sqlite3").verbose();
let sql;

//connect to DB 
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) return console.error(err.message);
});

//Create table
// sql = 'CREATE TABLE players(id INTEGER PRIMARY KEY, name, experience, team, avg_rating, no_of_ratings)';
// db.run(sql);


//Drop table
// db.run("DROP TABLE players")


// Insert data into table
// sql = 'INSERT INTO players(name, experience, team, avg_rating, no_of_ratings) VALUES(?,?,?,?,?)';
// db.run(
//     sql,
//     ["Rishabh Pant", 4, "DC", 4.7, 20],
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// );


//Update data
// sql = "DELETE FROM players WHERE name = ? and id > ?";
// db.run(sql, ["Rishabh Pant" , 5], (err) => {
//     if (err) return console.error(err);
// });

//Query the data


io.on('connection', (socket) => {
    console.log('a user connected');
  });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// app.get("/home", cors(), async (req, res) => {
// 	res.send("This is the data for the home page")
// })
app.get("/", cors(), async (req, res) => {
    var listplayers = [];
    sql = "SELECT * FROM players";
    db.all(sql, [], (err, rows) => {
    if(err) return console.error(err.message);
    rows.forEach((row) => {
        listplayers.push(row);
    });
    res.send(JSON.stringify(listplayers))
});
	
})


app.post("/post_rate", async (req, res) => {
	let { skey, rate } = req.body
    var pdata = [];
    sql = "SELECT * FROM players WHERE name = ?";
    db.all(sql, [skey], (err, rows) => {
        if(err) return console.error(err.message);
        rows.forEach((row) => {
            pdata.push(row);
        });
        
    var uprate = (pdata[0].no_of_ratings*pdata[0].avg_rating + parseInt(rate))/(pdata[0].no_of_ratings+1)
    uprate = Math.round(uprate * 10)/10
    console.log(uprate, pdata[0].no_of_ratings+1)
    sql = "UPDATE players SET avg_rating = ?, no_of_ratings = ? WHERE name = ?";
    db.run(sql, [uprate, pdata[0].no_of_ratings+1, skey ], (err) => {
    });
    db.close
        });
    
 
    
//     sql = "UPDATE players SET rating = ? WHERE name = ?";
// db.run(sql, [skey , 5], (err) => {
//     if (err) return console.error(err);
// });

})
let detail = [];

app.get("/home", cors(), async (req, res) => {
    res.send(detail)
})

app.post("/post_name", async (req, res) => {
	let { sk} = req.body
    console.log(sk);
    detail = [];
    q1 = "SELECT * FROM players WHERE name = ?";
    db.all(q1, [sk], (err, rows) => {
        if(err) return console.error(err.message);
        rows.forEach((row) => {
            detail.push(row);
        });
        console.log(detail);
    });
})

server.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})