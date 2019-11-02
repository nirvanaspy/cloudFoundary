<template>
  <div>
    <div style="text-align:right;margin-bottom: 4px;">
      <a-button
        class="editable-add-btn"
        @click="handleAdd"
        type="primary"
        style="margin-right: 10px;"
        >添加用户</a-button
      >
      <a-button class="editable-add-btn" @click="handleDelete" type="primary"
        >删除用户</a-button
      >
    </div>
    <a-table
      bordered
      :dataSource="userList"
      :columns="columns"
      rowKey="userId"
      :pagination="false"
      :rowSelection="rowSelection"
    >
      <template slot="operation" slot-scope="name, record">
        <span style="margin-left: 10px">
          <a @click="handleEdit(record)">修改</a>
        </span>
      </template>
    </a-table>
    <a-modal title="添加用户" :width="800" v-model="visible" @ok="handleOk">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="用户名"
        >
          <a-input
            placeholder="请输入用户名"
            v-decorator="[
              'username',
              {
                initialValue: '',
                rules: [{ required: true, message: '请输入用户名' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="密码"
        >
          <a-input
            type="password"
            placeholder="请输入密码"
            v-decorator="[
              'password',
              {
                initialValue: '',
                rules: [{ required: true, message: '请输入密码' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="修改用户" :width="800" v-model="editVisible" @ok="editUser">
      <a-form v-model="currentUser">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="用户名"
        >
          <a-input
                  v-model="currentUser.username"
            placeholder="请输入用户名"
            v-decorator="[
              'username',
              {
                initialValue: '',
                rules: [{ required: true, message: '请输入用户名' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="密码"
        >
          <a-input
                  v-model="currentUser.password"
            type="password"
            placeholder="请输入密码"
            v-decorator="[
              'password',
              {
                initialValue: '',
                rules: [{ required: true, message: '请输入密码' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getApplication, deleteApplication } from '@/api/application'
import uniqid from 'uniqid'
import _ from 'lodash'
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
  name: 'UserManage',
  data() {
    return {
      userList: [],
      selectedRows: [],
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
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
      applicationList: [],
      targetApp: {},
      form: this.$form.createForm(this),
      currentUser: {},
      createForm: {
        name: '',
        description: '',
        attributeList: []
      },
      visible: false,
      editVisible: false
    }
  },
  created() {
    this.getAppList()
    this.getUserList()
  },
  methods: {
    getUserList() {
      let list = JSON.parse(localStorage.getItem('userList'))
      this.userList = list ? list : []
    },
    getAppList() {
      getApplication().then(res => {
        if (res.data.code === 0) {
          this.applicationList = res.data.data
        }
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
        let result = this.userList.find(
          item => item.username === values.username
        )
        if (!result) {
          this.userList.push({
            username: values.username,
            password: values.password,
            userId: uniqid.time()
          })
          localStorage.setItem('userList', JSON.stringify(this.userList))
          this.visible = false
        } else {
          this.$notification['error']({
            message: '错误',
            description: '该用户已存在！',
            duration: 4
          })
        }
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
    },
    handleDelete() {
      if(this.selectedRows.length === 0) {
        this.$message.warning('请先选择要删除的用户！')
        return
      }
      this.selectedRows.forEach(row => {
        /*_.remove(this.userList, function(user) {
          return item.userId === user.userId
        })*/
        this.userList.splice(
          this.userList.findIndex(item => item.userId === row.userId),
          1
        )
      })
      console.log(this.userList)
      localStorage.setItem('userList', JSON.stringify(this.userList))
    },
    handleEdit(user) {
      this.currentUser = _.cloneDeep(user),
      this.editVisible = true
    },
    editUser() {
      if(this.currentUser.username === '' || this.currentUser.password === '') {
        this.$message.error('用户信息填写不完整！')
        return
      } else {
        let result = this.userList.find(
                item => item.username === this.currentUser.username
        )
        if (!result) {
          let target = this.userList.find(item => item.userId === this.currentUser.userId)
          if(target) {
            target.username = this.currentUser.username
            target.password = this.currentUser.password
          }
          localStorage.setItem('userList', JSON.stringify(this.userList))
          this.editVisible = false
        } else {
          this.$notification['error']({
            message: '错误',
            description: '该用户已存在！',
            duration: 4
          })
          // this.editVisible = false
        }
      }
    }
  },
  computed: {
    rowSelection() {
      const self = this
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          self.selectedRows = selectedRows
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
