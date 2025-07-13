import { useEffect } from "react";

const ScrollDownButton = () => {
  useEffect(() => {
    const link = document.getElementById("scroll-down-link");
    link?.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#company-info");
      target?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-10 animate-fade-in">
      <a
        href="#company-info"
        id="scroll-down-link"
        className="group text-gray-300 font-light text-xs transition-colors duration-300 hover:text-[#479daf]"
      >
        <i className="fa fa-chevron-down text-[0.6rem] mb-1 animate-bounce transition-colors duration-300 group-hover:text-[#479daf]" />
        <br />
        scroll
      </a>
    </div>
  );
};

export default ScrollDownButton;
