import React from "react";

function ProfitResult({ settings, inputs }) {
  // 匯率轉換
  const rate = settings.rates[inputs.currency] || 1;
  const costTWD = (Number(inputs.purchase) + Number(inputs.shipping) + Number(inputs.fee)) * rate;
  const profit = Number(inputs.price) - costTWD;
  const profitRate = inputs.price > 0 ? (profit / inputs.price) * 100 : 0;

  return (
    <div className="profit-result">
      <div>成本合計（TWD）：{costTWD.toFixed(2)} 元</div>
      <div>淨利：{profit.toFixed(2)} 元</div>
      <div>毛利率：{profitRate.toFixed(2)}%</div>
      <div style={{color: profit < 0 ? 'red' : 'green'}}>{profit < 0 ? '虧損' : '獲利'}</div>
    </div>
  );
}

export default ProfitResult;
