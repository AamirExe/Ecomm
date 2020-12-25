const fs = require('fs');
const crypto = require('crypto');
const { finished } = require('stream');
const Repository = require('./repository');

class UserRepository extends Repository{
    

}

// const test = async () => {
//     test1 = new UserRepository('../users.json');
//     const email = {email : 'durgesh'}
//     const user = await test1.getOneBy({email});
//     console.log(user);
// }
// test();

module.exports = new UserRepository('users.json');