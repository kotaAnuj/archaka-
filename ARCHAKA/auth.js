// auth.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const auth = getAuth();

// Check authentication state
export function checkAuth() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then(token => {
                    sessionStorage.setItem('authToken', token);
                    localStorage.setItem('userEmail', user.email);
                    resolve(user);
                });
            } else {
                sessionStorage.removeItem('authToken');
                localStorage.removeItem('userEmail');
                resolve(null);
            }
        }, reject);
    });
}

// Protect routes
export function protectRoute() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
    }
}

// Setup profile and cart (from your original code)
export function setupProfileAndCart() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        console.log(`User email: ${userEmail}`);
        // Additional setup as needed
    }
}

// Logout function
export function logout() {
    auth.signOut().then(() => {
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Logout error:', error);
    });
}