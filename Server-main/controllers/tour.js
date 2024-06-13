import tourRepository from "../repositories/tour.js";
import Validator from "../validator/validator.js";
import StatusCode from "../constants/statusCode.js"
import MessageError from "../constants/messageError.js"
import Tour from "../models/tour.js";
const tourController = {
    createTour : async (req,resp) => {
        try {
            const {tour_name,tour_description,tour_price,tour_img,max_tourist,start_date,end_date,start_position,end_position,duration,tour_transportion,return_tax,return_status} = req.body;
            if(!tour_name || !tour_description  || !tour_img || !max_tourist || !start_date || !start_position || !end_position || !duration || !tour_transportion){
                return resp.status(400).json({
                    success : false,
                    error : "Can not set field empty !"
                });
            }
            if(tour_price < 0){
                return resp.status(400).json({
                    success : false,
                    error : "Can not set Price less than 0 !"
                })
            }
            if(max_tourist <= 0){
                return resp.status(400).json({
                    success : false,
                    error : "max_tourist must be greater than 0 !"
                })
            }
            if(!Validator.CheckDate(start_date,new Date())){
                return resp.status(400).json({
                    success : false,
                    error : "Start Date must be greater than now !"
                })
            }
            if(!Validator.CheckDate(end_date,start_date)){
                return resp.status(400).json({
                    success : false,
                    error : "End Date must be greater than now and start date !"
                }) 
            }
            if(!Validator.checkNumberInMinMax(return_tax,0,100)){
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success : false,
                    error : "Return tax only in 0 to 100 !"
                })
            }
           const tourSaved = await tourRepository.createTour(req.body);
            return resp.status(200).json({
                success : true,
                tourSaved  
            })
        } catch (error) {
            return resp.status(400).json({ success: false, error: error.message });
        }
    },
    deleteTour : async (req,resp) => {
        try {
            const {tour_id} = req.body;
            const tourDeleted = await tourRepository.deleteTour(tour_id);
            if(tourDeleted.deletedCount == 1){
                return resp.status(200).json({
                    success : true,
                    message : "Deleted successfully !"
                })
            }else{
                return resp.status(400).json({
                    success : false,
                    message : "ID not exist !"
                });
            }
        } catch (error) {
            return resp.status(400).json({ success: false, error: error.message });
        }
    },
    findAll : async (req,resp) => {
        try {
            const tours = await tourRepository.findAll();
            return resp.status(200).json({
                success : true,
                tours
            });
        } catch (error) {
            return resp.status(400).json({ success: false, error: error.message });
        }
    },
    findATour : async (req,res) => {
        try {
            const { id } = req.params;
            const tour = await tourRepository.findATour(id);
            if(!tour.tour){
                return res.status(400).json({
                    success : false,
                    error : "ID tour is not exist !"
                })
            }
            return res.status(200).json({
                success : true,
                tour
            })
        } catch (error) {
            return res.status(400).json({
                success : false,
                error : error.message
            })
        }
    },
    changeStatusTour : async (req,resp) => {
        try {
            const {tour_id,status,reason} = req.body;
            const tourUpdated = await tourRepository.changeStatusTour(status,tour_id,reason);
            if(tourUpdated.matchedCount === 0){
                return resp.status(400).json({
                    success : false,
                    error : "ID tour is not exist !"
                });
            }else{
                if(tourUpdated.modifiedCount === 0){
                    return resp.status(400).json({
                        success : false,
                        message : "The tour status already changed !"
                    });
                }else{
                    return resp.status(200).json({
                        success : true,
                        message : "Update successfully !"
                    });
                }
            }
            
        } catch (error) {
            return resp.status(400).json({
                success : false,
                error : error.message
            });
        }
    },
    updateTour : async (req,resp) => {
        const { id } = req.params;
        try {
            const {tour_price,max_tourist,start_date} = req.body;
            
            if(tour_price < 0){
                return resp.status(400).json({
                    success : false,
                    error : "Can not set Price less than 0 !"
                })
            }
            if(max_tourist <= 0){
                return resp.status(400).json({
                    success : false,
                    error : "max_tourist must be greater than 0 !"
                })
            }
            const dateToCompare = new Date();
            const tour_date = new Date(start_date);
            if(tour_date < dateToCompare.getTime()){
                return resp.status(400).json({
                    success : false,
                    error : "Start Date must be greater than now !"
                })
            }
            const tour = await Tour.findById(id)
            if(tour.start_date > new Date()){
                return resp.status(StatusCode.BAD_REQUEST).json({
                    success : false,
                    error : "Update Failed !"
                })
            }
            const tourUpdated = await tourRepository.updateTour(req.body,id);
            return resp.status(200).json({
                success : true,
                message : "Updated successfully !"
            })
        } catch (error) {
            return resp.status(400).json({
                success : false,
                error : error.message
            });
        }
    },
    findTourWithStartAndEnd : async (req,resp) => {
       try {
        const {page,pageSize} = req.query;
        const {start_position,end_position,start_date} = req.body;
        const tours = await tourRepository.findTourWithStartAndEnd(start_position,end_position,page,pageSize,start_date);
        if(tours.tours.length === 0){
            return resp.status(StatusCode.ID_NOTFOUND).json({
                success : false,
                error : "Not Found !"
            });
        }
        return resp.status(StatusCode.SUCCESS).json({
            success : true,
            tours
        })
       } catch (error) {
        return resp.status(StatusCode.BAD_REQUEST).json({
            success : false,
            error : error.message
        })
       }
        
    },
    findByTourName : async ( req,resp) => {
        try {
        let {page,pageSize,query} = req.query;
        if(page === undefined || pageSize === undefined ){
            page = 1;
            pageSize = 10;
        }
        if(query === undefined){
            query = ""
        }
        const tours = await tourRepository.findByTourName(query,page,pageSize);
        if(tours.tours.length === 0){
            return resp.status(404).json({
                success : false,
                error : "Not Found"
            })
        }
        return resp.status(StatusCode.SUCCESS).json({
            success : true,
            tours : tours.tours,
            totalPage : tours.totalPage
        })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success : false,
                error : error.message
            })
        }
    },
    findTourByOwnerId : async (req,resp) => {
        try {
            const {id} = req.params;
            const {status} = req.query
            const tours = await tourRepository.getTourByUserId(id,status);
            return  resp.status(StatusCode.SUCCESS).json({
                success : true,
                tours
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success : false,
                error : error.message
            })
        }
    },
    GetChartDetail : async (req,resp) => {
        try {
            const tours = await Tour.countDocuments();
            const toursOutDate = await Tour.countDocuments({
                start_date : {
                    $lte : new Date()
                }
            })
            const toursComming = await Tour.countDocuments({
                start_date : {
                    $gte : new Date()
                }
            })
            return resp.status(StatusCode.SUCCESS).json({
                success : true,
                data : {
                    tours,
                    toursOutDate,
                    toursComming
                }
            })
        } catch (error) {
            return resp.status(StatusCode.BAD_REQUEST).json({
                success : false,
                error : error?.message
            })
        }
    }
}

export default tourController