<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1" to="/">
                        <Icon type="ios-navigate"></Icon>
                        <span>用户管理</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
                        style="text-align: right">
                    <Button @click="isShow = true" icon="md-power" type="primary" shape="circle"></Button>
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card style="height: calc(100%  - 60px)">
                        <router-view/>
                    </Card>
                </Content>
            </Layout>
        </Layout>


        <Modal v-model="isShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>是否退出管理台</span>
            </p>
            <div style="text-align:center">
                <p>如果退出管理台，需要重新登录才可进来，并且不会保留任何操作信息。</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="onSingOut">退 出</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapsed: true,
                isShow: false,
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            onSingOut() {
                sessionStorage.clear()
                this.$router.replace('/login')
                this.$Message.success('退出成功');
            }
        }
    }
</script>

<style scoped lang="less">
    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>