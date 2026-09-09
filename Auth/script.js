// 1. ALL IMPORTS MUST BE AT THE VERY TOP
import { auth, db } from "../firebase-config.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// --- Small helpers for button loading state ---
function setButtonLoading(button, loadingText) {
    if (!button) return;
    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<span class="loader"></span> ${loadingText}`;
}

function resetButton(button) {
    if (!button) return;
    button.disabled = false;
    if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
    }
}

// --- Email / Password Sign Up Logic ---
const createAccount = async () => {
    const userName = document.getElementById("signup-name")?.value.trim() ?? "";
    const userEmail = document.getElementById("signup-email")?.value.trim() ?? "";
    const userPassword = document.getElementById("signup-password")?.value ?? "";
    const userPasswordConfirmed = document.getElementById("signup-confirm-password")?.value ?? "";
    const submitButton = document.getElementById("signup-submit-button");

    if (!userName || !userEmail || !userPassword || !userPasswordConfirmed) {
        alert("Please fill in all the inputs");
        return;
    }

    if (userPassword !== userPasswordConfirmed) {
        alert("Confirm password does not match");
        return;
    }

    setButtonLoading(submitButton, "Creating account...");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        const user = userCredential.user;

        await updateProfile(user, { displayName: userName });

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: userName,
            email: userEmail,
            createdAt: new Date()
        });

        document.body.classList.add("page-exit");
        setTimeout(() => {
            window.location.href = "./signin.html";
        }, 400);

    } catch (error) {
        console.error(error.code, error.message);
        alert("Error creating account: " + error.message);
        resetButton(submitButton);
    }
};

// --- Email / Password Sign In Logic ---
const loginAccount = async () => {
    const userEmail = document.getElementById("signin-email")?.value.trim() ?? "";
    const userPassword = document.getElementById("signin-password")?.value ?? "";
    const submitButton = document.getElementById("signin-submit-button");

    if (!userEmail || !userPassword) {
        alert("Please fill in all the inputs");
        return;
    }

    setButtonLoading(submitButton, "Signing in...");

    try {
        await signInWithEmailAndPassword(auth, userEmail, userPassword);
        window.location.href = "../index.html";
    } catch (error) {
        console.error(error.code, error.message);
        alert("Error signing in: " + error.message);
        resetButton(submitButton);
    }
};

// --- Wire up FORMS (not just buttons) ---
// Listening on the form's "submit" event (rather than the button's "click")
// catches Enter-key submits, autofill submits, etc. — not just mouse clicks.
const signinForm = document.getElementById("signin-form");
signinForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    loginAccount();
});

const signupForm = document.getElementById("signup-form");
signupForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    createAccount();
});

// --- Google Sign-In Logic ---
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    const googleBtn = document.getElementById("google-signin-button");
    setButtonLoading(googleBtn, "Connecting...");

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                createdAt: new Date()
            });
        }

        window.location.href = "../index.html";

    } catch (error) {
        console.error("Google Sign-In Error:", error.code, error.message);
        if (error.code === "auth/popup-blocked") {
            alert("Your browser blocked the sign-in popup. Please allow popups for this site and try again.");
        } else if (error.code === "auth/popup-closed-by-user") {
            // User closed it themselves — no alert needed
        } else {
            alert("Google sign-in failed: " + error.message);
        }
        resetButton(googleBtn);
    }
};

const googleSignInButton = document.getElementById("google-signin-button");
googleSignInButton?.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithGoogle();
});

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem("buzz_cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = "inline-block";
    } else {
        badge.style.display = "none";
    }
}

// Run immediately when any page loads
updateCartBadge();