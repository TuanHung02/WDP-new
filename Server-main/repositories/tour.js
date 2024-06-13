import Booking from "../models/booking.js";
import BookingHistory from "../models/bookingHistory.js";
import Schedule from "../models/schedule.js";
import Tour from "../models/tour.js"
import BookingRepository from "./booking.js";
const tourRepository = {
    createTour: async (tourInfor) => {
        try {
            const { ownerId, tour_name, tour_description, tour_price, tour_img, max_tourist, start_date, end_date, start_position, end_position, duration, tour_transportion, return_status, return_tax } = tourInfor;
            const tourSaved = await Tour.create({
                tour_name,
                tour_description,
                tour_price,
                tour_img,
                max_tourist,
                start_date,
                end_date,
                duration,
                start_position,
                end_position,
                tour_transportion,
                return_status,
                return_tax,
                ownerId
            });
            return tourSaved;
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteTour: async (tour_id) => {
        try {
            await Schedule.deleteMany({ tour_id });
            const tourDeleted = await Tour.deleteOne({ _id: tour_id });
            return tourDeleted;
        } catch (error) {
            throw new Error(error);
        }
    },
    findAll: async () => {
        try {
            const tours = await Tour.find().populate(["start_position", "end_position"]).sort({start_date : -1});
            return tours;
        } catch (error) {
            throw new Error(error);
        }
    },
    findATour: async (tour_id) => {
        try {
            const tour = await Tour.findById(tour_id).populate(["start_position", "end_position", "tour_transportion"]);
            const scheduleOfTour = await Schedule.find({ tour_id });
            return {
                tour,
                scheduleOfTour
            };
        } catch (error) {
            throw new Error(error);
        }
    },
    changeStatusTour: async (status, tour_id,reason) => {
        try {
            console.log(status + " " + tour_id);
            const tourUpdated = await Tour.updateOne({ _id: tour_id }, {
                isAppove: status,
                reason : reason ? reason : ""
            })
            return tourUpdated;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateTour: async (tourInfor, tour_id) => {
        try {
            const tour = await Tour.findById(tour_id)
            const dateCurrent = new Date();
            dateCurrent.setHours(0,0,0,0);
            const dateTour = new Date(tour.start_date);
            dateTour.setHours(0,0,0,0);
            if(dateTour <= dateCurrent){
                const tourUpdated = await Tour.updateOne({ _id: tour_id }, {
                    $set : {
                        start_date : tourInfor.start_date,
                        isAppove : "NOTAPPROVE",
                        max_tourist : tourInfor.max_tourist,
                        tour_name : tourInfor.tour_name,
                        discount : tourInfor.discount,
                        end_date : tourInfor.end_date,
                        duration : tourInfor.duration
                    }
                });
                const membersBookedTour = await Booking.find({tour_id : tour_id});
                membersBookedTour.forEach(item => { BookingHistory.create({
                    tour_id : item.tour_id,
                    user_id : item.user_id
                })})
                await Booking.deleteMany({tour_id : tour._id})
            return tourUpdated;
            }
            return null
        } catch (error) {
            throw new Error(error);
        }
    },
    findTourWithStartAndEnd: async (start_position, end_position, page, size, start_date) => {
        try {
            let tours = [];
            let totalPage = 0;
            let totalDocs = 0;
            let pageCurrent = parseInt(page);
            let pageSize = parseInt(size);
            if (start_position !== null && end_position !== null) {
                console.log("start end");

                tours = await Tour.find({
                    start_position,
                    end_position,
                    start_date: {
                        $gt: start_date ? start_date : new Date()
                    }
                }).populate(["start_position", "end_position"]).limit(pageSize).skip(pageSize * (pageCurrent - 1));
                totalDocs = await Tour.countDocuments({
                    start_position,
                    end_position,
                    start_date: {
                        $gt: start_date ? start_date : new Date()
                    }

                })
            } else if (start_position !== null && end_position === null) {
                console.log("no end");
                tours = await Tour.find({
                    start_position,
                    start_date: {
                        $gt: start_date ? start_date : new Date()
                    }
                }).populate(["start_position", "end_position"]).limit(pageSize).skip(pageSize * (pageCurrent - 1));
                totalDocs = await Tour.countDocuments({
                    start_position,
                    start_date: {
                        $gt: start_date ? start_date : new Date()
                    }
                })
            } else {
                console.log("no end and start");

                tours = await Tour.find({
                    start_date: {
                        $gt: start_date ? start_date : new Date()
                    }

                }).populate(["start_position", "end_position"]).limit(pageSize).skip(pageSize * (pageCurrent - 1));
                totalDocs = await Tour.countDocuments({
                    end_position,
                    start_date: {
                        $gt: start_date ? start_date : new Date()
                    }

                })
            }
            totalPage = Math.ceil(totalDocs / pageSize);
            return {
                tours,
                totalPage
            };
        } catch (error) {
            throw new Error(error)
        }
    },
    findByTourName: async (tour_name, page, size) => {
        try {
            const text = tour_name
            const pageSize = parseFloat(size)
            const pageCurrent = parseFloat(page)
            console.log(text);
            let totalPage = 0;
            const totalDocs = await Tour.countDocuments({
                tour_name: { $regex: text, $options: "i" },
                
            });
            const tours = await Tour.find({
                tour_name: { $regex: text, $options: "i" },
                
            }).populate(["start_position", "end_position"]).skip(pageSize * (pageCurrent - 1)).limit(pageSize)
            totalPage = Math.ceil(totalDocs / pageSize);
            console.log(totalPage);
            console.log(totalDocs + " " + pageSize);

            return {
                tours,
                totalPage
            };
        } catch (error) {
            throw new Error(error);
        }
    },
    getTourByUserId: async (userId, status) => {
        try {
            return await Tour.find({ ownerId: userId,isAppove : status })  
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default tourRepository