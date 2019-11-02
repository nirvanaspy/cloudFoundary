<template>
  <div>
    <a-table
      bordered
      :dataSource="applicationList"
      :columns="columns"
      rowKey="id"
      :pagination="false"
      :rowSelection="rowSelection"
    >
      <template slot="name" slot-scope="text">
        <editable-cell :text="text" />
      </template>
      <template slot="operation" slot-scope="name, record">
        <a-popconfirm
          v-if="applicationList.length"
          title="确认删除吗"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
        <span style="margin-left: 10px">
          <a href="javascript:;">修改</a>
        </span>
      </template>
    </a-table>
    <a-modal title="新建集群" :width="800" v-model="visible" @ok="handleOk">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="名称"
        >
          <a-input
            placeholder="请输入栈名称"
            v-decorator="[
              'name',
              {
                initialValue: '',
                rules: [{ required: true, message: '请输入栈名称' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="所有者"
        >
          <a-select
            placeholder="请选所有者"
            style="width: 100%; margin-right: 8px;"
            v-decorator="[
              'owner',
              {
                initialValue: '',
                rules: [{ required: true, message: '请选择所有者' }],
                validateTrigger: 'blur'
              }
            ]"
          >
            <a-select-option value="0">root</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  getApplication,
  deleteApplication,
  addApplication
} from '@/api/application'
import uniqid from 'uniqid'
// import qs from 'qs'
// import _ from 'lodash'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const formTailLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const attributeLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
}
export default {
  name: 'CFDeploy',
  data() {
    return {
      columns: [
        {
          title: '栈名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center'
        },
        {
          title: '所有者',
          dataIndex: 'owner',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center'
        }
      ],
      formItemLayout,
      formTailLayout,
      attributeLayout,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 19, offset: 5 }
        }
      },
      applicationList: [
        /*{
            name: '应用1',
            description: '这是仿真应用1',
            id: '1',
            createTime: '2010-8-31 11:00:00'
          },
          {
            name: '应用2',
            description: '这是仿真应用2',
            id: '2',
            createTime: '2010-8-31 11:01:00'
          },
          {
            name: '应用3',
            description: '这是仿真应用3',
            id: '3',
            createTime: '2010-8-31 11:02:00'
          },
          {
            name: '应用4',
            description: '这是仿真应用4',
            id: '4',
            createTime: '2010-8-31 11:03:00'
          }*/
      ],
      targetApp: {},
      form: this.$form.createForm(this),
      createForm: {
        name: '',
        description: '',
        attributeList: []
      },
      visible: false
    }
  },
  created() {
    this.getAppList()
  },
  methods: {
    getAppList() {
      getApplication()
        .then(res => {
          if (res.data.code === 0) {
            this.applicationList = res.data.data
          }
        })
        .catch(err => {
          this.$notification['error']({
            message: '错误',
            description:
              ((err.response || {}).data || {}).message ||
              '服务器未响应，请稍后再试',
            duration: 4
          })
        })
    },
    onDelete(id) {
      deleteApplication(id).then(res => {
        if (res.data.code === 0) {
          const dataSource = [...this.applicationList]
          this.dataSource = dataSource.filter(item => item.id !== id)
        }
      })
    },
    resetForm() {
      this.createForm = {
        name: '',
        description: '',
        attributeList: []
      }
    },
    handleAdd() {
      this.resetForm()
      this.visible = true
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        this.$notification['error']({
          message: '错误',
          description: '服务器未响应，请稍后再试',
          duration: 4
        })
      })
    },
    remove(k) {
      const arr = this.createForm.attributeList
      arr.splice(arr.findIndex(item => item.id === k.attrId), 1)
      console.log(k)
    },
    addAttribute() {
      this.createForm.attributeList.push({
        name: '',
        type: '',
        attrId: uniqid.time()
      })
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  }
}
</script>

<style scoped></style>
