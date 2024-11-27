import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IconTextProps {
  icon: string | React.ReactNode | FontAwesomeIconProps['icon']; // To support any valid React node, such as an SVG, image, or component
  text: string; // The text to display alongside the icon
  onClick?: () => void; // Optional onClick handler
  style?: React.CSSProperties; 
}

const IconTextComponent= ({ icon, text,style,onClick }: IconTextProps) => {
  return (
    <div
      className='icon-text-container'
      style={{ cursor:"pointer", ...style }}
      onClick={onClick}
    >
        {typeof icon === 'string' ? (
          <img style={{ height: '30px', width: '30px' }} src={icon} alt={text} />
        ) : typeof icon === 'object' && 'prefix' in icon! && 'iconName' in icon ? (
          <FontAwesomeIcon icon={icon} />
        ) : (
          icon
        )}
      <p style={{marginLeft:"20px",textAlign:"justify"}}>{text}</p>
    </div>
  );
};

export default IconTextComponent;
