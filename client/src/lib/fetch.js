import 'dotenv/config';
import getCookie from './getcookie';
async function Fetch(endpoint, method, body) {
    const baseUrl = "http://localhost:5000/api/v1";
    const url = `${baseUrl}${endpoint}`; 
    
    
    const token = getCookie('token');
    console.log("token", token);

 
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json',
            },
            body: JSON.stringify(body),
        });
        console.log("response", response);
        return await response.json();
}

export default Fetch;