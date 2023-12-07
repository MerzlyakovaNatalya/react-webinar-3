import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Spinner({children, active}) {

  if(active) {
     return (
       <div className='spinner'>
          <div className='loading-spinner'>
             <div className="loading">
                <div></div>
             </div>
          </div>
       </div>)
           
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default memo(Spinner);

