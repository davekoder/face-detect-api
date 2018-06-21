const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body; // destructured props
    // VALIDATION:
    if(!email || !password){
        return res.status(400).json('incorrect form submission');
    }

    db.select('email', 'hash').from('login') // we open the login db and get the email and hash
        .where('email', '=', email) // we make sure that the email is = to the email inputted
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // then we check if the stored hash is the same with the inputted hash
            console.log(isValid); // we just log it to know the value
            isValid ? // if true then do
                db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    console.log(user)
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user')) : // else do this if isValid is false
                res.status(400).json('wrong credentials')

        })
        .catch(err => res.status(400).json('wrong credentials')) // if everything does not compare well then throw this error
}

module.exports = {
    handleSignin: handleSignin
}