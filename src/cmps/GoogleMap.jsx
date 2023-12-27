import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
const AnyReactComponent = ({ text }) => <div>{text}</div>

export function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function handleClick({ lat, lng }) {
        setCenter({ lat, lng })
    }

    return (
        // Need to set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <h1>map</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBqhyZLEehYYRMhzt7qKj0hWEaKbn3KQEI" }}
                center={center}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <AnyReactComponent
                    {...center}
                    text="👹"
                />
            </GoogleMapReact>
        </div>
    )


}