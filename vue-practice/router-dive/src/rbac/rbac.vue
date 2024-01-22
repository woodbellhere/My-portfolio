<template>
  <div class="login">
    <loadingBar></loadingBar>
    <el-card class="box-card">
      <el-form
        :model="formInline"
        class="demo-form-inline"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="账号， " prop="user">
          <el-input
            v-model="formInline.user"
            placeholder="请输入账号"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码， " prop="password">
          <el-input
            type="password"
            v-model="formInline.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { FormItemRule, FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import loadingBar from "@/components/loadingBaar.vue";
import axios from "axios";

const router = useRouter();
const formInline = reactive({
  user: "",
  password: "",
});

type Form = {
  user: string;
  password: string;
};

type Rules = {
  [K in keyof Form]?: Array<FormItemRule>;
};

const rules = reactive<Rules>({
  user: [
    {
      required: true,
      message: "请输入账号",
      type: "string",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      type: "string",
    },
  ],
});

const form = ref<FormInstance>();
const onSubmit = () => {
  console.log("submit!", form.value);
  form.value?.validate((validate) => {
    // console.log(validate);
    if (validate) {
      router.push("/index");
      localStorage.setItem("token", "1");
    } else {
      ElMessage.error("请输入正确账号和密码");
    }
  });
};

const initRouter = async () => {
  const result = await axios.get("http://localhost:3000", {
    params: formInline,
  });
  result.data.route.forEach((item) => {
    router.addRoute({
      path: item.path,
      name: item.name,
      component: () => import(`../rbac/${item.component}.vue`),
    });
  });
  console.log(router.getRoutes());
  router.push("/index");
};
</script>

<style scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
