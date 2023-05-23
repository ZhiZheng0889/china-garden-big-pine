// vonage.js
import Vonage from '@vonage/server-sdk';

export const vonage = new Vonage({
  apiKey: process.env.VONAGE_KEY,
  apiSecret: process.env.VONAGE_SECRET,
});

// Verify.js
import React, { useState } from 'react';
import { vonage } from './vonage';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import Card from '../../components/Card/Card';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input/Input';

const Verify = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [code, setCode] = useState('');
  const [verificationError, setVerificationError] = useState(null);
  const [buttonText, setButtonText] = useState('Send Code');
  const navigate = useNavigate();

  // Add a new state variable for the request timestamps
  const [requestTimestamps, setRequestTimestamps] = useState([]);

  const onPhoneNumberChange = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const onCodeChange = ({ target }) => {
    setCode(target.value);
  };

  const sendVerificationCode = async (event) => {
    event.preventDefault();
  
    // Filter out timestamps older than 24 hours and 1 minute
    const validTimestampsDay = requestTimestamps.filter(
      (timestamp) => Date.now() - timestamp < 24 * 60 * 60 * 1000
    );
    const validTimestampsMinute = requestTimestamps.filter(
      (timestamp) => Date.now() - timestamp < 60 * 1000
    );
  
    // Limit requests to 10 times per 24 hours
    if (validTimestampsDay.length >= 10) {
      setError('You can only make a request 10 times per day.');
      return;
    }
  
    // Limit requests to 1 time per minute
    if (validTimestampsMinute.length >= 1) {
      setError('You can only make a request once per minute.');
      return;
    }
  
    setButtonText('Sending Code...');
    try {
      const response = await vonage.verify.request({
        number: phoneNumber,
        brand: 'Your Brand Name',
      });
      setSession(response.request_id);
      setButtonText('Code Sent!');
      // Save the timestamp of the current request
      setRequestTimestamps([...validTimestampsDay, Date.now()]);
    } catch (error) {
      setError(error);
    }
  };  

  const verifyCode = async (event) => {
    event.preventDefault();
    try {
      const response = await vonage.verify.check({
        request_id: session,
        code,
      });
      if (response.status === 0) {
        // Verification successful
        navigate('/dashboard');
      } else {
        // Verification failed
        setVerificationError('Invalid code. Please try again.');
      }
    } catch (error) {
      setVerificationError(error);
    }
  };

  return (
    <div className="bg-slate-100 flex justify-center h-screen">
      <Card classes="w-[30rem] md:mt-4 h-min">
        {error && <ErrorAlert error={error} />}
        {verificationError && <ErrorAlert error={verificationError} />}
        {!session ? (
          <>
            <p className="text-center">Verify your phone number</p>
            <h1 className="text-center text-2xl font-semibold">China Garden</h1>
            <Form onSubmit={sendVerificationCode}>
              <Input
                onChange={onPhoneNumberChange}
                value={phoneNumber}
                type="tel"
                name="phone_number"
                placeholder="Enter phone number"
                label="Phone Number"
                />
                <button className="btn">{buttonText}</button>
              </Form>
            </>
          ) : (
            <>
              <p className="text-center">Enter the verification code</p>
              <h1 className="text-center text-2xl font-semibold">China Garden</h1>
              <Form onSubmit={verifyCode}>
                <Input
                  onChange={onCodeChange}
                  value={code}
                  type="number"
                  name="verification_code"
                  placeholder="Enter the code"
                  label="Verification Code"
                />
                <button className="btn">Verify</button>
              </Form>
            </>
          )}
        </Card>
      </div>
    );
  };
  
  export default Verify;
  
