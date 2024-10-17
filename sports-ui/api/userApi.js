import axios from 'axios';

export const fetchUserApi = async (credentials) => {
    console.log("API function called Login for the User");
    try {
        const response = await axios.post('http://localhost:5000/login_user', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error;
    }
};

export const createUserApi = async (credentials) => {
    console.log("API function called Create User");
    try {
        const response = await axios.post('http://localhost:5000/create_user', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error;
    }
};


export const fetchEventsApi = async () => {
    console.log("API function called Fetch Events");
    try {
        const response = await axios.get('http://localhost:5000/events', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        return error;
    }
};

export const fetchRegisteredEventsApi = async (credentials) => {
    console.log("API function called Fetch Registered Events", credentials);
    const userId = credentials["userId"];
    try {
        const response = await axios.get(`http://localhost:5000/${userId}/get_registered_events`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        return error;
    }
};

export const registerEventApi = async (credentials) => {
    console.log("API function called to Register for a event Events");
    const userId = credentials["userId"]
    try {
        const response = await axios.post(`http://localhost:5000/${userId}/register_event`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error;
    }
};

export const unregisterEventApi = async (credentials) => {
    console.log("API function called to un-registered for a Event");
    const userId = credentials["userId"]
    try {
        const response = await axios.post(`http://localhost:5000/${userId}/unregister_event`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error;
    }
};
