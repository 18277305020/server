<template>
    <div>
        <Card class="card-box">
            <div style="text-align:center">
                <h3 style="margin-bottom: 20px;">用户登录</h3>
                <Form :model="form" :label-width="70">
                    <FormItem label="用户账号">
                        <Input v-model="form.username" placeholder="账号"></Input>
                    </FormItem>
                    <FormItem label="用户密码">
                        <Input v-model="form.password" type="password" placeholder="密码"></Input>
                    </FormItem>
                    <Button type="primary" class="bth" @click="onLogin">登 录</Button>
                    <Button type="primary" class="bth">注 册</Button>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
    import {login} from '../../util/http/api'

    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            async onLogin() {
                let res = await login(this.form)
                if (res.data.code === 1 && res.data.data) {
                    this.$router.push('/')
                    sessionStorage.token = res.data.data.token
                    this.$Message.success(res.data.message);
                } else {
                    this.$Message.error(res.data.message);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .card-box {
        width: 400px;
        margin: 200px auto;
        padding: 20px;

        .bth {
            margin: 10px;
        }
    }
</style>