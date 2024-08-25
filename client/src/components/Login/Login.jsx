// function googleLogin() {
//   const provider = new GoogleAuthProvider();
//   const auth = getAuth();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);

//       localStorage.setItem("user", JSON.stringify(user));
//       hide(false);
//       window.scroll({ top: 0, behavior: "smooth" });
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// }
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import "../../style/login.css";

export default function ({ hide }) {
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      hide(false); // Hide the login if user is already logged in
    }
  }, []);

  // Function to simulate Google login (without Firebase)
  function googleLogin() {
    // Simulate user login with mock data
    const mockUser = {
      displayName: "John Doe",
      email: "john.doe@example.com",
    };

    // Save the user data to localStorage
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Call the hide function to close the modal or hide the login form
    hide(false);

    // Optionally, trigger any actions that should occur after login
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div
        className="container"
        style={{
          textAlign: "center",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p className="sub-pop">Get Started</p>

        {/* Google Login Button (simulated login) */}
        <div className="google-btn" onClick={googleLogin}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google icon"
            />
            <p className="btn-text text">
              <b>Sign in with Google</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
