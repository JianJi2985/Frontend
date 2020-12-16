import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

const UpdateForm = (props) => {
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: '规则配置',
            })}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => props.onCancel()}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          id:props.values.id,
          name: props.values.SECUABBR,
          desc: props.values.CHINAME,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText disabled
        name="id"
        label={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleName.id',
          defaultMessage: '债券ID',
        })}
        width="m"
      />
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.SECUABBR',
            defaultMessage: '债券名称',
          })}
          width="m"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入债券名称！"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="desc"
          width="m"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
            defaultMessage: '债券描述',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
            defaultMessage: '请输入至少五个字符',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleDesc.descRules"
                  defaultMessage="请输入至少五个字符的债券描述！"
                />
              ),
              min: 5,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: props.values.SECUCATEGORY,
          issuesize:props.values.ISSUESIZE,
          couponrate:props.values.COUPONRATE
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleProps.title',
          defaultMessage: '债券信息',
        })}
      >
        <ProFormSelect
          name="target"
          width="m"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.object',
            defaultMessage: '债券类型',
          })}
          valueEnum={{
            0: '普通企业债',
            1: '可交换公司债券',
            2: '资产支持票据',
            3: '项目收益票据'
          }}
        />
        <ProFormText
          name="issuesize"
          width="m"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleDesc.issuesize',
            defaultMessage: '发行规模',
          })}
        />
        <ProFormText
          name="couponrate"
          width="m"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleDesc.couponrate',
            defaultMessage: '票面利率',
          })}
        />
        {/*<ProFormSelect*/}
        {/*  name="template"*/}
        {/*  width="m"*/}
        {/*  label={intl.formatMessage({*/}
        {/*    id: 'pages.searchTable.updateForm.ruleProps.templateLabel',*/}
        {/*    defaultMessage: '规则模板',*/}
        {/*  })}*/}
        {/*  valueEnum={{*/}
        {/*    0: '规则模板一',*/}
        {/*    1: '规则模板二',*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<ProFormRadio.Group*/}
        {/*  name="type"*/}
        {/*  label={intl.formatMessage({*/}
        {/*    id: 'pages.searchTable.updateForm.ruleProps.typeLabel',*/}
        {/*    defaultMessage: '规则类型',*/}
        {/*  })}*/}
        {/*  options={[*/}
        {/*    {*/}
        {/*      value: '0',*/}
        {/*      label: '强',*/}
        {/*    },*/}
        {/*    {*/}
        {/*      value: '1',*/}
        {/*      label: '弱',*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          startdate: props.values.LISTINGDATE,
          enddate: props.values.DELISTINGDATE,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.schedulingPeriod.title',
          defaultMessage: '设定日期',
        })}
      >
        <ProFormDatePicker

          name="startdate"
          width="m"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
            defaultMessage: '开始日期',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.schedulingPeriod.timeRules"
                  defaultMessage="请选择开始日期！"
                />
              ),
            },
          ]}
        />
        <ProFormDatePicker
          name="enddate"
          width="m"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.schedulingPeriod.enddate',
            defaultMessage: '到期日期',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.schedulingPeriod.endtimeRules"
                  defaultMessage="请选择到期日期！"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
