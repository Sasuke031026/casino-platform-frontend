import React from "react";
import Slider from "react-slick";

export default function Partner() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 9,
        autoplay: true,
        autoplaySpeed: 100,
        cssEase: "linear",
        arrows: false,
    };

    return (
        <div className="partner">
            <Slider {...settings}>
                <img src="assets/logos/1.png" alt="" />
                <img src="assets/logos/2.png" alt="" />
                <img src="assets/logos/3.png" alt="" />
                <img src="assets/logos/4.png" alt="" />
                <img src="assets/logos/5.png" alt="" />
                <img src="assets/logos/6.png" alt="" />
                <img src="assets/logos/7.png" alt="" />
                <img src="assets/logos/8.png" alt="" />
                <img src="assets/logos/9.png" alt="" />
                <img src="assets/logos/1.png" alt="" />
                <img src="assets/logos/2.png" alt="" />
                <img src="assets/logos/3.png" alt="" />
                <img src="assets/logos/4.png" alt="" />
                <img src="assets/logos/5.png" alt="" />
                <img src="assets/logos/6.png" alt="" />
                <img src="assets/logos/7.png" alt="" />
                <img src="assets/logos/8.png" alt="" />
                <img src="assets/logos/9.png" alt="" />
            </Slider>
        </div>
    );
}
