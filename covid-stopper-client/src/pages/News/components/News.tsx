import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonChip,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { Link } from "react-router-dom";
import { HOME_URL } from "../../../routes/URLMAP";
import {
  chevronDownCircleOutline,
  chevronForwardOutline,
  ellipsisHorizontalOutline,
  timeOutline,
} from "ionicons/icons";
import "./News.scss";
import { fetchWHOTwitter } from "../../../api/twitter";
import { Plugins } from "@capacitor/core";
import moment from "moment";
import { fetchNews } from "../../../api/news";
import { compareTime, filteringRawNews } from "./utils/helpers";
const { Browser } = Plugins;

export interface NewsItem {
  time: string;
  content: string;
  userName: string;
  userAvatar: string;
  url: string;
}

export const News: React.FC = () => {
  const [whoTwit, setWhoTwit] = useState<NewsItem[]>([]);
  const [newsArr, setNewsArr] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // open inAppBrowser
  const openPage = async (url: string) => {
    await Browser.open({ url });
  };

  const retreivedAllData = async () => {
    // async 1st
    try {
      const twitResponse = await fetchWHOTwitter();
      setWhoTwit(twitResponse.data);
    } catch (error) {
      console.error(error);
    }

    // async 2nd
    try {
      const newsResponse = await fetchNews();
      const rawData = newsResponse.data.articles;
      const data = filteringRawNews(rawData);
      setNewsArr(data);
    } catch (error) {
      console.error(error);
    }

    // finished
    setIsLoading(false);
  };

  useEffect(() => {
    retreivedAllData();
  }, []);

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    setIsLoading(true);
    retreivedAllData();
    !isLoading && event.detail.complete();
  };

  const renderNewsItem = (feed: NewsItem) => (
    <IonItem
      className="news-section__item"
      button
      onClick={() => openPage(feed.url)}
    >
      <IonAvatar slot="start">
        <img src={feed.userAvatar} alt="who-icon" />
      </IonAvatar>
      <IonLabel>
        <IonChip className="news-section__item-chip">
          <IonLabel className="news-section__item-chip-label" color="medium">
            {feed.userName}
          </IonLabel>
        </IonChip>
        <h2
          className="news-section__item-title"
          dangerouslySetInnerHTML={{ __html: feed.content }}
        />
        <div className="news-section__item-timebox">
          <IonIcon icon={timeOutline} />
          <p>{moment(feed.time).local().format("MMM DD YYYY HH:mm:ss")}</p>
        </div>
      </IonLabel>
      <IonIcon icon={chevronForwardOutline} slot="end" />
    </IonItem>
  );

  const renderSkeleton = () => {
    const itemNum = Math.floor(window.innerHeight / 84) - 1;
    const skeletonItem = () => (
      <IonItem>
        <IonAvatar slot="start">
          <IonSkeletonText animated />
        </IonAvatar>
        <IonLabel>
          <h3>
            <IonSkeletonText animated style={{ width: "80%" }} />
          </h3>
          <p>
            <IonSkeletonText animated style={{ width: "60%" }} />
          </p>
          <p>
            <IonSkeletonText animated style={{ width: "70%" }} />
          </p>
          <p>
            <IonSkeletonText animated style={{ width: "30%" }} />
          </p>
        </IonLabel>
      </IonItem>
    );

    return (
      <IonList>
        {Array(itemNum)
          .fill(1)
          .map((i) => skeletonItem())}
      </IonList>
    );
  };

  return (
    <IonPage className="news-section">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <Link className="news-section-link" to={HOME_URL}>
              <IonButton>Back</IonButton>
            </Link>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        {isLoading ? (
          renderSkeleton()
        ) : (
          <>
            <IonList>
              {newsArr
                .concat(whoTwit) // combine WHO twitter with multi source news
                .sort(compareTime) // sort by published time
                .map((feed) => renderNewsItem(feed))}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
