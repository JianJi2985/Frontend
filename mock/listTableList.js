// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      SECUABBR: `TradeCode ${index}`,
      owner: '曲丽丽',
      CHINAME: '这是一段描述',
      ISSUESIZE: Math.floor(Math.random() * 1000),
      COUPONRATE: Math.floor(Math.random() * 1000),
      SECUCATEGORY: Math.floor(Math.random() * 10) % 4,
      LISTINGDATE: new Date(),
      DELISTINGDATE: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);
// console.log(tableListDataSource)
function getRule(req, res, u) {
  let realUrl = u;
  console.log(realUrl)
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  console.log(realUrl)
  const { current = 1, pageSize = 10 } = req.query;
  console.log("req.query is")
  console.log(req.query)

  const params = parse(realUrl, true).query;
  console.log(params)

  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);
  // console.log(dataSource)

  const sorter = JSON.parse(params.sorter);

  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }

          return;
        }

        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }

  if (params.filter) {
    const filter = JSON.parse(params.filter);

    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }

          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }

          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  console.log('Flag is here')
  console.log(dataSource)
  console.log('result is here')
  console.log(result)
  return res.json(result);
}

function postRule(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, SECUABBR, CHINAME, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;

    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          SECUABBR,
          owner: '曲丽丽',
          CHINAME,
          ISSUESIZE: Math.floor(Math.random() * 1000),
          COUPONRATE: Math.floor(Math.random() * 1000),
          SECUCATEGORY: Math.floor(Math.random() * 10) % 2,
          LISTINGDATE: new Date(),
          DELISTINGDATE: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        console.log(tableListDataSource.length)
        tableListDataSource.unshift(newRule);
        console.log('newrule')
        console.log(newRule)
        console.log(tableListDataSource.length)
        return res.json(newRule);
      })();

      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }

          return item;
        });
        return res.json(newRule);
      })();

      return;

    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  res.json(result);
}

export default {
  'GET /api/rule/': getRule,
  'POST /api/rule/': postRule,
};
