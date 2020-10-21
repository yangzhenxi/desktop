export default {
    state: {
        AllData: {},
        isCluster: Boolean
    },
    mutaions: {
        SET_ISCLUSTER: (state, isCluster) => {
            state.isCluster = isCluster
        },
        SET_ALLDATA: (state, AllData) => {
            state.AllData = AllData
        }
    }
}
