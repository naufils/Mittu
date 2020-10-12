import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TextInput, Text, ToastAndroid,BackHandler } from 'react-native'
import Header from '../Header/Header';


class About extends Component {


    constructor(props) {
        super(props)

        this.state = {
            document:'',
            loading: false
        }
    }
    static navigationOptions = {

        header:null
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
     handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        return true;
      }
      
    onClickBack = () => {
        console.log('back arrow pressed')
        this.props.navigation.goBack();
    }
    
    render() {
         
        
        return (
            <ScrollView style={{backgroundColor:'#121212'}}>
            {!this.state.loading ? 

              <Header
                    headerName={'About Us'}
                    arrowTrue={true}
                    onClickArrow={this.onClickBack}

                /> : null}

                <View style={{marginTop:25, padding:30}}>
                    <Text style={{fontSize:18,fontFamily:'OpenSans-Bold', color:'white', marginBottom:10}}>We present you India’s most exciting and Hot video streaming app MITTU ! Get ready to hinge and binge with our amazing range of content! </Text>
                    <Text style={{fontSize:16,fontFamily:'OpenSans-Regular',color:'white', marginBottom:10}}>The Mittu App Or Site is a subscription-based video on demand (VOD) service. It is a video streaming app 
                        to please all your tastes and the exciting part is that we present videos in your own language! </Text>

 
                    <Text style={{fontSize:16, fontFamily:'OpenSans-Regular', marginBottom:5}}> We have got:   </Text>
                    <View style={{paddingLeft:20}}>                  
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>1. Amazing feature length films for you to stream 24/7! </Text>
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>2. Web Series that are adventurous and exciting! </Text>
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>3. Short Films that will really stop your breath! </Text>
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>4. Latest music videos! </Text>
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>5. Unlimited HD-Streaming. </Text>
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>6. Access anytime and anywhere. </Text>
                        <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Regular', marginBottom:5}}>7. Compatible on your phone as well as your computer and other devices! </Text>
                    </View>
                </View>


            </ScrollView>
        )
    }



}

const styles = StyleSheet.create({

    HeaderText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily:'OpenSans-Medium',
        letterSpacing: 0,
        color: "#553850",
    },



})


export default About