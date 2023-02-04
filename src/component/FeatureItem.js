import React from 'react'

function FeatureItem({ item, index }) {
    const { icon, text } = item
    return (
        <div className="flex items-center md:m-0 mt-10  ">
            <div className="rounded-full flex justify-center items-center bg-secondary-200 h-20 w-20">
                <img src={icon} className="" alt={index} />
            </div>
            <p className="ml-4 w-4/6 text-xl">{text}</p>
        </div>
    )
}

export default FeatureItem
