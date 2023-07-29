// Define the UserService class
class UserService {
    // Method to get a user by email from the API
    async getUserByEmail(email) {
        try {
            const response = await fetch(`http://localhost:8080/api/users/email?email=${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    // Method to create a new user using the API
    async createUser(user) {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newUser = await response.json();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    // Method to log in a user using the API
    async loginUser(email, password) {
        try {
            const response = await fetch(`http://localhost:8080/api/users/email?email=${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            if (userData && userData.password === password) {
                return userData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            return null;
        }
    }
}

// Function to sign up as a new user
async function signUp() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const verifyPassword = document.getElementById('verifyPassword').value;

    // Validate the email format using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate that the password and verify password match
    if (password !== verifyPassword) {
        alert('Passwords do not match. Please enter the same password in both fields.');
        return;
    }

    // Check if the user with the same email already exists
    const userService = new UserService();
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        // If the user already exists, show a warning message
        alert('User already exists with this email. Please use a different email.');
        return;
    }

    // Create a new user object
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    // Save the new user to the database
    const createdUser = await userService.createUser(newUser);
    if (createdUser) {
        // Show a success message
        alert('You have successfully registered!');
        // Redirect the user to the home page
        window.location.href = 'user.html';
    } else {
        alert('Failed to register. Please try again later.');
    }
}

// Function to sign in as an existing user
async function signIn() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Get the user from the database
    const userService = new UserService();
    const loggedInUser = await userService.loginUser(email, password);

    if (loggedInUser) {
        // If the user exists, show a success message
        alert('You have successfully signed in!');
        localStorage.setItem('loggedInUserEmail', email);
        window.location.href = `user.html?email=${encodeURIComponent(email)}`;
    } else {
        // If the user does not exist or the password is incorrect, show an error message
        alert('Incorrect email or password. Please try again.');
    }
}

// Call the signUp function when the "Sign Up" button is clicked
document.getElementById('signupBtn').addEventListener('click', signUp);

// Call the signIn function when the "Sign In" button is clicked
document.getElementById('signinBtn').addEventListener('click', signIn);
