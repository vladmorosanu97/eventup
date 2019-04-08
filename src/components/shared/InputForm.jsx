import React from 'react';
import { Icon, Input } from 'semantic-ui-react';

export default function InputForm(props) {
  const { label, value, name, hasError, placeholder } = props;
  return (
    <div className="form-input-height event_info-title margin-top-10">
      <div className="event-name-label">
        <Icon name="asterisk" color="red" size="tiny" />
        <p>{label}:</p>
      </div>
      <div>
        <div className="display-flex flex-column">
          <Input
            error={hasError}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={props.handleInputChange}
          />
          {hasError ? (
            <p className="error-field">This input is required</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
