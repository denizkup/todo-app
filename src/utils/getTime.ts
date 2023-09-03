import dayjs from "dayjs";

export default function getCurrentTime(){
    let today = dayjs();
    return today.format("YYYY-MM-DD HH:mm:ss").toString()
}
