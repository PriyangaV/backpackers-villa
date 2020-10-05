import React from 'react';
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import { FormError } from 'components';
// const Error = ({ children }) => <div className="alert danger">{children}</div>;

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const defaultEmail = 'imac@email.com';
  const defaultPassword = 'test@1234';

  return (
    <form
      className="login-wrapper login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <label htmlFor="email">email</label>
        <input
          ref={register({
            required: 'Email is required!',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Not valid email format!'
            }
          })}
          type="email"
          name="email"
          className="form-control"
          defaultValue={defaultEmail}
        />
        <FormError errors={errors} name="email">
          {(message) => {
            return message;
          }}
        </FormError>
        {/* <ErrorMessage
          as={<Error />}
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}
        /> */}
        {/* {errors.email && (
          <div className="alert danger">
            {errors.email.type === 'required' && <span>Email is required</span>}

            {errors.email.type === 'pattern' && (
              <span>Not valid email format!</span>
            )}
          </div>
        )} */}
      </div>
      <div className="form-group">
        <label htmlFor="password">password</label>
        <input
          ref={register({
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'Minimum length of password is 8 characters!'
            }
          })}
          type="password"
          name="password"
          className="form-control"
          defaultValue={defaultPassword}
        />
        <FormError errors={errors} name="password">
          {(message) => {
            return message;
          }}
        </FormError>
        {/* <ErrorMessage
          as={<Error />}
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
        /> */}
        {/* {errors.password && (
          <div className="alert danger">
            {errors.password.type === 'required' && (
              <span>Password is required</span>
            )}

            {errors.password.type === 'minLength' && (
              <span>Minimum length of password is 8 characters!</span>
            )}
          </div>
        )} */}
      </div>

      <button className="btn" type="submit">
        submit
      </button>
    </form>
  );
};

export default LoginForm;
