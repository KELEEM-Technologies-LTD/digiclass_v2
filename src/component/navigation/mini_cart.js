import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartIcon } from '../../assets';

const MyMiniCartIcon = () => {

  const navigate = useNavigate();


    const count = 1 ;

    return (<div className="relative mr-5" style={{cursor: 'pointer'}} onClick={()=>navigate('/cart')}>
        <CartIcon />
        {count > 0 && (
            <p className="absolute bottom-3 left-4 h-5 w-5 text-sm text-white rounded-full bg-secondary-600 flex items-center justify-center">
                {count}
            </p>
        )}
    </div>)
}

export default MyMiniCartIcon;