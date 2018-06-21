const handleRegister = (req, res, db, bcrypt) => {
    const {
        email,
        name,
        password
    } = req.body;

    // VALIDATION
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }

    const hash = bcrypt.hashSync(password);
    //AFTER ESTABLISHING CONNECTION WITH KNEX AND YOUR DATABASE, YOU CAN NOW OMIT THIS
    // database.users.push({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     entries: 0,
    //     joined: new Date()
    // }); 

    // AND USE BCRYPT TO HASH THE PASSWORD INSTEAD:
    db.transaction(trx => {
            trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        // .catch(err => res.status(400).json(err)); THIS CAN BE USED OR:
        .catch(err => res.status(400).json('Unable To Complete Registration'));
}

module.exports = {
    handleRegister: handleRegister
}