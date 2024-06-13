import Location from "../models/location.js"
const locationRepository = {
    createLocation: async (locationInfor) => {
        try {
            const locationSaved = await Location.create({
                location_name: locationInfor.location_name
            });
            return {
                status: "OK",
                locationSaved
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    findAll: async (locationInfor) => {
        try {
            const locationSaved = await Location.find().populate(["location_name"]);
            return {
                status: "Done",
                locationSaved
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default locationRepository;