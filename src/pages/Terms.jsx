import React from "react";
import { Link } from "react-router-dom";

function TermsAndConditions() {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center select-none">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
                <h1>1. Acceptance of Terms</h1>
           
                <p>- By using Emolink, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the app.</p>
                <h1>2. Eligibility</h1>
                <p>- You must be at least 12 years old or the legal age of majority in your jurisdiction to use Emolink. By using the app, you confirm that you meet this age requirement.</p>

                <h1>3. User Accounts</h1>
                <p>- You are responsible for maintaining the confidentiality of your account information, including your username and password.</p>
                <p>- You are responsible for all activities that occur under your account.</p>
                <p>- You agree to provide accurate and up-to-date information during the registration process.</p>

                <h1>4. Privacy</h1>
                <p>- Your use of Emolink is also governed by our Privacy Policy. Please review the Privacy Policy to understand how your information is collected, used, and shared.</p>

                <h1>5. Prohibited Conduct</h1>
                You agree not to:
                <p>- Violate any applicable laws or regulations.</p>
                <p>- Impersonate another person or entity.</p>
                <p>- Harass, threaten, or harm other users.</p>
                <p>- Use the app for any unlawful or fraudulent purpose.</p>
                <p>- Share explicit, offensive, or inappropriate content.</p>

                <h1>6. Intellectual Property</h1>
                <p>- You may not use the app's name, logo, or content for commercial purposes without written permission from Emolink</p>

                <h1>7. Termination</h1>
                <p>- Emolink reserves the right to terminate or suspend your account for any reason, without notice.</p>

                <h1>9. Changes to Terms</h1>
                <p>- Emolink may update these Terms and Conditions from time to time. It is your responsibility to review the terms periodically.</p>

                <h1>10. Contact Information</h1>
                <p>- If you have any questions or concerns about these Terms and Conditions, please contact us at emolink@gmail.com.</p>
               
            </div>

            <Link to="/signin" className="mt-4 text-primary font-semibold cursor-pointer">
                Back to Sign In
            </Link>
        </div>
    );
}

export default TermsAndConditions;
