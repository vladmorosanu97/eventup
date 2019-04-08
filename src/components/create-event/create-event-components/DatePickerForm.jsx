import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import { DatetimePickerTrigger } from 'rc-datetime-picker';

export default function DatePickerForm(props) {
  const { label, hasError, shortcuts, moment } = props;
  return (
    <div className="form-input-height full-width margin-top-10">
      <div className="display-flex event-name-label">
        <Icon name="asterisk" color="red" size="tiny" />
        <p>{label}:</p>
      </div>
      <DatetimePickerTrigger
        shortcuts={shortcuts}
        moment={moment}
        closeOnSelectDay={true}
        onChange={props.handleDateChange}
      >
        <div className="ui action input">
          <Input
            error={hasError}
            type="text"
            name="date"
            value={moment.format('lll')}
            readOnly
          />
          <button className="ui icon button">
            <i className="search icon" />
          </button>
        </div>
      </DatetimePickerTrigger>
      {hasError ? <p className="error-field">This input is required</p> : null}
    </div>
  );
}
