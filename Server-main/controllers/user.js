import jwt from 'jsonwebtoken'
import MessageError from "../constants/messageError.js";
import User from "../models/user.js";
import userRepository from "../repositories/user.js";
import Validator from "../validator/validator.js"
import Mail from "../mail/mail.js"
import { APPNAME } from "../constants/constants.js"
import StatusCode from "../constants/statusCode.js"
import { getRandomInt } from '../constants/common.js';
const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find().exec()
            res.status(200).json({
                message: 'Get all users successfully ~',
                data: user
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error: ' + err.toString(),
            });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).exec()
            res.status(200).json({
                message: 'Get user by id successfully ~',
                data: user
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error:' + error.toString(),
            });
        }
    },
    createAccount: async (req, resp) => {
        try {
            const { username, email, phoneNumber } = req.body;
            if (!Validator.checkString(username)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "username " + MessageError.inputNotContainSpecial
                })
            }
            if (!Validator.checkEmail(email)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.email
                });
            }
            if (!Validator.isValidPhoneNumber(phoneNumber)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.phoneNumber
                });
            }
            const user = await User.findOne({ email });
            if (user) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "Email already exist !"
                });
            }
            //Save to DB
            await userRepository.createAccount(req.body);

            const mailContent = {
                receiver: email,
                subject: "Thông tin tạo tài khoản",
                content: `Tài khoản với email ${email} của quý khách đã được tạo.
                Chào mừng quý khách đến với ${APPNAME}.`
            }
            //Send email
            Mail.sendMail(mailContent.receiver, mailContent.subject, mailContent.content);
            return resp.status(200).json({
                success: true,
                message: "Create account successfully !"
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
    },
    loginAccount: async (req, resp) => {
        try {
            const { email } = req.body;
            if (!Validator.checkEmail(email)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.email
                })
            }
            const user = await userRepository.loginAccount(req.body);
            if (!user) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "Email, Password not correctly !"
                });
            }
            const payload = {
                user_id: user._id,
                email: user.email,
                user_name: user.username,
                role: user.role_id.role_name
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "365d"
            });
            return resp.status(200).json({
                success: true,
                token,
                message: "Login successfully !"
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            });
        }
    },
    updateAccount: async (req, resp) => {
        try {
            const { id } = req.params;
            const { username, phoneNumber } = req.body;
            if (!Validator.checkString(username)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "username " + MessageError.inputNotContainSpecial
                })
            }
            if (!Validator.isValidPhoneNumber(phoneNumber)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.phoneNumber
                });
            }
            const userUpdated = await userRepository.updateAccount(req.body, id);
            console.log(userUpdated);
            if (userUpdated.matchedCount === 0) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.idNotExist
                })
            }
            return resp.status(200).json({
                success: true,
                message: "Update successfully !"
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
    },
    forgotPassword: async (req, resp) => {
        try {
            const { email } = req.body;
            if (!Validator.checkEmail(email)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.email
                });
            }
            const newPass = getRandomInt(10000, 99999);
            const user = await userRepository.forgotPassword(email, newPass);
            if (user.matchedCount === 0) {
                return resp.status(StatusCode.ID_NOTFOUND).json({
                    success: false,
                    error: MessageError.EmailNotExist
                })
            }
            const mailContent = {
                receiver: email,
                subject: "Request to reset password",
                content: `Tài khoản với email ${email} của quý khách đã được đổi thành công. Mật khẩu đăng nhập của khách hàng là ${newPass}
                Vui lòng đổi mật khẩu ngay khi nhận được email này.`
            }
            Mail.sendMail(mailContent.receiver, mailContent.subject, mailContent.content)
            return resp.status(StatusCode.SUCCESS).json({
                success: true,
                message: "Check mail to get new password !"
            });
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
    },
    changePassword: async (req, resp) => {
        try {
            const { id } = req.params;
            const { newPass } = req.body;
            if (!Validator.checkLengthsString(newPass, 7)) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "Password lengths must be greater than 7 !"
                });
            }
            const userUpdated = await userRepository.changePassword(id, newPass);
            if (userUpdated.matchedCount === 0) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: MessageError.idNotExist
                });
            }
            if (userUpdated.modifiedCount === 0) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "New password must be different with current password !"
                });
            }
            return resp.status(StatusCode.SUCCESS).json({
                success: true,
                message: "Update successfully !"
            });
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            });
        }
    }
}

export default userController;