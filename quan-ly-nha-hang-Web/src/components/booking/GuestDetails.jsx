import { useState } from "react";
import { DIP_DAT_BAN } from "../../data/datBan";

function GuestDetails({ additionalServices, guestDetails, setGuestDetails, selectedServices, setSelectedServices, onConfirm, onBack }) {
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setGuestDetails((data) => ({ ...data, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: "" }));
  };

  const toggleService = (serviceId) => {
    setSelectedServices((services) => services.includes(serviceId) ? services.filter((id) => id !== serviceId) : [...services, serviceId]);
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!guestDetails.hoTen.trim()) validationErrors.hoTen = "Please enter your full name";
    if (!/^((0|\+84)[0-9]{8,10})$/.test(guestDetails.soDienThoai.trim())) validationErrors.soDienThoai = "Please enter a valid phone number";
    setErrors(validationErrors);
    if (!Object.keys(validationErrors).length) onConfirm();
  };

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p className="text-xs uppercase tracking-[.2em]" style={{ color: "rgba(200,136,42,.6)" }}>Step 4</p>
      <h1 className="mb-8 mt-2 font-serif text-2xl" style={{ color: "rgba(240,216,144,.9)" }}>Your details</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2"><label className="mb-2 block text-sm">Full name</label><input className="input-warm px-4 py-3" value={guestDetails.hoTen} onChange={(event) => updateField("hoTen", event.target.value)} />{errors.hoTen && <p className="mt-1 text-xs text-red-400">{errors.hoTen}</p>}</div>
        <div><label className="mb-2 block text-sm">Phone number</label><input className="input-warm px-4 py-3" value={guestDetails.soDienThoai} onChange={(event) => updateField("soDienThoai", event.target.value)} placeholder="0912345678" />{errors.soDienThoai && <p className="mt-1 text-xs text-red-400">{errors.soDienThoai}</p>}</div>
        <div><label className="mb-2 block text-sm">Email</label><input type="email" className="input-warm px-4 py-3" value={guestDetails.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" /></div>
        <div><label className="mb-2 block text-sm">Occasion</label><select className="select-warm px-4 py-3" value={guestDetails.dip} onChange={(event) => updateField("dip", event.target.value)}>{DIP_DAT_BAN.map((occasion) => <option key={occasion.id} value={occasion.id}>{occasion.ten}</option>)}</select></div>
        <div><label className="mb-2 block text-sm">Notes</label><input className="input-warm px-4 py-3" value={guestDetails.ghiChu} onChange={(event) => updateField("ghiChu", event.target.value)} placeholder="A table by the window..." /></div>
      </div>
      <div className="mt-8"><p className="mb-3 text-sm">Enhance your experience</p><div className="grid gap-3 sm:grid-cols-2">{additionalServices.map((service) => { const isSelected = selectedServices.includes(service.id); return <button key={service.id} onClick={() => toggleService(service.id)} className="rounded-xl p-3 text-left" style={{ background: isSelected ? "rgba(200,136,42,.11)" : "rgba(200,136,42,.035)", border: `1px solid ${isSelected ? "rgba(200,136,42,.5)" : "rgba(200,136,42,.1)"}` }}><span className="text-sm">{service.bieuTuong} {service.ten}</span><span className="float-right text-xs" style={{ color: "rgba(232,184,75,.8)" }}>{service.gia.toLocaleString("vi-VN")}₫</span></button>; })}</div></div>
      <div className="mt-8 flex gap-3"><button onClick={onBack} className="btn-ghost flex-1 rounded-xl py-3">Back</button><button onClick={validateForm} className="btn-primary flex-1 rounded-xl py-3">Confirm booking</button></div>
    </div>
  );
}
export default GuestDetails;
