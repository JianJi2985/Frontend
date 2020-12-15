import request from "@/utils/request";
export default {
  namespace:'echarts',
  state:{
    xdata:[],
    ydata1:[],
    ydata2:[]
  },
  reducers: {
    fetchNewData(state,res) {
      // console.log('in dispatching')
      console.log('res data is ')
      console.log(res.data.xdata)
      return {
        xdata: res.data.xdata,
        ydata1:res.data.ydata1,
        ydata2:res.data.ydata2
      }
    }
  },
  effects:{
    *initData(params,sagaEffects){
      const {call,put}=sagaEffects
      const url="/echarts"
      let data=yield call(request,url)
      console.log('data is ')
      console.log(data)

      yield put({
        type:"fetchNewData",
        data:data
      })
    }
  }
}
