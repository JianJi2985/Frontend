import request from "@/utils/request";
export default {
  namespace:'list',
  state:{
    data:[],
    maxNum:0
  },
  reducers: {
    addNewData(state,res) {
      // console.log('in dispatching')
      if (res.data){
        // console.log('res data')
        // console.log(res.data)
        return res.data
      }
      let maxNum = state.maxNum + 1
      let newlist = [...state.data, maxNum]
      return {
        data: newlist,
        maxNum: maxNum
      }
    }
  },
  effects:{
    *initData(params,sagaEffects){
      const {call,put}=sagaEffects
      const url="/ds/list"
      let data=yield call(request,url)
      yield put({
        type:"addNewData",
        data:data
      })
    }
  }
}
