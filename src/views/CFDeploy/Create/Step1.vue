<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="IP地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder=""
          v-decorator="[
            'IP',
            {
              rules: [{ required: true, message: 'IP必须填写' }]
            }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder=""
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入用户名' }] }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          placeholder=""
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码' }] }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 19, offset: 5 }"
        style="text-align: right;"
      >
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      params: {
        IP: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    nextStep() {
      const {
        form: { validateFields }
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        const params = { ...values }
        this.params = params
        if (!err) {
          if (params.username !== 'root' && params.password !== 'root') {
            this.$message.error('对不起，用户名或密码错误')
            return
          }
          setTimeout(() => {
            this.$notification['error']({
              message: '错误',
              description: '对不起无法连接到bosh服务器',
              duration: 4
            })
          }, 2000)
          this.$emit('nextStep')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
