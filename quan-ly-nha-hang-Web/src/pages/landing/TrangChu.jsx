import NavigationBar from "../../components/landing/home/NavigationBar";
import Hero from "../../components/landing/home/Hero";
import BranchSection from "../../components/landing/home/BranchSection";
import MenuGallery from "../../components/landing/home/MenuGallery";
import CustomerTestimonials from "../../components/landing/home/CustomerTestimonials";
import BookingCta from "../../components/landing/home/BookingCta";
import Footer from "../../components/landing/home/Footer";

function HomePage({ onBookTable, onLookupBooking }) {
  return (
    <div>
      <NavigationBar
        onBookTable={onBookTable}
        onLookupBooking={onLookupBooking}
      />
      <Hero onBookTable={onBookTable} />
      <BranchSection onBookTable={onBookTable} />
      <MenuGallery />
      <CustomerTestimonials />
      <BookingCta onBookTable={onBookTable} onLookupBooking={onLookupBooking} />
      <Footer />
    </div>
  );
}
export default HomePage;
