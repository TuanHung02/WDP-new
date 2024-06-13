import locationRepository from "../repositories/location.js";

const locationController = {
    createLocation: async (request, response) => {
        try {
            const locationSaved = await locationRepository.createLocation(request.body);
            console.log(locationSaved);
            return response.status(200).json(locationSaved);
        } catch (error) {
            return response.status(500).json(error);
        }
    },
    findAll: async (request, response) => {
        try {
            const locations = await locationRepository.findAll();
            return response.status(200).json({
                success: true,
                locations
            });
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}
export default locationController;