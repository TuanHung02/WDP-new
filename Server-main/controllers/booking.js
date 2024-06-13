import { BookingRepository } from "../repositories/index.js";
import StatusCode from "../constants/statusCode.js"
import Booking from "../models/booking.js";
import Tour from "../models/tour.js";
import User from "../models/user.js";
import Mail from "../mail/mail.js";
import { FormatDate, FormatNumberToVND } from "../constants/common.js";
import { APPNAME, TIMEAUTODELETE, TIMEDELETE } from "../constants/constants.js";
import Validator from "../validator/validator.js"
const BookingController = {
    bookTour: async (req, resp) => {
        try {
            const { id } = req.params;
            const { user_id } = req.body;
            const checkUser = await Booking.findOne({
                tour_id: id,
                user_id
            });
            const checkTour = await Tour.findById({
                _id: id
            }).populate("start_position");
            const numbersTichketAlready = await Booking.find({ tour_id: id, isPay: true });
            if (!checkTour) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "Tour is not exist !"
                });
            }
            if (numbersTichketAlready.length >= checkTour.max_tourist) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "You can not book this tour anymore because the tickets alreay sold all !"
                })
            }
            const dateNow = new Date();
            if (!Validator.CheckDate(checkTour.start_date, dateNow.setDate(dateNow.getDate() - 1))) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "You must be book tour before 1 day when tour start !"
                });
            }
            if (checkUser) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "You already booked this tour !"
                });
            }
            const book = await BookingRepository.BookTour(id, user_id);
            const user = await User.findById({
                _id: user_id
            })
            setTimeout(async () => {
                const checkPayStatus = await Booking.findById(book._id);
                if (checkPayStatus.isPay) {
                    console.log("You are paid this ticket");
                    return;
                }
                await Booking.deleteOne(book._id);
                console.log("delete success");
                return;
            }, TIMEAUTODELETE(TIMEDELETE));
            const url = `http://localhost:5173/payment/${id}`;
            const mailContent = {
                receiver: user.email,
                subject: "Thông tin đặt tour trên G6Tour",
                content: "",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        .m_7894734060713233746td-left {
                            background-color: #f4f5f6;
                            border-bottom : 1px solid #fff;
                            margin : 0;
                            padding : 5px 10px;
                            text-align : right;
                            vertical-align : middle;
                            width : 150px
                        }
                        .m_7894734060713233746td-right {
                            border-bottom : 1px solid #fff;
                            font-size: 14px;
                            line-height: 20px;
                            margin: 0;
                            padding: 5px 10px;
                            vertical-align: middle;
                        }
                    </style>
                </head>
                <body>
                    <table style="width: 760px;">
                        <tbody>
                            <tr>
                               <td>
                                <div style="text-align:center;font-weight:bold;text-transform:uppercase;color:#000;font-size:24px;padding-top:20px;padding-bottom:20px;border-bottom:1px dotted #ccc;border-top:1px dotted #ccc;margin-bottom:30px">
                                    Booking của quý khách
                                </div>
                               </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">
                                        I. Phiếu xác nhận booking:
                                    </div>
                                    <div style="background:#f1f1f1;padding:15px;height:135px;margin-bottom:20px">
                                        <div style="width:100%;float:left">
                                            <div style="padding:0 15px 0 15px">
                                                <div style="font-size:16px;text-align:justify;line-height:18px;color:#025da6;margin-bottom:10px">
                                                    ${checkTour.tour_name}
                                                </div>
                                                <div style="float:left;width:100%;margin-bottom:7px">
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Ngày đi:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${FormatDate(checkTour.start_date)}
                                                    </div>
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Ngày về:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${FormatDate(checkTour.end_date)}
                                                    </div>
                                                </div>
                                                <div style="float:left;width:100%;margin-bottom:7px">
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Nơi tập trung:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${checkTour.start_position.location_name}
                                                    </div>
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Điểm khởi hành:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${checkTour.start_position.location_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="clear:both"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">
                                        II. Chi tiết booking:
                                    </div>
                                    <table style="width: 100%; margin-bottom:20px;border: 1px solid #f4f5f6;border-collapse : collapse; margin : 0; padding: 0;">
                                        <tbody>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Trị giá booking:
                                                </td>
                                                <td class="m_7894734060713233746td-right">
                                                    <span style="font-weight:bold;color:#c50000">
                                                        ${FormatNumberToVND(checkTour.tour_price)} 
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Ngày đăng ký:
                                                </td>
                                                <td class="m_7894734060713233746td-right">
                                                    <span>
                                                        ${FormatDate(new Date())} (Theo giờ Việt Nam) 
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Tình trạng:
                                                </td>
                                                <td class="m_7894734060713233746td-right" style="color:#c50000;font-weight:bold">                                 
                                                    Booking của quý khách đã được chúng tôi xác nhận thành công
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Thanh toán:
                                                </td>
                                                <td class="m_7894734060713233746td-right" style="color:#c50000;font-weight:bold">                                 
                                                   <a href="${url}">Bấm vào đây để thanh toán</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight:bold">
                                    <div style="margin-bottom:15px">
                
                                        Chúc quý khách 1 chuyến du lịch thật vui vẻ và bổ ích!
                                
                                    </div>
                                </td>
                                <td style="font-weight:bold">
                                <div style="margin-bottom:15px">
            
                                    Bạn sẽ tự hủy vé nếu không thanh toán trong vòng 30p, vui lòng chú ý !
                            
                                </div>
                            </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td style="height:30px;text-align:center;background:#306eb7;padding-top:15px;padding-bottom:15px;color:#fff">
                                    <div style="margin-bottom:5px">
                                        Hoa Lac, Tro Hoang Ha
                                    </div>
                                    <div>
                                        <span>
                                            Điện thoại:
                                        </span>
                                        (+84 28) 38 22 8898 - 
                                        <span>
                                            Email:
                                        </span>
                                        <a href="dinhhoan0511@gmail.com" target="_blank">dinhhoan0511@gmail.com</a>
                                    </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                
                </body>
                </html>`
            }
            Mail.sendMail(mailContent.receiver, mailContent.subject, mailContent.content, mailContent.html);

            return resp.status(StatusCode.SUCCESS).json({
                success: true,
                message: "Booking tour successfully !",
                book
            });
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
    },
    payTicketTour: async (req, resp) => {
        try {
            const { id } = req.params;
            const { user_id } = req.body;
            const checkPayStatus = await Booking.findOne({
                tour_id: id,
                user_id: user_id
            });
            if (!checkPayStatus) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    error: "Not Found !"
                })
            }
            const updateBooking = await BookingRepository.payTicketTour(id, user_id);
            if (!updateBooking.isModified) {
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Update not success"
                })
            }
            return resp.status(StatusCode.SUCCESS).json({
                success: false,
                message: "Update successful !"
            });
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
    },
    getTotalBookingByTime: async (req, resp) => {
        const { day } = req.query;

        return resp.status(StatusCode.SUCCESS).json({
            result: BookingRepository.getTotalBookingByTime(day)
        })
    },
    getAllTourBooked: async (req, resp) => {
        try {
            return resp.status(StatusCode.SUCCESS).json({
                success: true,
                tours: await Booking.find()
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                error : error.message,
                success : false
            })
        }
    },
    findTourBookedByUserId : async (req,resp) => {
        try {
            const {id} = req.params;
            let {limit,page,status} = req.query
            
            if(limit === undefined || page === undefined ){
                limit = 10;
                page = 1;
            }
            if(status === undefined){
                status = false;
            }

            const tour = await Booking.find({user_id : id,isPay : status}).populate("tour_id").limit(limit).skip((page - 1) * limit);
            const tourDocs = await Booking.countDocuments({user_id : id});
            console.log(tourDocs);
            const totalPage = Math.ceil(tourDocs / limit)
            return resp.status(200).json({
                success : true,
                tour : tour,
                totalPage
            });
        } catch (error) {
            return resp.status(400).json({
                success : false,
                error : error.message
            })
        }
    },
    findMembersInATour : async (req,resp) => {
        try {
            const {id} = req.params;
            const bookedTour = await Booking.find({tour_id : id}).populate({path : "user_id", select : '-password'})
            return resp.status(StatusCode.SUCCESS).json({
                success : true,
                bookedTour
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success : false,
                error : error.message
            })
        }
    }
}
async function cancelBookingTour(req, resp) {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        const checkPayStatus = await Booking.findOne({
            tour_id: id,
            user_id: user_id
        });
        if (!checkPayStatus) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success: false,
                error: "Not Found !"
            })
        }
        if (!checkPayStatus.booking_status) {
            //Handle when user has been pay tour yet
            await BookingRepository.cancelBookingTour(id, user_id);
            return resp.status(StatusCode.SUCCESS).json({
                success: true,
                message: "Cancel tour success"
            })
        }
        // Handle when user was pay the tour
        const tourInfor = await Tour.findById({ _id: id }).populate(["start_position", "end_position"]);
        // Delete payment history in payment table and delete booking tour in booking table
        if (tourInfor.return_status) {
            await BookingRepository.cancelBookingTour(id, user_id);
            const user = await User.findById({ _id: user_id })
            //sending mail for user
            const mailContent = {
                receiver: user.email,
                subject: `Thông tin hủy vé ở ${APPNAME}`,
                content: "",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        .m_7894734060713233746td-left {
                            background-color: #f4f5f6;
                            border-bottom : 1px solid #fff;
                            margin : 0;
                            padding : 5px 10px;
                            text-align : right;
                            vertical-align : middle;
                            width : 150px
                        }
                        .m_7894734060713233746td-right {
                            border-bottom : 1px solid #fff;
                            font-size: 14px;
                            line-height: 20px;
                            margin: 0;
                            padding: 5px 10px;
                            vertical-align: middle;
                        }
                    </style>
                </head>
                <body>
                    <table style="width: 760px;">
                        <tbody>
                            <tr>
                               <td>
                                <div style="text-align:center;font-weight:bold;text-transform:uppercase;color:#000;font-size:24px;padding-top:20px;padding-bottom:20px;border-bottom:1px dotted #ccc;border-top:1px dotted #ccc;margin-bottom:30px">
                                    Booking của quý khách
                                </div>
                               </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">
                                        I. Phiếu xác nhận booking:
                                    </div>
                                    <div style="background:#f1f1f1;padding:15px;height:135px;margin-bottom:20px">
                                        <div style="width:100%;float:left">
                                            <div style="padding:0 15px 0 15px">
                                                <div style="font-size:16px;text-align:justify;line-height:18px;color:#025da6;margin-bottom:10px">
                                                    ${tourInfor.tour_name}
                                                </div>
                                                <div style="float:left;width:100%;margin-bottom:7px">
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Ngày đi:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${FormatDate(tourInfor.start_date)}
                                                    </div>
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Ngày về:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${FormatDate(tourInfor.end_date)}
                                                    </div>
                                                </div>
                                                <div style="float:left;width:100%;margin-bottom:7px">
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Nơi tập trung:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${tourInfor.start_position.location_name}
                                                    </div>
                                                    <div style="float:left;width:20%;font-weight:bold;color:#333">
                                                        Điểm khởi hành:
                                                    </div>
                                                    <div style="float:left;width:30%">
                                                        ${tourInfor.start_position.location_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="clear:both"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">
                                        II. Chi tiết booking:
                                    </div>
                                    <table style="width: 100%; margin-bottom:20px;border: 1px solid #f4f5f6;border-collapse : collapse; margin : 0; padding: 0;">
                                        <tbody>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Trị giá booking:
                                                </td>
                                                <td class="m_7894734060713233746td-right">
                                                    <span style="font-weight:bold;color:#c50000">
                                                        ${FormatNumberToVND(tourInfor.tour_price)} 
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Thuế trả vé :
                                                </td>
                                                <td class="m_7894734060713233746td-right">
                                                    <span style="font-weight:bold;color:#c50000">
                                                        ${FormatNumberToVND((tourInfor.return_tax * tourInfor.tour_price) / 100)} 
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Ngày hủy:
                                                </td>
                                                <td class="m_7894734060713233746td-right">
                                                    <span>
                                                        ${FormatDate(new Date())} (Theo giờ Việt Nam) 
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="m_7894734060713233746td-left">
                                                    Tình trạng:
                                                </td>
                                                <td class="m_7894734060713233746td-right" style="color:#c50000;font-weight:bold">                                 
                                                    Booking của quý khách đã được chúng tôi xác nhận hủy thành công
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight:bold">
                                    <div style="margin-bottom:15px">
                
                                        Chúc quý khách 1 ngày tốt lành !
                                
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td style="height:30px;text-align:center;background:#306eb7;padding-top:15px;padding-bottom:15px;color:#fff">
                                    <div style="margin-bottom:5px">
                                        Hoa Lac, Tro Hoang Ha
                                    </div>
                                    <div>
                                        <span>
                                            Điện thoại:
                                        </span>
                                        (+84 28) 38 22 8898 - 
                                        <span>
                                            Email:
                                        </span>
                                        <a href="dinhhoan0511@gmail.com" target="_blank">dinhhoan0511@gmail.com</a>
                                    </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                
                </body>
                </html>`
            }
            Mail.sendMail(mailContent.receiver, mailContent.subject, mailContent.content, mailContent.html);
            return resp.status(StatusCode.SUCCESS).json({
                success: true,
                message: "Please check email to know information !"
            })
        }
        return resp.status(StatusCode.BAD_REQUEST).json({
            success: false,
            error: "The ticket of this tour can not  return !"
        })
    } catch (error) {
        return resp.status(StatusCode.BAD_REQUEST).json({
            success: false,
            error: error
        })
    }
}

export {
    cancelBookingTour,
    BookingController
}