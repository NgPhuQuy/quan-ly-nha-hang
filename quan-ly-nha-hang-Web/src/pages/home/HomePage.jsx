import NavigationBar from "../../components/home/NavigationBar";
import HeroIntro from "../../components/home/HeroIntro";
import BranchSection from "../../components/home/BranchSection";
import MenuGallery from "../../components/home/MenuGallery";
import CustomerTestimonials from "../../components/home/CustomerTestimonials";
import BookingCta from "../../components/home/BookingCta";
import Footer from "../../components/home/Footer";

function HomePage({ onBookTable, onLookupBooking }) {
  return (
    <div>
      <NavigationBar onBookTable={onBookTable} onLookupBooking={onLookupBooking} />
      <HeroIntro onBookTable={onBookTable} />
      <BranchSection onBookTable={onBookTable} />
      <MenuGallery />
      <CustomerTestimonials />
      <BookingCta onBookTable={onBookTable} onLookupBooking={onLookupBooking} />
      <Footer />
    </div>
  );
}
export default HomePage;
