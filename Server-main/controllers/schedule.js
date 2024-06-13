import StatusCode from "../constants/statusCode.js";
import Schedule from "../models/schedule.js";
import Tour from "../models/tour.js";
import { scheduleRepository } from "../repositories/index.js";
import Validator from "../validator/validator.js";

const scheduleController = {
    createScheduleOfTour: async (req, resp) => {
        try {
            const { tour_id, schedule_name, schedule_detail, schedule_date } = req.body;
            if (!tour_id || !schedule_name || !schedule_detail || !schedule_date) {
                return resp.status(400).json({
                    success: false,
                    error: "Can not set field empty !"
                });
            }
            if (!Validator.CheckDate(schedule_date, new Date())) {
                return resp.status(400).json({
                    success: false,
                    error: "Schedule Date must be greater than now"
                });
            }
            const schedule_tour = await Schedule.find({ tour_id });
            const tour = await Tour.findById({ _id: tour_id });
            if (schedule_tour.length >= tour.duration) {
                return resp.status(400).json({
                    success: false,
                    error: "Can not add schedule more !"
                });
            }
            if (schedule_tour.length >= 1) {
                const last_schedule = schedule_tour.pop();
                const date_check = new Date(schedule_date);
                if (last_schedule.schedule_date > date_check) {
                    return resp.status(400).json({
                        success: false,
                        error: "Schedule Date must be greater than old Schedule !"
                    });
                }
            }

            const scheduleSaved = await scheduleRepository.createScheduleOfTour(req.body);
            return resp.status(200).json({
                success: true,
                scheduleSaved
            });
        } catch (error) {
            return resp.status(400).json({
                success: false,
                error: error.message
            });
        }
    },
    findSchedulesOfTour: async (req, res) => {
        try {
            const { id } = req.params;
            const schedules = await scheduleRepository.findSchedulesOfTour(id);
            if (schedules.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "ID tour is not exist !"
                })
            }
            return res.status(200).json({
                success: true,
                schedules
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },
    getListSchedule: async (req, res) => {
        try {
            const listSchedule = await Schedule.find().exec();
            res.status(200).json({
                message: 'Get list schedule successfully !',
                data: listSchedule
            });
        } catch (error) {
            res.status(400).json({
                message: 'Get list schedule failed !',
                error: error.message
            })
        }
    },
    deleteSchedule: async (req, resp) => {
        try {
            const { id } = req.params;
            const scheduleDeleted = await scheduleRepository.deleteSchedule(id);
            if (scheduleDeleted.deletedCount === 0) {
                return resp.status(400).json({
                    success: false,
                    error: "ID not exist !"
                })
            }
            return resp.status(200).json({
                success: true,
                message: "Deleted successfully"
            })
        } catch (error) {
            return resp.status(400).json({
                success: false,
                error: error.message
            });
        }
    },
    updateSchedule : async (req,resp ) => {
        try {
            const {id} = req.params;
            const {schedule_name,schedule_detail,schedule_date} = req.body;
            if(!Validator.CheckDate(schedule_date,new Date())){
                return resp.status(400).json({
                    success : false,
                    error : "Schedule Date must be greater than now"
                });
            }
            const scheduleUpdated = await Schedule.updateOne({_id : id},{ $set : {
                schedule_date,
                schedule_name,
                schedule_detail
            }
            });
            return resp.status(StatusCode.SUCCESS).json({
                success : true,
                message : "Update success"
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success : false,
                error : error.message
            })
        }
    }
}

export default scheduleController;