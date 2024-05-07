import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { animate, motion, useAnimationControls } from "framer-motion";
import '../style/App.css';
import { FaArrowLeft } from "react-icons/fa";

import Illustration from "../assets/Verification.svg"

import Circle from '../components/Circle';
import logo from '../assets/LeaftyLogo.svg';
import OtpInput from 'react-otp-input';
import Button from '../components/Button';
import LoadingCircle from '../components/LoadingCircle';
import Image from '../components/Images';


function Verification() {
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [showLoadingCircle, setShowLoadingCircle] = useState(false);

    const controls = useAnimationControls();
    const location = useLocation();
    const navigate = useNavigate();

    const { emailAddress } = location.state || {};
    const [email, setEmail] = useState(emailAddress);
    const [isImageVisible, setIsImageVisible] = useState(false);

    useEffect(() => {
        if (isVerified) {
            setTimeout(() => {controls.start("verifiedOTP"); setIsImageVisible(false);}, 1000);
            setTimeout(() => setShowLoadingCircle(true), 2000);
            setTimeout(() => {
                // setShowLoadingCircle(false);
                // setIsVerified(!isVerified);
                // controls.start("initial");
                navigate('/dashboard', { state: { emailAddress: email } })
            }, 10000);
        }
        else{
            setTimeout(() => setIsImageVisible(true), 1000);
        }
    }, [isVerified]);

    const handleGoBack = ()=>{
        navigate(-1);
    }

    const handleVerify = () => {
        setIsVerified(!isVerified);
    };

    return (
        <div className='flex w-screen h-screen overflow-hidden disable-zoom'>
            <Button id = "back" label={<FaArrowLeft />} onClick={handleGoBack}></Button>
            {/* Login Contents */}
            <div id="contents" className="flex flex-col w-1/2 h-screen m-20 gap-4 max-w-md">
                <img className="w-20 h-20" src={logo} alt="Logo" />
                <div className='flex flex-col'>
                    <span className='font-bold text-3xl'>Verify Your Account</span>
                    <span className='text-xl font-medium' style={{ color: "#606060" }}>Enter the code that we have sent to <span style={{ color: "#79B2B7" }}>{email}</span></span>
                </div>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span style={{ margin: '0 0.65vw' }} />}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{ width: "60px", height: "60px", background: "#CAE3DA", borderRadius: "0.5rem" }}
                />

                <div className='flex flex-row justify-end items-center'>
                    <span style={{ color: "#79B2B7" }}>Resend Code</span>
                </div>
                <Button background="#0F7275" color="#F7FAFC" label="Submit" onClick={handleVerify}></Button>
                <span className='flex justify-center gap-2'>Verify with Phone Number?<button className={"font-bold"} style={{ color: "#79B2B7" }}>Switch</button></span>
                {/* <span className='flex justify-center gap-2'>Don't have an account?<button onClick={() => setIsRegister(!isRegister)} className={"font-bold"} style={{ color: "#79B2B7" }}>Sign Up</button></span> */}
            </div>
            {/* End of Login Contents */}
            
            {/* Features */}
            <motion.div className='w-1/2 h-screen relative justify-end items-center'
                initial={{
                    left: "0%"
                }}
                transition={{
                    duration: 2.5,
                    type: "spring"
                }}
                variants={{
                    initial: {
                        left: "0%"
                    },
                    verifiedOTP: {
                        left: "-100%"
                    }
                }}      
                animate={controls}
            >
                {/* TODO: Image Carousel */}
                <div className='z-0'>
                    <Circle color="#94C3B3" opacity={"50%"} position={{ left: "0%", bottom: "-45%" }} />
                    <Circle color="#94C3B3" opacity={"50%"} position={{ left: "7.5%", bottom: "-45%" }} />
                    <Circle color="#94C3B3" opacity={"100%"} position={{ left: "15%", bottom: "-45%" }} />
                    {/* Render the loading circle in the middle of the page */}
                    {showLoadingCircle && <LoadingCircle />}
                </div>
            </motion.div>
            <Image img = {Illustration} isVisible = {isImageVisible}/>
            {/* End of Features */}
        </div>
    );
}

export default Verification;