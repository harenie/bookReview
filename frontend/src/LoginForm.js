import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";


class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      buttonDisabled:false

    }

  }
  setInputValue(property,val){
    val=val.trim();
    if(val.length>12){
      return;
    }
    this.setState({
      [property]: val 
    })
  }

  resetForm(){
    this.setState({
      username:'',
      password:'',
      buttonDisabled:false
    })
  }

  async doLogin(){
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }

    this.setState({
      buttonDisabled:true
    })

    try{
      let res = await fetch(`${BACKEND_URL}/fetchM`,{
        method:'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:this.state.username,
          password:this.state.password,
        })
      });

      let result= await res.json();
      if(result && result.success){
        UserStore.array=result.id;
       // alert(UserStore.array[5].name);
        
       // alert("arrayy")
      }
      else if(result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }
    }
    catch(e){
      console.log(e);
      this.resetForm(); 
    }



    // try{
    //   let res=await fetch('/pythonCM',{
    //     method:'post',
    //     headers:{
    //       'Accept':'application/json',
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({
    //       moviename:UserStore.moviename,
    //       password:this.state.password
    //     })
    //   });

    //   let result= await res.json();
    //   if(result && result.success){
    //     // UserStore.array=result.id;
    //     alert(result.id);
    //   }
    //   else if(result && result.success === false){
    //     this.resetForm();
    //     alert(result.msg);
    //   }
    // }
    // catch(e){
    //   console.log(e);
    //   this.resetForm(); 
    // }

    // try{
    //   let res=await fetch('/pythonM',{
    //     method:'post',
    //     headers:{
    //       'Accept':'application/json',
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({
    //       nameA:this.state.UserStore.array,
    //     })
    //   });
    //   alert("HI PYTHON");
    //   let result= await res.json();
    //   if(result && result.success){
    //     UserStore.array=result.outP;
    //     alert(UserStore.array);
    //   }
    //   else if(result && result.success === false){
    //     this.resetForm();
    //     alert(result.msg);
    //   }
    // }
    // catch(e){
    //   console.log(e);
    //   //this.resetForm(); 
    //   alert("HI PYTHON ER");
    // }

    try{
      let res = await fetch(`${BACKEND_URL}/login`,{
        method:'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:this.state.username,
          password:this.state.password,
        })
      });

      let result= await res.json();
      if(result && result.success){
        UserStore.isLoggedIn= true;
        UserStore.username=result.username;
        // alert(UserStore.username);
        window.dispatchEvent(new Event('loginStateChanged'));

      }
      else if(result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }
    }
    catch(e){
      console.log(e);
      this.resetForm(); 
    }
  }

  render() {
  return (
    <div className="loginForm">
      Log in
      <InputField
        type='text'
        placeholder='Username'
        value={this.state.username ? this.state.username:''}
        onChange={(val)=> this.setInputValue('username',val)}
      />
      <InputField
        type='password'
        placeholder='Password'
        value={this.state.password ? this.state.password:''}
        onChange={(val)=> this.setInputValue('password',val)}
      />
      <SubmitButton
        text='Login'
        disabled={this.state.buttonDisabled}
        onClick={()=> this.doLogin()}
      />
    </div>
  );
}
}
export default LoginForm;