export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              { path: '/users',
                name: 'Users',
                icon: 'crown',
                routes: [
                  {
                  path: '/users/ListData',
                  name: 'ListData',
                  icon: 'smile',
                  component: './List',
                  },
                  {
                    path: '/users/UserList',
                    name: 'UserList',
                    icon: 'smile',
                    component: './UserList',
                  },
                  {
                    path: '/users/ETC',
                    name: 'ETC',
                    icon: 'smile',
                  },
                ]
              },
              {
                path:'https://pro.ant.design',
                target:'_blank',
                name:"OG"
              },
              { path: '/product',
                name: 'Product',
                icon: 'read',
                routes: [
                  {
                    path: '/product/ProductList',
                    name: 'ProductList',
                    component: './List',
                  },
                  {
                    path: '/product/Dashboard',
                    name: 'ProductDashboard',
                    component: './UserList',
                  },
                ]
              },
              { path: '/statistic',
                name: 'Statistic',
                icon: 'trophy',
                routes: [
                  {
                    path: '/statistic/Charts',
                    name: 'StatisticCharts',
                    component: './Echarts',
                  },
                  {
                    path: '/statistic/data',
                    name: 'StatisticData',
                    component: './UserList',
                  },
                ]
              },
              {
                path: '/MyTabs',
                name: 'MyTabs',
                icon: 'smile',
                component: './MyTabs',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
