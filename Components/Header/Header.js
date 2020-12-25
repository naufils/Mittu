import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native';
import BackArrow from '../assests/img/backarrow.png'


class Header extends Component {

    onPressBack=()=>{
        console.log('on press back ',this.props)
        this.props.onClickArrow()
    }
    render() {

        return (

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center'}}>
                {this.props.arrowTrue ?
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity onPress={this.onPressBack} style={{paddingHorizontal:10,paddingVertical:8}}>
                        <Image
                            style={{height:24, width:24 }}
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
        letterSpacing: 0,
        color: "#42B649",
    },



})

module.exports = Header