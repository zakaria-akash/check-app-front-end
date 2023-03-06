import React, { useEffect, useReducer } from "react";

import { validate } from "../../utils/Validators";

import classes from "./NewPlaceInputForm.module.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const NewPlaceInputForm = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    vlue: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const inputTouchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  const formElement =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value || ""}
        onChange={inputChangeHandler}
        onBlur={inputTouchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 5}
        value={inputState.value || ""}
        onChange={inputChangeHandler}
        onBlur={inputTouchHandler}
      />
    );
  return (
    <div
      className={`${classes.formControl} ${
        !inputState.isValid &&
        inputState.isTouched &&
        classes.formControlInvalid
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {formElement}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default NewPlaceInputForm;
