import { AnyAction } from 'redux';
import { FormOptions } from 'components/Form';

export interface FormContextProps {
  addArtifact: AddArtifact;
  dispatchAction?: DispatchAction;
  getArtifact: GetArtifact;
  getFormItem: GetFormItem;
  getFormItemError: GetFormItemError;
  getState?: GetState;
  submitForm: SubmitFormData;
  updateFormItem: UpdateFormItem;
  updateFormItemError: UpdateFormItemError;
}

export interface Artifact {
  [name: string]: unknown;
}

export interface FormItemState {
  [name: string]: FormItemData;
}

export interface FormItemErrorState {
  [name: string]: ValidatorResult;
}

export interface FormItemData {
  value?: unknown;
  isRequired: boolean;
  isDirty: boolean;
}

export interface ValidatorResult {
  isValid: boolean;
  error: string;
}

export type SubmitFormDataCallback = { values?: { [key: string]: any }; isValid: boolean };

export type SubmitFormData = (cb: (callbackProps: SubmitFormDataCallback) => void) => void;
export type GetState = (key: string) => any;
export type DispatchAction = <T extends AnyAction>(action: T) => T;

export type GetFormItem = (key: string) => FormItemData;
export type UpdateFormItem = (name: string, formItemData: FormItemData) => void;
export type GetFormItemError = (key: string) => ValidatorResult;
export type UpdateFormItemError = (name: string, validatorResult: ValidatorResult) => void;
export type GetArtifact = (key: string) => unknown;
export type AddArtifact = (key: string, value: unknown) => void;
export type Validator = (formOptions: FormOptions) => () => ValidatorResult;
export type FormaFunction<T> = (formOptions: FormOptions) => T;
