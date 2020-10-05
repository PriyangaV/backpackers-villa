import React from 'react';
import { useForm } from 'react-hook-form';
import { sameAs } from 'helpers/validators';
import { FormError } from 'components';

// import { ErrorMessage } from '@hookform/error-message';

// const Error = ({ children }) => <div className="alert danger">{children}</div>;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm();
  // const randomStr = (Math.random() + 1).toString(36).substring(8);
  // const defaultPassword = 'test@1234';

  return (
    <form
      className="login-wrapper login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <label htmlFor="username">username</label>
        <input
          ref={register({
            required: 'Username is required!',
            minLength: {
              value: 1,
              message: 'Minimum length of username is 4 characters'
            }
          })}
          type="text"
          name="username"
          className="form-control"
          // defaultValue={randomStr}
        />
        <FormError errors={errors} name="username">
          {(message) => {
            return message;
          }}
        </FormError>
        {/* <ErrorMessage
          as={<Error />}
          errors={errors}
          name="name"
          render={({ message }) => <p className="alert danger">{message}</p>}
        /> */}
        {/* {errors.name && (
          <div className="alert danger">
            {errors.name.type === 'required' && (
              <span>Username is required</span>
            )}

            {errors.name.type === 'minLength' && (
              <span>Minimum length of username is 1 character!</span>
            )}
          </div>
        )} */}
      </div>
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
          render={({ message }) => <p className="alert danger">{message}</p>}
        /> */}
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
          render={({ message }) => <p className="alert danger">{message}</p>}
        /> */}
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">confirm password</label>
        {/* sameAs: sameAs */}
        <input
          ref={register({
            required: 'Password confirmation is required',
            minLength: {
              value: 8,
              message:
                'Minimum length of password confirmation is 8 characters!'
            },
            validate: { sameAs: sameAs('password', getValues) }
          })}
          type="password"
          name="passwordConfirmation"
          className="form-control"
          // defaultValue={defaultPassword}
        />
        {errors.passwordConfirmation && (
          <div className="alert danger">
            {errors.passwordConfirmation.type === 'required' && (
              <span>Password confirmation is required</span>
            )}

            {errors.passwordConfirmation.type === 'minLength' && (
              <span>
                Minimum length of password confirmation is 8 characters!
              </span>
            )}
            {errors.passwordConfirmation.type === 'sameAs' && (
              <span>Password confirmation has to be the same as password!</span>
            )}
          </div>
        )}
      </div>

      <button className="btn" type="submit">
        submit
      </button>
    </form>
  );
};

export default RegisterForm;
