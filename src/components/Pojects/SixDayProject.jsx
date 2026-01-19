import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Frontend Developer",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        quote: "This platform has completely transformed how I build UI components. The speed and efficiency are unmatched!"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Project Manager",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        quote: "The best investment our team has made this year. The user interface is intuitive and very easy to navigate."
    },
    {
        id: 3,
        name: "Alisha Khan",
        role: "UX Designer",
        image: "https://randomuser.me/api/portraits/men/13.jpg",
        quote: "I love the attention to detail in the design. It's rare to find a tool that balances power with such beauty."
    }
];

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const { name, role, image, quote } = testimonials[currentIndex];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">

                {/* Image Section */}
                <div className="md:w-2/5 h-72 md:h-auto">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 md:p-14 flex flex-col justify-center relative">
                    <Quote className="text-indigo-50 absolute top-8 right-12 w-32 h-32" />

                    <div className="relative z-10">
                        <p className="text-gray-700 text-xl md:text-2xl italic leading-relaxed mb-8">
                            "{quote}"
                        </p>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
                            <p className="text-indigo-600 font-semibold text-lg">{role}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex mt-10 gap-5 relative z-10">
                        <button
                            onClick={prevSlide}
                            className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;