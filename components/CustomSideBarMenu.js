import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity, ImagePickerIOS} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import *as ImagePicker from 'expo-image-picker';

import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
  state={
    userId:firebase.auth().currentUser.email,
    image:"#",
    name:"",
    docId:""
  }

  fetchImage=(imageName)=>{
    var storageRef=firebase.storage().ref().child("user_profiles/"+imageName)

    storageRef.getDownloadURL().then((url)=>{
      this.setState({image:url})
    })
    .catch((error)=>{
      this.setState({image:"#"})
    })
  }

  getUserProfile=()=>{
    db.collection("users").where("emailId","==",this.state.userId)
    .onSnapshot((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({
          name:doc.data().firstName+" "+doc.data().lastName,
          docId:doc.id,
          image:doc.data().image()
        })
      })
    })
  }

  componentDidMount(){
    this.fetchImage(this.state.userId)
    this.getUserProfile()
  }

  uploadImage=async(uri,imageName)=>{
    var response=await fetch(uri)
    var blob=await response.blob()
    var ref=firebase.storage().ref().child("user_profiles/"+imageName)

    return ref.put(blob).then((response)=>{
      this.fetchImage(imageName)
    })
  }

  selectImage=async()=>{
    const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.mediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    })
    if(!cancelled){
      this.uploadImage(uri,this.state,userId)
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:0.5 , alignItems:"center" , backgroundColor:"yellow"}}>
          <Avatar
            rounded
            source={{uri:this.state.image}}
            size="medium"
            onPress={()=>{
              this.selectImage()
            }}
            containerStyle={styles.imageContainer}
            showEditButton
          />
          <Text style={{fontweight:"bold" , fontSize:20 , color:"blue" , paddingTop:10}}>
            {this.state.name}
          </Text>
        </View>
        
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  },
  imageContainer: { 
    flex: 0.75, 
    width: "40%", 
    height: "20%", 
    marginLeft: 20, 
    marginTop: 30, 
    borderRadius: 40, 
  }
})