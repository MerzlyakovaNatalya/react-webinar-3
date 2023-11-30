import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {format, plural} from "../../utils"
import './style.css';

function Total({sum, amount, onOpen}) {

  const cn = bem('Total');
  return (
    <div className={cn()}>
      <p className={cn('wrap-text')}>
        <span className={cn('text')}>В корзине </span>
        <span className={cn('total')}>
          {amount 
          ? `${amount} ${plural(amount, {one:"товар", few:"товара", many:"товаров"})} / ${format(sum)} ₽` 
          : ' пусто'}
        </span>
      </p>
      <button className={cn('button')} onClick={onOpen}>Перейти</button>
    </div>
  )
}

Total.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

Total.defaultProps = {
  onOpen: () => {},
  amount: 0,
}

export default React.memo(Total);
