import React from 'react';
import { EditableComponent } from 'components';

class EditableTextarea extends React.Component {
  render() {
    const { className, rows, cols } = this.props;
    return (
      <EditableComponent
        {...this.props}
        renderComponent={(value, onChange, onKeyDown) => (
          <textarea
            name="editable-textarea"
            cols={cols}
            rows={rows}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={className}
          />
        )}
      />
    );
  }
}
export default EditableTextarea;
