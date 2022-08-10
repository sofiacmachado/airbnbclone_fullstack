// property.jsx
import React from 'react';
import Layout from '@src/layout';
import ReactDOM from 'react-dom';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';

import './property.scss';
class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //property: {},
      title: "",
      property_type: "",
      city: "",
      country: "",
      price: "",
      description: "",
      bedrooms: "",
      beds: "",
      baths: "",
      max_guests: "",
      id: "",
      image_url: "",
      user: "",
      loading: true,
      authenticated: false,
      editing: false,
    };

    this.editMode = this.editMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleBedroomChange = this.handleBedroomChange.bind(this);
    this.handleBedChange = this.handleBedChange.bind(this);
    this.handleBathChange = this.handleBathChange.bind(this);
    this.handleMaxGuestChange = this.handleMaxGuestChange.bind(this);
  }

  editMode = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  };

  cancelEdit = (e) => {
    e.preventDefault();
    this.setState({ editing: false });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handlePropertyTypeChange = (event) => {
    this.setState({ property_type: event.target.value });
  };
  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };
  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ price_per_night: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  handleBedroomChange = (event) => {
    this.setState({ bedrooms: event.target.value });
  };
  handleBedChange = (event) => {
    this.setState({ beds: event.target.value });
  };
  handleBathChange = (event) => {
    this.setState({ baths: event.target.value });
  };
  handleMaxGuestChange = (event) => {
    this.setState({ max_guests: event.target.value });
  };

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          //property: data.property,
          loading: false,

          id: data.property.id,
          title: data.property.title,
          description: data.property.description,
          city: data.property.city,
          country: data.property.country,
          property_type: data.property.property_type,
          price_per_night: data.property.price_per_night,
          max_guests: data.property.max_guests,
          bedrooms: data.property.bedrooms,
          beds: data.property.beds,
          baths: data.property.baths,
          image_url: data.property.image_url,
          user: data.property.user,
        });
        console.log(data.property);
      });

    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          authenticated: data,
        });
      });
  }

  updateProperty = (e) => {
    const {
      title,
      property_type,
      city,
      country,
      price_per_night,
      description,
      max_guests,
      bedrooms,
      beds,
      baths,
    } = this.state;

    if (e) {
      e.preventDefault();
    }

    let formData = new FormData();

    formData.set("property[title]", title);
    formData.set("property[description]", description);
    formData.set("property[city]", city);
    formData.set("property[country]", country);
    formData.set("property[property_type]", property_type);
    formData.set("property[price_per_night]", price_per_night);
    formData.set("property[max_guests]", max_guests);
    formData.set("property[bedrooms]", bedrooms);
    formData.set("property[beds]", beds);
    formData.set("property[baths]", baths);

    fetch(
      `/api/properties/${this.props.property_id}/update/`,
      safeCredentialsForm({
        method: "PUT",
        body: formData,
      })
    )
      .then(handleErrors)
      .then((response) => {
        console.log(response);
        window.location = `/property/${response.property.id}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      loading,
      authenticated,
      editing,
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Layout>
        <div
          className="property-image mb-3"
          style={{ backgroundImage: `url(${image_url})` }}
        />
        <div className="container">
          {editing === true ? (
            <div className="row">
              <form className="col-12" onSubmit={this.updateProperty}>
                <div className="row">
                  <div className="info col-12">
                    <div className="mb-3">
                      <label htmlFor="inputTitle">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputTitle"
                        placeholder={title}
                        value={title}
                        onChange={this.handleTitleChange}
                        maxLength="70"
                      />
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputCity">City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            placeholder={city}
                            onChange={this.handleCityChange}
                            value={city}
                            maxLength="200"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputCountry">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCountry"
                            placeholder={country}
                            onChange={this.handleCountryChange}
                            value={country}
                            maxLength="200"
                          />
                        </div>
                      </div>
                      <p className="mb-0">
                        <small>
                          Hosted by <b>{user.username}</b>
                        </small>
                      </p>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="mb-0 text-capitalize">
                          <label htmlFor="inputType">
                            Type of Accommodation
                          </label>
                          <select
                            id="inputType"
                            className="form-control"
                            onChange={this.handlePropertyTypeChange}
                            value={property_type}
                          >
                            <option>Shared Room In Apartment</option>
                            <option>Private Room In Apartment</option>
                            <option>Whole Apartment</option>
                          </select>
                        </p>
                        <div className="form-row">
                          <div className="form-group col">
                            <label htmlFor="inputMaxGuests">Max guests</label>
                            <select
                              id="inputMaxGuests"
                              className="form-control"
                              onChange={this.handleMaxGuestChange}
                              value={max_guests}
                              type="number"
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                            </select>
                          </div>
                          <div className="form-group col">
                            <label htmlFor="inputBedroom">Bedrooms</label>
                            <select
                              id="inputBedroom"
                              className="form-control"
                              onChange={this.handleBedroomChange}
                              value={bedrooms}
                              type="number"
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </select>
                          </div>
                          <div className="form-group col">
                            <label htmlFor="inputBed">Beds</label>
                            <select
                              id="inputBed"
                              className="form-control"
                              onChange={this.handleBedChange}
                              value={beds}
                              type="number"
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </select>
                          </div>
                          <div className="form-group col">
                            <label htmlFor="inputBath">Baths</label>
                            <select
                              id="inputBath"
                              className="form-control"
                              onChange={this.handleBathChange}
                              value={baths}
                              type="number"
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                            </select>
                          </div>
                        </div>
                        <label htmlFor="inputPrice">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPrice"
                          placeholder={`$${price_per_night}`}
                          onChange={this.handlePriceChange}
                          value={price_per_night}
                          maxLength="200"
                        />
                      </div>

                      {authenticated.username == user.username &&
                      editing === false ? (
                        <div className="col-3">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={((e) => e, this.editMode)}
                          >
                            Edit property
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <hr />
                    <p>
                      <label htmlFor="inputDescription">Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="10"
                        id="inputDescription"
                        placeholder={description}
                        onChange={this.handleDescriptionChange}
                        value={description}
                        maxLength="2000"
                      />
                    </p>
                  </div>

                  <div className="col-11">
                    <button type="submit" className="btn btn-primary mr-2">
                      Update property
                    </button>
                    <button
                      className="btn btn-outline-secondary ml-2"
                      onClick={((e) => e, this.cancelEdit)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>{" "}
            </div>
          ) : (
            <div className="row">
              <div className="info col-12 col-lg-8">
                <div className="mb-3">
                  <h3 className="mb-0">{title}</h3>
                  <p className="text-uppercase mb-0 text-secondary">
                    <small>
                      {city} - {country}
                    </small>
                  </p>
                  <p className="mb-0">
                    <small>
                      Hosted by <b>{user.username}</b>
                    </small>
                  </p>
                </div>
                <div className="row">
                  <div className="col-9">
                    <p className="mb-0 text-capitalize">
                      <b>{property_type}</b>
                    </p>
                    <p>
                      <span className="mr-3">{max_guests} guests</span>
                      <span className="mr-3">{bedrooms} bedroom</span>
                      <span className="mr-3">{beds} bed</span>
                      <span className="mr-3">{baths} bath</span>
                    </p>
                  </div>
                  <div className="col-3">
                    {authenticated.username == user.username ? (
                      <button
                        className="btn btn-outline-secondary"
                        onClick={((e) => e, this.editMode)}
                      >
                        Edit property
                      </button>
                    ) : null}
                  </div>
                </div>
                <hr />
                <p>{description}</p>
              </div>
              <div className="col-12 col-lg-4">
                <BookingWidget
                  property_id={id}
                  price_per_night={price_per_night}
                  authenticated={authenticated.authenticated}
                />
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default Property;