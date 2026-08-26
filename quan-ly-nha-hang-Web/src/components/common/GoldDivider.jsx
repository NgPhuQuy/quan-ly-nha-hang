function GoldDivider() {
  return (
    <div className="my-2 flex items-center gap-3">
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(200,136,42,.45))",
        }}
      />
      <svg width="9" height="9" viewBox="0 0 9 9">
        <path
          d="M4.5 0L6 3H9L6.5 5L7.5 9L4.5 7L1.5 9L2.5 5L0 3H3Z"
          fill="rgba(200,136,42,.6)"
        />
      </svg>
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(90deg,rgba(200,136,42,.45),transparent)",
        }}
      />
    </div>
  );
}
export default GoldDivider;
