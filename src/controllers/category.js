const Category = require('../models/category');
const schema = require('../helper/userValidated');
const categorySchema = schema.schemaCategory;
const responeUser = require('../helper/respone');


module.exports = {
	create: async (req, res) => {
		try {
			const result = await categorySchema.validateAsync(req.body);
			const category = {
				name: result.name
			};
			Category.create(category, (err, data) => {
				if (!err) {
					responeUser(res, 'Insert Data Success', { data });
				} else {
					responeUser(res, 'Insert Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try {
			const result = await categorySchema.validateAsync(req.body);
			const category = {
				name: result.name
			};

			Category.update(category, req.params.id, (err, data) => {
				if (!err) {
					responeUser(res, 'Update Data Success', { data });
				} else {
					responeUser(res, 'Update Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
		}
	},

	findAll: (req, res) => {
		Category.findAll((err, data) => {
			if (!err) {
				responeUser(res, 'SELECT ALL SUCCESS', { data });
			} else {
				responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
			}
		});
	},

	findById: (req, res) => {
		Category.findById(req.params.id, (err, data) => {
			if (!err) {
				responeUser(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	delete: (req, res) => {
		Category.delete(req.params.id, (err, data) => {
			if(!err){
				responeUser(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	}
};