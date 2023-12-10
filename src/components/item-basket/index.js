import {memo, useContext} from 'react';
import {I18nContext} from "../../context/i18ncontext";
import {Link} from "react-router-dom"; 
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const {t} = useContext(I18nContext)

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} to={props.link} onClick={props.onLink}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t('basket_unit')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('basket_delete')}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  link: PropTypes.string,
  onLink: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onLink: () => {}
}

export default memo(ItemBasket);
