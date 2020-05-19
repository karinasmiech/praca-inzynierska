const mongoose = require('mongoose');
const { User } = require('../models');

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || '27017';
const url = `mongodb://${host}:${port}/praca-inzynierska`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    console.log(`Connceted to database: ${url}`);
    provideAdminUser();
});

function provideAdminUser() {
    User
        .find()
        .then(users => {
            if (!users.length) {
                return new User({ login: 'admin', password: 'password' }).save()
            }
        })
        .then(user => {
            if (user) {
                console.log(
                    '\n----Stworzono konto admina----\
                     \nAby się zalogować użyj:\
                     \nLogin: admin\
                     \nHasło: password\
                     \nPamiętaj aby po zalogowaniu zmienić hasło.\
                     \n------------------------------\n'
                );
            }
        })
        .catch(error => console.error(error));
}
