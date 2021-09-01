const mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

// https://mongoosejs.com/docs/guide.html#definition
var UserModelSchema = new Schema({
    customerId: String,
    active: Boolean,
    address: String,
    addressId: String,
    dateOfBirth: Date,
    emailAddress: { type: String, required: false },
    firstName: String,
    genderParameterId: String,
    lastName: String,
    media: String,
    middleName: String,
    modifiedBy: String,
    modifiedDate: Date,
    personId: String,
    primaryPhoneNumber: String,
    secondaryAddress: String,
    secondaryAddressId: String,
    secondaryPhoneNumber: String,
    socialSecurityNumber: String,
    suffix: String,
    userId: Number,
    roleId: Number,
    useActiveDirectory: Boolean,
    userName: { type: String, required: true },
    password: { type: String, required: true },
    passwordExpiration: Date,
    externalId: Number,
    role: String,
    customers: String,
    sessionToken: String,
    isLoggedIn: Boolean,
    officer: String,
    signature: {
        active: Boolean,
        mediaId: String,
        mediaType: String,
        modifiedBy: String,
        modifiedDate: Date,
        uri: String,
        base64: String
    }

}, {
    collection: 'users'
});

// Compile model from schema and export
module.exports = mongoose.model('UserModel', UserModelSchema);