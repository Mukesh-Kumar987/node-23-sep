const Student = require('../models/Student');

async function addStudent(req, res){
    try{
        //console.log(req.body);
        let student = new Student(req.body);
        await student.save();
       // res.end("<h1>Data has been inserted successfully....</h1>")
       let students = await Student.find({});
        res.render('studentlist',{
            students: students
        })
    }catch(err){
        console.log(err)
    }

}

async function getStudents(req, res){
    try{
        let students = await Student.find({});
        //res.send(students);
        res.render('studentlist',{
            students: students
        })

    }catch(err){
        console.log(err.message)
    }
}

async function getPageForEditStudent(req, res) {
    try{
        let id = req.params.id;
        let student = await Student.findOne({ _id: id});
       // console.log(student);
        //res.send(student);
        res.render('studentforedit',{
            student: student
        })

    }catch(err){
        console.log(err)
    }
    
}

async function editStudent(req, res) {
    try{
        let id = req.params.id;
        //console.log(req.body,'req.body');
        let student = await Student.findOne({ _id: id });
       // console.log(student);
        student.rollNo = req.body.rollNo;
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.fatherName = req.body.fatherName;
        student.adharCardNo = req.body.adharCardNo;
        student.mobileNo = req.body.mobileNo;
        await student.save();
        // res.send("<h1> Updation is in Process</h1>")
        //res.send("<h1> Student has been updated successfully...</h1>")
        let students = await Student.find({});
        res.render('studentlist',{
            students: students
        })
        
    }catch(err){
        console.log(err.message,'msg')
    }
    
}

async function deleteStudent(req, res) {
    try{
        let id = req.params.id;
        // console.log(id,'id');
        await Student.deleteOne({ _id: id });
        // res.end("<h1> Delete is in progress</h1>")
        //res.end("<h1> Student has been deleted successfully....</h1>")
        let students = await Student.find({});
        res.render('studentlist',{
            students: students
        })

    }catch(err){
        console.log(err)
    }
}
module.exports={
    addStudent,
    getStudents,
    getPageForEditStudent,
    editStudent,
    deleteStudent
}