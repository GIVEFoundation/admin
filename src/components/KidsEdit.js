import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Header from "./Header";
import * as actions from "../actions";
import * as utils from "../utils";
import uploadIcon from "../icons/upload.svg";
import get from 'lodash.get';

/*
  KidsEdit page 
*/

class KidsEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    root: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    };
  }

  async onDrop(files) {
    try {
      const token = process.env.REACT_APP_API_TOKEN;
      let formData  = new FormData();
      formData.append('files',files[0],files[0].name);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/upload`,
        {
          method: "post",
          headers: {
            'GIVEAPIToken': token
          },
          body: formData
        },
      );
      const json = await response.json();
      console.log(json);
      this.setState({
        avatar: get(json,'files[0].url','')
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { root, actions } = this.props;
    const { avatar } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        <Header />
				<article className="pa4 black-80">
          <h2 className="f4">{ id === '0' ? "New" : "Edit" } Kid</h2>
				    <fieldset className="ba b--transparent ph0 mh0">
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">ID (eth account)</label>
				        <input className="pa2 input-reset ba bg-transparent w-100 measure" name="id" />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Name</label>
				        <input className="pa2 input-reset ba bg-transparent w-100 measure" name="name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Date of birth</label>
                <DayPickerInput onDayChange={day => console.log(day)}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Parents emails</label>
				        <input className="pa2 input-reset ba bg-transparent w-100 measure" name="parents_email" />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">School name</label>
				        <input className="pa2 input-reset ba bg-transparent w-100 measure" name="school_name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">ID Tag name</label>
				        <input className="pa2 input-reset ba bg-transparent w-100 measure" name="id_tag_name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Avatar</label>
                <Dropzone className="ba b--dashed pa3 pointer w-30" onDrop={(files)=> this.onDrop(files)} accept=".jpg, .jpeg, .png, .tif, .tiff">
                  <h2 className="f4"> 
                    {avatar !== ''?
                    <img className="mr3" width="128px" src={`${utils.basePath(process.env.REACT_APP_API_URL)}${avatar}`} alt="avatar" />
                    : "Upload Kid photo"}
                  </h2>
                    <img className="mr3" width="20px" src={uploadIcon} alt="Upload" />
                  Drop image here or click to browse
                </Dropzone>
				      </div>
				    </fieldset>
				    <div className="mt3">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6" type="submit" value="Save"/>
              <Link to={'/kids' } className="link ml3 b ph3 pv2 ba black b--black bg-transparent grow pointer f6"> Cancel </Link>
            </div>
				</article>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    root: state
  };
}

const kids = connect(mapStateToProps, mapDispatchToProps)(KidsEdit);
export default withRouter(kids);
