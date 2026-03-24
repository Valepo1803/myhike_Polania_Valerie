import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import "/src/styles/style.css";

//--------------------------------------------------------------
// Custom global JS code (shared with all pages)can go here.
//--------------------------------------------------------------

// This is an example function. Replace it with your own logic.
import { onAuthReady } from "./authentication.js";

//-------------------------------------------------------------------
// This function gets called whenever the Main page loads.
// It will find out the User who's logged in.
//   - Read the User's Document in Firestore
//   - Extract the name, and display it (for that user)
//   - Extract the bookmarks array (for that user)
//   - Display all the cards in the gallery, passing in the User's ID and the bookmarks array)
//     So that the function can decide if it should how a SOLID bookmark icon, or an OUTLINE bookmark icon
//-------------------------------------------------------------------

function showName() {

    // Get the DOM element where the user's name will be displayed
    // Example: <h1 id="name-goes-here"></h1>
    const nameElement = document.getElementById("name-goes-here");

    // Wait until Firebase Auth finishes checking the user's auth state
    onAuthReady(async (user) => {

        // If no user is logged in, redirect to the login page
        if (!user) {
            location.href = "index.html";
            return; // Stop execution
        }

        // Get the user's Firestore document from the "users" collection
        // Document ID is the user's unique UID
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        // Determine which name to display:
        const name = userDoc.exists()            // 1️⃣ Use Firestore name if document exists
            ? userDoc.data().name                // 2️⃣ Otherwise fallback to Firebase displayName
            : user.displayName || user.email;    // 3️⃣ Otherwise fallback to email

       // If the DOM element exists, update its text using a template literal to add "!"
        if (nameElement) {
            nameElement.textContent = `${name}!`;
        }

        //Read bookmarks as a plain array (no globals)
        const bookmarks = userData.bookmarks || [];

        //Display cards, but now pass user's ID and bookmarks (array)
        await displayCardsDynamically(user.uid, bookmarks);
 
    });
}


showName();
