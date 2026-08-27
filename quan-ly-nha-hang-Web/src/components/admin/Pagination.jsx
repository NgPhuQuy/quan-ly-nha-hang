export default function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        justifyContent: "flex-end",
        padding: "12px 16px",
      }}
    >
      <span style={{ fontSize: 12.5, color: "#7a6248", marginRight: 4 }}>
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} / {total}
      </span>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              border: pageNumber === page ? "none" : "1px solid #e5ddd0",
              background: pageNumber === page ? "#c9922a" : "#fff",
              color: pageNumber === page ? "#fff" : "#5a4030",
              fontWeight: pageNumber === page ? 700 : 400,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {pageNumber}
          </button>
        ),
      )}
    </div>
  );
}
