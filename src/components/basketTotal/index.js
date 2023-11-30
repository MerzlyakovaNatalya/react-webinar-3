import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {format} from "../../utils"
import './style.css';

function BasketTotal({sum}) {

  const cn = bem('BasketTotal');
  
  return (
    <div className={cn()}>
      <p className={cn('wrap-text')}>
        <span className={cn('text')}>Итого</span>
        <span className={cn('total')}>{format(sum)}</span>
      </p>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default React.memo(BasketTotal);
