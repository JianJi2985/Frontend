
import React, { Component } from 'react';
// 引入 ECharts 主模块
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {connect} from 'dva'
import DemoEcharts from "@/components/Echarts/DemoEcharts";
// import Echarts from "@/pages/Echarts";
const namespace='echarts'
@connect((state)=>{
  return{
    option:state[namespace].option,
  }
},(dispatch) => {
  return {
    fetchNewData:()=>{
      dispatch({type:namespace+"/fetchNewData"})
    },
    initData:()=>{
      dispatch({type:namespace+"/initData"})
    }
  }
})
class EchartsTest extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.initData();


  };
  // componentWillUnmount() {
  //   if (this.timeTicket) {
  //     clearInterval(this.timeTicket);
  //   }
  // };
    // 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.getElementById('main'));
    // 绘制图表

  render() {
    return (


      // <div id="main" style={{width: '80%',height:400}}></div>
      <div className='examples'>
        <div className='parent'>
          <label> render a china map. <strong>MAP charts</strong>: </label>
          <DemoEcharts xdata={this.props.xdata}
                       ydata1={this.props.ydata1}
                       ydata2={this.props.ydata2}/>
        </div>
      </div>
    );
  }
}

export default EchartsTest;
