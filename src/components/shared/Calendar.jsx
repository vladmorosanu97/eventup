
import React, { Component } from "react";

export default class Calendar extends Component {
  divStyle = {
    margin: '40px',
    border: '5px solid pink'
  };

  componentDidUpdate() {
    let days = document.querySelectorAll("td");
    [].forEach.call(days, function(el) {
      el.classList.remove('current-day');
    });
    if(this.props.day !== undefined && this.props.day !== null && this.props.day !== "") {
      document.querySelector(`td[data-day="${this.props.day}"`).classList.add('current-day');
    }
  } 

  render() {
    const { day, month, time } = this.props;
    return (
      <>
        <div class="calendar-container">
          <header>
            <div>
              <div class="day">{day}</div>
              <div class="month">{month}</div>
            </div>
            <div className="time-section">
              <div class="time">{time}</div>
            </div>
          </header>

          <table class="calendar">
            <thead>
              <tr>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="prev-month">29</td>
                <td class="prev-month">30</td>
                <td class="prev-month">31</td>
                <td data-day="01">01</td>
                <td data-day="02">02</td>
                <td data-day="03">03</td>
                <td data-day="04">04</td>
              </tr>

              <tr>
                <td data-day="05">05</td>
                <td data-day="06">06</td>
                <td data-day="07">07</td>
                <td data-day="08">08</td>
                <td data-day="09">09</td>
                <td data-day="10">10</td>
                <td data-day="11">11</td>
              </tr>

              <tr>
                <td data-day="12">12</td>
                <td data-day="13">13</td>
                <td data-day="14">14</td>
                <td data-day="15">15</td>
                <td data-day="16">16</td>
                <td data-day="17">17</td>
                <td data-day="18">18</td>
              </tr>

              <tr>
                <td data-day="19">19</td>
                <td data-day="20">20</td>
                <td data-day="21">21</td>
                <td data-day="22">22</td>
                <td data-day="23">23</td>
                <td data-day="24">24</td>
                <td data-day="25">25</td>
              </tr>

              <tr>
                <td data-day="26">26</td>
                <td data-day="27">27</td>
                <td data-day="28">28</td>
                <td data-day="29">29</td>
                <td data-day="30">30</td>
                <td data-day="31">31</td>
                <td class="next-month">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
