import { transportionRepository } from "../repositories/index.js"

const transportionController = {
    createTransportion : async (req,res) => {
        try {
            const { transportion_name } = req.body;
            if(transportion_name === ""){
                return res.status(400).json({
                    success : false,
                    error : "Can not set field empty !"
                });
            }
            const transportionSaved = await transportionRepository.createTransportion(req.body);
            return res.status(200).json({
                success : true,
                transportionSaved
            })
        } catch (error) {
            return res.status(400).json({
                success : falsem,
                error : error.message
            })
        }
    },
    findAllTransportion : async (req,res) => {
        try {
            const transportions = await transportionRepository.findAllTransportion();
            return res.status(200).json({
                success : true,
                transportions
            })
        } catch (error) {
            return res.status(400).json({
                success : false,
                error : error.message
            })
        }
    },
    deleteTransportion : async (req,res) => {
        try {
            const {id} = req.params;
            const transportionDeleted = await transportionRepository.deleteTransportion(id);
            if(transportionDeleted.deletedCount == 1){
                return res.status(200).json({
                    success : true,
                    message : "Deleted successfully !"
                })
            }else{
                return res.status(200).json({
                    success : false,
                    error : "ID not exist !"
                })
            }
        } catch (error) {
            return res.status(400).json({
                success : false,
                error : error.message
            })
        }
    }
}

export default transportionController;