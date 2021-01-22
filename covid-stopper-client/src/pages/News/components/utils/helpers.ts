import moment from "moment";
import { NewsItem } from "../News";

export const compareTime = (el1: NewsItem, el2: NewsItem) => {
    if (moment(el1.time).isBefore(el2.time)) {
        return 1;
    }
    if (!moment(el1.time).isBefore(el2.time)) {
        return -1;
    }
    return 0;
};

export const filteringRawNews = (rawData: any) =>
    rawData.reduce((acc: Array<NewsItem>, curr: any) => {
        const {
            publishedAt,
            title,
            source: { name },
            urlToImage,
            url,
        } = curr;
        const feed: NewsItem = {
            time: publishedAt,
            content: title,
            userName: name,
            userAvatar: urlToImage,
            url,
        };
        acc.push(feed);
        return acc;
    }, []);
