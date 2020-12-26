import { DatePicker, Space } from 'antd';
import React, { Component } from 'react';
// 引入 ECharts 主模块
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import request from '@/utils/request';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { connect } from 'dva'
import DemoEcharts from "@/components/Echarts/DemoEcharts";
import { stringify } from 'qs';
// import Echarts from "@/pages/Echarts";
const namespace = 'echarts'


class EchartsTest extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let i = 1;
    this.setState({year:'2020'})
    // console.log('thisstateyear')
    // console.log(this.state.year)
    // params=this.state.year
    setInterval(() => {
      i++;
        this.setState({
          year:this.props.year,
          key:i,
          xdata:this.props.xdata,
          ydata1:this.props.ydata1,
          ydata2:this.props.ydata2,
          dataversion:this.props.dataversion
          // xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          // ydata1: [20.0 + i, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          // ydata2: [20.6 + i, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        });

    }, 100000000);

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
    if (this.state == null) return '1';
    console.log("this.props.xdata: ", this.state.xdata);
    console.log("this.props.ydata1: ", this.state.ydata1);
    console.log("this.props.ydata2: ", this.state.ydata2);
    // setstate=this.setState;
    return (
      // <div id="main" style={{width: '80%',height:400}}></div>
      <div className='examples'>
        <div className='parent'>
          <label> 某地
            <DatePicker onChange={(date)=> {
                console.log('value is', date.year());
                let key = date.year(), xdata = [], ydata1 = [], ydata2 = [], dataversion = 0;
                request.get('/api/echarts/?year=' + date.year()).then((resp) => {
                  for (let i in resp) {
                    xdata.push(resp[i].month);
                    ydata1.push(resp[i].income);
                    ydata2.push(resp[i].expense);
                    key = resp[i].year;
                    dataversion = resp[i].dataversion;
                  }
                  this.setState({
                    year: key,
                    key: key,
                    xdata: xdata,
                    ydata1: ydata1,
                    ydata2: ydata2,
                    dataversion: dataversion,
                  })
                });
                // res=request('/api/echarts/',date._d);
                //   if ((this.state.year!=res.year)||(this.state.dataversion!=res.dataversion)){
                //     this.setState({
                //       year:res.year,
                //       key:res.year,
                //       xdata:res.xdata,
                //       ydata1:res.ydata1,
                //       ydata2:res.ydata2,
                //       dataversion:res.dataversion
                //       // xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                //       // ydata1: [20.0 + i, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                //       // ydata2: [20.6 + i, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                //     });
                //   }
              }
            }
                        picker="year"/>
                        年一般预算收入与一般预算支出
          </label>

          <DemoEcharts xdata={this.state.xdata}
                       ydata1={this.state.ydata1}
                       ydata2={this.state.ydata2}
                       key={this.state.key}/>
        </div>
      </div>
    );
  }
}

export default EchartsTest;
