import React from "react";

import Modal from "./Modal";
import CustomButton from "../FormElements/CustomButton";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.errorMsg}
      footer={<CustomButton onClick={props.onClear}>Okay</CustomButton>}
    >
      <p>{props.errorMsg}</p>
    </Modal>
  );
};

export default ErrorModal;
