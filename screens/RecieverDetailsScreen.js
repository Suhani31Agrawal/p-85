import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class RecieverDetailsScreen extends Component{
  constructor(props){
    
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      taskCreatorName : this.props.navigation.getParam('details')["user_name"],
      taskCreatorId  : this.props.navigation.getParam('details')["user_id"],
      //recieverId      : this.props.navigation.getParam('details')["user_id"],
      requestId       : this.props.navigation.getParam('details')["task_id"],
      taskName        : this.props.navigation.getParam('details')["task_name"],
      taskDescription : this.props.navigation.getParam('details')["task_description"],
      recieverName    : '',
      recieverContact : '',
      recieverAddress : '',
      recieverRequestDocId : ''
    }
    //console.log(this.state.userId);
  }
  

 getRecieverDetails(){
  db.collection('users').where('email_id','==',this.state.userId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        recieverName    : doc.data().first_name,
        recieverContact : doc.data().contact,
      })
    })
  });
  db.collection('assigned_tasks').where('task_id','==',this.state.requestId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({recieverRequestDocId:doc.id})
   })
})}

updateTaskStatus=()=>{
  db.collection('all_Tasks').add({
    task_name           : this.state.taskName,
    task_id             : this.state.requestId,
    requested_by        : this.state.taskCreatorId,
    assigned_to         : this.state.userId,
    task_status         :  "Task Assigned"
  })
}

addNotification=()=>{
    var message = this.state.userId + " has shown interest in completing the task"
    db.collection("all_notifications").add({
      "taskCreator_id"      : this.state.taskCreatorId,
      "assigned_to"         : this.state.userId,
      "request_id"          : this.state.requestId,
      "task_name"           : this.state.taskName,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }

componentDidMount(){
  this.getRecieverDetails()
}

  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"View Task", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold",marginBottom:20 } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.5}}>
          <Card title={"Task Information"} titleStyle= {{fontSize : 18}}  >
            
            <Card >
              <Text style={{fontWeight:'bold'}}>Task Name : {this.state.taskName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Description : {this.state.taskDescription}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.5}}>
          <Card
            title={"Task Assigned By:"}
            titleStyle= {{fontSize : 18}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Assigned By : {this.state.taskCreatorName}</Text>
            </Card>
            
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.taskCreatorId}</Text>
            </Card>
          
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateTaskStatus()
                    this.addNotification()
                    this.props.navigation.navigate('MyTasks')
                  }}>
                <Text>I Want to Do This Task</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    marginTop:30,
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})