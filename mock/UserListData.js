export default {
  'get /ds/user/list': function (req, res) {
    res.json([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
      {
        key: '4',
        name: 'AAA BBB',
        age: 79,
        address: 'ABCD',
        tags: ['HAHAHA', 'teacher'],
      },
      {
        key: '5',
        name: 'pppppp',
        age: 12,
        address: 'ppllllll',
        tags: ['cool', 'FAFAFAFAFA'],
      },
      {
        key: '6',
        name: 'KKKKKas',
        age: 43,
        address: 'KKKKKK',
        tags: ['KKK', 'FAFAFAFAFA'],
      },
    ])
  }
}
