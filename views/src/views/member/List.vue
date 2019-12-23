<template>
    <div>
        <Row :gutter="16" style="padding: 20px 0">
            <Col span="6">
                <Input v-model="findDate.query.uid" placeholder="用户id"/>
            </Col>
            <Col span="6">
                <Input v-model="findDate.query.username" placeholder="用户姓名"/>
            </Col>
            <Col span="6">
                <Button type="primary" icon="ios-search" @click="find(findDate)">搜 索</Button>
            </Col>
            <Button style="float: right;margin-right: 8px" type="primary" icon="md-add">添 加</Button>
        </Row>

        <Table :columns="columns" :data="tebleData" :loading="loading"></Table>

        <Page :total="total" show-elevator @on-change="changePage" class="page"/>
    </div>
</template>
<script>
    import {memberList} from '../../util/http/api'

    export default {
        data() {
            return {
                loading: false,
                columns: [
                    {
                        title: 'id',
                        key: 'uid',
                        align: 'center',
                    },
                    {
                        title: '用户名称',
                        key: 'username',
                        align: 'center',
                    },
                    {
                        title: '用户密码',
                        key: 'password',
                        align: 'center',
                    }
                ],
                tebleData: [],
                total: 0,
                findDate: {
                    query:{}
                }
            }
        },
        mounted() {
            this.find()
        },
        methods: {
            async find(params) {
                this.loading = true
                let data = await memberList(params)
                if (data.data.code === 1 && data.data.data.list) {
                    this.tebleData = data.data.data.list
                    this.total = data.data.data.count
                }
                this.loading = false
            },
            changePage(val) {
                this.find({page: val})
            }
        }
    }
</script>

<style scoped lang="less">
    .page {
        margin: 20px 0;
        text-align: right;
    }
</style>