export const ERROR_CODE = {

    //general
    BAD_REQUEST:"Wrong user",
    // Login
    WRONG_PASSWORD: "Wrong password!",
    EMPTY_PASSWORD: "Empty password!",
    USERNAME_NOT_EXISTED: "Username is not existed!",
    EXPIRED_USER_ACCOUNT: "Account is expired!",
    LOGIN_ACCOUNT_FAIL: "Login failed!",
    //admin
    ADMIN_USER_ID_NOT_EXISTED:"This admin account doesn't exist",
    USER_ALREADY_BANNED:"User Account has already banned",
	BAN_USER_FAIL: "Ban Account failed",
	UNBAN_USER_FAIL: "UnBan Account failed",
	USER_ALREADY_ENABLED: "User has already enabled",
	MAP_STUDENT_CODE_FAIL: "Map student code failed",
    //Register
    USERNAME_EXISTED: "Username existed",
	PASSWORD_AND_RETYPE_DOES_NOT_MATCH: "Password and RetypePassword do not match",
	REGISTER_ACCOUNT_FAIL:"Register Account failed",
    PHONE_NOT_EXISTED:"Phone Number is not existed",
	INVALID_PHONE_FORMAT:"Invalid phone format",
	INVALID_EMAIL_FORMAT: "Invalid email format",
	PHONE_INVALID:"Invalid Phone",
	PHONE_EXISTED:"Phone existed",
	EMAIL_EXISTED: "Email existed",
	EMPTY_EMAIL:"Empty email"
}