import HOST_CONFIG from 'hostconfig';
import { postJSON,} from '../../utils/ajax';

let host = HOST_CONFIG.nethost;
export default {

//获取数据报表url
getDataReport(id) {
    const url = `${host}operation-activity/dataReport/getDataReport?dataReportName=${id}`;
    return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },




};
