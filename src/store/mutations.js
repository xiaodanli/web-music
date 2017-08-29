/**
 * Created by dandan on 17-8-29.
 */
import * as types from './mutation-types'

 const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer
    }
}
export default mutations