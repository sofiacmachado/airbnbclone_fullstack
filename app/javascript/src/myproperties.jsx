import React from 'react';
import Layout from '@src/layout';
import ReactDOM from 'react-dom';
import { handleErrors } from '@utils/fetchHelper';

import "./myproperties.scss";

class Myproperties extends React.Component {
  state = {
    properties: [],
    loading: true,
    authenticated: false,
  };

  componentDidMount() {
    fetch(`/api/myproperties`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          properties: data.properties,
          loading: false,
          authenticated: true,
        });
      });
  }

  render() {
    const { properties, loading, authenticated } = this.state;

    if (authenticated === false) {
      return (
        <Layout>
          <div className="container pt-4">
            <div className="row">
              <div className="col-10">
                <h4 className="mb-1">My properties</h4>
                <p className="text-secondary mb-3">
                  Find guests for your properties all around the world
                </p>
              </div>
            </div>

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
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="container pt-4">
          <div className="row">
            <div className="col-10">
              <h4 className="mb-1">My properties</h4>
              <p className="text-secondary mb-3">
                Find guests for your properties all around the world
              </p>
            </div>
            <div className="col-2">
              <a href="/myproperties/add" className="btn btn-primary mt-3">
                Add property
              </a>
            </div>
          </div>
          <div className="row">
            {properties.map((property) => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a
                    href={`/property/${property.id}`}
                    className="text-body text-decoration-none"
                  >
                    <div
                      className="property-image mb-1 rounded"
                      style={{ backgroundImage: `url(${property.image_url})` }}
                    />
                    <p className="text-uppercase mb-0 text-secondary">
                      <small>
                        <b>{property.city}</b>
                      </small>
                    </p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0">
                      {" "}
                      <small>${property.price_per_night} USD / night</small>
                    </p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Myproperties />,
    document.body.appendChild(document.createElement("div"))
  );
});
