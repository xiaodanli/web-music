/**
 * Created by dandan on 17-8-29.
 */
import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import * as getters from "./getters";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []    //可以把改变状态之前和之后的状态全部列出来
})

