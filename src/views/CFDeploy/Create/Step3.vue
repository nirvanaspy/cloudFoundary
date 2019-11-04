<template>
  <div>
    <a-form style="margin: 40px auto 0;" :form="form">
      <a-form-item
        label="nats"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'nats',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入nats' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="ccgn"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'ccgn',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入ccgn' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="consul"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'consul',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入consul' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="dea"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'dea',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入dea' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="doppler"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'doppler',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入doppler' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="etcd"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'etcd',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入etcd' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="haproxy"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'haproxy',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入haproxy' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="hm9000"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'hm9000',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入hm9000' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="postgres"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'postgres',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入postgres' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="router"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'router',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入router' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="uaa"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'uaa',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入uaa' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="CPU数量"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input-number
          type="text"
          style="width: 80%;"
          :min="0"
          v-decorator="[
            'cpuNum',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入CPU数量' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="内存大小(G)"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input-number
          type="text"
          style="width: 80%;"
          :min="0"
          v-decorator="[
            'diskSize',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入内存大小' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="网络ID"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="text"
          style="width: 80%;"
          v-decorator="[
            'netId',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入网络ID' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="虚拟机数量"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input-number
          type="text"
          style="width: 80%;"
          :min="0"
          v-decorator="[
            'deviceNum',
            {
              rules: [{ required: true, message: '请输入虚拟机数量' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 19, offset: 5 }"
        style="text-align: right;"
      >
        <a-button @click="prevStep" style="margin-right: 10px;"
          >上一步</a-button
        >
        <a-button :loading="loading" type="primary" @click="finish"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'Step3',
  components: {
    Result
  },
  data() {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false
    }
  },
  methods: {
    prevStep() {
      this.$emit('prevStep')
    },
    finish() {
      const {
        form: { validateFields }
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        const params = { ...values }
        this.$emit('finish', params)
      })
    },
    toOrderList() {
      this.$router.push('/list/table-list')
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
