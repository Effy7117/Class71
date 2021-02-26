import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput,Image,Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import firebase from 'firebase';
import db from '../config.js';

export default class Transactionscreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookId: " ",
        scannedStudentId: " ",
        transactionMessage: ' '
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state
      if(buttonState === "Book ID"){
        this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal'
        });
      }

      else if(buttonState === "Student ID"){
        this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal'
        });
      }
    }

 
    handleTransaction = async() =>{
      console.log("button"+this.state.scannedBookId);
        var transactionMessage = null;
        db.collection("books").doc(this.state.scannedBookId).get()
        .then((doc)=> {
          var book = doc.data();
          console.log(book);
        })
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
            style = {StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
          <View> 
            <Image style = {{width: 200,height: 200}}
                   source = {require('../assets/booklogo.jpg')}/>
            <Text style = {{textAlign: "center", fontSize: 30}}> 
              Willy </Text>
          </View>
          <View style = {styles.inputView}>  
            <TextInput style = {styles.inputBox}
              placeholder = "Book ID"
              value = {this.state.scannedBookId}
              onChangeText = {text => {this.setState({scannedBookId:text})}}
             /> 
            <TouchableOpacity
              onPress = {() => {this.getCameraPermissions("Book ID")}}
              style = {styles.scanButton}>
              <Text style = {styles.buttonText}> Scan </Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.inputView}> 
            <TextInput style = {styles.inputBox}
              placeholder = "Student ID"
              value = {this.state.scannedStudentId}
              onChangeText = {text => {this.setState({scannedStudentId:text})}}
             /> 
            <TouchableOpacity
              onPress = {() => {this.getCameraPermissions("Student ID")}}
              style = {styles.scanButton}>
              <Text style = {styles.buttonText}> Scan </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style = {styles.submitButton}
                            onPress = {async() => {
                              var transactionMessage = await this.handleTransaction()
                            }}>
              <Text style = {styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    buttonText:{
      fontSize: 15,
      textAlign: "center",
      marginTop: 10
    },
    inputView: {
      flexDirection: "row",
      margin: 20, 
    },
    inputBox: {
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    submitButton :{
        backgroundColor : "pink",
        width : 100,
        height: 50
    },
    submitButtonText:{
        padding: 10,
        textAlign : 'center',    
        fontSize : 20,
        fontWeight: 'bold',
        color: 'white'
    }
  });