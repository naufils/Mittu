import React from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView,Image, TouchableOpacity, SafeAreaView, FlatList, StatusBar, ToastAndroid, RefreshControl, BackHandler } from 'react-native';
import {TextField} from 'react-native-material-textfield';
import config from '../config';
import { StackActions } from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';


export default class ExploreScreen extends React.Component{
  state={
    renderItems:[],
    renderItems1:[],
    searchItem:[],
    searchResult: false,
    subCategories:[],
    categorySearchItem:[],
    cat: false,
    search:'',
    searchValid: false,
    loading: false,
    categoryItems:[],
    refresh:false
  }

  onCatHandler = (id) => {
    let categoryItems=[];

    this.state.subCategories.map((item) => {
      return categoryItems["cat_"+item.subcat_id]= false;
    })

    categoryItems["cat_"+id]=true

    this.setState({cat:true, categoryItems, searchResult: false})

    console.log("ID:", this.state)

    let data={
      subcat_id: id
    }

    

    fetch(config.localhost_url+'/search/category/searchResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resJson => {
      console.log("resJson", resJson);
      if(resJson.data){

        this.setState({
          categorySearchItem: resJson.result,
        })

      } else {
        if(resJson.dbError){
          ToastAndroid.show("Internal server error!", ToastAndroid.SHORT);

        } else {

          this.setState({
            categorySearchItem:[]
          })

          ToastAndroid.show("Data not found!, Please try again", ToastAndroid.SHORT);

        }
      }  
        })
    .catch(err => {
      console.log(err)
      ToastAndroid.show("Server error!", ToastAndroid.SHORT);
    })
  }



  onSearchChanged = (value) => {
    this.setState({
      search: value,
      searchValid: true
    })
  }

  onSearchItem = () => {
    let data={
      searchItem: this.state.search
    }

    fetch(config.localhost_url+'/searchResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resJson => {
      console.log("resJson", resJson);
      if(resJson.data){

        this.setState({
          searchItem: resJson.result,
          searchResult: true
        })

      } else {
        if(resJson.dbError){
          ToastAndroid.show("Internal server error!", ToastAndroid.SHORT);

        } else if(resJson.result.length === 0){

          this.setState({
            searchItem:[],
            searchResult: true
          })

          ToastAndroid.show("Data not found!, Please try again", ToastAndroid.SHORT);

        }
      }
    })
    .catch(err => {
      console.log(err)
      ToastAndroid.show("Server error!", ToastAndroid.SHORT);
    })
  }

  componentDidMount(){

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.setState({
      ...this.state,
      renderItems:[],
      renderItems1:[],
      searchItem:[],
      searchResult: false,
      subCategories:[],
      categorySearchItem:[],
      cat: false,
      search:'',
      searchValid: false,
      loading: false,
      categoryItems:[],
      refresh:false
    })
    let categoryItems=[];
    fetch(config.localhost_url+'/search/subcategories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(resJson => {
      console.log("resJson", resJson);
      if(resJson.data){

        resJson.result.map((item) => {
          return categoryItems["cat_"+item.subcat_id]= false;
        })

        this.setState({
          subCategories: resJson.result,
          categoryItems
        })

      } else {
        if(resJson.dbError){
          ToastAndroid.show("Internal server error!", ToastAndroid.SHORT);

        } else if(resJson.result.length === 0){

          this.setState({
            searchItem:[],
          })

          // ToastAndroid.show("Data not found!, Please try again", ToastAndroid.SHORT);

        }
      }

      fetch(config.localhost_url+'/all-features-fetch', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then((res) => {
        console.log("Response", res);
        this.setState({
          renderItems: res.check,
          renderItems1: res.check[0],
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
      ToastAndroid.show("Server error!", ToastAndroid.SHORT);
    })
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }
 handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  onPressImage=(item)=>{

    const pushAction = StackActions.push({
      routeName: 'VideoProfileScreen',
      params: {
        item
      },
    });
    
    this.props.navigation.dispatch(pushAction);
   
  }

  onRefresh = () => {
    this.setState({refresh:true})

    this.componentDidMount()

    setTimeout(() => {
      this.setState({refresh:false})
    }, 2000)

    // wait(2000).then(() => this.setState({refresh:false}));
  };


  render(){

    console.log("State", this.state)
        let images1;

        if(this.state.searchItem.length !== 0){

          images1 = this.state.searchItem.map((item, i) => {
            console.log("Item", item.vid_name);
              return (
              
                <View style={{paddingLeft:5, paddingRight:1, width: 114}} key={i}>
                  <TouchableOpacity onPress={() => this.onPressImage(item)}>
                    <Image style={{width: 110, height: 140, borderRadius:3, backgroundColor:'grey'}} source={{uri: item.vid_thumbs}} />
                    <Text style={{fontFamily:'OpenSans-Regular',width: 110, color:'white', paddingTop:5, flex:1, flexWrap:'wrap'}}>{item.vid_name}</Text>
                  </TouchableOpacity>
                </View>
              
              )
            })

        } else {
          if(this.state.searchResult){
            images1 = (
              <View style={{padding:20}}>
                  <TouchableOpacity>
                    <Text style={{fontFamily:'OpenSans-Regular', color:'white', paddingTop:5, textAlign: 'center'}}>No videos found!</Text>
                  </TouchableOpacity>
                </View>
            )
          } else {
          images1 = this.state.renderItems1.map((item, i) => {
              return (              
                <View style={{paddingLeft:5, paddingRight:1, width: 114}} key={i}>
                  <TouchableOpacity onPress={() => this.onPressImage(item)}>
                    <Image style={{width: 110, height: 140, borderRadius:3, backgroundColor:'grey'}} source={{uri: item.vid_thumbs}} />
                    <Text style={{fontFamily:'OpenSans-Regular',width: 110, color:'white', paddingTop:5, flex:1, flexWrap:'wrap'}}>{item.vid_name}</Text>
                  </TouchableOpacity>
                </View>
              
              )
            })
          }
        }

        let images2;

        if(this.state.renderItems.length !=0){

          images2 = this.state.renderItems.map((item,i) => {            
            return (
              
              <View style={{ flex: 1, flexDirection:'column', alignItems: 'flex-start', backgroundColor:'#121212', marginBottom:10, marginTop:10}} key={i}> 
                <ScrollView horizontal> 
                <FlatList
                  horizontal={true}
                  data={item}
                  renderItem={({item, index, separators}) => (
                    <View style={{paddingLeft:5, paddingRight:1, marginTop:10, flexDirection:'row',marginRight:5, width:114}} key={index}>
                      <TouchableOpacity onPress={() => this.onPressImage(item)}>
                        <Image style={{width: 110, height: 140, borderRadius:3,backgroundColor:'#121212'}} source={{uri: item.vid_thumbs}} />
                        <Text style={{fontFamily:'OpenSans-Regular',width: 110, color:'white',flex:1, flexWrap:'wrap', paddingTop:5, flexWrap:'wrap'}}>{item.vid_name}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />        
                </ScrollView>
              </View>
    
            )
          })
        }

    return(
      <ScrollView contentContainerStyle={{flexGrow:1}} style={{backgroundColor:'#121212'}} 
        refreshControl={
        <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh} /> } >
        <StatusBar hidden={false} animated backgroundColor="#121212"/>
      <View style={styles.container}>
        <View style={styles.innerContainer}>

            <TextField 
              onChangeText={this.onSearchChanged}
              label="Search"
              value={this.state.search}
              lineWidth={0.5}
              tintColor="white"
              baseColor="white"
              textColor="white"
              containerStyle={{width:'80%', height: 50}}
              returnKeyType="search"
              onSubmitEditing={() => this.onSearchItem()}
            />
        </View>

      {this.state.cat && this.state.searchResult === false ? null :

        this.state.searchItem.length !== 0 ?

      <View style={{flex: 1, flexDirection:'row', alignItems: 'center', backgroundColor:'', paddingTop: 30}}>

            <FlatList 
            // horizontal={true}
            data={this.state.searchItem}
            numColumns={2}
            renderItem={({item, index, separators}) => (
              <View style={{paddingLeft:5, paddingRight:1,width: 114, flex:1, justifyContent:'space-around', alignItems:'center'}} key={index}>
                <TouchableOpacity onPress={() => this.onPressImage(item)}>
                  <Image style={{width: 110, height: 140, borderRadius:3, backgroundColor:'grey'}} source={{uri: item.vid_thumbs}} />
                  <Text style={{fontFamily:'OpenSans-Regular',width: 110, color:'white', paddingTop:5, flex:1, flexWrap:'wrap'}}>{item.vid_name}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            />
          </View>

            :
          <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-start', backgroundColor:'', paddingTop: 30}}>
            <ScrollView horizontal>
                  {images1}
            </ScrollView>
          </View>
      }

        <View style={{padding:7, marginTop:20}}>
          <FlatList 
            // horizontal={true}
            data={this.state.subCategories}
            columnWrapperStyle={{justifyContent:'center'}}
            numColumns={3}
            renderItem={({item, index, separators}) => (
                <View style={{flex:1/3, paddingBottom:10}}>
                  <TouchableOpacity onPress={() => this.onCatHandler(item.subcat_id)} key={index}>            
                    <Text style={{padding:7, borderColor:'#F9A818',borderWidth:1, borderRadius:14, width:105, textAlign:'center', fontFamily:'OpenSans-Regular', color:'#F9A818', flex:1, flexWrap:'wrap'}}>{item.subcat_name}</Text>
                  </TouchableOpacity>
                </View>
            )}
            keyExtractor={item => item.id}
          />

          </View>


          {this.state.cat ?
            this.state.categorySearchItem.length !== 0 ?
              <FlatList 
                // horizontal={true}
                data={this.state.categorySearchItem}
                numColumns={3}
                renderItem={({item, index, separators}) => (
                  <View style={{paddingLeft:5, paddingRight:1, width:114, flex:1/3}} key={index}>
                    <TouchableOpacity onPress={() => this.onPressImage(item)}>
                      <Image style={{width: 110, height: 140, borderRadius:3, backgroundColor:'grey'}} source={{uri: item.vid_thumbs}} />
                      <Text style={{fontFamily:'OpenSans-Regular',width: 110, color:'white', paddingTop:5, flex:1, flexWrap:'wrap'}}>{item.vid_name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
              />

            : 
              <View style={{padding:20}}>
                  <TouchableOpacity>
                    <Text style={{fontFamily:'OpenSans-Regular', color:'white', paddingTop:5, textAlign: 'center'}}>No videos found for this filter!</Text>
                  </TouchableOpacity>
                </View>
            :null
          }

          
      {this.state.cat ? null : images2}          
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#121212',
    justifyContent:'flex-start',
    alignContent:'flex-start'
  },
  innerContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
  },
  textInput:{
    width:'90%',
    height:50,
    fontFamily:'OpenSans-Regular',
    fontSize:16,
    borderRadius:20,
    borderWidth:1,
    // flex: 1,
    padding: 15,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 0,
    marginRight:'5%'
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily:'OpenSans-Regular',
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    fontFamily:'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 14,
  },
})