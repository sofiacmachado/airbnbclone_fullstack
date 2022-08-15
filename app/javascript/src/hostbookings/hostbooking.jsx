import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { handleErrors, safeCredentials } from "@utils/fetchHelper";

import "./hostbooking.scss";

class HostBooking extends React.Component {
  state = {
    booking: {},
    loading: true,
  };
  componentDidMount() {
    fetch(`/api/bookings/${this.props.booking_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          booking: data.booking,
          loading: false,
        });
        console.log(data.booking);
      });
  }


  initiateStripeCheckout = (e, booking_id) => {
    e.preventDefault();
    return fetch(
      `/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`,
      safeCredentials({
        method: "POST",
      })
    )
      .then(handleErrors)
      .then((response) => {
        const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

        stripe
          .redirectToCheckout({
            sessionId: response.charge.checkout_session_id,
          })
          .then((result) => {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { booking, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    const { id, start_date, end_date, property, charges } = booking;
    return (
      <Layout>
        <div className="container pt-4">
          <div className="row">
            <div className="col-12 my-4">
              <div className="card-body border rounded px-4">
                <h1 className="card-title text-center mb-3">
                  {property.title}
                </h1>
                <div className="row">
                  <div
                    className="col-6 property-image border rounded mb-3"
                    style={{ backgroundImage: `url(${property.image_url})` }}
                  />
                  <div className="col-6">
                    <h2 className="mb-1">There's a reservation from <u>{booking.user.username}</u></h2>
                    <h5><b>{start_date}</b> to <b>{" "}{end_date}</b></h5>
                    <p className="card-text text-uppercase mb-2 text-secondary">
                      <small>{property.city}</small>
                      <br />
                    </p>
                    <p className="card-text">
                      <span className="me-3">
                        <b>Bedrooms:</b> {property.bedrooms}
                      </span>
                      <span className="me-3">
                        <b>Beds:</b> {property.beds}
                      </span>
                      <span className="me-3">
                        <b>Baths:</b> {property.baths}
                      </span>
                    </p>
                    <p className="card-text mt-2 mb-4 text-justify">
                      <i>{property.description}</i>
                    </p>
                    <h5 className="mt-4">
                      Payment Status:{" "}
                      {booking.paid === true ? (
                        <span className="ms-2 text-success">Paid</span>
                      ) : (
                        <span className="ms-2 text-danger">Unpaid</span>
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default HostBooking;