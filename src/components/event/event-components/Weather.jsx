import React from 'react';
import cloudSunny from '../../../assets/images/cloud-sunny.png';
import cloudWinter from '../../../assets/images/cloud-winter.png';
import cloud from '../../../assets/images/cloud.png';
import cloudSun from '../../../assets/images/cloudly-sun.png';
import drizzleRain from '../../../assets/images/drizzle-rain.png';
import drizzle from '../../../assets/images/drizzle.png';
import heavyRain from '../../../assets/images/heavy-rain.png';
import heavySnow from '../../../assets/images/heavy-snow.png';
import midnight from '../../../assets/images/mid-night.png';
import rain from '../../../assets/images/rain.png';
import snow from '../../../assets/images/snow.png';
import storm from '../../../assets/images/storm.png';
import sunUmbrella from '../../../assets/images/sun-umbrella.png';
import sun from '../../../assets/images/sun.png';
import thunderbolt from '../../../assets/images/thunderblot.png';

export default function Weather(props) {
  const icons = {
    1: sun,
    2: sun,
    3: sun,
    4: sun,
    5: cloudSunny,
    6: cloudSunny,
    7: cloud,
    8: cloud,
    11: cloud,
    12: rain,
    13: drizzleRain,
    14: drizzleRain,
    15: storm,
    16: storm,
    17: rain,
    18: rain,
    19: drizzle,
    20: cloudSunny,
    21: cloudSun,
    22: snow,
    23: cloudWinter,
    24: rain,
    25: snow,
    26: heavyRain,
    29: snow,
    30: sun,
    31: cloudWinter,
    32: drizzleRain,
    33: midnight,
    34: midnight,
    35: midnight,
    36: midnight,
    37: cloud,
    38: cloud,
    39: cloud,
    40: snow,
    41: snow,
    42: snow,
    43: snow,
    44: snow
  };

  return (
    <div className="weather">
      <div className="half">
        {props.weather.day !== undefined ? (
          <>
            <div className="title">Day</div>
            <img src={icons[props.weather.day.icon]} />
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
            <img src={icons[props.weather.night.icon]} />
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
