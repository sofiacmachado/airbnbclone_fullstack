import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from "@utils/fetchHelper";

import "./trips.scss";

class Trips extends React.Component {
  state = {
    bookings: [],
    loading: true,
    authenticated: false,
  };

  componentDidMount() {
    fetch(`/api/bookings`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          bookings: data.bookings,
          loading: false,
          authenticated: true,
        });
      });
  }

  render() {
    const { bookings, loading, authenticated } = this.state;
    return (
      <Layout>
        <div className="container pt-4">
          <h4 className="mb-1">Upcoming trips</h4>
          <p className="text-secondary mb-3">
            Explore some of the best-reviewed stays in the world
          </p>
          {authenticated === true ? (
            <div className="row">
              {loading === true ? (
                <p>Loading...</p>
              ) : (
                <div className="col list-group">
                  {bookings.length !== 0 ? (
                    bookings.map((booking) => {
                      return (
                        <a
                          href={`booking/${booking.id}/success`}
                          key={booking.id}
                          class="list-group-item list-group-item-action"
                        >
                          <div className="row">
                            <div
                              className="col-3 property-image mb-1 rounded"
                              style={{
                                backgroundImage: `url(${booking.image_url})`,
                              }}
                            />
                            <div className="col-9">
                              <h6>
                                {booking.title}{" "}
                                <small>({booking.start_date}</small> -{" "}
                                <small>{booking.end_date})</small>
                              </h6>
                              <p>
                                Payment status:{" "}
                                {booking.paid === true ? (
                                  <small className="ms-1 text-success">
                                    <b>Paid</b>
                                  </small>
                                ) : (
                                  <small className="ms-1 text-danger">
                                    <b>Pending</b>
                                  </small>
                                )}
                              </p>
                              <p>
                                <b>
                                  Total:{" "}
                                  {booking.charges.length !== 0 ? (
                                    <span>${booking.charges[0].amount}</span>
                                  ) : (
                                    <span>N/A</span>
                                  )}
                                </b>
                              </p>
                            </div>
                          </div>
                        </a>
                      );
                    })
                  ) : (
                    <div className="col-12 my-4">
                      <h6>You do not have any upcoming bookings</h6>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="col-12 my-4">
              <div className="border p-4">
                <p className="mb-0">
                  Please{" "}
                  <a href={`/login?redirect_url=${window.location.pathname}`}>
                    log in
                  </a>{" "}
                  to see your properties.
                </p>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Trips />,
    document.body.appendChild(document.createElement("div"))
  );
});