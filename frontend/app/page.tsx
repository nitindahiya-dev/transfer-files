import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <AboutUs />
      <Faq />
      <Footer />
    </div>
  );
}
