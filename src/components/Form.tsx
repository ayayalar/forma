import * as React from 'react';
import { FormContext } from '../hooks';
import {
  AddArtifact,
  GetArtifact,
  GetFormItem,
  GetFormItemError,
  GetState,
  UpdateFormItem,
  UpdateFormItemError,
  DispatchAction,
  SubmitFormData,
} from '../forma-types';

interface FormOptions {
  addArtifact: AddArtifact;
  getArtifact: GetArtifact;
  dispatchAction?: DispatchAction;
  getFormItem: GetFormItem;
  getFormItemError: GetFormItemError;
  getState?: GetState;
  submitForm: SubmitFormData;
  updateFormItem: UpdateFormItem;
  updateFormItemError: UpdateFormItemError;
}

interface FormProps extends FormOptions {
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = (props) => {
  return (
    <FormContext.Provider
      value={{
        addArtifact: props.addArtifact,
        dispatchAction: props.dispatchAction,
        getArtifact: props.getArtifact,
        getFormItem: props.getFormItem,
        getFormItemError: props.getFormItemError,
        getState: props.getState,
        submitForm: props.submitForm,
        updateFormItem: props.updateFormItem,
        updateFormItemError: props.updateFormItemError,
      }}>
      {props.children}
    </FormContext.Provider>
  );
};

export { Form, FormOptions };
