import React from "react";
import { Row, Col, Input, Typography, Card } from "antd";

const { Title } = Typography;

import CurrencySelectModal from "./CurrencySelectModal";
import FixedExpenses from "./FixedExpenses";

function CostCalculator({ settings, inputs, setInputs }) {
  // 幣別選擇彈窗
  const [showCurrencyModal, setShowCurrencyModal] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState("USD");
  // 使用當前選中幣別
  const foreignCurrency = selectedCurrency;
  const rate = Number(settings.rates[foreignCurrency]) || 1;

  // 當外幣輸入時，更新台幣
  const handleForeignChange = (e) => {
    const value = e.target.value;
    setInputs((prev) => ({
      ...prev,
      foreignAmount: value,
      twdAmount: value ? (parseFloat(value) / rate).toFixed(2) : ""
    }));
  };
  // 當台幣輸入時，更新外幣
  const handleTWDChange = (e) => {
    const value = e.target.value;
    setInputs((prev) => ({
      ...prev,
      twdAmount: value,
      foreignAmount: value ? (parseFloat(value) * rate).toFixed(2) : ""
    }));
  };

  return (
    <React.Fragment>
      <div style={{border:'2px solid #888', borderRadius:14, background:'#fff', marginBottom:24, padding:20, fontSize:20}}>
        <Title level={4} style={{marginTop:2, marginBottom:8, fontSize:20}}>成本試算</Title>
        <Row gutter={16} align="middle" style={{marginBottom:16}}>
          <Col span={6}>
            <div
              style={{border:'2px solid #bbb',borderRadius:14,padding:'0 0',textAlign:'center',fontSize:20, height:30, display:'flex',alignItems:'center',justifyContent:'center', cursor:'pointer', boxShadow: showCurrencyModal ? '0 0 0 2px #124aff' : undefined, borderColor: showCurrencyModal ? '#124aff' : '#bbb'}}
              onClick={() => setShowCurrencyModal(true)}
            >
              {foreignCurrency}
            </div>
          </Col>
          <Col span={18}>
            <Input
              value={inputs.foreignAmount}
              onChange={handleForeignChange}
              placeholder="請輸入金額"
              style={{fontSize:20, height:30, textAlign:'right'}}
            />
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{marginBottom:0}}>
          <Col span={6}>
            <span style={{fontSize:20, display:'block', textAlign:'center'}}>TWD</span>
          </Col>
          <Col span={18}>
            <Input
              value={inputs.twdAmount}
              onChange={handleTWDChange}
              placeholder="請輸入台幣金額"
              style={{fontSize:20, height:30, textAlign:'right'}}
            />
          </Col>
        </Row>
        <Row style={{marginTop:12}}>
          <Col span={24}>
            <div style={{fontSize:20, color:'#444', textAlign:'right', letterSpacing:1}}>
              1 TWD = {(1 * rate).toFixed(3)} {foreignCurrency}
            </div>
          </Col>
        </Row>

        {/* 運費選擇區塊 */}
        <div style={{marginTop:24, marginBottom:8}}>
          <Row gutter={12} justify="center">
            {[0,1,2,3].map(idx => (
              <Col span={6} key={idx}>
                <div
                  onClick={() => setInputs(prev => ({...prev, selectedFreight: idx}))}
                  style={{
                    border: inputs.selectedFreight === idx ? '2.5px solid #124aff' : '2px solid #bbb',
                    borderRadius: 16,
                    padding: '6px 0',
                    fontWeight: 400,
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: '#fff',
                    cursor: 'pointer',
                    color: '#222',
                    boxShadow: inputs.selectedFreight === idx ? '0 0 0 2px #e6edff' : undefined,
                    transition: 'border 0.2s',
                  }}
                >
                  <span style={{fontSize:12}}>重量{idx+1}</span>
                  <span style={{fontSize:15, fontWeight:700, marginTop:2}}>{settings.freightOptions[idx]} 元</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* 商品成本區塊 */}
        <Row style={{marginTop:28, marginBottom:8}} align="middle" justify="space-between">
          <Col span={12} style={{fontSize:20, fontWeight:400, color:'#333', textAlign:'left', letterSpacing:2}}>
            商品成本
          </Col>
          <Col span={12} style={{fontSize:20, fontWeight:700, color:'#333', textAlign:'right', letterSpacing:2}}>
            {(() => {
              const twd = Number(inputs.twdAmount) || 0;
              const freight = Number(settings.freightOptions[inputs.selectedFreight]) || 0;
              const total = Number(twd) + Number(freight);
              return `${total.toFixed(0)} 元`;
            })()}
          </Col>
        </Row>

        {/* 固定支出區塊 */}
        <FixedExpenses settings={settings} />
      </div>
      <CurrencySelectModal
        open={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        selected={foreignCurrency}
        onSelect={(code) => {
          setSelectedCurrency(code);
          setShowCurrencyModal(false);
          // 幣別切換時自動換算金額
          if (inputs.twdAmount) {
            setInputs(prev => ({
              ...prev,
              foreignAmount: prev.twdAmount ? (parseFloat(prev.twdAmount) * (Number(settings.rates[code]) || 1)).toFixed(2) : ""
            }));
          } else if (inputs.foreignAmount) {
            setInputs(prev => ({
              ...prev,
              twdAmount: prev.foreignAmount ? (parseFloat(prev.foreignAmount) / (Number(settings.rates[code]) || 1)).toFixed(2) : ""
            }));
          }
        }}
        rates={settings.rates}
      />
    </React.Fragment>
  );
}

export default CostCalculator;
