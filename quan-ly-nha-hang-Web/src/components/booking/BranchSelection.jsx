import { useEffect, useState } from "react";
import { fetchBranches } from "../../services/branch.service";
import DatePicker from "./DatePicker";

function BranchSelection({ branchId, setBranchId, date, setDate, guestCount, setGuestCount, onContinue }) {
  const [branches, setBranches] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    fetchBranches()
      .then((data) => {
        if (data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);

  const displayedDate = date
    ? new Date(date + "T00:00").toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Select a date";

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p className="text-xs uppercase tracking-[.2em]" style={{ color: "rgba(200,136,42,.6)" }}>Step 1</p>
      <h1 className="mb-8 mt-2 font-serif text-2xl" style={{ color: "rgba(240,216,144,.9)" }}>Choose a branch and date</h1>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Branch</label>
          <select value={branchId} onChange={(event) => setBranchId(event.target.value)} className="select-warm px-4 py-3">
            <option value="">Select a branch</option>
            {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.ten}</option>)}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <label className="mb-2 block text-sm">Date</label>
            <button type="button" onClick={() => setIsCalendarOpen((isOpen) => !isOpen)} className="select-warm px-4 py-3 text-left">{displayedDate}</button>
            {isCalendarOpen && <div className="absolute z-20 mt-2 w-full min-w-[280px]"><DatePicker value={date} onChange={(nextDate) => { setDate(nextDate); setIsCalendarOpen(false); }} /></div>}
          </div>
          <div>
            <label className="mb-2 block text-sm">Guests</label>
            <input type="number" min="1" max="20" value={guestCount} onChange={(event) => setGuestCount(Number(event.target.value))} className="input-warm px-4 py-3" />
          </div>
        </div>
        <button onClick={onContinue} disabled={!branchId || !date} className="btn-primary w-full rounded-xl py-3">Continue to time selection</button>
      </div>
    </div>
  );
}
export default BranchSelection;
