import {ThreeDots} from "react-loader-spinner";
import React from "react";

const BubbleLoading = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
            }}
        >
            <div
                style={{
                    width: '50px',
                    height: '50px',
                }}
            >
                <ThreeDots color={'#71b340'}/>
            </div>
        </div>
    )
}

export default BubbleLoading;