const { default: axios } = require('axios');  
const cron = require('node-cron');  
const BASE_URL = 'http://localhost:3000'; 

cron.schedule('0 0 * * *', async function () {  
    console.log('Running a task every minute');  

    try {  
        const [response, response1, response2, response3] = await Promise.all([  
            axios.get(`${BASE_URL}/api/getServerProfits`),  
            axios.get(`${BASE_URL}/api/getServerProfitLvl1`),  
            axios.get(`${BASE_URL}/api/getServerProfitLvl2`),  
            axios.get(`${BASE_URL}/api/getServerProfitLvl3`)  
        ]);  
    
        console.log('Data from API:', response.data);  
        console.log('Data from API1:', response1.data);  
        console.log('Data from API2:', response2.data);   
        console.log('Data from API3:', response3.data);  
    } catch (error) {  
        console.error('Error fetching data from API:', error.message);  
    }
});