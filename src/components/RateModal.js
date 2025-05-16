import React from "react";
import Modal from "./Modal";

function RateModal({ open, onClose, settings, setSettings }) {
  // 處理 Modal 確認按鈕
  function handleOk() {
    onClose();
  }
  // 匯率設定表單
  // ...之後補充完整互動表單
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      title={<span style={{fontSize:20, fontWeight:700}}>匯率設定</span>}
      width={350}
      bodyStyle={{fontFamily: 'Noto Sans TC, Arial, sans-serif', fontSize:16, lineHeight:'1.8'}}
    >
      <h2 style={{fontSize:20, fontWeight:700}}>匯率設定</h2>
      <div style={{fontSize:16}}>（匯率設定內容稍後補上）</div>
      <button style={{fontSize:16}} onClick={onClose}>關閉</button>
    </Modal>
  );
}
export default RateModal;
