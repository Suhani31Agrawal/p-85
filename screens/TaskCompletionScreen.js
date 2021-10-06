
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class TaskCompletionScreen extends Component{
  constructor(){
    super()
    this.state = {
      taskList : []
    }
  this.taskRef= null
  }

  getTaskList =()=>{
    this.taskRef = db.collection("assigned_tasks")
    .onSnapshot((snapshot)=>{
      var taskList = snapshot.docs.map(document => document.data());
      this.setState({
        taskList : taskList
      });
    })
  }

  componentDidMount(){
    this.getTaskList()
  }

  componentWillUnmount(){
    this.taskRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.task_name}
        subtitle={item.task_description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
              onPress={
                ()=>{
                  this.props.navigation.navigate("RecieverDetails", {"details": item})
                 
                }
              }
            
            >
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
      
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        
              <MyHeader title="All Tasks" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.taskList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Tasks</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.taskList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})