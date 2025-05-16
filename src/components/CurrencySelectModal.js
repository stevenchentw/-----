import React from "react";
import { Modal, Row, Col } from "antd";

const currencyList = [
  { code: "JPY", label: "JPY" },
  { code: "KRW", label: "KRW" },
  { code: "USD", label: "USD" },
  { code: "CNY", label: "CNY" },
  { code: "AUD", label: "AUD" },
];

function CurrencySelectModal({ open, onClose, selected, onSelect, rates }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      closeIcon={<span style={{fontSize:28,lineHeight:1}}>×</span>}
      bodyStyle={{padding:'16px 24px 0 24px', background:'#f8fafd'}} 
      destroyOnClose
    >
      <div style={{marginBottom:12, textAlign:'center'}}>
        <span style={{fontSize:15, color:'#888'}}>請選擇幣別</span>
      </div>
      <div style={{margin:'0 0 8px 0'}}>
        {currencyList.map((c, idx) => (
          <div
            key={c.code}
            onClick={() => {
              if (c.code !== selected) onSelect(c.code);
            }}
            style={{
              border: c.code === selected ? '2.5px solid #124aff' : '2px solid #dbe6f7',
              borderRadius: 16,
              padding: '13px 0',
              fontWeight: c.code === selected ? 700 : 500,
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: c.code === selected ? '#f4f8ff' : '#fff',
              cursor: c.code === selected ? 'default' : 'pointer',
              color: c.code === selected ? '#124aff' : '#222',
              boxShadow: c.code === selected ? '0 0 0 2px #e6edff' : undefined,
              transition: 'border 0.2s',
              marginBottom: 12,
              letterSpacing: 1,
            }}
          >
            <span style={{marginLeft:20, fontSize:20}}>{c.label}</span>
            <span style={{marginRight:20, fontSize:18, color:'#444', fontWeight:500}}>{rates[c.code]}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default CurrencySelectModal;
