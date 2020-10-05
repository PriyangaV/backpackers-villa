import React from 'react';
import { EditableComponent, FileLoader } from 'components';

const imageView = ({ value, ...rest }) => {
  return <img {...rest} src={value} alt="editable rental asset" />;
};

// handleOnChange expects event

const createEvent = (value) => ({ target: { value } });

class EditableImage extends React.Component {
  // > Composition
  render() {
    return (
      <EditableComponent
        {...this.props}
        viewComponent={imageView}
        renderComponent={(value, onChange, onKeyDown) => (
          <>
            <input
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className={this.props.className}
            />
            <FileLoader
              onFileUpload={(image) => {
                onChange(createEvent(image));
              }}
            />
            {/* <FileLoader
              onFileUpload={(image) => {
                onChange({ target: { value: image } });
              }}
            /> */}
          </>
        )}
      />
    );
  }
}
export default EditableImage;
