import React, { useEffect, useState } from "react";
import moment from "moment";
import { RefresherEventDetail } from "@ionic/core";
import {
  chevronDownCircleOutline,
  ellipsisHorizontalOutline,
} from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonFooter,
  IonLoading,
  IonToast,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  getAllCountriesCases,
  getCasesByCountry,
  getWorldCases,
  SortType,
} from "../../api/cases";
import { HOME_URL } from "../../routes/URLMAP";
import "./CasesInfo.scss";
import { CountrySelectModal } from "./CountrySelectModal";

interface CovidInfoProps {}

// export interface StateStats {
//   location: string;
//   confirmed: number;
//   deaths: number;
//   recovered: number;
// }

export interface CountryStats extends WorldStats {
  location: string;
  flag?: string;
}

interface WorldStats {
  cases: number;
  recovered: number;
  deaths: number;
}

export const CovidInfo: React.FC<CovidInfoProps> = ({}) => {
  // currentCountry is null: worldwide; else: specfic country
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
  const [worldStats, setWorldStats] = useState<WorldStats>();
  const [updateTime, setUpdateTime] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isStatelessNation, setIsStatelessNation] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [showSelectModal, setShowSelectModal] = useState(false);

  const [sort, setSort] = useState<SortType>("cases");
  const sortOptions: SortType[] = [
    "cases",
    "todayCases",
    "deaths",
    "recovered",
    "active",
  ];

  const retreivedStateData = async () => {
    setCountryStats([]);
    setIsStatelessNation(false);
    try {
      const { totalStats, casesInfo, updatedAt } = await getCasesByCountry(
        currentCountry
      );
      const { totalConfirmed, totalRecovered, totalDeaths } = totalStats;
      setWorldStats({
        cases: totalConfirmed,
        recovered: totalRecovered,
        deaths: totalDeaths,
      });
      setCountryStats(casesInfo);
      setUpdateTime(updatedAt);

      if (!casesInfo[0].location) {
        setIsStatelessNation(true);
        setShowToast(true);
      }
    } catch (error) {
      setErr(error);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (currentCountry) {
        await retreivedStateData();
      } else {
        await retreivedWorldStats();
        await retreivedCountryData();
      }
      setIsLoading(false);
    })();
  }, [currentCountry, sort]);

  const retreivedCountryData = async () => {
    setCountryStats([]);
    setIsStatelessNation(false);
    try {
      const { casesInfo, updated } = await getAllCountriesCases(sort);
      setCountryStats(casesInfo);
      setUpdateTime(updated);
    } catch (error) {
      setErr(error);
    }
  };

  const retreivedWorldStats = async () => {
    try {
      const res = await getWorldCases();
      const { cases, recovered, deaths } = res.data;
      setWorldStats({ cases, recovered, deaths });
    } catch (error) {
      setErr(error);
    }
  };

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    setIsLoading(true);

    // fetching
    if (currentCountry) {
      await retreivedStateData();
    } else {
      await retreivedWorldStats();
      await retreivedCountryData();
    }

    setIsLoading(false);
    !isLoading && event.detail.complete();
  };

  const handleSort = (sortVal: SortType) => {
    setSort(sortVal);
  };

  const renderDataSection = () => {
    return countryStats.map((data: CountryStats) => (
      <IonRow>
        <IonCol className="covid19-info-main__data-section" size="4">
          {data.flag && (
            <img
              className="covid19-info-main__data-section-flag"
              src={data.flag}
              alt="flag"
            />
          )}
          <p className="covid19-info-main__data-section-item">
            {data.location}
          </p>
        </IonCol>
        <IonCol className="covid19-info-main__data-section" size="3">
          <p className="covid19-info-main__data-section-item">
            {data.cases.toLocaleString()}
          </p>
        </IonCol>
        <IonCol className="covid19-info-main__data-section" size="3">
          <p className="covid19-info-main__data-section-item">
            {data.recovered.toLocaleString()}
          </p>
        </IonCol>
        <IonCol className="covid19-info-main__data-section" size="2">
          <p className="covid19-info-main__data-section-item">
            {data.deaths.toLocaleString()}
          </p>
        </IonCol>
      </IonRow>
    ));
  };

  return (
    <IonPage className="covid19-info-section">
      {isLoading && (
        <IonProgressBar
          type="indeterminate"
          color="success"
          reversed={true}
        ></IonProgressBar>
      )}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <Link className="covid19-info-section-link" to={HOME_URL}>
              <IonButton>Back</IonButton>
            </Link>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">COVID-19 INFO</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Current country is stateless nation."
          duration={2000}
        />

        <div className="covid19-info-main">
          <div className="covid19-info-main__button-group">
            <IonButton
              color={currentCountry ? "light" : "danger"}
              onClick={() => setCurrentCountry("")}
            >
              Worldwide
            </IonButton>
            <IonButton
              color={currentCountry ? "primary" : "light"}
              onClick={() => setShowSelectModal(true)}
            >
              Countries
            </IonButton>
            {showSelectModal && (
              <CountrySelectModal
                setShowSelectModal={setShowSelectModal}
                setCurrentCountry={setCurrentCountry}
              />
            )}
          </div>
          {!currentCountry && (
            <IonItem className="covid19-info-main__sort" lines="none">
              <IonLabel>Sort by</IonLabel>
              <IonSelect
                value={sort}
                interface="action-sheet"
                onIonChange={(e) => handleSort(e.detail.value)}
              >
                {sortOptions.map((option) => (
                  <IonSelectOption value={option}>
                    {option.toUpperCase()}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          )}
          <div className="covid19-info-main__stats">
            <div className="covid19-info-main__stats__block">
              <p className="covid19-info-main__stats__block__title">
                Confirmed
              </p>
              <p className="covid19-info-main__stats__block__number">
                {!isLoading && worldStats?.cases.toLocaleString()}
              </p>
            </div>
            <div className="covid19-info-main__stats__block">
              <p className="covid19-info-main__stats__block__title">
                Recovered
              </p>
              <p className="covid19-info-main__stats__block__number">
                {!isLoading && worldStats?.recovered.toLocaleString()}
              </p>
            </div>
            <div className="covid19-info-main__stats__block">
              <p className="covid19-info-main__stats__block__title">Deaths</p>
              <p className="covid19-info-main__stats__block__number">
                {!isLoading && worldStats?.deaths.toLocaleString()}
              </p>
            </div>
          </div>
          <IonGrid className="covid19-info-main__table">
            <IonRow>
              <IonCol size="4">
                <p className="covid19-info-main__table-title">Countries</p>
              </IonCol>
              <IonCol size="3">
                <p className="covid19-info-main__table-title">Cases</p>
              </IonCol>
              <IonCol size="3">
                <p className="covid19-info-main__table-title">Recovered</p>
              </IonCol>
              <IonCol size="2">
                <p className="covid19-info-main__table-title">Deaths</p>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonGrid className="covid19-info-main__data">
            {!isLoading && !isStatelessNation && renderDataSection()}
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter className="covid19-info-section__footer">
        {updateTime && `Last updated: ${updateTime}`}
        <br />
        Source: <i>Johns Hopkins University, Worldmeters</i>
      </IonFooter>
    </IonPage>
  );
};
