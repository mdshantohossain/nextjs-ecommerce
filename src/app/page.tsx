import ProductSection from "@/components/home/exclusive-products";
import Slider from "@/components/home/slider";
import TrendingProducts from "@/components/home/trending-products";
import TestimonialsSection from "@/components/home/testimonials";
import BrandSliderSection from "@/components/home/brand-slide-section";

const images = [
  {
    src: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    alt: "Slide 1",
  },
  {
    src: "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
    alt: "Slide 2",
  },
  {
    src: "https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
    alt: "Slide 3",
  },
  {
    src: "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
    alt: "Slide 4",
  },
];
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        <Slider
          images={images}
          className="aspect-[21/9] md:aspect-[21/7] max-h-[600px]"
        />
      </div>

      <main className="container mx-auto px-4 py-8">
        <ProductSection />

        <TrendingProducts />

        <TestimonialsSection />

        <BrandSliderSection />
      </main>
    </div>
  );
}
