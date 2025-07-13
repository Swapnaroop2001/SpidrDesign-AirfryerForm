import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    pin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const digits = value.replace(/\D/g, "");
      let formattedPin = "";
      for (let i = 0; i < digits.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedPin += "-";
        }
        formattedPin += digits[i];
      }
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPin,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      guess: "",
      pin: "",
    });
  };

  const labelClass = "text-x block text-black";
  const inputClass ="w-full h-9 text-xl placeholder:text-base text-black rounded border border-black  focus:outline-none focus:border-black focus:shadow-lg focus:ring-2 transition-all duration-300 ease-in-out";

  return (
    <div className="w-screen h-screen bg-[rgba(71,157,175)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-8  p-5">
        <div className="text-center">
        <h1 className="text-4xl text-black relative pb-2 after:content-[''] after:bg-black after:h-[1px] after:w-[30px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2" >
  Spidr Air Fryer Form
</h1>

        </div>

        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className={labelClass}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={inputClass}
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className={labelClass}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={inputClass}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label htmlFor="phone text-2xl" className={labelClass}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={inputClass}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={inputClass}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email.."
            required
          />
        </div>

        {/* Guess */}
        <div className="mb-3">
          <label htmlFor="guess" className={labelClass}>
            Guess the Air Fryer's Cost
          </label>
          <input
            type="number"
            id="guess"
            name="guess"
            className={inputClass}
            value={formData.guess}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Pin */}
        <div className="mb-3">
          <label htmlFor="pin" className={labelClass}>
            Enter 16-digit Pin
          </label>
          <input
            type="text"
            id="pin"
            name="pin"
            className={inputClass}
            value={formData.pin}
            onChange={handleChange}
            required
            maxLength={19}
            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
            placeholder=" for ex. 1234-5678-9012-3456"
          />
        </div>

        {/* Submit */}
        <div className="w-full flex justify-center">
        <button
  type="submit"
  className="w-fit cursor-pointer px-3 py-1.5 text-sm leading-relaxed border border-black text-black bg-transparent rounded-none transition-all duration-200 ease-in-out mt-[15px] 
             hover:bg-black/60 hover:border-[#56acbd] 
             focus:bg-black/60 focus:border-[#56acbd]"
>
  Submit
</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
