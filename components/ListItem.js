import React, { useState } from 'react'
import { View, Text, Image, Switch, StyleSheet } from 'react-native'
import { colors } from '../config';
import pin from '../assets/img/pin.png';

const ListItem = ({ id, item, onSelect }) => {
    const [switchState, setSwitchState] = useState(item.selected);

    const onSwitch = enabled => {
        setSwitchState(enabled);
        onSelect(id);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={pin} />
            <View>
                <Text style={styles.timestamp}>timestamp: {item.timestamp}</Text>
                <Text style={styles.p}>latitude: {item.latitude}</Text>
                <Text style={styles.p}>longitude: {item.longitude}</Text>
            </View>
            <Switch style={styles.switch} trackColor={{ true: colors.primaryLight, false: 'lightgray'}} thumbColor={switchState ? colors.primary : 'white'} value={switchState} onValueChange={onSwitch} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },
    img: {
        width: 100,
        height: 100
    },
    timestamp: {
        fontSize: 16
    },
    p: {
        color: 'gray'
    }
})

export default ListItem
