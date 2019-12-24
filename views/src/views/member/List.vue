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

        <Table :columns="columns" :data="tebleData" :loading="loading">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px">修 改</Button>
                <Button type="error" size="small" @click="onRemove(row,index)">删 除</Button>
            </template>
        </Table>

        <Page :total="total" show-elevator @on-change="changePage" class="page"/>
    </div>
</template>
<script>
    import {memberList, memberDel} from '../../util/http/api'

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
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                tebleData: [],
                total: 0,
                findDate: {
                    query: {}
                }
            }
        },
        mounted() {
            this.find()
        },
        methods: {
            async find(params) {
                this.loading = true
                let res = await memberList(params)
                if (res.data.code === 1 && res.data.data.list) {
                    this.tebleData = res.data.data.list
                    this.total = res.data.data.count
                }
                this.loading = false
            },
            changePage(val) {
                this.find({page: val})
            },
            async onRemove(row) {
                let res = await memberDel({uid: row.uid})
                if (res.data.code === 1) {
                    this.find()
                    this.$Message.success(res.data.message);
                }
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