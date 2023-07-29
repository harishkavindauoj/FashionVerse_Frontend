// Function to get user information from the API based on the email
function getUserInfoByEmail(email) {
    fetch(`http://localhost:8080/api/users/email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(userData => {
        // Update the user information in the "userInfoContainer" div
        const userInfoContainer = document.getElementById('userInfoContainer');
        userInfoContainer.innerHTML = `
            <h5 class="card-title">User Information</h5>
            <p><strong>Username:</strong> ${userData.username}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching user information:', error);
        // If there was an error during fetching user info, show an error message
        alert('Failed to fetch user information. Please try again later.');
    });
}

// Function to change the user's password
function changePassword() {
    // Get the new password from the input field
    const newPassword = document.getElementById('newPassword').value;
    
    fetch('http://localhost:8080/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: newPassword }),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // If the password change is successful, show a success message
        alert('Password changed successfully!');
        // Clear the input field
        document.getElementById('newPassword').value = '';
    })
    .catch(error => {
        console.error('Error changing password:', error);
        // If there was an error during password change, show an error message
        alert('Failed to change password. Please try again later.');
    });
}

// Function to remove the user's account
function removeAccount() {
    // Get the password for account removal from the input field
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:8080/api/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password }),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // If the account removal is successful, show a success message
        alert('Account removed successfully!');
        // Clear the input field
        document.getElementById('password').value = '';
        // Redirect to the homepage or any other page after account removal
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error removing account:', error);
        // If there was an error during account removal, show an error message
        alert('Failed to remove account. Please try again later.');
    });
}

// Call the getUserInfo function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the user's email from localStorage
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    if (loggedInUserEmail) {
        // Call getUserInfoByEmail to fetch and display user information
        getUserInfoByEmail(loggedInUserEmail);
    } else {
        // Handle the case when user's email is not found in localStorage
        console.error('User email not found in localStorage.');
        alert('User email not found. Please log in again.');
        // Redirect to the login page or display an error message
        window.location.href = 'login.html'; // Redirect to the login page
    }
});

// Event listener for the "Change Password" button
document.getElementById('changePasswordBtn').addEventListener('click', changePassword);

// Event listener for the "Remove Account" button
document.getElementById('removeUserBtn').addEventListener('click', removeAccount);
