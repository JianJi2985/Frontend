import request from "@/utils/request";

export default {
  namespace:'UserList',
  state:{
    list:[],
  },
  effects:{
    *initData(params,sagaEffects){
      const {call,put}=sagaEffects
      const url="/ds/user/list"
      let data=yield call(request,url)
      // console.log("lkkkkkkk")
      // console.log(data)
      yield put({
        type:"queryList",
        data:data
      })
    }
  },
  reducers:{
    queryList(state,res){
      let data=[...res.data]
      return ({list: data})
    }
  }
}
