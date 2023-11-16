import dayjs from "dayjs";

export function getCurrentTime(){
    let today = dayjs();
    return today.format("YYYY-MM-DD HH:mm:ss").toString();
}

export function getDiffTime(diff_day){
    let diff_time = dayjs().subtract(diff_day, 'day')
    return diff_time.format("YYYY-MM-DD HH:mm:ss").toString();

}
