import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native';
import BackArrow from '../assests/img/path5.png'


class Header extends Component {

    onPressBack=()=>{
        console.log('on press back ',this.props)
        this.props.onClickArrow()
    }
    render() {

        return (

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center'}}>
                {this.props.arrowTrue ?
                    <View style={{ marginRight: 15 }}>
                        <TouchableOpacity onPress={this.onPressBack} style={{paddingHorizontal:10,paddingVertical:8}}>
                        <Image
                            style={{height:25}}
                            source={BackArrow}
                        />
                        </TouchableOpacity>
                    </View>
                    : null}

                <View>
                    <Text style={styles.HeaderText} >
                        {this.props.headerName}
                    </Text>
                </View>

            </View>
        )


    }
}

const styles = StyleSheet.create({

    HeaderText: {
        fontFamily:"Muli-Bold",
        fontSize: 22,
        // fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 20,
        color: "#F9A818",
    },



})

module.exports = Header