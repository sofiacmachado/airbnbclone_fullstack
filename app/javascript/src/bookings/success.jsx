import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { handleErrors, safeCredentials } from "@utils/fetchHelper";

import "./success.scss";

class Success extends React.Component {
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
              <div className="card-body border">
                <h3 className="card-title text-center mb-3">
                  You're reservation is confirmed #{booking.id}
                </h3>
                <div className="row">
                  <div
                    className="col-6 property-image mb-3"
                    style={{ backgroundImage: `url(${property.image_url})` }}
                  />
                  <div className="col-6">
                    <h5 className="mb-1">{property.title}</h5>
                    <p className="card-text text-uppercase mb-2 text-secondary">
                      <small>{property.city}</small>
                      <br />
                      <small>from <b>{start_date}</b> to <b>{" "}{end_date}</b></small>
                    </p>
                    <p className="card-text">
                      <span className="mr-3">
                        <b>Bedrooms:</b> {property.bedrooms}
                      </span>
                      <span className="mr-3">
                        <b>Beds:</b> {property.beds}
                      </span>
                      <span className="mr-3">
                        <b>Baths:</b> {property.baths}
                      </span>
                    </p>
                    <p className="card-text mt-2 mb-4 text-justify">
                      {property.description}
                    </p>
                    <h5 className="mt-4">
                      Payment Status:{" "}
                      {booking.paid === true ? (
                        <span className="ml-2 text-success">Paid</span>
                      ) : (
                        <span className="ml-2 text-danger">Unpaid</span>
                      )}
                    </h5>
                    <p>Amount: $ {charges[0].amount}</p>
                    {booking.paid === true ? (
                      <a href="#" className="btn btn-success disabled">
                        Pay now
                      </a>
                    ) : (
                      <a
                        href=""
                        onClick={(e) => this.initiateStripeCheckout(e, id)}
                        className="btn btn-primary text-white"
                      >
                        Pay now
                      </a>
                    )}
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

export default Success;