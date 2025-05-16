import React from "react";
import { Modal as AntdModal } from "antd";

function Modal({ open, onClose, children }) {
  return (
    <AntdModal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      destroyOnClose
    >
      {children}
    </AntdModal>
  );
}

export default Modal;
