import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class TaskAssignScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      taskName:"",
      taskDescription:"",
      userName:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  getUname=(userId)=>{
    db.collection("users").where('email_id','==', userId).get()
    .then((snapshot)=>{
        snapshot.forEach((doc) => {
            this.setState({
              userName  :doc.data().first_name + " " + doc.data().last_name
            })
        
        })
    })
  }

  addTask =(taskName,taskDescription)=>{
    var userId = this.state.userId
    var randomtaskId = this.createUniqueId()
    var uName= this.state.userName
    
    db.collection('assigned_tasks').add({
        "user_id": userId,
        "user_name": uName,
        "task_name":taskName,
        "task_description":taskDescription,
        "task_id"  : randomtaskId,
    })

    this.setState({
        taskName :'',
        taskDescription : ''
    })

    return Alert.alert("Task Added Successfully")
  }

  componentDidMount(){
    this.getUname(this.state.userId)
  }


  render(){
    return(
        <View style={{flex:1}}>
        
           <MyHeader title="Add Task" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Enter Task Name"}
                onChangeText={(text)=>{
                    this.setState({
                        taskName:text
                    })
                }}
                value={this.state.taskName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Describe the task"}
                onChangeText ={(text)=>{
                    this.setState({
                        taskDescription:text
                    })
                }}
                value ={this.state.taskDescription}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addTask(this.state.taskName,this.state.taskDescription)}}
                >
                <Text>Add</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)