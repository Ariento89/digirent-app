import axios from 'axios';

const url = axios.create({
    baseURL: "https://api.digi-rent.me/api"
});

export const ByAvailableFrom = (from_date) => {
    let result = url.get(`/apartments/?available_from=${from_date}`)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        return error;
                    });

    return result;
};

export const ByAvailableTo = (to_date) => {
    let result = url.get(`/apartments/?available_from=${to_date}`)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        return error;
                    });

    return result;
};
