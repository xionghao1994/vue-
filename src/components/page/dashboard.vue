<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input  v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dialogAddVisible = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users.slice((page-1)*pagesize,page*pagesize)" @selection-change="selsChange"  highlight-current-row  v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="用户名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="pass" label="密码" width="100" sortable>
			</el-table-column>
			
			<el-table-column prop="vip" label="会员" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
	    <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="total,prev, pager, next" :page-sizes="[2, 4, 6]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
			</el-pagination>
		</el-col> 

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			 <div>
				<el-form ref="form" label-width="80px">
					<el-form-item label="用户名">
						<el-input v-model="editForm.name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="editForm.pass"></el-input>
					</el-form-item>
					<el-form-item label="会员？">
						<el-select v-model="editForm.vip" placeholder="请选择">
						<el-option label="是" value="是"></el-option>
						<el-option label="否" value="否"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editFormVisible = false">提交</el-button>
			</div>
		</el-dialog>
		
		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="dialogAddVisible" :close-on-click-modal="false">
		    <div>
				<el-form ref="form" label-width="80px">
					<el-form-item label="用户名">
						<el-input v-model="addForm.name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="addForm.pass"></el-input>
					</el-form-item>
					<el-form-item label="会员？">
						<el-select v-model="addForm.vip" placeholder="请选择">
						<el-option label="是" value="是"></el-option>
						<el-option label="否" value="否"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save">立即添加</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog> 
	</section>
</template>

<script>
	import util from '../common/api/util.js'
	export default {
		data() {
			return {
				 addForm:{
					name: "",
					pass: "",
				    vip: ""
				},
				filters:{
					name:''
				},
				users:[],
				// users: [{
				// 	"id":1,
				// 	"name":"张三",
				// 	"pass":"1223445",
				// 	"vip":"是"
		        // },{
				// 	"id":2,
				// 	"name":"李四",
				// 	"pass":"1234565",
				// 	"vip":"否"
				// },{
				// 	"id":3,
				// 	"name":"大大",
				// 	"pass":"1234565",
				// 	"vip":"是"
				// },{
				// 	"id":4,
				// 	"name":"天佑",
				// 	"pass":"1234565",
				// 	"vip":"否"
				// },{
				// 	"id":5,
				// 	"name":"美团",
				// 	"pass":"1234565",
				// 	"vip":"是"
				// },{
				// 	"id":6,
				// 	"name":"旗标",
				// 	"pass":"1234565",
				// 	"vip":"否"
				// }],
				total: 0,
				page: 1,
				pagesize:5,
				listLoading: false,
				dialogAddVisible: false,
				editFormVisible:false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					name: '',
					pass:'',
					vip:''
				},
				addFormVisible: false,//新增界面是否显示
				addLoading: false
			}
		},
		methods: {
			// 新增
			save(){
				  let param = Object.assign({}, this.addForm);
                  this.users.push(param);
				  this.dialogAddVisible = false;
			},
			handleSizeChange(size){
				this.pagesize =size;
				// console.log(this.pagesize)
			},
			handleCurrentChange(val) {
				this.page = val;
				// console.log(this.page)	
				this.getUsers();	    		
			},
			//获取用户列表
			getUsers() {
			//   alert('1')
				this.listLoading = true;
				this.$http({
					methods:'get',
					url:'/data',
					data:{
					  page: this.page,
					  name: this.filters.name
					}
				}).then((res)=>{
					// console.log(res.data)
					 this.total = res.data.total
					 this.users = res.data.users
					this.listLoading = false;
				}).catch((err)=>{
					console.log(err)
				})
				     
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.users.splice(index,1);
					removeUser(data).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm =  row;
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					let para = { ids: ids };
					const batchRemoveUser = params => { return this.$http.get('/data', { params: params }); };
					// const batchRemoveUser = this.$http.get;
					batchRemoveUser(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>