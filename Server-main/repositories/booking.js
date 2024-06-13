import Booking from "../models/booking.js"
import Tour from "../models/tour.js";
const BookingRepository = {
    BookTour: async (tour_id, user_id) => {
        try {
            const booking = await Booking.create({
                tour_id,
                user_id
            });
            return booking;
        } catch (error) {
            throw new Error(error);
        }
    },
    cancelBookingTour: async (tour_id, user_id) => {
        try {
            const tourDeleted = await Booking.deleteOne({
                tour_id,
                user_id
            });
            return tourDeleted;
        } catch (error) {
            throw new Error(error);
        }
    },
    payTicketTour: async (tour_id, user_id) => {
        try {
            const updateBooking = await Booking.findOneAndUpdate({ user_id, tour_id }, { isPay: true })
            return updateBooking;
        } catch (error) {
            throw new Error(error);
        }
    },
    getTotalBookingByTime: async (day) => {
        try {
            console.log(day);
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - day);
            console.log(startDate);
            const pipeline = [
                {
                    $match: {
                        createdAt: { $gte: startDate.toDateString()} // Filter documents within the last 'day' days
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },
                        count: { $sum: 1 } // Count documents for each day
                    }
                },
                {
                    $sort: { _id: 1 } // Sort by date
                }
            ];

            const result = await Booking.aggregate(pipeline).exec();
            console.log('Number of documents each day in the last 7 days:');
            console.log(result);
            return result;
        } catch (err) {
            console.error('Failed to aggregate:', err);
            return null;
        }
    }
   
}

export default BookingRepository;