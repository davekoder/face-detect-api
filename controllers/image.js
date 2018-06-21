const Clarifai = require('clarifai');

// this is used for the face recognition api
const app = new Clarifai.App({
    apiKey: 'ec4a93651cdf495ab6df63bed32c4399'
});

const handleApiCall = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
        .catch(err => res.status(400).json('unable to work with the API'))
    })
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get Entries'))
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++
    //         res.json(user.entries);
    //     }
    // });
    // if (!found) {
    //     res.status(400).json('no such user');
    // }   
}

module.exports = {
    handleImage,
    handleApiCall
}