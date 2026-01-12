import { useState } from "react";

function App() {
    // Track which FAQ item is open
    const [openId, setOpenId] = useState(null);

    // FAQ data
    const faqs = [
        {
            id: 1,
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces."
        },
        {
            id: 2,
            question: "What is Tailwind CSS?",
            answer: "Tailwind CSS is a utility-first CSS framework."
        },
        {
            id: 3,
            question: "How does this FAQ work?",
            answer: "It uses React state to toggle answers open and closed."
        }
    ];

    // Toggle function
    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Simple FAQ
            </h1>

            <div className="space-y-4">
                {faqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 font-semibold"
                        >
                            <span>{faq.question}</span>
                            <span className="text-xl">
                                {openId === faq.id ? "−" : "+"}
                            </span>
                        </button>

                        {openId === faq.id && (
                            <div className="p-4 bg-white border-t text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
