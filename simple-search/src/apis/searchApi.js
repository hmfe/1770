import axios from 'axios';

const APP_ID = '87f80059';
const APP_KEY = 'a6f23b8a8c86e638a12b682afdb769b6';

export default axios.create({
  baseURL: `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`,
});
