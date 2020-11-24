let express = require("express"),
    app = express(),
    cors = require('cors'),
    bodyParser = require("body-parser");

let apiRoutes = require('./routes/api');

// App Config
app.use(bodyParser.json({extended: true}));
app.use(cors());

app.use('/', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log(`Server listening on ${port}`);
});


module.exports.app = app;

exports.calculate = async (body) => {
     let data = body;
 
     let maxMarks=0;
     let maxMarksName=0;
     let minMarks=0;
     let minMarksName=0;
     let totalMarks = data.SubjectMarks.length * 100;
     let obtained = 0;
 
     for(let i=0; i <data.SubjectMarks.length; i++){
         if(data.SubjectMarks[i].marks > maxMarks){
             maxMarks = data.SubjectMarks[i].marks; 
             maxMarksName = data.SubjectMarks[i].subject; 
         }
         obtained += Number(data.SubjectMarks[i].marks);
     }
     for(let i=0; i <data.SubjectMarks.length; i++){
         minMarks = data.SubjectMarks[0].marks; 
         if(data.SubjectMarks[i].marks <= minMarks){
             minMarks = data.SubjectMarks[i].marks; 
             minMarksName = data.SubjectMarks[i].subject; 
         }
     }
     let percentage = (obtained / totalMarks) * 100;
     // console.log('obtained',obtained)
     // console.log('total marks',totalMarks)
     // console.log('percentage',percentage)
 
     return {
         minMarks, 
         maxMarks, 
         minMarksName, 
         maxMarksName, 
         percentage
     }
 }