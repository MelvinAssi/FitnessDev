import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fd_carousel1 from "../assets/images/fd_carousel1.jpg"; 
import fd_carousel2 from "../assets/images/fd_carousel2.jpg";
import fd_carousel3 from "../assets/images/fd_carousel3.jpg";
import fd_carousel4 from "../assets/images/fd_carousel4.jpg";
import fd_carousel5 from "../assets/images/fd_carousel5.jpg";
import fd_carousel6 from "../assets/images/fd_carousel6.jpg";

const CarouselContainer = styled.div`
    border-radius: 20px;
    height:500px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const CarouselWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    overflow: hidden;
`;


const CarouselItem = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color5);
    border-radius: 20px;
`;

const CarouselImg = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${({ $img }) => `url(${$img})`};
`;

const CarouselDots = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
`;

const Dot = styled.div`
    width: 15px;
    height: 15px;
    background-color: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
        background-color: #9a1b14;
    }
`;

const Carousel = () => {
    const items = [
        { id: 1, img: fd_carousel1 },
        { id: 2, img: fd_carousel2 },
        { id: 3, img: fd_carousel3 },
        { id: 4, img: fd_carousel4 },
        { id: 5, img: fd_carousel5 },
        { id: 6, img: fd_carousel6 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === items.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <CarouselContainer>
            <CarouselWrapper>
                <CarouselItem>
                    <CarouselImg style={{ backgroundImage: `url(${items[currentIndex].img})` }} />
                </CarouselItem>
                <CarouselDots>
                    {items.map((item, index) => (
                        <Dot
                            key={item.id}
                            className={currentIndex === index ? "active" : ""}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </CarouselDots>
            </CarouselWrapper>
        </CarouselContainer>
    );
};

export default Carousel;