function BookingCta({ onBookTable, onLookupBooking }) {
  return (
    <section
      className="px-4 py-20 text-center"
      style={{ background: "var(--color-warm-black)" }}
    >
      <div className="mx-auto max-w-xl">
        <h2
          className="mb-4 font-serif text-3xl"
          style={{ color: "rgba(240,216,144,.85)" }}
        >
          Ready for a special evening?
        </h2>
        <p className="mb-8" style={{ color: "rgba(240,216,144,.42)" }}>
          Reserve today. The best tables, like the best moments, do not wait.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onBookTable}
            className="btn-primary rounded-full px-8 py-3.5"
          >
            Choose my table
          </button>
          <button
            onClick={onLookupBooking}
            className="btn-ghost rounded-full px-7 py-3.5"
          >
            Find my booking
          </button>
        </div>
      </div>
    </section>
  );
}
export default BookingCta;
