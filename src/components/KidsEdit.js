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
      kid_id: '',
      name: '',
      date_of_birth: '',
      parents_emails: [],
      school_name: '',
      id_tag_name: '',
      avatar: '',
      errors: { 
        kid_id: false,
        name: false,
        date_of_birth: false,
        parents_emails: false,
        school_name: false,
        id_tag_name: false,
      } 
    };
  }

  changeVal( field, ev ) {
    const { errors } = this.state;
    ev.preventDefault();

    let hasErrors = this.validate(field,ev.target.value);
    this.setState({
      [field]: ev.target.value,
      errors: {...errors, [field]: hasErrors }
    });
  }

  saveKid(ev) {
    let errors = {};
    let hasErrors = false;

    ev.preventDefault();

    for (let k of Object.keys(this.state.errors)) {
        let invalid = this.validate(k,this.state[k]);
        errors = {...errors, [k]: invalid};
        if ( invalid ) {
          hasErrors = true;
        }
    }

    this.setState({
      errors
    });

    if (hasErrors) {
        alert('There are errors');
        return;
    }
    alert('Save');
  }

  changeDate(day) {
    const {errors} = this.state;
    this.setState({
      date_of_birth: day,
      errors: {...errors, date_of_birth: false }
    });
  }

  validate( field, value ) {
    let invalid = false;

    switch ( field ) {
      case 'kid_id':
        invalid = (value.length < 40);
      break;
      case 'name':
        invalid = (value.length < 3);
      break;
      case 'date_of_birth':
        invalid = (value.length < 8);
      break;
      case 'parents_emails':
        invalid = (value.length < 7);
      break;
      case 'school_name':
        invalid = (value.length < 3);
      break;
    }

  return invalid;
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
      this.setState({
        avatar: get(json,'files[0].url','')
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { root, actions } = this.props;
    const { kid_id, name, parents_emails, school_name, avatar, errors } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        <Header />
				<article className="pa4 black-80">
          <h2 className="f4">{ id === '0' ? "New" : "Edit" } Kid</h2>
				    <fieldset className="ba b--transparent ph0 mh0">
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">ID (eth account)</label>
				        <input className={`pa2 input-reset ba bg-transparent w-100 measure ${errors.kid_id?"b--red":""}`} values={kid_id} onChange={(ev)=> this.changeVal('kid_id',ev)} />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Name</label>
				        <input className={`pa2 input-reset ba bg-transparent w-100 measure ${errors.name?"b--red":""}`} values={name} onChange={(ev)=> this.changeVal('name',ev)} />
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Date of birth</label>
                <DayPickerInput onDayChange={day => this.changeDate(day)}/>
                {errors.date_of_birth?<span className="f4 b red">*</span>:null}
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">Parents emails</label>
				        <input className={`pa2 input-reset ba bg-transparent w-100 measure ${errors.parents_emails?"b--red":""}`} values={parents_emails} onChange={(ev)=> this.changeVal('parents_emails',ev)}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw4 lh-copy f6">School name</label>
				        <input className={`pa2 input-reset ba bg-transparent w-100 measure ${errors.school_name?"b--red":""}`} values={school_name} onChange={(ev)=> this.changeVal('school_name',ev)} />
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
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6" onClick={(ev)=> this.saveKid(ev)} type="submit" value="Save"/>
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
