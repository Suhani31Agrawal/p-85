import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyTaskcreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       userName:"",
       allTasks : [],
     }
     this.requestRef= null
   }

  static navigationOptions = { header: null };

  getTaskDetails=(userId)=>{
     db.collection("users").where("email_id","==", userId).get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         this.setState({
           "userName" : doc.data().first_name + " " + doc.data().last_name

         })
        // console.log(this.state.userName)
       });
     })
     
   }

   getAllTasks =()=>{
     this.requestRef = db.collection("all_Tasks").where("assigned_to" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allTasks=[];
       snapshot.docs.map( (doc)=>{
          var task = doc.data();
          task["doc_id"]=doc.id;
          allTasks.push(task)
       });
      
       this.setState({
         allTasks : allTasks,
       });
     })
   }

   completeTask=(taskDetails)=>{
         
     if(taskDetails.task_status === "Task Assigned"){
         console.log(" 1. request status : "+ taskDetails.task_status)

       var requestStatus = "Task Completed"
       db.collection("all_Tasks").doc(taskDetails.doc_id).update({
         "task_status" : "Task Completed"
       })
        
       this.sendNotification(taskDetails, requestStatus)
     }
     /*else{
       var requestStatus = "WIP"
       db.collection("all_Tasks").doc(taskDetails.doc_id).update({
         "task_status" : "WIP"
       })
       this.sendNotification(taskDetails,requestStatus)
     }*/
   }


   sendNotification=(taskDetails, requestStatus)=>{
     var requestId = taskDetails.task_id
     var userId = taskDetails.assigned_to
     //var requestStatus = taskDetails.task_status
     var uName = this.state.userName;
              
      console.log(" 2. request status : "+ requestStatus)

     db.collection("all_notifications").where("request_id","==", requestId).where("assigned_to","==",userId).get().then((snapshot)=>{
         snapshot.forEach((doc) => {
         
         var message = ""
         
         if(requestStatus === "Task Completed"){
           message = uName + " Has Completed the Task with Task Id : " + requestId
         }
         else{ 
            message =  uName  + " is currently working on the task with Task Id : " + requestId
         }
         
     
     
         db.collection('all_notifications').doc(doc.id).update({
            message: message,
            notification_status: 'unread',
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
      <ListItem
       key={i}
       title={item.task_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.task_status}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity style={
                        [styles.button, 
                        {backgroundColor : item.task_status === "Task Assigned" ? "#ff5722" : "green"}]}
                    onPress = {()=>{this.completeTask(item)}}>
             <Text style={{color:'#ffff'}}>{
               item.task_status === "Task Assigned" ? "Mark As Complete" : "Task Completed"
             }</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getTaskDetails(this.state.userId);
     this.getAllTasks()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
     
          <MyHeader title="My Tasks" navigation ={this.props.navigation}/>
         <View style={{flex:1}}>
           {
             this.state.allTasks.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all tasks</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allTasks}
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
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})

