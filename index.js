var express=require('express');
var path = require('path');
const nodemailer=require("nodemailer");
const bodyParser=require("body-parser");
var app=express();

// Body Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "noumanarain0@gmail.com",
        pass: "03022106768"
    }
});

var mailOptions,msg;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.render('index',{msg:msg});
});

app.post('/',function(req,res){
    mailOptions={
        to : "noumanarain0@gmail.com",
        subject : req.body.subject,
        html : `<body style="background-color: #101b31">
        <div style="text-align: center; width: 100%; margin-right: auto; margin-left: auto;">
          <div style="color: white; border-radius: 6px;
              margin-top: 20px; margin-bottom: 30px; padding: 30px 30px;">
                <h3 style="color: white; font-size: 24px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Hi Nouman this mail is receiving from your portfolio,</h3>
                <br>
                <h3 style="color: white ;font-size: 23px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Name : ${req.body.name}</h3>
                <h3 style="color: white ;font-size: 23px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Email : ${req.body.email}</h3>
                <h3 style="color: white ;font-size: 23px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Message : ${req.body.message}</h3>
          </div>
        </div>
      </body>`
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
        res.end("error");
     }
     else{
        msg="block";
        res.redirect("/");
        }
    });
});

app.listen(process.env.PORT || 5000,()=>console.log("App is RUnning"))