import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

function SliderComponent() {
  return (
    <div className="relative h-screen">
      <Carousel
        className="h-full"
        autoPlay={true}
        interval={5000}
        pauseOnHover={true}
      >
        <div className="relative h-full">
          <img
            src="https://www.1883.com/app/uploads/2022/10/1883_WebDD-All-designers-collectif-copie-2.jpg" // Placeholder image
            alt="Beverage Showcase"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 text-center grid place-items-center bg-black bg-opacity-50">
            <div className="text-white w-3/4 md:w-2/4">
              <h1 className="text-4xl md:text-4xl lg:text-5xl mb-4 font-bold">
                Join Our Barista
              </h1>
              <p className="opacity-80 mb-12 text-xl">
              “We, Drink Designers, mixologist, barista, designer, chef, storyteller, want Drinks that stimulate the imagination, the emotions and the senses, without limits, without constraint. Collectively, we open new horizons: each Drink is a story to be tasted. Each tasting is a unique multi- sensory experience.”              </p>
              <Link
                to="/contact"
                className=" text-white text-xl  font-semibold"
              >Join
</Link>
            </div>
            
          </div>
        </div>

        <div className="relative h-full">
        <iframe src=" https://player.vimeo.com/video/543042977?background=1" width="100%" height="100%"  allow="autoplay; fullscreen" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
          <div className="absolute inset-0 text-center grid place-items-center bg-black bg-opacity-50">
            <div className="text-white w-3/4 md:w-2/4">
              <h1 className="text-5xl md:text-4xl lg:text-5xl mb-4 font-bold">
               
                syrup crafted in the French Alps since 1883.



              </h1>
              <p className="opacity-80 mb-12 text-xl">
                The encounter between purity and intensity, between emotion and inspiration.
                Discover our exclusive offers on a wide range of drinks. Enjoy unbeatable prices and special deals!
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/558537425?background=1"
              title="Barista Video"
              className="absolute top-0 left-0 h-full w-full object-cover"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ height: '100%', width: '100%' }}
            ></iframe>
          </div>
          <div className="absolute inset-0 text-center grid place-items-center bg-black bg-opacity-50">
            <div className="text-white w-3/4 md:w-2/4">
              <h1 className="text-5xl md:text-4xl lg:text-5xl mb-4 font-bold">
                Join Our Barista Community!
              </h1>
              <p className="opacity-80 mb-12 text-xl">
                Watch our baristas in action and learn tips and tricks for brewing the perfect cup. Be part of our vibrant community!
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default SliderComponent;
