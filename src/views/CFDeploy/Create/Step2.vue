<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="CF版本"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'version',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入CF版本' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="集群名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'name',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入集群名称' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="集群域名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'domain',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入集群域名' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 19, offset: 5 }"
        style="text-align: right;"
      >
        <a-button @click="prevStep">上一步</a-button>
        <a-button
          :loading="loading"
          type="primary"
          @click="nextStep"
          style="margin-left: 8px"
          >下一步</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  methods: {
    nextStep() {
      const that = this
      const {
        form: { validateFields }
      } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('表单 values', values)
          that.timer = setTimeout(function() {
            that.loading = false
            that.$emit('nextStep', values)
          }, 1500)
        } else {
          that.loading = false
        }
      })
    },
    prevStep() {
      this.$emit('prevStep')
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
