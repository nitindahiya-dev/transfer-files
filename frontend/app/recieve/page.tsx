import AboutUs from "@/components/AboutUs";
import Download from "@/components/Download";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Download />
      <AboutUs />
      <Faq />
      <Footer />
    </div>
  );
}
