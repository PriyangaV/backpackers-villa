import React, { useEffect } from 'react';
import { FormError, FileLoader } from 'components';
import { useForm } from 'react-hook-form';

const rentalOptions = ['apartment', 'condo', 'house'];

const CreateForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  useEffect(() => {
    register({ name: 'image' });
  }, [register]);
  return (
    <form
      className="login-wrapper login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input
          ref={register({
            required: 'Title is required!',
            minLength: {
              value: 1,
              message: 'Minimum length of title is 4 characters'
            }
          })}
          type="text"
          name="title"
          className="form-control"
        />
        <FormError errors={errors} name="title">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="city">city</label>
        <input
          ref={register({
            required: 'City is required!'
          })}
          type="text"
          name="city"
          className="form-control"
        />
        <FormError errors={errors} name="city">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="street">street</label>
        <input
          ref={register({
            required: 'Street is required!'
          })}
          type="text"
          name="street"
          className="form-control"
        />
        <FormError errors={errors} name="street">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="category">category</label>
        <select
          ref={register({
            required: 'Category is required!'
          })}
          type="category"
          name="category"
          className="form-control"
        >
          {rentalOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <FormError errors={errors} name="category">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>

      <div className="form-group">
        {/* <label htmlFor="image">image url</label>
        <input
          ref={register({
            required: 'Image is required!'
          })}
          type="text"
          name="image"
          className="form-control"
        /> */}
        <label htmlFor="image">image</label>
        <FileLoader
          onFileUpload={({ _id }) => {
            setValue('image', _id);
          }}
        />
        <FormError errors={errors} name="image">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="numOfRooms">rooms</label>
        <input
          ref={register({
            required: 'Rooms is required!'
          })}
          type="number"
          name="numOfRooms"
          className="form-control"
        />
        <FormError errors={errors} name="numOfRooms">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="description">description</label>
        <textarea
          ref={register({
            required: 'Description is required!'
          })}
          cols="30"
          rows="10"
          name="description"
          className="form-control"
        ></textarea>
        <FormError errors={errors} name="description">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="dailyPrice">daily price</label>
        <div className="prepend">
          <span className="text">$</span>
        </div>
        <input
          ref={register({
            required: 'Daily price is required!'
          })}
          type="number"
          name="dailyPrice"
          className="form-control price"
        />
        <FormError errors={errors} name="dailyPrice">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="shared">shared</label>
        <input
          ref={register({
            required: 'Shared is required!'
          })}
          type="checkbox"
          name="shared"
          className="form-control"
        />
        <FormError errors={errors} name="shared">
          {(message) => {
            return message;
          }}
        </FormError>
      </div>

      <button className="btn" type="submit">
        create
      </button>
    </form>
  );
};

export default CreateForm;
