import Vue from "vue";
import Router from "vue-router";


const Recommend = (resolve) => {
    import('components/recommend/recommend').then((recommend) => {
        resolve(recommend)
    })
}

const Rank = (resolve) => {
    import('components/rank/rank').then((rank) => {
        resolve(rank)
    })
}

const Search = (resolve) => {
    import('components/singer/singer').then((Search) => {
        resolve(Search)
    })
}

const Singer = (resolve) => {
    import('components/search/search').then((Singer) => {
        resolve(Singer)
    })
}

const SingerDetail = (resolve) => {
    import('components/singer-detail/singer-detail').then((SingerDetail) => {
        resolve(SingerDetail)
    })
}

const Disc = (resolve) => {
    import('components/disc/disc').then((Disc) => {
        resolve(Disc)
    })
}

const TopList = (resolve) => {
    import('components/top-list/top-list').then((TopList) => {
        resolve(TopList)
    })
}

const UserCenter = (resolve) => {
    import('components/user-center/user-center').then((UserCenter) => {
        resolve(UserCenter)
    })
}

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/rank',
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: TopList
                }
            ]
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: Disc
                }
            ]
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: ':userId',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':userId',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/user',
            component: UserCenter
        }
    ]
})
