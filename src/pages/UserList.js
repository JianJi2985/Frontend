import { Table, Tag, Space ,Divider,pagination} from 'antd';
import React from 'react'
import {render} from "react-dom";
import {connect} from "dva";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <Divider type="vertical"/>
        <a>Delete</a>
      </Space>
    ),
  },
];
//
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
//   {
//     key: '4',
//     name: 'AAA BBB',
//     age: 79,
//     address: 'ABCD',
//     tags: ['HAHAHA', 'teacher'],
//   },
//   {
//     key: '5',
//     name: 'pppppp',
//     age: 12,
//     address: 'ppllllll',
//     tags: ['cool', 'FAFAFAFAFA'],
//   },
//   {
//     key: '6',
//     name: 'KKKKK',
//     age: 43,
//     address: 'KKKKKK',
//     tags: ['KKK', 'FAFAFAFAFA'],
//   },
// ];

const namespace='UserList'
@connect((state)=>{
  return{
    data:state[namespace].list,
  }
},(dispatch) => {
  return {
    initData:()=>{
      dispatch({type:namespace+"/initData"})
    }
  }
})
class UserList extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.initData()
  }

  render(){
      return(
        <div>
          <Table columns={columns} dataSource={this.props.data} pagination={{position:"bottom",total:this.props.data.length,pageSize:5,defaultCurrent:2}}/>
        </div>
      )
    }
  }

export default UserList
