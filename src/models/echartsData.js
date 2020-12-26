import request from "@/utils/request";
export async function queryecharts(params) {
  // console.log("query rule is")
  // console.log(params)

  return request('/api/echarts/', {
    params,
  });
}
export default {
  namespace:'echarts',
  state:{
    xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ydata1: [20.0 , 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    ydata2: [20.6 , 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    year:'2020',
    dataversion:1
  },
  reducers: {
    fetchNewData(state,res) {
      // console.log('in dispatching')
      console.log('res data is ')
      console.log(res.xdata)
      return {
        xdata: res.xdata,
        ydata1:res.ydata1,
        ydata2:res.ydata2,
        year:res.year,
        dataversion:this.props.dataversion
      }
    }
  },
  effects:{
    *initData(params,sagaEffects){
      const {call,put}=sagaEffects
      // const url="/api/echarts"
      console.log('params are')
      console.log(params)
      let data=yield call(queryecharts,params)
      console.log('data is ')
      console.log(data)

      yield put({
        type:"fetchNewData",
        data:data
      })
    }
  }
}
