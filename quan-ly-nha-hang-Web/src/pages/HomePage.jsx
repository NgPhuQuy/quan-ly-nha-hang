import NavigationBar from "../components/landing/NavigationBar";
import HeroIntro from "../components/landing/HeroIntro";
import BranchSection from "../components/landing/BranchSection";
import MenuGallery from "../components/landing/MenuGallery";
import CustomerTestimonials from "../components/landing/CustomerTestimonials";
import BookingCta from "../components/landing/BookingCta";
import Footer from "../components/landing/Footer";

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
