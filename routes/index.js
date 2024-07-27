const express = require("express");
const Mentor = require("../models/mentor");
const Student = require("../models/student");

const router =  express.Router();

//API to create Mentor
router.post('/mentor',async (req,res)=>{
    try{
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    }
    catch(error){
        res.status(404).send(error);
    }
});


//API to create Student
router.post('/student',async (req,res)=>{
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    }
    catch(error){
        res.status(201).send(error);
    }
});


//API to get Mentors
router.get('/mentor',async (req,res)=>{
    try{
        const mentors = await Mentor.find();
        res.send(mentors);
    }
    catch(error){
        res.status(404).send(error);
    }
});


//API to get Students
router.get('/student',async (req,res)=>{
    try{
        const students = await Student.find();
        res.send(students);
    }
    catch(error){
        res.status(404).send(error);
    }
});


//API to Allot Students and Mentors
router.put('/student-allot', async (req, res) => {
    const { mentorId, studentIds } = req.body;
    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).send({ message: "Mentor not found" });
        }

        const updateResult = await Student.updateMany(
            { _id: { $in: studentIds }, mentor: null },
            { $set: { mentor } }
        );

        const updatedStudents = await Student.find({ _id: { $in: studentIds } });

        res.status(200).send({
            students: updatedStudents
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put('/mentor-allot',async (req,res)=>{
    const {mentorId,studentId} = req.body;
    try{
        const mentor= await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(404).send({message:"Not Found"});
        }

        const student= await Student.findById(studentId);
        if(!student){
            return res.status(400).send({message:"Not Found"});
        }

        student.prevMentors.push(student.mentor);
        student.mentor=mentorId;
        await student.save();

        res.status(200).send(student);
    }
    catch(error){
        res.status(400).send(`$Error:${error}`);
    }
});

module.exports = router;