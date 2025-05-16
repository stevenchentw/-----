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
      title={<div style={{textAlign:'center',fontWeight:700,fontSize:30}}>匯率設定</div>}
      closeIcon={<span style={{fontSize:32,lineHeight:1}}>×</span>}
      bodyStyle={{padding:'8px 16px 0 16px'}}
      destroyOnClose
    >
      <div style={{textAlign:'center',marginBottom:10,fontSize:17}}>
        <hr style={{margin:'4px 0 10px 0'}}/>
        <div style={{color:'#444',fontSize:18,marginBottom:8}}>( TWD 1 元可以換到多少 )</div>
      </div>
      <Row gutter={[12,12]} justify="center">
        {currencyList.map((c, idx) => (
          <Col span={12} key={c.code} style={{marginBottom:8}}>
            <div
              onClick={() => {
                if (c.code !== selected) onSelect(c.code);
              }}
              style={{
                border: c.code === selected ? '2.5px solid #124aff' : '2px solid #bbb',
                borderRadius: 18,
                padding: '10px 0',
                fontWeight: 700,
                fontSize: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#fff',
                cursor: c.code === selected ? 'default' : 'pointer',
                color: '#222',
                boxShadow: c.code === selected ? '0 0 0 2px #e6edff' : undefined,
                transition: 'border 0.2s',
              }}
            >
              <span style={{marginLeft:18}}>{c.label}</span>
              <span style={{marginRight:18}}>{rates[c.code]}</span>
            </div>
          </Col>
        ))}
      </Row>
      <div style={{marginTop:18,display:'flex',alignItems:'center',fontSize:17,color:'#444'}}>
        <span style={{fontSize:20,marginRight:4}}>！</span>
        <span>調整匯率可到設定頁操作</span>
      </div>
    </Modal>
  );
}

export default CurrencySelectModal;
