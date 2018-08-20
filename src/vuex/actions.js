const actions={
    //购物车
    setCart({commit},data){
        commit('SET_CARTS',data)
    },
    
    //文章收藏
    setArticle({commit},data){
        commit('SET_ARTICLE',data)
    },
    //商品收藏
    setCollections({commit},data){
        commit('SET_COLLECTIONS',data)
    },
    //地址
    setAddress({commit},data){
        commit('SET_ADDRESS',data)
    },
    //订单
    setOrders({commit},data){
        commit('SET_ORDERS',data)
    },
    // 支付商品
    setPayGoods({commit},data) {
        commit('SET_PAYGOODS',data)
    }
}

export default actions