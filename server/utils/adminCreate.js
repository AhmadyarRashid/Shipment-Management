const User = require('../models/user');

// create admin login if not exists
const createAdminIfNot = () => {
    
    User.find({role: 'admin'})
        .then(doc => {
            // no admin login exists
            if(doc && doc.length == 0){
                const user = new User({
                    name : 'Admin',
                    email : 'admin@gmail.com',
                    role: 'admin'
                });
                user.setPassword('123456');
                user.save()
                    .then(res => {
                        console.log('admin login create sucessfully');
                    })
                    .catch(err => {
                        console.log('some err found during save admin login');
                    });
            }
        })
}

module.exports = { createAdminIfNot};