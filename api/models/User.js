/**
 * User.js
 * Drew Nelson
 * Aug 12 2016
 *
 * @description :: Simple User model for authentication
 */

var bcrypt = require('bcrypt');

module.exports = {
	tableName: 'Users',

    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        username: {
            type: 'string',
            required: false
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};
