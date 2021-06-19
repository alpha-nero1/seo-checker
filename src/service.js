import axios from "axios";

export const Service = (() => {

    const query = (url) => {
        return axios.get(`https://cors-anywhere.herokuapp.com/${url}`, { headers: {'Content-Type' : 'application/x-www-form-urlencoded' }});
    }

    return { query };
})();