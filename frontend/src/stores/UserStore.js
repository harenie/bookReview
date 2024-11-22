import {extendObservable} from 'mobx';

class UserStore{
    constructor(){
        extendObservable(this,{
            loading:true,
            isloggedIn:false,
            username:'',
            array:[],
            moviename:''
        })
    }
}

export default new UserStore();