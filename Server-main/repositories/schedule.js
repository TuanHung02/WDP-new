import dayjs from "dayjs";
import Schedule from "../models/schedule.js"
const scheduleRepository = {
    createScheduleOfTour : async (scheduleInfor) => {
        try {
            const {tour_id,schedule_name,schedule_detail,schedule_date} = scheduleInfor;
            const scheduleSaved = await Schedule.create({
                schedule_name,
                schedule_detail,
                schedule_date,
                tour_id
            })
            return scheduleSaved;
        } catch (error) {
            throw new Error(error);
        }
    },
    findSchedulesOfTour : async (tour_id) => {
        try {
            const schedules = await Schedule.find({tour_id}).sort({
                schedule_date : 1
            });
            return schedules;
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteSchedule : async (schedule_id) => {
        try {
            const scheduleDeleted = await Schedule.deleteOne({_id : schedule_id});
            return scheduleDeleted;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default scheduleRepository;