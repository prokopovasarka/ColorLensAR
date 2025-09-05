import React from "react";
import { View, Text, ImageBackground } from 'react-native';

import { globalStyles } from '../styles/globalStyles';

export default function Help() {
    return(
        <View style={globalStyles.container}>
            <Text style={globalStyles.title} >Introduction</Text>
            <Text style={globalStyles.quote}>Here, you can find guidance, tips, and instructions, 
                ensuring that, whether you are a new or an experienced user, you can quickly find 
                answers to your questions and resolve issues without external support.</Text>
            <ImageBackground 
                source={require('../assets/helpBox.png')} 
                style={{ width: 300, height: 200, marginVertical: 0 }}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 35 }}>Let`s get started</Text>
            </ImageBackground>
            <Text style={globalStyles.quote}>TBD😢</Text>
        </View>
    );
}