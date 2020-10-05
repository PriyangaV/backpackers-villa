import React from 'react';

class EditableComponent extends React.Component {
  constructor({ entity, field }) {
    super();

    this.state = {
      value: entity[field],
      originValue: entity[field],
      isActiveInput: false
    };
  }
  disableInput = () => {
    this.setState({
      isActiveInput: false,
      value: this.state.originValue
    });
  };
  enableInput = () => {
    this.setState({
      isActiveInput: true
    });
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.update();
    } else if (event.key === 'Escape') {
      this.disableInput();
    }
  };

  update = () => {
    const { value, originValue } = this.state;
    const { onUpdate, field } = this.props;

    if (value !== originValue) {
      onUpdate(
        { [field]: value },
        () => {
          this.setState({
            isActiveInput: false,
            originValue: value
          });
        },
        () => {
          this.setState({ isActiveInput: false, value: originValue });
        }
      );
      /* .then(() => {
          this.setState({
            isActiveInput: false,
            originValue: value
          });
        })
        .catch(() =>
          this.setState({ isActiveInput: false, value: originValue })
        ); */
    }
  };

  renderView = () => {
    const {
      className,
      transformView,
      additionalContent,
      viewComponent: ViewComponent
    } = this.props;
    const { value } = this.state;
    const viewValue = transformView ? transformView(value) : `${value}`;
    const appendContent = additionalContent ? additionalContent : '';

    if (ViewComponent) {
      return <ViewComponent value={viewValue} className={className} />;
    }

    return (
      <p className={className}>
        {viewValue}
        {appendContent}
      </p>
    );
  };
  renderComponentView = () => {
    const { value, isActiveInput } = this.state;
    const { renderComponent } = this.props;
    if (isActiveInput) {
      return (
        <>
          {renderComponent(value, this.handleChange, this.handleKeyDown)}
          <div className="btn-container">
            <button className="btn btn-editable" onClick={this.update}>
              Save
            </button>
            <button
              className="btn btn-secondary btn-editable"
              onClick={this.disableInput}
            >
              Cancel
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        {this.renderView()}
        <div className="btn-container">
          <button
            className="btn btn-secondary btn-editable"
            onClick={this.enableInput}
          >
            Edit
          </button>
        </div>
      </>
    );
  };
  render() {
    const { inline } = this.props;
    return (
      <div
        className={`editable-component ${
          inline ? 'editable-component-input' : ''
        }`}
      >
        {this.renderComponentView()}
      </div>
    );
  }
}
export default EditableComponent;
