import React from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.btn}>
            <Text style={{ ...styles.btnText, fontSize: props.fontSize ? props.fontSize : 24 }}>{props.children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btn: {
        margin: 15
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    fontSize: PropTypes.number
}

export default Button;
