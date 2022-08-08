// bookingWidget.jsx
import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import 'react-dates/lib/css/_datepicker.css';

class BookingWidget extends React.Component {
    state = {
      authenticated: false,
      startDate: null,
      endDate: null,
      focusedInput: null,
      loading: false,
      error: false,
    }
  
    componentDidMount() {
      fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
          this.setState({
            authenticated: data.authenticated,
          })
        })
    }
  
    submitBooking = (e) => {
      if (e) { e.preventDefault(); }
      const { startDate, endDate } = this.state;
      console.log(startDate, endDate);
  
      fetch(`/api/bookings`, safeCredentials({
        method: 'POST',
          body: JSON.stringify({
            booking: {
              property_id: this.props.property_id,
              start_date: null,
              end_date: null,
            }
          })
      }))
        .then(handleErrors)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  
    onDatesChange = ({ startDate, endDate }) => this.setState({ startDate, endDate })
  
    onFocusChange = (focusedInput) => this.setState({ focusedInput })
  
    render () {
      const { authenticated, startDate, endDate, focusedInput } = this.state;
      if (!authenticated) {
        return (
          <div className="border p-4 mb-4">
            Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
          </div>
        );
      };
  
      const { price_per_night } = this.props;
  
      return (
        <div className="border p-4 mb-4">
          <form onSubmit={this.submitBooking}>
            <h5>${price_per_night} <small>per night</small></h5>
            <hr/>
            <div className="mb-5">
              <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="start_date" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="end_date" // PropTypes.string.isRequired,
                onDatesChange={this.onDatesChange}
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                numberOfMonths={1}
              />
            </div>
            <button type="submit" className="btn btn-large btn-danger btn-block">Book</button>
          </form>
        </div>
      )
    }
  }
  
  export default BookingWidget;