const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewuser = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({ 'message' : 'Username and Password are required'});
    //check duplicate username in DB
    const duplicate = await User.findOne({ username: user }).exec();
    if(duplicate) return res.sendStatus(409);//conflict
    try{
        // Find the previous biggest empid in the database
        const latestUser = await User.findOne().sort({ empid: -1 }).exec();
        const latestEmpId = latestUser ? latestUser.empid : 901;

        // Increment the latest empid to generate a new empid
        const newEmpId = latestEmpId + 1;
        const userType = (newEmpId == 901) ? "admin" : "employee";

        //encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create and store newuser
        const result = await User.create({ 
            "username" : user,
            "password" : hashedPwd,
            "empid": newEmpId,
            "usertype" :  userType
        });

        // const newUser = new User({ 
        //     "username" : user,
        //     "password" : hashedPwd 
        // });

        console.log(result);
        res.status(201).json({'success' : `New user ${user} created`});
    }catch(err){
        res.status(500).json({ 'message' : err.message});
    }
}

module.exports = { handleNewuser };