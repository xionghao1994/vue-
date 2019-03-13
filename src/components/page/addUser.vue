<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="会员？">
                <el-select v-model=" addForm.isVip" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addUser">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      addForm:{
         username: "",
         password: "",
         isVip: ""
      }
    };
  },
  methods: {
    addUser() {
      this.$refs.addForm.validate((valid) => {
					if (valid) {
							let para = Object.assign({}, this.addForm);		
							this.users.push(para)
					}
			});
      // this.$http
      //   .post("user/addUser", {
      //     username: this.username,
      //     password: this.password,
      //     isVip: this.isVip
      //   })
      //   .then(result => {
      //     var result = result.body;
      //     if (result.state === 200) {
      //       alert("添加成功！");
      //       this.username = "";
      //       this.password = "";
      //       this.isVip = "";
      //     } else if(result.state === 10005){
      //       alert("该用户已经存在！");
      //     }else {
      //       // 失败了
      //       alert("添加失败！");
      //     }
      //   });

    }
  }
};
</script>
