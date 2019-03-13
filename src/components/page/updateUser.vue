<template>
<div class="deit">
    <div class="crumbs">
      <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="cantainer">
                    <el-table style="width: 100%;"
                    :data="users.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
                    >
                        <el-table-column type="index" width="50">    
                        </el-table-column>
                        <el-table-column label="日期" prop="name" width="180">    
                        </el-table-column>
                        <el-table-column label="用户姓名" prop="pass" width="180">    
                        </el-table-column>
                        <el-table-column label="邮箱" prop="vip" width="180">    
                        </el-table-column>  
                    </el-table>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[2, 4, 6]" 
                            :page-size="pagesize"        
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="users.length">   
                    </el-pagination>
        </div>
    </div>
</div>
</template>
<script>
export default{
    data () {
      return {
                currentPage:1, //初始页
                pagesize:2,    //    每页的数据
                users: []
      }
  },
  created() {
        this.handleUserList()
    },
    methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
        handleUserList() {
            this.$http.get('/data').then(res => {  //这是从本地请求的数据接口，
                this.users = res.data.users
            })
        }
    }
}
</script>
