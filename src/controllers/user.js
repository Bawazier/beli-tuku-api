const User = require('../models/user');


module.exports = {
	create: (req, res) => {
		const user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			gender: req.body.gender,
			dateOfBirth: req.body.dateOfBirth
		};

		if (!user.name || !user.email || !user.password || !user.phone) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}else{
			User.create(user, (err, data) => {
				if (!err) {
					res.status(201).send({
						success: true,
						message: 'Insert Data Success',
						data: { ...user }
					});
				} else {
					console.log(err);
					res.status(500).send({
						success: false,
						message: 'Insert Data Failled',
						data: data
					});
				}
			});		
		}

		
	}
};