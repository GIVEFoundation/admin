import React from 'react';
import Header from './Header';

const Main = (props) => {
return (
  <div>
    <Header/>
    <div class="pa4-l">
    <form className="bg-light-red mw7 center pa4 br2-ns ba b--black-10">
    <fieldset className="cf bn ma0 pa0">
      <div className="cf">
        <label className="clip" for="email-address">Email Address</label>
        <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Search Kids/Parents/Charities/Products/Services/Media" type="text" name="query" value=""/>
        <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" value="Search"/>
      </div>
    </fieldset>
    </form>
  </div>
  </div>
);
}
export default Main;

