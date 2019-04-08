import React from 'react';
import { Icon, Search } from 'semantic-ui-react';

export default function LocationForm(props) {
  const {
    name,
    hasError,
    placeholder,
    isFetchingSearch,
    locationOptions,
    suggestionForLocation,
    location,
    label
  } = props;
  return (
    <div className="form-location-height full-width margin-top-10">
      <div className="display-flex event-name-label">
        <Icon name="asterisk" color="red" size="tiny" />
        <p>{label}:</p>
      </div>
      <div className="display-flex flex-column">
        <Search
          fluid
          name={name}
          placeholder={placeholder}
          loading={isFetchingSearch}
          onResultSelect={(ev, data) => props.handleUpdateFormState(ev, data)}
          onSearchChange={(ev, data) => props.handleLocationInput(ev, data)}
          results={locationOptions}
          value={suggestionForLocation}
          className="location-field"
        />
        {location.title !== '' ? (
          <div className="selected-location">
            <div className="ui image label large">
              <Icon name="map marker alternate" color="orange" />
              {location.title}
              <i
                className="delete icon"
                onClick={props.removeSelectedLocation}
              />
            </div>
          </div>
        ) : (
          ''
        )}

        {hasError ? (
          <p className="error-field">This input is required</p>
        ) : null}
      </div>
    </div>
  );
}
