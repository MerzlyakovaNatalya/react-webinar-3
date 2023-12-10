import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, basketProducts, inBasket, basket_open}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${basketProducts} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button className={cn('button')} onClick={onOpen}>{basket_open}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  basketProducts: PropTypes.node,
  inBasket: PropTypes.string,
  basket_open: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
