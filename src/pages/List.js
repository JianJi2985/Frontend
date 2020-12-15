import React from 'react'
import {connect} from 'dva'

const namespace='list'
@connect((state)=>{
  return{
    dataList:state[namespace].data,
    maxNum:state[namespace].maxNum
  }
},(dispatch) => {
  return {
    addNewData:()=>{
      dispatch({type:namespace+"/addNewData"})
    },
    initData:()=>{
      dispatch({type:namespace+"/initData"})
    }
  }
})
class List extends React.Component{
  constructor(props) {
    super(props);
  //   this.state={
  //     dataList:[1,2,3],
  //     maxNum:3
  //   }
  }
  componentDidMount() {
    this.props.initData()
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.dataList.map((value,index)=>{return <li key={index}>{value}</li>})}
        </ul>
        <button onClick={()=>{

          this.props.addNewData()

          // let maxNum=this.state.maxNum+1
          // let list=[...this.state.dataList,maxNum]
          // this.setState({
          //   dataList:list,
          //   maxNum:maxNum
          // })
        }}>
          添加
        </button>
      </div>
    )
  }
}

export default List
