import React, { Component } from "react";
import "../scss/AddPostForm.scss";
import "react-phone-number-input/style.css";
import "filepond/dist/filepond.min.css";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  Checkbox,
} from "@material-ui/core";
import { RentPostType } from "../models/constants/rentPostType";
import { RentType } from "../models/constants/rentType";
import { LocationType } from "../models/constants/location";
import PhoneInput from "react-phone-number-input";
import { FilePond } from "react-filepond";
import RentPostPhoto from "../models/RentPostPhoto";
import { connect } from "react-redux";
import DashboardState from "../redux/store/store";
import { toggleAddForm, createRentPostBegin } from "../redux/actions/actions";
import RentPostDTO from "../models/dtos/RentPostDTO";
import { getCookie } from "../services/CookieService";
import firebase from "firebase";
import { OutlinedInput } from "@material-ui/core";

type SelectEvent = React.ChangeEvent<{
  name?: string | undefined;
  value: unknown;
}>;

interface IProps {
  visible: boolean;
  toggleForm: Function;
  createRentPost: Function;
}

interface IState {
  authorPhone: string;
  price: number;
  guaranty: number;
  contract: boolean;
  postType: RentPostType;
  rentType: RentType;
  floor: number;
  location: LocationType;
  rooms: number;
  bathrooms: number;
  balcony: number;
  description: string;
  photos: RentPostPhoto[];
}

class AddPostForm extends Component<IProps, IState> {
  filePond: FilePond | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      authorPhone: "",
      price: 0,
      guaranty: 0,
      contract: false,
      postType: RentPostType.RENT,
      rentType: RentType.ROOM,
      floor: 0,
      location: LocationType.Cluj,
      rooms: 0,
      bathrooms: 0,
      balcony: 0,
      description: "",
      photos: [],
    };
  }

  handleAddPostButton() {
    const rentPostToAdd: RentPostDTO = {
      rentPostData: {
        createDate: firebase.firestore.Timestamp.fromDate(new Date()),
        authorID: getCookie("not-token") || "",
        authorName: "",
        authorPhone: this.state.authorPhone,
        price: this.state.price,
        guaranty: this.state.guaranty,
        contract: this.state.contract,
        postType: this.state.postType,
        rentType: this.state.rentType,
        floor: this.state.floor,
        location: this.state.location,
        rooms: this.state.rooms,
        bathrooms: this.state.bathrooms,
        balcony: this.state.balcony,
        description: this.state.description,
        photos: [],
      },
      photos: this.state.photos,
    };
    this.props.createRentPost(rentPostToAdd);
    this.props.toggleForm();
  }

  handleCancelButton() {
    this.props.toggleForm();
  }

  render() {
    return (
      <div
        className="form-container"
        style={{ display: this.props.visible ? "flex" : "none" }}
      >
        <div className="form-input-fields">
          <h2 className="form-title">Create a new post</h2>

          <div className="select-type-area">
            <div className="post-type-area">
              <p className="form-helper">Rent or sell?</p>
              <br />
              <FormControl>
                <Select
                  native
                  variant="outlined"
                  value={this.state.postType}
                  onChange={(event) => this.handlePostTypeChange(event)}
                >
                  {Object.keys(RentPostType).map((option: string) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="rent-type-area">
              <p className="form-helper">
                What do you {this.state.postType.toLowerCase()}?
              </p>
              <br />
              <FormControl>
                <Select
                  native
                  variant="outlined"
                  value={this.state.rentType}
                  onChange={(event) => this.handleRentTypeChange(event)}
                >
                  {Object.keys(RentType).map((option: string) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <br />
          <div className="select-location-area">
            <p className="form-helper">Cool! Where is it?</p>
            <FormControl>
              <Select
                native
                variant="outlined"
                value={this.state.location}
                onChange={(event) => this.handleLocationChange(event)}
              >
                {Object.keys(LocationType).map((option: string) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="short-fields-area">
            <p className="form-helper">Nice! Give us some numbers</p>
            <div className="input-fields-area">
              <div className="price-area">
                <FormControl className="add-form-input-field">
                  <InputLabel>Price</InputLabel>
                  <Input
                    type="number"
                    value={this.state.price}
                    onChange={this.handlePriceChange.bind(this)}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormControl className="add-form-input-field">
                  <InputLabel>Guaranty</InputLabel>
                  <Input
                    type="number"
                    value={this.state.guaranty}
                    onChange={this.handleGuarantyChange.bind(this)}
                    autoComplete="new-password"
                  />
                </FormControl>
              </div>
              <br />
              <div className="short-numbers-area">
                <FormControl className="add-form-input-field">
                  <InputLabel>Floor</InputLabel>
                  <Input
                    type="number"
                    value={this.state.floor}
                    onChange={this.handleFloorChange.bind(this)}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormControl className="add-form-input-field">
                  <InputLabel>Rooms</InputLabel>
                  <Input
                    type="number"
                    value={this.state.rooms}
                    onChange={this.handleRoomsChange.bind(this)}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormControl className="add-form-input-field">
                  <InputLabel>Bathrooms</InputLabel>
                  <Input
                    type="number"
                    value={this.state.bathrooms}
                    onChange={this.handleBathroomsChange.bind(this)}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormControl className="add-form-input-field">
                  <InputLabel>Balcony</InputLabel>
                  <Input
                    type="number"
                    value={this.state.balcony}
                    onChange={this.handleBalconyChange.bind(this)}
                    autoComplete="new-password"
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <br />
          <div className="description-area">
            <FormControl className="description-field">
              <OutlinedInput
                multiline
                rows={3}
                value={this.state.description}
                onChange={this.handleDescriptionChange.bind(this)}
                autoComplete="new-password"
                placeholder="Tell us more. What about the surroundings? Or neighbours?"
              />
            </FormControl>
          </div>
          <br />
          <div className="phone-area">
            <p className="form-helper">Where should we call?</p>
            <PhoneInput
              placeholder="Phone number"
              defaultCountry="RO"
              value={this.state.authorPhone}
              onChange={this.handleAuthorPhoneChange.bind(this)}
            />
          </div>
          <br />
          <div className="upload-files-area">
            <div className="upload-files">
              <FilePond
                ref={(ref) => {
                  this.filePond = ref;
                }}
                allowMultiple={true}
                oninit={() => console.log("FilePond instance init")}
                onupdatefiles={(fileItems) => {
                  this.setState({
                    photos: fileItems.map((fileItem) => {
                      const rentPostPhoto: RentPostPhoto = {
                        name: fileItem.filename,
                        file: fileItem.file,
                      };
                      return rentPostPhoto;
                    }),
                  });
                }}
              ></FilePond>
            </div>
            <FormControl>
              <p className="form-helper">Yes, there is a contract</p>
              <Checkbox
                value={this.state.contract}
                onChange={(event) => this.handleContractChange(event)}
              />
            </FormControl>
          </div>
        </div>
        <div className="add-form-actions">
          <button
            className="cancel-button"
            onClick={this.handleCancelButton.bind(this)}
          >
            Cancel
          </button>
          <button
            className="create-button"
            onClick={this.handleAddPostButton.bind(this)}
          >
            Create
          </button>
        </div>
      </div>
    );
  }

  handleAuthorPhoneChange(phoneNumber: string) {
    this.setState({
      authorPhone: phoneNumber,
    });
  }

  handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      price: Number(event.target.value),
    });
  }

  handleGuarantyChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      guaranty: Number(event.target.value),
    });
  }

  handleContractChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      contract: event.target.checked,
    });
  }

  handlePostTypeChange(event: SelectEvent) {
    const result = event.target.value as keyof typeof RentPostType;
    this.setState({
      postType: RentPostType[result],
    });
  }

  handleRentTypeChange(event: SelectEvent) {
    const result = event.target.value as keyof typeof RentType;
    this.setState({
      rentType: RentType[result],
    });
  }

  handleFloorChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      floor: Number(event.target.value),
    });
  }

  handleLocationChange(event: SelectEvent) {
    const result = event.target.value as keyof typeof LocationType;
    this.setState({
      location: LocationType[result],
    });
  }

  handleRoomsChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      rooms: Number(event.target.value),
    });
  }

  handleBathroomsChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      bathrooms: Number(event.target.value),
    });
  }

  handleBalconyChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      balcony: Number(event.target.value),
    });
  }

  handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: event.target.value,
    });
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    visible: state.toggleAddForm,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleForm: () => dispatch(toggleAddForm()),
    createRentPost: (rentPost: RentPostDTO) =>
      dispatch(createRentPostBegin(rentPost)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);
