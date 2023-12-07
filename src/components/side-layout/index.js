import React, {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function SideLayout({children, side}) {
  const cn = bem('SideLayout')
  return (
    <div className={cn({side})}>
      {React.Children.map(children, (item) => (
        <div className={cn('item')} key={item.key}>{item}</div>
      ))}
    </div>
  )
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between'])
};

export default memo(SideLayout);
