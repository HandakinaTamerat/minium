const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);

module.exports = async function connectToDb() {
    const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@homework07-vnja7.mongodb.net/minium?retryWrites=true&w=majority`
    try {
        mongoose.connect(dbUrl, { useNewUrlParser: true })
    } catch(e) {
        console.log(e)
    }
    
}