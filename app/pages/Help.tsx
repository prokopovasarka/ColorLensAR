import React from "react";
import { ScrollView, View, Text, ImageBackground } from 'react-native';

import { globalStyles } from '../styles/globalStyles';

export default function Help() {
    return(
        <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20, alignItems: 'center' }]}>
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
            <Text style={globalStyles.helpTitle}>CAMERA{"\n"}</Text>
            <Text style={globalStyles.helpText}>Camera allows you to pick colors and show information about them in blue box.
                You can see name of the color and hex code. for more detailed information - HSL, palettes, you can click "palette" emoji, that will
                transfer you to Detail page. 
                {"\n"}
                {"\n"}
                To save picked color to library, click on "save" emoji next to palette image.
                {"\n"}
                {"\n"}
                You can unselect picked color with button on the bottom right, that says "unselect"
                {"\n"}
                {"\n"}
                To take a picture of the scene, click on the shutter button on the bottom center.
                {"\n"}
                {"\n"}
                To pick photo or picture from the gallery, click on the button on the bottom left.
                {"\n"}
                {"\n"}
                To get back home to the main menu, click on the button "Home" on the top left part in the navigation.
                {"\n"}
                {"\n"}
            </Text>
            <Text style={globalStyles.helpTitle}>CAPTURED PHOTO / PICKED FROM GALLERY{"\n"}</Text>
            <Text style={globalStyles.helpText}>You can tap anywhere on the picture, picked colour will be shown on the center of the picture on the same box
                as in "CAMERA" part. 
                {"\n"}
                {"\n"}
                To save or see details of picked colour, it works exactly the same.
                {"\n"}
                {"\n"}
                You can save your picture by clicking on "Save photo". It will save only the original picture.
                {"\n"}
                {"\n"}
                To go back to Camera mode, just click on "Discard photo".
                {"\n"}
                {"\n"}
                To get back home to the main menu, click on the button "Home" on the top left part in the navigation.
                {"\n"}
                {"\n"}
            </Text>
            <Text style={globalStyles.helpTitle}>DETAIL PAGE{"\n"}</Text>
            <Text style={globalStyles.helpText}>Detail page shows information about the colour and palettes created based on the colour.
                {"\n"}
                {"\n"}
                On the page, you can see: NAME of the color, HEX, HSL and CMYK code
                {"\n"}
                {"\n"}
                Down below, there are three palettes created from the colour:
                {"\n"}
                Monochromatic palette shows 5 shades of picked colours.
                {"\n"}
                Complementary palette shows 5 shades of the colours, that are complementary to the picked colour.
                {"\n"}
                Analogous palette shows 5 shades of colours, that are analogous to the picked colour.
                {"\n"}
                {"\n"}
                To get back home to the main menu, click on the button "Home" on the top left part in the navigation.
                {"\n"}
                {"\n"}
            </Text>
            <Text style={globalStyles.helpTitle}>LIBRARY{"\n"}</Text>
            <Text style={globalStyles.helpText}>Library allows you to see all saved colors and Details of the colours. You can scroll through your library.
                {"\n"}
                {"\n"}
                To se Details of the color, just click on the colour of your choice. Detail page will be shown.
                {"\n"}
                {"\n"}
                To pick more colours, just tap and hold one of the colours of your choice. Then click on the other colours, you would like to add.
                {"\n"}
                {"\n"}
                You can delete colour from your library. just tap and hold one colour of your choice and click on delete. You can delete more colours in once by choosing multiple.
                {"\n"}
                {"\n"}
                To get back home to the main menu, click on the button "Home" on the top left part in the navigation.
                {"\n"}
                {"\n"}
            </Text>
            <Text style={globalStyles.helpTitle}>HELP{"\n"}</Text>
            <Text style={globalStyles.helpText}>This is page "Help". You can always click for the help in main menu and read this again.
                {"\n"}
                {"\n"}
            </Text>
            <Text style={[globalStyles.helpTitle, {padding: 20, paddingBottom: 300}]}>GOOD LUCK!{"\n"}</Text>
        </ScrollView>
    );
}