import React from "react";

function CurrencySettings({ settings, setSettings }) {
  // 幣別設定與匯率調整
  const handleRateChange = (c, v) => {
    setSettings((prev) => ({
      ...prev,
      rates: { ...prev.rates, [c]: Number(v) }
    }));
  };

  return (
    <div className="currency-settings">
      <h4>幣別與匯率設定</h4>
      {settings.currencies.map((c) => (
        <div key={c}>
          <span>{c}：</span>
          <input
            type="number"
            value={settings.rates[c] || ''}
            onChange={e => handleRateChange(c, e.target.value)}
            step="any"
          />
        </div>
      ))}
      <small>（可自訂五項常用幣種與匯率）</small>
    </div>
  );
}

export default CurrencySettings;
