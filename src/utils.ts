import { Validator, FormItemData } from './forma-types';

import get from 'lodash/get';
import { FormOptions } from 'components/Form';

const getQueryParamsUtil = (queryParams: {}, path: string): any => get(queryParams, path, undefined);

const scrollToInvalidFieldsUtil = (invalidFields: string[]): void => {
  if (invalidFields.length > 0) {
    const element = document.getElementById(invalidFields[0]);
    if (element) {
      const position = element.getBoundingClientRect().top;
      const scrolledLength = window.pageYOffset;
      const top = position + scrolledLength - 50;
      window.scrollTo(0, top);
    }
  }
};

const validateUtil = (name: string, formItem: FormItemData, validators: Validator[] | undefined, formOptions: FormOptions): void => {
  let validatorResult;
  if (validators) {
    const formItemError = formOptions.getFormItemError(name);

    for (const validator of validators) {
      validatorResult = validator(formOptions)();
      if (!validatorResult.isValid) {
        break;
      }
    }

    if (!!formItem && !!validatorResult && (!formItemError || formItemError.error !== validatorResult.error)) {
      formOptions.updateFormItemError(name, validatorResult);
    }
  }
};

export { getQueryParamsUtil, scrollToInvalidFieldsUtil, validateUtil };
