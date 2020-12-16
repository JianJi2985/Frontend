import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
import Map from '../Echarts'
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      id: fields.id,
      startdate:fields.startdate,
      enddate:fields.enddate,
      target:fields.target,
      issuesize:fields.issuesize,
      couponrate:fields.couponrate
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  // console.log('createModalVisible')
  // console.log(createModalVisible)
  // console.log('handleModalVisible')
  // console.log(handleModalVisible)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const intl = useIntl();
  // console.log('row')
  // console.log(row)
  console.log('actionRef')
  console.log(actionRef)
  console.log('actionRef current')
  console.log(actionRef.current)
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.SECUABBR"
          defaultMessage="债券名称"
        />
      ),
      dataIndex: 'SECUABBR',
      tip: '债券名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: (
              <FormattedMessage id="pages.searchTable.ruleName" defaultMessage="债券名称为必填项" />
            ),
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.CHINAME" defaultMessage="债券描述" />,
      dataIndex: 'CHINAME',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.ISSUESIZE" defaultMessage="发行规模" />,
      dataIndex: 'ISSUESIZE',
      sorter: true,
      hideInForm: false,
      // renderText: (val) =>
      //   `${val}${intl.formatMessage({
      //     id: 'pages.searchTable.tenThousand',
      //     defaultMessage: ' 万 ',
      //   })}`,
    },
    {
      title: <FormattedMessage id="pages.searchTable.COUPONRATE" defaultMessage="票面利率" />,
      dataIndex: 'COUPONRATE',
      sorter: true,
      hideInForm: false
    },
    {
      title: <FormattedMessage id="pages.searchTable.SECUCATEGORY" defaultMessage="债券类型" />,
      dataIndex: 'SECUCATEGORY',
      hideInForm: false,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.corporatebond" defaultMessage="普通企业债" />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.convertible" defaultMessage="可交换公司债券" />
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.abs" defaultMessage="资产支持票据" />
          ),
          status: 'Success',
        },
        3: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.note" defaultMessage="项目收益票据" />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.LISTINGDATE" defaultMessage="发行日期" />
      ),
      dataIndex: 'LISTINGDATE',
      sorter: true,
      valueType: 'date',
      hideInForm: false,
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');
      //   // console.log('renderFormItem')
      //   // console.log('renderFormItem',item)
      //   // console.log('renderFormItem',rest)
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //
      //   if (`${status}` === '3') {
      //     return (
      //       <Input
      //         {...rest}
      //         placeholder={intl.formatMessage({
      //           id: 'pages.searchTable.exception',
      //           defaultMessage: '请输入异常原因！',
      //         })}
      //       />
      //     );
      //   }
      //   // console.log('rederresult',defaultRender(item))
      //   return defaultRender(item);
      // },
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.DELISTINGDATE" defaultMessage="到期日期" />
      ),
      dataIndex: 'DELISTINGDATE',
      sorter: true,
      valueType: 'date',
      hideInForm: false,
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');
      //
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //
      //   if (`${status}` === '3') {
      //     return (
      //       <Input
      //         {...rest}
      //         placeholder={intl.formatMessage({
      //           id: 'pages.searchTable.exception',
      //           defaultMessage: '请输入异常原因！',
      //         })}
      //       />
      //     );
      //   }
      //
      //   return defaultRender(item);
      // },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            <FormattedMessage id="pages.searchTable.config" defaultMessage="配置" />
          </a>
          <Divider type="vertical" />
          <a href="">
            <FormattedMessage id="pages.searchTable.subscribeAlert" defaultMessage="订阅警报" />
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {setSelectedRows(selectedRows),console.log('selectedRows')
            console.log(selectedRows)},
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            console.log('columns')
            console.log(columns)
            console.log('value')
            console.log(value)
            const success = await handleAdd(value);
            console.log('if success')
            console.log(success)
            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
      {/*<div>*/}
      {/*  <Map>*/}

      {/*  </Map>*/}
      {/*</div>*/}
    </PageContainer>
  );
};

export default TableList;
