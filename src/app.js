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

function showName() {
  const nameElement = document.getElementById("name-goes-here");

  onAuthReady((user) => {
    // Check where the user is right now
    const currentFile = window.location.pathname.split("/").pop();

    // If NO user is signed in
    if (!user) {
      // ONLY redirect if they are NOT already on the landing or login pages
      // This prevents the infinite reload glitch
      if (
        currentFile !== "index.html" &&
        currentFile !== "login.html" &&
        currentFile !== ""
      ) {
        location.href = "index.html";
      }
      return;
    }

    // If a user IS logged in:
    const name = user.displayName || user.email;
    if (nameElement) {
      nameElement.textContent = `${name}!`;
    }
  });
}

showName();
