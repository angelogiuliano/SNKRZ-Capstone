import axios from 'axios'

export const updateFavorites = async (updatedFavorites, userEmail) => {
    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/${userEmail}/updateFavorites`, 
            updatedFavorites
        )
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}