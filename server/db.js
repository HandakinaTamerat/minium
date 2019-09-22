const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);

module.exports = function connectToDb() {
    const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@homework07-vnja7.mongodb.net/minium?retryWrites=true&w=majority`
    mongoose.connect(dbUrl, { useNewUrlParser: true }).
    then(res => console.log('connected to db...')).
    catch(error => handleError(error));
}