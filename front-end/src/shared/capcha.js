import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef } from "react";

const Capcha = () => {
  const captchaRef = useRef(null);

  const handleToken = () => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    console.log("Captcha value:", token);
  };
  return (
    <div className="m-3">
      <ReCAPTCHA
        sitekey='6Ld3ON8iAAAAALlgC4b6srR57jRknmVeEAPXw3jD'
        onChange={handleToken}
        theme="light"
        badge="inline"
        ref={captchaRef}
      />
    </div>
  );
};

export default Capcha;
