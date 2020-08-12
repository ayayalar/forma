import { AnyAction } from 'redux';
import { FormOptions } from 'components/Form';

interface FormContextProps {
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

interface Artifact {
  [name: string]: unknown;
}

interface FormItemState {
  [name: string]: FormItemData;
}

interface FormItemErrorState {
  [name: string]: ValidatorResult;
}

interface FormItemData {
  value?: unknown;
  isRequired: boolean;
  isDirty: boolean;
}

interface ValidatorResult {
  isValid: boolean;
  error: string;
}

type SubmitFormDataCallback = { values?: { [key: string]: any }; isValid: boolean };

type SubmitFormData = (cb: (callbackProps: SubmitFormDataCallback) => void) => void;
type GetState = (key: string) => any;
type DispatchAction = <T extends AnyAction>(action: T) => T;

type GetFormItem = (key: string) => FormItemData;
type UpdateFormItem = (name: string, formItemData: FormItemData) => void;
type GetFormItemError = (key: string) => ValidatorResult;
type UpdateFormItemError = (name: string, validatorResult: ValidatorResult) => void;
type GetArtifact = (key: string) => unknown;
type AddArtifact = (key: string, value: unknown) => void;
type Validator = (formOptions: FormOptions) => () => ValidatorResult;
type FormaFunction<T> = (formOptions: FormOptions) => T;

export {
  AddArtifact,
  Artifact,
  DispatchAction,
  FormaFunction,
  FormContextProps,
  FormItemData,
  FormItemErrorState,
  FormItemState,
  GetArtifact,
  GetFormItem,
  GetFormItemError,
  GetState,
  SubmitFormData,
  SubmitFormDataCallback,
  UpdateFormItem,
  UpdateFormItemError,
  Validator,
  ValidatorResult,
};
