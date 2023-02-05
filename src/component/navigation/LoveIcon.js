import React from 'react';
import {  LoveIcon } from '../../assets';

const MyFavorites = () => {

    const count = 0 ;

    return (<div className="relative mr-5">
        <LoveIcon />
        {count > 0 && (
            <p className="absolute bottom-3 left-4 h-5 w-5 text-sm text-white rounded-full bg-secondary-600 flex items-center justify-center">
                {count}
            </p>
        )}
    </div>)
}

export default MyFavorites;