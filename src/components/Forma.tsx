import * as React from 'react';

import { AnyAction, Store } from 'redux';
import {
  Artifact,
  FormItemData,
  FormItemErrorState,
  FormItemState,
  SubmitFormDataCallback,
  ValidatorResult,
} from '../forma-types';
import { Dispatch, useCallback, useState } from 'react';
import { Form, FormOptions } from 'components/Form';

import { connect } from 'react-redux';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

export interface FormaProps {
  dispatcher?: (action: AnyAction) => void;
  storeState?: Store;
  children?: React.ReactNode;
}

const Forma: React.FC<FormaProps> = ({ storeState, dispatcher, children }) => {
  const [artifact, setArtifact] = useState<Artifact>({});
  const [formItemErrorState, setFormErrorState] = useState<FormItemErrorState>(
    {} as FormItemErrorState
  );
  const [formItemState, setFormState] = useState<FormItemState>({} as FormItemState);

  const getState = useCallback(
    (key: string) => {
      return get(storeState, key, undefined);
    },
    [storeState]
  );

  const dispatchAction = useCallback(
    (action: AnyAction) => {
      return { action: dispatcher?.(action) };
    },
    [dispatcher]
  );

  const getArtifact = useCallback((key: string) => artifact[key], [artifact]);

  const addArtifact = useCallback(
    (key: string, value: unknown) => {
      artifact[key] = value;
      setArtifact(artifact);
    },
    [artifact, setArtifact]
  );

  const getFormItem = useCallback((key: string) => formItemState[key], [formItemState]);
  const getFormItemError = useCallback((key: string) => formItemErrorState[key], [
    formItemErrorState,
  ]);

  const updateFormItem = useCallback(
    (name: string, formItemData: FormItemData): void => {
      const previousFormItemData = getFormItem(name);
      if (!isEqual(previousFormItemData, formItemData)) {
        formItemState[name] = formItemData;
        setFormState((state: FormItemState) => ({
          ...state,
          ...formItemState,
        }));
      }
    },
    [formItemState, getFormItem, setFormState]
  );

  const updateFormItemError = useCallback(
    (name: string, validatorResult: ValidatorResult): void => {
      const previousState = getFormItemError(name);
      if (!isEqual(previousState, validatorResult)) {
        formItemErrorState[name] = {
          ...formItemErrorState[name],
          ...validatorResult,
        };
        setFormErrorState((state: FormItemErrorState) => ({ ...state, ...formItemErrorState }));
      }
    },
    [formItemErrorState, getFormItemError, setFormErrorState]
  );

  /*
  const isFormItemValidUtil = (validators: Validator[]): boolean => {
    try {
      const validatorResults = validators.map((validator: Validator) => validator(formOptions)());

      return validatorResults.some((vr: ValidatorResult) => !vr.isValid);
    } catch {
      return false;
    }
  };
  */

  const submitForm = (cb: (callbackProps: SubmitFormDataCallback) => void): void => {
    if (Object.keys(formItemState).length > 0) {
      const invalidFields = Object.keys(formItemState).filter((key: string) => {
        if (formItemState[key].isRequired && !formItemState[key].isDirty) {
          updateFormItem(key, { ...formItemState[key], isDirty: true });
        }
        return (
          formItemErrorState[key] && !formItemErrorState[key].isValid
          // || isFormItemValidUtil(get(component.props, 'validators', []) as Validator[])
        );
      });

      const callbackData = mapValues(formItemState, (obj) => {
        return obj.value;
      });

      cb({ isValid: invalidFields.length === 0, values: callbackData });
    }
  };

  const formOptions: FormOptions = {
    addArtifact,
    getArtifact,
    getFormItem,
    getFormItemError,
    getState,
    dispatchAction,
    submitForm,
    updateFormItem,
    updateFormItemError,
  } as FormOptions;

  return <Form {...formOptions}>{children}</Form>;
};

export type OwnProps = Pick<FormaProps, 'children'>;
export type DispatchProps = Pick<FormaProps, 'dispatcher'>;

const mapStateToProps = (state: Store<any, AnyAction>, ownProps: OwnProps): FormaProps => ({
  storeState: state,
  children: ownProps.children,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => ({
  dispatcher: (action: AnyAction): void => dispatch(action),
});

const ConnectedForma = connect<FormaProps, DispatchProps, OwnProps, Store<any, AnyAction>>(
  mapStateToProps,
  mapDispatchToProps
)(Forma);

export { ConnectedForma };
