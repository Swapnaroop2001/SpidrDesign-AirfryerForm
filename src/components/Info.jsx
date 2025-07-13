import React from "react";

const InfoSection = () => {
    return (
        <div className="h-[100vh] relative w-full px-6 py-12 flex flex-col-reverse lg:flex-row items-center justify-between bg-[#333]">
            <div className="w-full lg:w-3/5 bg-[rgba(71,157,175,0.7)] text-center text-white p-10 shadow-2xl z-10 lg:relative lg:-mr-20 ">
                <h2 className="relative text-center font-light text-[2.5em] leading-[1.1] mt-5 mb-2 after:content-[''] after:block after:w-[120px] after:h-[2px] after:bg-white after:mt-[15px] after:mx-auto">
                    About Assessment
                </h2>

                <div className="text-[13px] py-[7.5px] text-white font-light leading-relaxed font-raleway text-left relative after:content-[''] after:bg-white after:h-[1px] after:w-[30px] after:absolute after:bottom-0 after:left-1/2 after:ml-[-15px]"
                >
                    <p>•Added User info: First/Last Name, Phone, Email, Cost Guess,and 16-digit Spidr PIN</p>
                    <p>•Implemented live formatting for the PIN as ####-####-####-####</p>
                    <p>•On submission, logs form data to the console and resets the form</p>
                    <p>•Styled to match Spidr Design with:</p>
                    <p>• Clean sans-serif font (Inter)</p>
                    <p>• Minimalist layout with generous spacing</p>
                    <p>• Colors: dark teal background #3b5b62, white form, black button</p>
                    <p>• Smooth hover/focus states and rounded inputs</p>
                    <p>•Deployed live with public GitHub repo and hosted link</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-6 lg:mb-0 relative z-0">
                <img
                    src="src/assets/airfryer.jpg"
                    alt="Profile"
                    className="max-w-[50rem] w-full h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default InfoSection;
