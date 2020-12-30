import * as React from 'react';

import {
  AddArtifact,
  DispatchAction,
  GetArtifact,
  GetFormItem,
  GetFormItemError,
  GetState,
  SubmitFormData,
  UpdateFormItem,
  UpdateFormItemError,
} from '../forma-types';

import { FormContext } from '../hooks';

export interface FormOptions {
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
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export { Form };
