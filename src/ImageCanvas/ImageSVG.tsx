import React from 'react';

interface ImageSVGProps {
  href?: string;
}

//const styled = { userDrag: 'none' };

const Imagesvg: React.SFC<ImageSVGProps> = ({ href }) => {
  if (href) {
    return (
      <image
        x="0"
        y="0"
        href={href}
        height="100%"
        width="100%"
        type="staticimg"
        //style={styled}
      />
    );
  } else {
    return null;
  }
};

export default Imagesvg;
