import React, { useState, useRef, useEffect } from "react";

const useScrollFadeIn = (
    direction = "none",
    duration = 1500,
    delay = 0,
    fadeDistance = 250
) => {
    const element = useRef();

    useEffect(() => {
        const { current } = element;
        if (!current) return;

        // Initial hide
        current.style.opacity = 0;

        if (direction === "left") {
            current.style.transform = `translateX(-${fadeDistance}px)`;
        } else if (direction === "right") {
            current.style.transform = `translateX(${fadeDistance}px)`;
        } else {
            current.style.transform = "none";
        }

        const handleScroll = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Show element
                    current.style.transitionProperty = "opacity, transform";
                    current.style.transitionDuration = `${duration}ms`;
                    current.style.transitionTimingFunction = "ease-out";
                    current.style.transitionDelay = `${delay}ms`;
                    current.style.opacity = 1;
                    current.style.transform = "translateX(0)";
                } else {
                    // Hide element again when out of view
                    current.style.transitionProperty = "opacity, transform";
                    current.style.transitionDuration = "300ms";
                    current.style.transitionTimingFunction = "ease-in";
                    current.style.transitionDelay = "0ms";
                    current.style.opacity = 0;

                    if (direction === "left") {
                        current.style.transform = `translateX(-${fadeDistance}px)`;
                    } else if (direction === "right") {
                        current.style.transform = `translateX(${fadeDistance}px)`;
                    } else {
                        current.style.transform = "none";
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleScroll, {
            threshold: 0.1,
        });

        observer.observe(current);

        return () => observer.unobserve(current);
    }, [direction, duration, delay, fadeDistance]);

    return element;
};

const ProfileCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    const profileData = {
        name: "Swapnaroop",
        title: "Software Engineer & Problem-Solving Enthusiast",
        description: `I'm a passionate developer who recently completed a Master’s degree in Computer Science at Stevens Institute of Technology. I have a strong foundation in full-stack development and love building intuitive user interfaces and scalable backend systems. I’ve worked at two fast-paced startups where I honed my skills in both UI design and coding, becoming fluent in creating seamless user experiences. Whether I’m designing marketplace platforms or integrating complex APIs, I focus on delivering clean, efficient, and impactful solutions. Outside the world of code, I’m a cinephile as well as a huge fan of "Game of Thrones" and "How I Met Your Mother" — I can quote scenes from both like it’s my job. I also love sports, especially soccer and cricket. I’m known for my curiosity, upbeat attitude, and a growing collection of side projects that blend creativity with tech.`,

        image: "https://github.com/Swapnaroop2001/SpidrDesign-AirfryerForm/blob/main/src/assets/Myphoto.png",
        gif: "https://github.com/Swapnaroop2001/SpidrDesign-AirfryerForm/blob/main/src/assets/giphy.gif",
    };

    // Add fade-in refs for all fade-in elements including h3 header
    const headerRef = useScrollFadeIn("none", 1500, 0); 
    const imageRef = useScrollFadeIn("none", 2500, 0); 
    const nameRef = useScrollFadeIn("left", 600, 400, 150); 
    const titleRef = useScrollFadeIn("left", 600, 400, 150); 
    const descRef = useScrollFadeIn("right", 600, 600, 150); 

    return (
        <div
            id="profile-card"
            className="flex flex-col min-h-screen w-full bg-[#333] font-'Raleway' items-center px-4 py-12"
        >
            {/* Fade-in heading */}
            <div>
                <h3 ref={headerRef} className="text-xl text-white py-3">
                    About Me
                </h3>
            </div>

            {/* Image container with hover effect */}
            <div
                ref={imageRef}
                className="w-56 h-56 rounded-full border-7 border-[#479daf] overflow-hidden mb-8 shadow-xl relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={isHovered ? profileData.gif : profileData.image}
                    alt={profileData.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />
            </div>

            {/* Name */}
            <h1
                ref={nameRef}
                className="text-[24px] text-[#56acbd] font-light mt-0 mb-1.5 p-0 text-center"
            >
                {profileData.name}
            </h1>

            {/* Title */}
            <h2
                ref={titleRef}
                className="mb-4 p-0 text-[16px] text-[#969696] font-light text-center"
            >
                {profileData.title}
            </h2>

            {/* Description */}
            <div
                ref={descRef}
                className="max-w-3xl text-white text-left px-4 relative"
            >
                <p className="text-[13px] py-4 text-[#d1d0ce] font-light leading-relaxed">
                    {profileData.description}
                </p>

                <div className="absolute bottom-0 left-1/3 w-1/3 border-b-5 border-[#479daf] pointer-events-none"></div>
            </div>
        </div>
    );
};

export default ProfileCard;
