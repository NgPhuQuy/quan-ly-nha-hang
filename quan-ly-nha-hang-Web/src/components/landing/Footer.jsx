function Footer() {
  return (
    <footer
      id="contact"
      className="border-t px-4 py-14 sm:px-10"
      style={{ background: "#0a0704", borderColor: "rgba(200,136,42,.08)" }}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p
            className="font-serif text-lg"
            style={{ color: "rgba(240,216,144,.85)" }}
          >
            5S Dining
          </p>
          <p
            className="mt-3 text-xs leading-relaxed"
            style={{ color: "rgba(240,216,144,.28)" }}
          >
            A premium restaurant group with more than 15 years of creating
            memorable moments.
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider"
            style={{ color: "rgba(200,136,42,.52)" }}
          >
            Locations
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.3)]">Hoan Kiem</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">Tay Ho</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">Ba Dinh</p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider"
            style={{ color: "rgba(200,136,42,.52)" }}
          >
            Opening hours
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.3)]">
            T2–T5: 11:00–22:00
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            T6–T7: 10:00–23:00
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            CN: 10:00–22:00
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider"
            style={{ color: "rgba(200,136,42,.52)" }}
          >
            Contact
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.3)]">1800 5678</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            hello@5sdining.vn
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            Hanoi, Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
