import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TextInput, Text, ToastAndroid,BackHandler } from 'react-native'
import Header from '../Header/Header';


class Refund extends Component {


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
                    headerName={'Refund Policy'}
                    arrowTrue={true}
                    onClickArrow={this.onClickBack}

                /> : null}

                <View style={{marginTop:25, padding:30}}>
                    <Text style={{fontSize:18, color:'white', fontFamily:'OpenSans-Bold', marginBottom:10}}>
                        PLEASE READ AND MAKE SURE YOU FULLY UNDERSTAND OUR REFUND POLICY PRIOR TO MAKING A PAYMENT
                    </Text>

                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        This Policy applies to Home Theatre Site/ App platforms including without limitation and other related Site/s or App/s, mobile applications and other online features each a “Site/s or App/s”. 
                    </Text>

                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        We have provided extensive information for you to view the packages before choosing to subscribe to us. If you have any questions or reservations, please contact us at mittuapplication@gmail.com prior to subscribing to our services. 
                    </Text>

                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        We, being the service providers for contents available through SITE or APP, where you are expected to view packages of your choice after being paid for subscription; unfortunately, all fees for such services are non-refundable. 
                    </Text>

                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        In case, because of any technical glitch at the time of online transaction, the transaction does not occur, the amount in process of transfer by default goes back into your bank account, automatically through Payment Gateway. 
                    </Text>


                    <Text style={{fontSize:18,color:'white', fontFamily:'OpenSans-Bold', marginBottom:10}}>CHARGEBACKS </Text>

                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        If we receive a chargeback or payment dispute from a credit card company or bank, your service and/or subscription will be suspended without notice. 
                    </Text>
                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        Applicable chargeback fee will be issued to recover fees passed on to us by the credit company, plus any outstanding balances accrued as a result of the chargeback(s) must be paid in full before service is restored. 
                    </Text>
                    <Text style={{fontSize:16,color:'white', fontFamily:'', marginBottom:10}}>
                        Instead of issuing a chargeback, contact us to address any billing issues. Requesting a chargeback or opening any sort of dispute for a valid charge from us is fraud, and is never an appropriate or legal means of obtaining a refund. 
                    </Text>




                    
                </View>


            </ScrollView>
        )
    }



}

const styles = StyleSheet.create({

    HeaderText: {
        fontSize: 20,
        fontFamily:'OpenSans-Bold',
        letterSpacing: 0,
        color: "#553850",
    },



})


export default Refund