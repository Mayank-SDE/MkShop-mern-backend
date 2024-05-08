import express from 'express';
const app = express();
app.post('/register', (req, res) => {
    try {
        //get all the data from the body
        const { name, email, password, gender, image, dob } = req.body;
        //all the data should exists
        if (!(name && email && password && gender && image && dob)) {
            res.status(400).send('All the fields are compulsory.');
        }
        //check for the user exists in the database
        //encrypt the password
        //save the user in the db
        //generate the token for the user and send it
    }
    catch (error) { }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express is running on PORT http://localhost:${PORT}`);
});
