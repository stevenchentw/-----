import React from "react";
import { useState } from "react";
import { Button, Input, Row, Col } from "antd";

const QUICK_PROFITS = [0, 20, 40, 50, 60];

function PricingStrategy({ cost, shipping, misc, feePercent }) {
  // 傳入參數說明：
  // cost: 商品成本（台幣）
  // shipping: 運費（台幣）
  // misc: 雜費（台幣）
  // feePercent: 手續費百分比（例如 20 代表 20%）

  const [manualPrice, setManualPrice] = useState(""); // 手動輸入定價
  const [manualProfit, setManualProfit] = useState("0"); // 預設選中 0%

  // 公式參數
  const baseCost = Number(cost) + Number(shipping) + Number(misc);
  const fee = Number(feePercent) / 100;
  let profitRate = 0; // 淨利率（%）
  let price = 0;

  if (manualProfit !== "") {
    // 使用者手動輸入淨利率，反推定價
    profitRate = Number(manualProfit);
    const netRate = profitRate / 100;
    price = baseCost / (1 - (fee + netRate));
  } else if (manualPrice !== "") {
    // 使用者手動輸入定價，反推淨利率
    price = Number(manualPrice);
    // 反推利潤率
    profitRate = baseCost > 0 ? ((price * (1 - fee) - baseCost) / baseCost) * 100 : 0;
  } else {
    // 預設顯示 0% 淨利率
    profitRate = 0;
    price = baseCost / (1 - (fee + 0));
  }

  // 利潤公式：利潤 = 定價 × (1−手續費) − (商品成本+運費+雜費)
  const profit = price * (1 - fee) - (Number(cost) + Number(shipping) + Number(misc));

  return (
    <div style={{background:'#fff',borderRadius:18,boxShadow:'0 2px 8px #e6eef7',margin:'10px 0 0 0',maxWidth:480,padding:'10px',fontSize:20,color:'#333'}}>
      <div style={{fontWeight:500, marginBottom:12}}>定價策略</div>
      <div style={{display:'flex', gap:8, marginBottom:16, justifyContent:'center'}}>
        {QUICK_PROFITS.map((p) => (
          <Button
            key={p}
            type={manualProfit === String(p) ? "primary" : "default"}
            style={{fontSize:15, fontWeight:500, borderRadius:10, width:60, height:32, padding:'0'}}
            onClick={() => {
              setManualProfit(String(p));
              setManualPrice("");
            }}
          >
            {p}%
          </Button>
        ))}
      </div>
      <div style={{marginTop:18}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:18}}>
          <span style={{width:80, textAlign:'left', fontWeight:600, fontSize:18}}>定價：</span>
          <Input
            style={{fontSize:20, width:240, height:38, fontWeight:500, color:'#000', textAlign:'center'}}
            value={manualPrice}
            placeholder={manualProfit !== '' ? Math.round(price) : ''}
            min={0}
            type="number"
            onChange={e => {
              setManualPrice(e.target.value);
              setManualProfit("");
            }}
          />
          <span style={{marginLeft:12, fontSize:18}}>元</span>
        </div>
        <div style={{display:'flex', alignItems:'center', marginBottom:18}}>
          <span style={{width:80, textAlign:'left', fontWeight:600, fontSize:18}}>淨利率：</span>
          <Input
            style={{fontSize:20, width:240, height:38, fontWeight:500, textAlign:'center'}}
            value={manualProfit}
            placeholder={manualPrice !== '' ? profitRate.toFixed(1) : ''}
            min={-100}
            max={200}
            type="number"
            onChange={e => {
              setManualProfit(e.target.value);
              setManualPrice("");
            }}
          />
          <span style={{marginLeft:12, fontSize:18}}>%</span>
        </div>
        <div style={{display:'flex', alignItems:'center', marginBottom:0}}>
          <span style={{width:80, textAlign:'left', fontWeight:600, fontSize:18}}>利潤：</span>
          <span style={{fontWeight:700, fontSize:22, color: profit < 0 ? '#d4380d' : '#389e0d', width:240, display:'inline-block', textAlign:'center'}}>{Math.round(profit)}</span>
          <span style={{marginLeft:12, fontSize:18}}>元</span>
        </div>
      </div>
    </div>
  );
}

export default PricingStrategy;
