import React from "react";
import cloudSunny from "../../../assets/images/cloud-sunny.png";
import cloud from "../../../assets/images/cloud.png";
import cloudySun from "../../../assets/images/cloudy-sun.png";
import drizzleRain from "../../../assets/images/drizzle-rain.png";
import drizzle from "../../../assets/images/drizzle.png";
import heavyRain from "../../../assets/images/heavy-rain.png";
import midnight from "../../../assets/images/mid-night.png";
import rain from "../../../assets/images/rain.png";
import snow from "../../../assets/images/snow.png";
import storm from "../../../assets/images/storm.png";
import sun from "../../../assets/images/sun.png";

export default function Weather(props) {
  const icons = {
    1: sun,
    2: sun,
    3: sun,
    4: cloudSunny,
    5: cloudSunny,
    6: cloudySun,
    7: cloud,
    8: cloud,
    11: cloud,
    12: rain,
    13: drizzleRain,
    14: drizzleRain,
    15: storm,
    16: storm,
    17: storm,
    18: rain,
    19: heavyRain,
    20: cloudySun,
    21: cloudSunny,
    22: snow,
    23: snow,
    24: snow,
    25: drizzle,
    26: rain,
    29: snow,
    30: sun,
    31: snow,
    32: cloud,
    33: midnight,
    34: midnight,
    35: midnight,
    36: midnight,
    37: cloud,
    38: cloud,
    39: cloud,
    40: rain,
    41: rain,
    42: storm,
    43: rain,
    44: snow
  };

  return (
    <div className="weather">
      <div className="half">
        {props.weather.day !== undefined ? (
          <>
            <div className="title">Day</div>
            <img src={icons[props.weather.day.icon]} alt="img-weather" />
            <div className="label">{props.weather.day.iconPhrase}</div>
            <div className="display-flex justify-around align-center">
              <div className="label small margin-right-10 margin-top-10">
                Max: {props.weather.temperature.maximum.value} &#9702;
                {props.weather.temperature.maximum.unit}
              </div>
              <div className="label small margin-top-10">
                Min:
                {props.weather.temperature.minimum.value} &#9702;
                {props.weather.temperature.minimum.unit}
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="half">
        {props.weather.day !== undefined ? (
          <>
            <div className="title">Night</div>
            <img src={icons[props.weather.night.icon]} alt="icon-weather" />
            <div className="label">{props.weather.night.iconPhrase}</div>
            <div className="display-flex justify-around align-center">
              <div className="label small margin-right-10 margin-top-10">
                Max: {props.weather.temperature.maximum.value} &#9702;
                {props.weather.temperature.maximum.unit}
              </div>
              <div className="label small margin-top-10">
                Min:
                {props.weather.temperature.minimum.value} &#9702;
                {props.weather.temperature.minimum.unit}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
