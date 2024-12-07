import { AnimatedTestimonials } from "./animated-testimonials";


export function TestimonialsSection() {
    const testimonials = [
        {
            quote:
                "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
            name: "Kevin Omondi",
            designation: "CEO at Crafty Glity Furnitures",
            src: "/logos/Crafty Glity Logo.jpeg",
        },
        {
            quote:
                "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
            name: "Michael Kimani",
            designation: "Manager at Jojawa Drops",
            src: "/logos/Jojawa Drops.jpg",
        },
        {
            quote:
                "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: "Joseph Waweru",
            designation: "Operations Manager at Premium Car Wash",
            src: "/logos/Prenium Car Wash.jpg",
        },

    ];
    return (
        <section id="testimonials" className="bg-neutral-100 px-4 lg:px-6">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 items-center w-full">
                <h2 className="text-4xl tracking-wider sm:text-6xl tracking-wider w-full max-w-lg font-bold">What the SMEs think about us</h2>
                <AnimatedTestimonials testimonials={testimonials} />
            </div>
        </section>
    );
}
