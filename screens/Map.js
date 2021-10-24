import React from 'react'
import MapView, { Marker } from 'react-native-maps'

const Map = ({ route }) => {
    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: Math.floor(route.params.selected[0].latitude * 1000) / 1000,
                longitude: Math.floor(route.params.selected[0].longitude * 1000) / 1000,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {route.params.selected.map(({ latitude, longitude }, id) => (
                <Marker key={id} coordinate={{ latitude, longitude }} />
            ))}
        </MapView>
    )
}

export default Map
