import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Figure, Image } from 'react-bootstrap'
import Amazon from '../assets/images/amazon-logo.png'
import Ebay from '../assets/images/ebay.png'
import { Link } from 'react-router-dom'


function DealSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        autoplay: true,
        centerPadding: '60px',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
    }

    return (
        <Slider {...settings} className='deal-slider'>
            <Link to="https://www.amazon.com/sale/s?k=sale">
                <div className='slider-items text-center'>
                    <div className='deal-wrapper'>
                        <div className='inner-content'>
                            <Figure className='mb-4'>
                                <Image src={Amazon} />
                            </Figure>
                            <h2 className='head-h2 fw-bold'>
                                Memorial Day sale
                            </h2>
                            <div className='discount-price red fw-bold'>
                                25% <span className='off-text'>off</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="https://www.ebay.com/b/Featured-Sale/bn_7006482159">
                <div className='slider-items text-center'>
                    <div className='deal-wrapper'>
                        <div className='inner-content'>
                            <Figure className='mb-4'>
                                <Image src={Ebay} />
                            </Figure>
                            <h2 className='head-h2 fw-bold'>
                                Memorial Day sale
                            </h2>
                            <div className='discount-price red fw-bold'>
                                25% <span className='off-text'>off</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="https://www.amazon.com/sale/s?k=sale">
                <div className='slider-items text-center'>
                    <div className='deal-wrapper'>
                        <div className='inner-content'>
                            <Figure className='mb-4'>
                                <Image src={Amazon} />
                            </Figure>
                            <h2 className='head-h2 fw-bold'>
                                Memorial Day sale
                            </h2>
                            <div className='discount-price red fw-bold'>
                                25% <span className='off-text'>off</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <Link to="https://www.ebay.com/b/Featured-Sale/bn_7006482159">
                <div className='slider-items text-center'>
                    <div className='deal-wrapper'>
                        <div className='inner-content'>
                            <Figure className='mb-4'>
                                <Image src={Ebay} />
                            </Figure>
                            <h2 className='head-h2 fw-bold'>
                                Memorial Day sale
                            </h2>
                            <div className='discount-price red fw-bold'>
                                25% <span className='off-text'>off</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Slider>
    )
}

export default DealSlider
