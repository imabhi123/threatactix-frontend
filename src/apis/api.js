const BASE_URL = process.env.REACT_APP_BASE_URL + '/user';

// 1. Register User
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

// 2. Login User
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

// 3. Logout User (Secured)
export const logoutUser = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

// 4. Refresh Access Token
export const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${BASE_URL}/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
};

// 5. Change Current Password (Secured)
export const changeCurrentPassword = async (passwordData, token) => {
    try {
        const response = await fetch(`${BASE_URL}/change-password`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error changing password:', error);
    }
};

// 6. Get Current User (Secured)
export const getCurrentUser = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/current-user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching current user:', error);
    }
};

// 7. Update Account Details (Secured)
export const updateAccountDetails = async (details, token) => {
    try {
        const response = await fetch(`${BASE_URL}/update-details`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating account details:', error);
    }
};

// 8. Update Profile Picture (Secured)
export const updateUserProfilePicture = async (file, token) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
        const response = await fetch(`${BASE_URL}/profilePicture`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating profile picture:', error);
    }
};

// 9. Fetch Username (Basic Example)
export const fetchUsername = async () => {
    try {
        const response = await fetch(`${BASE_URL}/name`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching name:', error);
    }
};
