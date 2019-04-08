import React from 'react';
import { Icon, Input, Select } from 'semantic-ui-react';

export default function SelectForm(props) {
  const { label, name, hasError, placeholder, categoryOptions } = props;
  return (
    <div className="form-input-height full-width margin-top-10">
      <div className="event-name-label">
        <Icon name="asterisk" color="red" size="tiny" />
        <p>{label}:</p>
      </div>
      <div className="display-flex flex-column">
        <Select
          error={hasError}
          name={name}
          className="category-select"
          placeholder={placeholder}
          options={categoryOptions}
          onChange={(ev, data) => props.handleCategoryChange(ev, data)}
        />

        {hasError ? (
          <p className="error-field">This input is required</p>
        ) : null}
      </div>
    </div>
  );
}
