<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        @click="openModal(true)"
      >
        建立新產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="key">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <!-- 產品如果為啟用：is_enabled == 1 -->
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
             @click="openModal(false, item)">編輯</button>
             <button class="btn btn-outline-danger btn-sm"
             @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

     <!-- bootstrap pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="getProducts(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
          :class="{'active': pagination.current_page === page}"> 
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a></li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="getProducts(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Bootstrap edit Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="fileUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid" alt="" :src="tempProduct.imageUrl">
            </div>
            <div class="col-sm-8">
                <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類">
                </div>
                <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                     v-model="tempProduct.unit"
                    placeholder="請輸入單位">
                </div>
                </div>

                <div class="form-row">
                <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                    v-model="tempProduct.origin_price"
                    placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                    v-model="tempProduct.price"
                    placeholder="請輸入售價">
                </div>
                </div>
                <hr>

                <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                <div class="form-check">
                    <!-- is_enabled：0是未啟用，1是啟用 -->
                    <input class="form-check-input" type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                    是否啟用
                    </label>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  //功能是：可匯給其他的元件使用
  data() {
    return {
      products: [], //新增的資料皆會儲存於此
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      fileUploading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`; //'https://vue-course-api.hexschool.io/api/jim55167/products'
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        this.products = response.data.products;
        this.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {        
        if (isNew) { //如果為新增的話，則是一個空物件
          this.tempProduct = {};
          this.isNew = true;
        } else {
          this.tempProduct = Object.assign({}, item); //Object.assign會將值寫到新的物件
          this.isNew = false;
        }
        $('#productModal').modal('show'); //將這欄位往後放
    },
    deleteModal(item) {
      $('#delProductModal').modal('show');
      this.tempProduct = item;
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) { //判斷isNew是否為新，假設isNew不是新的
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }      
      this.$http[ httpMethod ](api, { data: this.tempProduct }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $('#productModal').modal('hide'); //新增成功的話則關閉modal
          this.getProducts(); //並且重新取得遠端內容
        } else {
          $('#productModal').modal('hide'); //若新增失敗會跳出錯誤訊息
          this.getProducts();
          console.log('新增失敗');
        }
      });
    },
    deleteProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(api, { data:this.tempProduct }).then((response) => {
        if(response.data.success) {
          $('#delProductModal').modal('hide');
          this.getProducts();
        }
      });
    },
    uploadFile() { //上傳圖片
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response.data);
        this.fileUploading = false;
        if(response.data.success) {
          this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger');       
        }
      })
    },
  },
  created() {
    this.getProducts();
    
  },
};
</script>