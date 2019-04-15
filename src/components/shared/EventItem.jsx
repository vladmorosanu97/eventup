import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, Segment, Popup } from "semantic-ui-react";

export default function EventItem(props) {
  const { event, buttons, calculateDistanceFailed } = props;
  let currentDate = new Date();
  let eventDate = new Date(event.date.entireDate);
  let isFinished = eventDate < currentDate;
  return (
    <>
      <div label={{ as: "a", corner: "left", icon: "heart" }} className={`event_item-container ${props.className} `} onClick={props.onClickEvent}>
        <div className="event_item-date-container">
          <div className={`event_item-date-day ${isFinished ? "gray" : ""}`}>{event.date.day}</div>
          <div className="event_item-date-month">{event.date.month}</div>
        </div>

        <div className="event_item-info-container">
          <div className="event_item-info-title">
            <Link to={`/event/${event.eventId}`} className={isFinished ? "gray" : null}>
              {event.title}
            </Link>{" "}
          </div>
          <div className="event_item-info-date">
            <i className="clock outline grey icon" />
            {event.date.entireDate}
          </div>
          <div className="event_item-info-location">
            <i className="map marker alternate grey icon" />
            {event.location.title}
          </div>

          <div className={`event_item-info-distance ${isFinished ? "gray" : ""}`}>
            {!calculateDistanceFailed && calculateDistanceFailed !== undefined ? (
              <>
                <i className="map marker alternate grey icon" />
                {event.location.distance + " Km" + " distance"}
              </>
            ) : calculateDistanceFailed !== undefined ? (
              <>
                <i className="map marker alternate grey icon" />
                {"Allow location to see distances"}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="display-flex">
          <Link to={`/event/${event.eventId}`}>
            <Button basic color={`${isFinished ? "gray" : "orange"}`}>
              Details
            </Button>
          </Link>
          {buttons != undefined &&
            !isFinished &&
            buttons.map(element => (
              <Link to={element.linkTo}>
                <Button basic color={`${isFinished ? "gray" : "orange"}`}>
                  {element.label}
                </Button>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
