import api from "../api";


export const PostOrderDetails = async () => {
    try {
      const response = await api.get(
        '/Order',{

        }
      );
  
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };