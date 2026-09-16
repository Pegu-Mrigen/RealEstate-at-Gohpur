// const API_URL = import.meta.env.VITE_PRODUCTION
//   ? "https://real-estate-at-gohpur-server.vercel.app/api" 
//   : "http://localhost:5000/api"; 
const API_URL = import.meta.env.VITE_PRODUCTION
  ? import.meta.env.VITE_PRODUCTION_URL 
  : "http://localhost:5000/api"; 

  export default API_URL;

  

// export default API_URL;
// const API_URL = "https://real-estate-at-gohpur-server.vercel.app/api"

// export default API_URL;


// const API_URL="http://localhost:5000/api"

// export default API_URL