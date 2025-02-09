# React Authentication App

This project demonstrates a simple authentication system built with React and Material UI.

## Features

- **UI Design:** Built with React and Material UI for a clean and responsive user interface.
- **Form Validation:** Uses Yup for robust input validation on login and signup forms.
- **Toast Notifications:** React Toastify is used for displaying success and error messages.
- **Token Management:** JWT tokens are generated using `jose` and stored in localStorage for managing user sessions.
- **Local Storage:** User credentials and tokens are securely stored in localStorage.
- **Registration Validation:** Ensures users cannot register with an email already in use.
- **Authentication:** Login credentials are verified against stored user data; only valid users are redirected to the Home page.
- **Routing:** Navigation is handled using `react-router-dom` with protected routes.
- **Protected Routes:** Access to the Home page is restricted to logged-in users. If the user is not authenticated, they are redirected to the Login page.


## Tech Stack

- **React** for building the UI.
- **Material UI** for styling components.
- **Yup** for form validation.
- **React Toastify** for notifications.
- **Jose** for JWT generation.
- **React Router DOM** for navigation and protected routing.

## Usage

- **Signup:** Register a new user. Registration is blocked if the email already exists.
- **Login:** Authenticate with valid credentials. On success, a token is generated and stored in localStorage.
- **Logout:** Clears the token from localStorage and redirects to the Login page.
- **Home Page:** Displays company-related information and a Logout button. Only accessible to authenticated users.

