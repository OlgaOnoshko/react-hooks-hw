
const BASE_URL = "https://pixabay.com/api";
const API_KEY = "24374201-4895b5a995aed977e23a40374";

const getImages = (query, page) => {
    return fetch(`${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(result => {
            if (result.ok) {
              return result.json();
            }
            return Promise.reject(new Error('Nothing found on request!'))
          })
};


export default getImages