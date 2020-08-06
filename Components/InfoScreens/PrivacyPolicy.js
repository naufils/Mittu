import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TextInput, Text, ToastAndroid,BackHandler } from 'react-native'
import Header from '../Header/Header';


class Privacy extends Component {


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
                    headerName={'Privacy Policy'}
                    arrowTrue={true}
                    onClickArrow={this.onClickBack}

                /> : null}

                <View style={{marginTop:25, padding:30}}>
                <Text style={{fontSize:18,color:'white', fontFamily:'OpenSans-Bold', marginBottom:10}}>Please read carefully </Text>

                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:10}}>This Privacy Policy (“Privacy Policy”) applies to Hometheatre Site/ App platforms”). </Text>

                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:10}}>This Privacy Policy should be read in conjunction with the Terms of Use available on the “Site/s or App/s”. Personal Information/Data defined below of a user/s is collected if the user/s registers with the Site/s or App/s, accesses the Site/s or App/s or takes any action on the Site/s or App/s or uses or accesses the Services as defined in the Terms of Use. The terms ‘Personal Information’ and ‘Sensitive Personal Information or Information’ shall have the meaning ascribed to it under the Indian Information Technology Act, 2000 read with the Information Technology. </Text>

                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>WHAT DO WE DO WITH YOUR INFORMATION? </Text>
                <View style={{paddingLeft:20, marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            When you subscribe to something from our packages as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            When you browse our packages, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white',fontFamily:'OpenSans-Bold', marginBottom:5}}>CONSENT </Text>
                <View style={{paddingLeft:20, marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            When you provide us with personal information to complete a transaction, verify your credit card, etc. we imply that you consent to our collecting it and using it for that specific reason only. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>HOW DO I WITHDRAW MY CONSENT? </Text>
                <View style={{paddingLeft:20, marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by emailing us at info.hometheatreapp@gmail.com or contacting us at the address provided on the website. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>DISCLOSURE </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>PAYMENT </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            We use Razor pay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved. Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers. For more insight, you may also want to read terms and conditions of Razor Pay on https://razorpay.com 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>THIRD-PARTY SERVICES </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers. In particular, remember that certain providers may be located in or have facilities that are located at different jurisdiction than either you or us. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            So if you elect to proceed with a transaction that involves the services of a third- party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>LINKS </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            When you click on links on our website for subscription, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>SECURITY </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>COOKIES </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            We use cookies to maintain session of user/s. It is not used to personally identify you on other websites. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>AGE OF CONSENT </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. 
                        </Text>
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our APP is acquired or merged with another company, your information may be transferred to the new owners so that we and or they may continue to provide services to you. 
                        </Text>
                </View>
                <Text style={{fontSize:16,color:'white', fontFamily:'OpenSans-Bold', marginBottom:5}}>QUESTIONS AND CONTACT INFORMATION </Text>
                <View style={{paddingLeft:20,marginBottom:10}}>                  
                        <Text style={{fontSize:16,color:'white', fontWeight:'400', marginBottom:5}}>
                            If you would like to: access, correct, amend or delete any personal information we have, register a complaint, or simply want more information, mail our Privacy Compliance Officer at info.hometheatreapp@gmail.com Or by contacting at the company contact which is hereby incorporated by this reference into the Terms of Service. the Terms of Service 
                        </Text>
                </View>
                
                </View>


            </ScrollView>
        )
    }



}

const styles = StyleSheet.create({

    HeaderText: {
        fontSize: 20,
        fontFamily:'OpenSans-Medium',
        letterSpacing: 0,
        color: "#553850",
    },



})


export default Privacy