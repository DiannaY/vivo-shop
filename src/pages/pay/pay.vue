<template>
    <div>
        <Pay-Header title="结算"></Pay-Header>
        <div to="address" class="pay-address" >
             <p class="address-box">
                <span class="name">收货人：yang</span>
                <span class="phone">66668888</span>
            </p>
            <p class="address-details">
                收货地址：黑龙江省哈尔滨市南岗区
            </p>
        </div> 
        <div class="pay-goods-list">
                <p class="title">清单列表</p>
                <ul class="lists">
                    <li v-for="(list,index) in payGoods" :key="index">
                        <img :src="list.img">
                        <div class="goods-info">
                           
                                <span class="name">{{list.name}}</span>
                                <span class="num">x {{list.value}}</span>
                                <p class="price">¥ {{list.price}}</p>
                         
                            <!-- <span>颜色：冰钻黑</span> -->
                            
                        </div>
                    </li>
                </ul>
        </div>
        <div class="pay-shop">
            <div class="pay-shop-invoice">
                <p class="pay-invoice-1">发票信息</p>
                <div class="pay-invoice-2">
                    <div class="pay-invoice-2-2">
                        <div v-show="invoiceIndex===0">
                            <p>*请输入发票抬头:</p>
                            <input type="text" v-model="text" id="input" placeholder="请输入发票信息">      
                        </div>
                    </div>
                </div>
            </div>
            <div class="pay-shop-fs">
                <div class="pay-fs-1">支付方式</div>
                <div class="pay-fs-2">
                    <!-- <div class="pay-fs-2-1" v-for="(item,index) in lists" :class="{active:index===ceshi}" @click="btn(index)" >
                        {{item.name}}
                    </div> -->
                    <div class="pay-fs-2-1" >
                        <div v-for="(list,index) in lists" :key="index" :class="{active:index===listIndex}" @click="btn(list.name,index)">{{list.name}}</div>
                    </div>
                    <div class="pay-fs-2-2">
                       <div v-show="listIndex===0" class="pay-fs-2-2-1">支持支付宝支付、微信支付、银行卡支付、财付通等</div>
                       <div v-show="listIndex===1" class="pay-fs-2-2-2">花呗分期是花呗联合天猫淘宝推出的，面向互联网的赊购服务，通过支付宝轻松还款，0首付</div>
                       <div v-show="listIndex===2" class="pay-fs-2-2-3">货到再付款，支持现金交易</div>
                    </div>
                </div>
            </div>
            <div class="pay-shop-liuyan">
                <p class="pay-liuyan-1">订单留言</p>
                <div class="pay-liuyan-2">
                    <textarea v-model="ly" rows="5" placeholder="限300字（若有特殊需求，请联系商城在线客服)" maxlength="300"></textarea>
                    <p>商品总金额：¥{{allPrice}}</p>
                    <p>运费：0.00</p>
                    <p>优惠：¥0.00</p>
                    <p>赠送积分：{{allPrice}}</p>
                   
                </div>
            </div>
           
            <!-- <span>{{list.id}}</span>
            <span>{{list.homeName}}</span> -->

            <div class="pay-shop-footer">
                <p class="price">订单总金额：<span>¥{{allPrice}}</span></p>
                <a class="order" @click="addOrder(payGoods)">提交订单</a>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast,MessageBox } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
import PayHeader from "../../common/header";
import axios from "axios";
export default {
  name: "pay",
  data() {
    return {
      carts:this.$store.state.carts,
      listIndex: 0,
      invoiceIndex: 0,
      pay: [],
      payGoods : this.$store.state.payGoods,
      lists: [
        {
          id: "1",
          name: "在线支付"
        },
        {
          id: "2",
          name: "花呗分期"
        },
        {
          id: "3",
          name: "货到付款"
        }
      ],
      text: "",
      ly: ""
    };
  },
  computed : {
      allPrice(){
          var prices = 0;
          for (var i = 0 ;i < this.payGoods.length;i ++) {
              prices += parseInt(this.payGoods[i].price*this.payGoods[i].value);
          }
          return prices;
      }
  },
  components: {
    PayHeader
  },
  //    computed: {
  //         address() {
  //         return this.$store.state.address;
  //         },
  //         ...mapGetters(
  //             ["this.$store.state.address"],
  //         )
  //     },
  methods: {
      ...mapMutations['shanchu'],
    btn(id, index) {
      this.listIndex = index;
    },
    // invoiceClick(index) {
    //   this.invoiceIndex = index;
    // },
    addOrder(payList,index) {
      if (this.text == '') {
        Toast({
          message: "请输入发票抬头",
          duration: 1000
        });
      } else {
        for (var i = 0 ;i < payList.length;i ++) {
           var data = {
                id : payList[i].id,
                name: payList[i].name,
                price: payList[i].price,
                text: this.text,
                ly: this.ly,
                img: payList[i].img,
                // listname: this.lists[index].name,
                value: payList[i].value
            }
            this.$store.dispatch('setOrders',data);
        }
        var _this = this;
        var time = setInterval(function() {
          _this.$router.push({
            path: "success"
          });
          clearInterval(time);
        }, 1000);
      }
    }
  },
  created() {
      console.log(this.carts.length);
    //   var len = this.carts.length;
       var delArr = [];
       this.carts.forEach((ele,index) => {
           if (ele.danx1uan) {
            this.payGoods.push(ele);
            delArr.push(index);
           }
       })
       for (var i = 0 ;i < delArr.length;i ++) {
            this.carts.splice(0,1)
            localStorage.setItem("carts",JSON.stringify(this.carts));
       }
        
        // console.log(this.payGoods)
        // var _this = this;
        // var id = this.$route.query.id;
        // var value = this.$route.query.value;
        // axios.get("/static/ceshi.json").then(function(res) {
        // for (var i = 0; i < res.data.data.set.length; i++) {
        //     if (res.data.data.set[i].id == id) {
        //     _this.pay.push(res.data.data.set[i]);
        //     }
        // }
        // });
        // axios.get("/static/ceshi.json").then(function(res) {
        // for (var i = 0; i < res.data.data.home.length; i++) {
        //     if (res.data.data.home[i].id == id) {
        //     _this.pay.push(res.data.data.home[i]);
        //     }
        // }
        // });
        // console.log(this.pay);
    
  }
};
</script>


<style lang="stylus" scoped>
.active {
    border: 1px solid #444;
    color: red;
}

.pay-address {
    width: 100%;
    height: 4.3rem;
    background: url('https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png') #fff left bottom repeat-x; // shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png) #fff left bottom repeat-x;
    background-size: 1.6rem;
    padding-top: 1.45rem;
    display: block;

    .address-box {
        width: 87%;
        margin: auto;
        font-size: 0.4rem;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;

        .phone {
            float: right;
        }
    }

    .address-details {
        width: 87%;
        margin: auto;
        color: #666;
        font-size: 0.38rem;
    }
}
.pay-goods-list {
    .title {
         width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
    }
    ul {
        li {
            display : flex;
            margin-bottom : 0.4rem;
            background : #fff;
            img {
                width: 2.5rem;
                height:2.5rem;
            }
            .goods-info {
                width:100%;
                .num {
                    float:right;
                    font-size: 0.4rem;
                    margin-top: 0.65rem;
                    height: 0.6rem;
                }
                .name {
                    
                    font-size:0.5rem;
                    color : black;
                }
                .price {
                    font-size : 0.5rem;
                    color : red;
                    margin-top : 0.3rem;
                }
            }
        }
    }
}
.pay-shop {
    width: 100%;
    margin-bottom: 1.5rem;

    .pay-shop-invoice {
        width: 100%;
        height: 4.3rem;
        background: #fff;
        margin-bottom: 10px;
        margin-top: 10px;

        .pay-invoice-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-invoice-2 {
            width: 100%;
            height: 4rem;

            .pay-invoice-2-1 {
                width: 100%;
                height: 30%;

                div {
                    display: block;
                    width: 2.88rem;
                    height: 0.9rem;
                    line-height: 0.9rem;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    margin: 0.1rem 0.3rem;
                    float: left;
                    text-align: center;
                }
            }

            .pay-invoice-2-2 {
                width: 92%;
                height: 70%;
                margin: auto;
                font-size 0.35rem

                p {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                input {
                    width: 100%;
                    height: 1.18rem;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    padding-left: 0.2rem;
                }
            }
        }
    }

    .pay-shop-list {
        width: 100%;
        height: 4.5rem;
        margin-top: 0.3rem;
        background: #fff;

        .pay-shop-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-shop-2 {
            float: left;

            img {
                width: 2.5rem;
                margin: 0.2rem;
            }
        }

        .pay-shop-2-box {
            width: 70%;
            display: flex;
            flex-direction: column;

            .name {
                font-size: 0.4rem;
                margin-top: 0.3rem;
                height: 0.6rem;

                p {
                    float: right;
                    margin-right: 0.5rem;
                }
            }

            .price {
                color: red;
                font-size: 0.35rem;
                font-weight: 500;
                height: 0.6rem;
            }
        }
    }

    .pay-shop-liuyan {
        width: 100%;
        height: 6.5rem;
        background: #fff;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;

        .pay-liuyan-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-liuyan-2 {
            width: 90%;
            margin: auto;

            textarea {
                width: 100%;
                height: 2rem;
                border: 1px solid #d1d1d1;
                border-radius: 3px;
                padding: 0.15rem 0.2rem;
                margin: 0.3rem auto;
                display: block;
            }

            p {
                color: #888;
                height: 0.48rem;
                font-size: 0.34rem;
            }
        }
    }

    .pay-shop-fs {
        width: 100%;
        height: 5rem;
        background: #ffffff;

        .pay-fs-1 {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.4rem;
            padding-left: 0.7rem;
        }

        .pay-fs-2 {
            width: 100%;
            height: 3.5rem;
            background: #ffffff;

            .pay-fs-2-1 {
                width: 100%;
                height: 40%;
                font-size: 0.35rem;
                // background yellow
                display: flex;
                justify-content: center;
                align-items: center;

                div {
                    display: block;
                    width: 2.88rem;
                    height: 0.9rem;
                    line-height: 0.9rem;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    margin: 0.1rem;
                    float: left;
                    text-align: center;
                }
            }

            .pay-fs-2-2 {
                width: 100%;
                height: 60%;
                font-size: 0.35rem;

                // background red
                div {
                    width: 90%;
                    height: 1.3rem;
                    border-radius: 3px;
                    border: 1px solid #d1d1d1;
                    margin: auto;
                    padding: 0.3rem;
                }

                .pay-fs-2-2-2 {
                    height: 1.56rem;
                }
            }
        }
    }
}

.pay-shop-footer {
    width: 100%;
    height: 1.5rem;
    border-top: 1px solid #eaeaea;
    background: white;
    position: fixed;
    bottom: 0;

    .price {
        float: left;
        line-height: 1.5rem;
        font-size: 0.43rem;
        color: #666;
        padding-left: 0.3rem;

        span {
            color: red;
        }
    }

    .order {
        width: 3.3rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.35rem;
        margin-top: 0.3rem;
        margin-right: 0.3rem;
        border-radius: 30px;
        text-align: center;
        color: #fff;
        background: #f81200;
        float: right;
    }
}
</style>





