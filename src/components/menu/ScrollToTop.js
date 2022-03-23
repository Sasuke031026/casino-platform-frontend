import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [is_visible, setIs_visible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      toggleVisibility();
    });

    const totop = document.getElementById("scroll-to-top");
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        totop.classList.add("show");
      } else {
        totop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIs_visible(true);
    } else {
      setIs_visible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="scroll-to-top" className="init">
      {is_visible && (
        <div onClick={scrollToTop}>
          <i className=""></i>
        </div>
      )}
    </div>
  );
}
