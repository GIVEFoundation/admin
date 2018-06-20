import React from 'react';
import logo from '../icons/GIVElogo.png';
import { Link } from 'react-router-dom';

const Header = (props) => {
return (
<nav className="db dt-l w-100 border-box pa3 ph5-l bb">
  <Link to={'/'} className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" title="Home">
    <img src={logo} alt="GIVE"/>Admin
  </Link>
  <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
    <Link to={'/kids'} className="link dim dark-gray f6 f5-l dib mr3 mr4-l"  title="Kids">Kids</Link>
    <Link to={'/'} className="link dim dark-gray f6 f5-l dib mr3 mr4-l"  title="Parents">Parents</Link>
    <Link to={'/'} className="link dim dark-gray f6 f5-l dib mr3 mr4-l"  title="Charities">Charities</Link>
    <Link to={'/'} className="link dim dark-gray f6 f5-l dib mr3 mr4-l"  title="Products">Products/Services</Link>
    <Link to={'/'} className="link dim dark-gray f6 f5-l dib mr3 mr4-l"  title="Classifieds">Classifieds</Link>
    <Link to={'/'} className="link dim dark-gray f6 f5-l dib mr3 mr4-l"  title="Media">Media</Link>
  </div>
</nav>);
}
export default Header;

