"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";

export default function ProductSlider({ images }: { images: string[] }) {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div>
      <Slider {...settings}>
        {images.map((image) => {
          return (
            <div key={image}>
              <Image
                src={image}
                alt="img1"
                width={1000}
                height={1000}
                className="w-full h-96 object-cover"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
