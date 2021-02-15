# @ayayalar/forma

_React Form & Form Validation framework._

## Installation

```sh
npm i @ayayalar/forma
```

## Required (peer) Dependencies

```sh
lodash@4.x.x
react-dom@16.x.x
react-redux@7.x.x
react@16.x.x
redux@4.x.x
```

`Forma` is a small framework that makes form development easier if you use React as your JavaScript library. As you may already know, React does not come with a form library. It leaves that to the developer. Some UI libraries, such as Ant Design, have form components. However, most, if not all, will create a dependency on the UI library that you are using.

`Forma`, on the other hand, gives you freedom. You are free to use any UI library with `Forma`. For some reason, down the road, you decide to use a different UI library, Forma is guaranteed to be 100% compatible with it. There should be no changes needed to any form or form validation logic.

A quick warning before we start, my intention is not to design a fully functional form but rather introduce you to the basic concepts of `Forma`.

## Getting Started

Let's create couple of components from scratch. However, you can use any existing React component library. Such as Fluent UI, Material UI, etc.

`Forma` has a simple hook to register a component as a form element using `useInitialize` hook. And optionally, `useValidate` hook to enable validation.

`FormOptions` is the main object to manage form state. In the TextField component below, in `onChange`, we're using the `updateFormItem` function to update the state of the form item.

We are also using the `getFormItem` function to bind value to its state. And `getFormItemError` function to display validation error(s).

### TextField

```typescript
interface TextFieldProps {
  name: string
  required: boolean
  validators?: Validator[]
}

const TextField: React.FC<TextFieldProps> = (props) => {
  // Initialize form hooks.
  const formOptions = useForm();

  // Register component as a form element.
  useInitialize<string>(props.name, formOptions.getFormItem(props.name)?.value as string, '', true);

  // Enable validation.
  useValidate(true, props.name, props.validators);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update form item value,
      // Update required or not,
      // Update if the state has been modified via isDirty flag.
      formOptions?.updateFormItem(props.name, {
        value: e?.currentTarget?.value,
        isRequired: props.required,
        isDirty: true,
      })
  }

  // Get form item value.
  const value = (formOptions.getFormItem(props.name)?.value as string) || '';

  // Get form item error.
  const error = formOptions.getFormItemError(props.name)?.error;

  return (
    <>
      <input
        value={value}
        onChange={onChange(formOptions)}
        type='text'></input>
      <div>{error}</div>
    </>
  )
}
```

### Button

We don't need to register the button as a form element since we don't need to keep track of the button state. We'll use the button to submit the form only.

`FormOptions` has a function called `submitForm`. it returns the current value of all the form items and a boolean flag whether the form is valid or not. `submitForm` accepts a callback. In this callback, you can submit the form or display an error if it is not valid.

```typescript
const Button: React.FC = () => {
  const formOptions = useForm();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Submit form. Dispatch an action, call an API, etc.
      formOptions.submitForm((cb) => {
        console.log(cb)
        // Prints
        /*
        isValid: true
        values:
          userName: "user"
          password: "password"
        */
      })
  }
  return <button onClick={onClick}>Submit</button>
}
```

### Forma Form

`Forma` has a dependency to Redux library. It must be wrapped inside the Provider component. `Forma` is the top level form component. All form elements must be wrapped inside it. It keeps track of the form element state and validations.

```jsx
<Provider store={store}>
  <Forma>
    <TextField name='userName' required={true} validators={[validator]}></TextField>
    <TextField name='password' required={true}></TextField>
    <Button />
  </Forma>
</Provider>
```

We have not talked about the validations yet. Validations can be written as a small atomic unit of JavaScript/TypeScript functions and can be shared across multiple components. In my next article, I will cover the validations.

Link to Forma: <https://github.com/ayayalar/forma/packages/353083>
