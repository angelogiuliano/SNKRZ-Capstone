import axios from "axios";

export const updateFavorites = async (updatedFavorites, userEmail) => {
  try {
    return await axios.patch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/${userEmail}/updateFavorites`,
      { favorites: updatedFavorites }
    );
  } catch (error) {
    console.log(error);
  }
};
