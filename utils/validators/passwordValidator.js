const PasswordValidator = require("password-validator");
const passwordSchema = new PasswordValidator();

passwordSchema
	.is()
	.min(8)
	.is()
	.max(100)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits(1)
	.is()
	.not()
	.oneOf(["Password", "Password123"]);

function validatePassword(password) {
	return passwordSchema.validate(password, { list: true });
}
module.exports = validatePassword;
