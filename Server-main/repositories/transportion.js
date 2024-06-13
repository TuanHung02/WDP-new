import Transportion from "../models/transportion.js"
const transportionRepository = {
    createTransportion : async (transportionInfor) => {
        try {
            const {transportion_name}  = transportionInfor;
            const transportionSaved = await Transportion.create({
                transportion_name
            })
            return transportionSaved;
        } catch (error) {
            throw new Error(error);
        }
    },
    findAllTransportion : async () => {
        try {
            const transportions = await Transportion.find();
            return transportions;
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteTransportion : async (id) => {
        try {
            const transportionDeleted = await Transportion.deleteOne({_id : id});
            return transportionDeleted;
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default transportionRepository;