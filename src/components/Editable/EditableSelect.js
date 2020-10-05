import React from 'react';
import { EditableComponent } from 'components';

class EditableSelect extends React.Component {
  render() {
    const { className, options } = this.props;
    return (
      <EditableComponent
        {...this.props}
        renderComponent={(value, onChange) => (
          <select onChange={onChange} value={value} className={className}>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {`${opt}`}
              </option>
            ))}
          </select>
        )}
      />
    );
  }
}
export default EditableSelect;
