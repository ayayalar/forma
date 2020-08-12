import { FormContextProps, Validator } from './forma-types';
import { createContext, useContext, useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import { validateUtil } from './utils';

const FormContext = createContext<FormContextProps>({} as FormContextProps);

const useForm = (): FormContextProps => useContext(FormContext);

const useValidate = (validate: boolean, name: string, validators: Validator[] = []): void => {
  const formOptions = useForm();
  const formItem = formOptions.getFormItem(name);

  useEffect(() => {
    validate && validators?.length > 0 && validateUtil(name, formItem, validators, { ...formOptions });
  }, [name, formItem, validators, formOptions, validate]);
};

const useInitialize = <T>(name: string, value: T, initialValue: T, isRequired?: boolean): void => {
  const { getFormItem, updateFormItem } = useForm();
  useEffect(() => {
    const formItem = getFormItem?.(name);
    const currentValue = formItem?.value;
    const formItemInitialized = formItem !== undefined;
    const required = isRequired === undefined ? false : isRequired;
    const isDirty = false;

    if (!formItemInitialized) {
      updateFormItem?.(name, {
        value: initialValue,
        isRequired: required,
        isDirty,
      });
    } else {
      if (formItemInitialized && !isEqual(formItem.isRequired, isRequired)) {
        updateFormItem?.(name, {
          ...getFormItem?.(name),
          isRequired: required,
        });
      }

      if (formItemInitialized && !isEqual(currentValue, value) && !formItem?.isDirty) {
        updateFormItem?.(name, {
          value,
          isRequired: required,
          isDirty,
        });
      }
    }
  }, [getFormItem, updateFormItem]);
};

export { FormContext, useForm, useInitialize, useValidate };
