import React from "react";

function FixedExpenses({ settings }) {
  const { fixed = {}, feePercent = 0 } = settings;
  return (
    <div style={{padding:'0 2px', fontSize:20, color:'#333', background:'none', maxWidth:430}}>
      <div style={{display:'flex', alignItems:'center', marginBottom:2}}>
        <span style={{flex:1}}>運費</span>
        <span style={{fontWeight:700, minWidth:45, textAlign:'right', flex:'none'}}>{fixed.shipping} 元</span>
      </div>
      <div style={{display:'flex', alignItems:'center', marginBottom:2}}>
        <span style={{flex:1}}>雜費</span>
        <span style={{fontWeight:700, minWidth:45, textAlign:'right', flex:'none'}}>{fixed.misc} 元</span>
      </div>
      <div style={{display:'flex', alignItems:'center'}}>
        <span style={{flex:1}}>手續費</span>
        <span style={{fontWeight:700, minWidth:45, textAlign:'right', flex:'none'}}>{feePercent}%</span>
      </div>
    </div>
  );
}

export default FixedExpenses;
