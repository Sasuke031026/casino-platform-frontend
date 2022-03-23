import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );
  }
}

function Responsive() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };
  return (
    <div className='nft' >
      <Slider {...settings}>
        <CustomSlide className='itm' index={1}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark1.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/home", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/home", "_self")}><h4>Abstraction</h4></span>
              <span>ERC-192</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={2}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark2.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Patternlicious</h4></span>
              <span>ERC-61</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={3}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark3.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Skecthify</h4></span>
              <span>ERC-126</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={4}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark4.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Cartoonism</h4></span>
              <span>ERC-73</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={5}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark5.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Virtuland</h4></span>
              <span>ERC-85</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={6}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark6.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Papercut</h4></span>
              <span>ERC-42</span>
            </div>
          </div>
        </CustomSlide>


        <CustomSlide className='itm' index={7}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark7.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/home", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/home", "_self")}><h4>Abstraction</h4></span>
              <span>ERC-192</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={8}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark8.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Patternlicious</h4></span>
              <span>ERC-61</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={9}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark9.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Skecthify</h4></span>
              <span>ERC-126</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={10}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark10.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Cartoonism</h4></span>
              <span>ERC-73</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={11}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark11.png" className="lazy img-fluid" style={{ height: "100px", width: "100%", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Virtuland</h4></span>
              <span>ERC-85</span>
            </div>
          </div>
        </CustomSlide>

        <CustomSlide className='itm' index={12}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src="assets/icon/mark12.png" className="lazy img-fluid" style={{ height: "100px", width: "100%" }} alt="" /></span>
            </div>
            <div className="nft_coll_pp">
              <span onClick={() => window.open("/#", "_self")}><img className="lazy" src="assets/icon/Atari.png" alt="" /></span>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <span onClick={() => window.open("/#", "_self")}><h4>Papercut</h4></span>
              <span>ERC-42</span>
            </div>
          </div>
        </CustomSlide>

      </Slider>
    </div>
  );
}
export default Responsive;