import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = (props) => {
    return (
        <Appbar.Header style={{backgroundColor:"#130f40"}}>
            <Appbar.Content
                title="Weather App"
                subtitle={props.title}
                style={{alignItems:"center"}}
            />
        </Appbar.Header>
    )
}

export default Header;