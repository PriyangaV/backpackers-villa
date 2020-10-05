import React from 'react';
import { EditableComponent } from 'components';

// class EditableInput extends EditableComponent { // > Inheritance
class EditableInput extends React.Component {
  // > Composition
  render() {
    return (
      <EditableComponent
        {...this.props}
        renderComponent={(value, onChange, onKeyDown) => (
          <input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={this.props.className}
          />
        )}
      />
    );
  }
}
export default EditableInput;
