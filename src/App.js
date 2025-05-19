import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SettingsModal from "./components/SettingsModal";
import RateModal from "./components/RateModal";
import CostCalculator from "./components/CostCalculator";
import FixedExpenses from "./components/FixedExpenses";
import PricingStrategy from "./components/PricingStrategy";
import "./App.css";

function App() {
  // 狀態管理
  const [settings, setSettings] = useState(() => {
    const saved = sessionStorage.getItem("profit_settings");
    return saved ? JSON.parse(saved) : {
      currencies: ["JPY", "KRW", "USD", "CNY", "AUD"],
      rates: { JPY: 4.75, KRW: 45.5, USD: 0.0313, CNY: 0.229, AUD: 0.018 },
      defaultCurrency: "KRW",
      feePercent: 0,
      freightOptions: [10, 20, 30, 40], // 重量金額
      fixed: { shipping: 80, fee: 20, misc: 30 },
    };
  });
  const [inputs, setInputs] = useState(() => {
    const saved = sessionStorage.getItem("profit_inputs");
    return saved ? JSON.parse(saved) : {
      foreignAmount: 13600,
      twdAmount: 340,
      selectedFreight: 1, // 預設重量2
      price: 499,
      profitRate: 0,
    };
  });
  // 彈窗狀態
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("profit_settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    sessionStorage.setItem("profit_inputs", JSON.stringify(inputs));
  }, [inputs]);

  return (
    <div className="container">
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <img src="/kosnote.svg" alt="Kosnote 品牌 Logo" style={{height:40,display:'block',paddingBottom:5}} />
        <button
          style={{border:'none',background:'none',boxShadow:'none',padding:0,cursor:'pointer'}}
          onClick={()=>setSettingsOpen(true)}
          aria-label="設定"
        >
          <i className="fas fa-gear" style={{fontSize:28,color:'#444'}}></i>
        </button>
      </header>
      <CostCalculator
        settings={settings}
        setSettings={setSettings}
        inputs={inputs}
        setInputs={setInputs}
        onRateClick={() => setRateOpen(true)}
      />
      
      <PricingStrategy
        cost={Number(inputs.twdAmount) || 0}
        shipping={Number(settings.freightOptions[inputs.selectedFreight]) || 0}
        misc={Number(settings.fixed.misc) || 0}
        feePercent={Number(settings.feePercent) || 0}
      />
      <footer>copyright © 簡單策略有限公司</footer>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} settings={settings} setSettings={setSettings} />
      <RateModal open={rateOpen} onClose={() => setRateOpen(false)} settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default App;
