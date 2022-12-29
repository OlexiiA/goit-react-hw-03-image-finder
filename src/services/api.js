import axios from 'axios';

export const fetchImg = async (querry, page) => {
    return await axios.get(`https://pixabay.com/api/?key=31231655-992b28151641be737833166f6&per_page=12&q=${querry}&page=${page}`);
  };

