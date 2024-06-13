import StatusCode from "../constants/statusCode.js";
import Booking from "../models/booking.js";
import { paymentRepository } from "../repositories/index.js";

const paymentController = {
    createPayment : async (req,resp) => {
        try {
            const {user_id,tour_id} = req.body;
            const booking = await Booking.findOne({
                user_id,
                tour_id
            });
            if(!booking){
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success : false,
                    error : "You did not booking this tour !"
                });
            }
            await Booking.updateOne({
                user_id,
                tour_id
            }, {
                booking_status : true
            });
            await paymentRepository.createPayment(req.body);
            return resp.status(StatusCode.SUCCESS).json({
                success : true,
                message : "Payment successfully !"
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success : false,
                error : error.message
            })
        }
    }
}
export default paymentController