import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Switch, FlatList, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button'
import { colors } from '../config';
import ListItem from '../components/ListItem';

const Positions = ({ navigation }) => {
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            }

            const poses = JSON.parse(await AsyncStorage.getItem('positions'));
            poses?.forEach(pos => pos.selected = switchState);
            setPositions(poses);
        })()
    }, []);

    const [positions, setPositions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onPosition = async () => {
        setIsLoading(true);
        const location = await Location.getCurrentPositionAsync()
        const pos = [...positions ? positions : []];
        pos.push({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: location.timestamp,
            selected: switchState
        });
        setPositions(pos);
        setIsLoading(false);
        AsyncStorage.setItem('positions', JSON.stringify(pos));
    }

    const onDelete = () => {
        setPositions([]);
        AsyncStorage.clear();
    }


    const onSelect = id => {
        const pos = positions[id];
        pos.selected = !pos.selected;
    }

    const [switchState, setSwitchState] = useState(false);

    const onSelectAll = enabled => {
        setSwitchState(enabled);
        if (!positions) return;
        const buf = [...positions];
        buf.forEach(pos => pos.selected = enabled);
        setPositions(buf);
    }

    const onMap = () => {
        const selected = positions?.filter(pos => pos.selected);
        if (!selected || selected.length === 0) {
            alert('Select at least one position');
            return;
        }

        navigation.navigate("Map", { selected });
    }

    return (
        <View>
            <View style={styles.buttons}>
                <Button onPress={onPosition} fontSize={13}>Pobierz i zapisz pozycję</Button>
                <Button onPress={onDelete} fontSize={13}>Usuń wszystkie dane</Button>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.header}>
                    <View style={styles.h2}>
                        <Button onPress={onMap} fontSize={18}>Przejdź do mapy</Button>
                    </View>
                    <Switch style={styles.switch} trackColor={{ true: colors.primaryLight, false: 'lightgray' }} thumbColor={switchState ? colors.primary : 'white'} value={switchState} onValueChange={onSelectAll} />
                </View>
                {isLoading ? 
                    <ActivityIndicator style={styles.loader} size="large" color={colors.primary} animating={isLoading} />
                :    
                    <FlatList contentContainerStyle={{ paddingBottom: 300, }} data={positions} renderItem={({ item, index }) => <ListItem id={index} item={item} onSelect={onSelect} />} keyExtractor={({ selected }, id) => id.toString() + selected} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    h2: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center'
    },
    switch: {
        marginLeft: '-100%'
    },
    loader: {
        position: 'absolute',
        top: 55,
        left: '50%',
        width: 50,
        transform: [
            {
                translateX: -25
            }
        ]
    }
})

export default Positions
