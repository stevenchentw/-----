import React, { useState } from "react";
import Modal from "./Modal";
import { Form, Input, Row, Col, Divider, Button, Typography } from "antd";

const { Title, Text } = Typography;

function SettingsModal({ open, onClose, settings, setSettings }) {
  // 本地暫存設定（避免未按下儲存時直接改動全域 settings）
  const [local, setLocal] = useState(() => JSON.parse(JSON.stringify(settings)));

  // 彈窗每次開啟時重設 local 狀態
  React.useEffect(() => {
    if (open) setLocal(JSON.parse(JSON.stringify(settings)));
  }, [open, settings]);

  // 幣別匯率編輯
  const handleRateChange = (c, v) => {
    setLocal(l => ({ ...l, rates: { ...l.rates, [c]: v } }));
  };
  // 重量運費編輯
  const handleFreightChange = (idx, v) => {
    const arr = [...local.freightOptions];
    arr[idx] = v;
    setLocal(l => ({ ...l, freightOptions: arr }));
  };
  // 固定支出編輯
  const handleFixedChange = (k, v) => {
    setLocal(l => ({ ...l, fixed: { ...l.fixed, [k]: v } }));
  };
  // 手續費百分比
  const handleFeePercent = v => {
    setLocal(l => ({ ...l, feePercent: v }));
  };
  // 儲存
  const handleSave = () => {
    setSettings(local);
    onClose();
  };

  // 幣別列表（固定順序）
  const currencyList = ["JPY", "KRW", "USD", "CNY", "AUD"];

  return (
    <Modal open={open} onClose={onClose}>
      <Title level={4} style={{textAlign:'center',marginBottom:8}}>設定</Title>
      <Divider style={{margin:'8px 0 16px 0'}}/>
      <Form layout="vertical">
        <Form.Item label={<b>匯率設定</b>} style={{marginBottom:8}}>
          <Text type="secondary" style={{fontSize:12}}>（TWD 1 元可以換到多少）</Text>
          <Row gutter={12} style={{marginTop:8}}>
            {currencyList.map((c, i) => (
              <Col span={12} key={c} style={{marginBottom:8}}>
                <Input
                  addonBefore={c}
                  type="number"
                  value={local.rates[c]}
                  onChange={e => handleRateChange(c, e.target.value)}
                />
              </Col>
            ))}
          </Row>
        </Form.Item>
        <Form.Item label={<b>重量設定</b>} style={{marginBottom:8}}>
          <Row gutter={12}>
            {local.freightOptions.map((v, i) => (
              <Col span={12} key={i} style={{marginBottom:8}}>
                <Input
                  addonBefore={`重量${i+1}`}
                  type="number"
                  value={v}
                  onChange={e => handleFreightChange(i, e.target.value)}
                />
              </Col>
            ))}
          </Row>
        </Form.Item>
        <Form.Item label={<b>固定支出</b>} style={{marginBottom:8}}>
          <Row gutter={12}>
            <Col span={12} style={{marginBottom:8}}>
              <Input
                addonBefore="運費"
                type="number"
                value={local.fixed.shipping}
                onChange={e=>handleFixedChange('shipping', e.target.value)}
              />
            </Col>
            <Col span={12} style={{marginBottom:8}}>
              <Input
                addonBefore="雜費"
                type="number"
                value={local.fixed.misc}
                onChange={e=>handleFixedChange('misc', e.target.value)}
              />
            </Col>
            <Col span={12} style={{marginBottom:8}}>
              <Input
                addonBefore="手續費"
                addonAfter="%"
                type="number"
                value={local.feePercent}
                onChange={e=>handleFeePercent(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={{margin:'24px 0 0 0',textAlign:'right'}}>
          <Button onClick={onClose} style={{marginRight:8}}>取消</Button>
          <Button type="primary" onClick={handleSave}>儲存</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default SettingsModal;
