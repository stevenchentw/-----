import React from "react";

function ProfitForm({ settings, inputs, setInputs }) {
  // 幣別選單
  const currencyOptions = settings.currencies.map((c) => (
    <option key={c} value={c}>{c}</option>
  ));

  // 處理輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profit-form">
      <div>
        <label>成本幣別：</label>
        <select name="currency" value={inputs.currency} onChange={handleChange}>
          {currencyOptions}
        </select>
      </div>
      <div>
        <label>商品成本：</label>
        <input name="purchase" type="number" value={inputs.purchase} onChange={handleChange} />
      </div>
      <div>
        <label>運費：</label>
        <input name="shipping" type="number" value={inputs.shipping} onChange={handleChange} />
      </div>
      <div>
        <label>手續費：</label>
        <input name="fee" type="number" value={inputs.fee} onChange={handleChange} />
      </div>
      <div>
        <label>售價：</label>
        <input name="price" type="number" value={inputs.price} onChange={handleChange} />
        <span> TWD</span>
      </div>
    </div>
  );
}

export default ProfitForm;
