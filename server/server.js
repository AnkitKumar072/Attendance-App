import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(cors(
    {
        origin:["http://localhost:5173"],
        methods: ["POST","GET","PUT","DELETE"],
        credentials: true  
    }  
));


app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));  


const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "signup"
})

const storage = multer.diskStorage({
    destination: (res,file,cb) =>{
        cb(null,'public/image')
    },
    filename: (req,file,cb) =>{
        cb(null,file.fieldname + "_"+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function(err){
    if(err){
        console.log("Error in connection:");
    }else{
    console.log("connected");
    }
})


app.get('/getEmployee', (req,res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err,result) => {
        if(err) return res.json({Error : "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/get/:id',(req, res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?";
    con.query(sql, [id], (err,result) =>{
        if(err) return res.json({Error : "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/update/:id', (req, res) =>{
const id = req.params.id;
const { attendance, name, email, enrollment } = req.body; // Assuming these fields are sent in the request body
const sql = "UPDATE employee SET attendance = ?, name = ?, email = ?, enrollment = ? WHERE id = ?";
con.query(sql, [attendance, name, email, enrollment, id], (err, result) => {
    if (err) return res.json({ Error: "Update employee error in SQL" });
    return res.json({ Status: "Success" });
});
})

app.delete('/delete/:id',(req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee  WHERE id = ?"
    con.query(sql,[id], (err,result) => {
     if(err) return res.json({Error : "delete employee error in sql"});
     return res.json({Status: "Success"})
    })
})

const verifyUser = (req,res,next) => {
    const token  = req.cookies.token;
    if(!token){
        return res.json({Error: "You are not Authenticated"});
    }else{
        jwt.verify(token, "jwt-secret-key",(err,decoded) =>{
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        })
    }

}

app.get('/dashboard',verifyUser,(req,res) => {
    console.log(req.role, req.id);
 return res.json({Status: "Success",role : req.role, id: req.id})
})

app.get('/adminCount', (req, res) => {
    const sql = "SELECT count(id) as admin FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    });
});

app.get('/employeeCount', (req, res) => {
    const sql = "SELECT count(id) as employee FROM employee WHERE attendance LIKE 'P%'";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    });
});

app.get('/presentCount', (req, res) => {
    const sql = "SELECT count(id) as presentCount FROM employee WHERE attendance LIKE 'A%'";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    });
});

app.post('/login',(req,res) =>{
    const sql = "SELECT * FROM users Where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err,result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0){
            const id = result[0].id;
            console.log(id);
            const token = jwt.sign({role:"admin"},"jwt-secret-key",{expiresIn: "1d"});
            res.cookie('token',token);  
            return res.json({Status: "Success"})
        }else{
          return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/employeelogin',(req,res) =>{
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err,result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0){
            const id = result[0].id;
            console.log(id);
            bcrypt.compare(req.body.password.toString(),result[0].password,(err,response) =>{
                if(response){
                    const token = jwt.sign({role :"employee",id: result[0].id},"jwt-secret-key",{expiresIn: "1d"});
                    res.cookie('token',token);  
                    return res.json({Status: "Success",id: result[0].id})
                } else{
                    return res.json({Error: "wrong email or password"})
                }
            })
        
        }else{
          return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

// app.get('/employee/:id',(req,res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee where id = ?";
//     con.query(sql, [id], (err,result) =>{
//         if(err) return res.json({Error : "Get employee error in sql"});
//         return res.json({Status: "Success", Result: result})
//     })
// })

app.get('/logout',(req,res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.post('/create',upload.single('image'), (req,res) =>{
   const sql = "INSERT INTO employee (`name`,`attendance`,`enrollment`,`password`,`email`,`image`) VALUES (?)";
   bcrypt.hash(req.body.password.toString(),10,(err,hash)=>{
    if(err)return res.json({Error: "Error in hashing password"});
    const values = [
         req.body.name,
         req.body.attendance,
         req.body.enrollment,
         hash,
         req.body.email,
         req.body.image
    ]
    console.log(req.body);
    con.query(sql,[values],(err,result) =>{
        if(err) return res.json({Error: err});
        // if(err) return res.json({Error: "Inside singup query"});
        return res.json({Status: "Success"});
    })
   })
})

app.listen(8081, ()=>{
    console.log("Running");
})