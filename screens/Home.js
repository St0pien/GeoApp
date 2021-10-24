import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from "../components/Button";
import { useFonts } from 'expo-font';
import { colors } from '../config';
import Montserrat from '../assets/fonts/Montserrat.ttf';
import Montserrat_bold from '../assets/fonts/Montserrat-Bold.ttf';

const Home = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        Montserrat,
        Montserrat_bold
    });

    return (
        fontLoaded ?
            <View style={styles.container}>
                <View style={styles.jumbo}>
                    <Text style={styles.h1}>GeoMap App</Text>
                    <Text style={styles.p}>find and save your position</Text>
                </View>
                <View style={styles.start}>
                    <Button onPress={() => navigation.navigate("Points")}>Start </Button>
                </View>
            </View>
            :
            null
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    jumbo: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    start: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 48,
        color: 'white',
        fontFamily: 'Montserrat_bold',
    },
    p: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Montserrat'
    }
})

export default Home
