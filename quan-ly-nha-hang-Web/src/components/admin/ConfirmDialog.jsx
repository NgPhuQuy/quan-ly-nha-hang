import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({ open, onClose, onConfirm, message }) {
  return <Modal open={open} onClose={onClose} title="Xác nhận"><p style={{ margin: "0 0 20px", color: "#5a4030", fontSize: 14, lineHeight: 1.6 }}>{message}</p><div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}><Button variant="ghost" onClick={onClose}>Hủy</Button><Button variant="danger" onClick={() => { onConfirm(); onClose(); }}>Xác nhận xóa</Button></div></Modal>;
}
