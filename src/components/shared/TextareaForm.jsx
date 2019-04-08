import React from 'react';
import { Icon, Input, TextArea, Form } from 'semantic-ui-react';

export default function TextareaForm(props) {
  const { label, value, name, hasError, placeholder } = props;
  return (
    <div className="form-textarea-height full-width margin-top-10">
      <div className="event-name-label">
        <Icon name="asterisk" color="red" size="tiny" />
        <p>{label}:</p>
      </div>
      <div className="ui form">
        <div className="field">
          <Form.Field error={hasError}>
            <TextArea
              rows="3"
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={props.handleInputChange}
              className="description-field"
            />
          </Form.Field>

          {hasError ? (
            <p className="error-field">This input is required</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
