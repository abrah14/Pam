import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
export default class RadioButton extends Component {
    state = {
        value: null,
    };
    render() {
        const { PROP } = this.props;
        const { value } = this.state;
        
        return (
            <View>
                {PROP.map(res => {
                    return (
                        <View key={res.key} style={styles.container}>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    this.setState({
                                        value: res.key,
                                    });
                                }}>
                                {value === res.key && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                            <Text style={styles.radioText}>{res.text}</Text>

                        </View>
                    );
                })}
                <Text> Selected: {this.state.value} </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:15,
        marginLeft:15
    },
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
        fontSize: 13
    },
    radioCircle: {
        height: 13,
        width: 13,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});