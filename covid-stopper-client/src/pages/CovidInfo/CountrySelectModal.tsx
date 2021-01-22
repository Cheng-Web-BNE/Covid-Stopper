import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { countryList } from "./utils/countryList";

interface CountrySelectModalProps {
  setShowSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCountry: React.Dispatch<React.SetStateAction<string>>;
}

export const CountrySelectModal: React.FC<CountrySelectModalProps> = ({
  setShowSelectModal,
  setCurrentCountry,
}) => {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const formedlist = countryList.reduce((acc: any, curr: any) => {
      if (!acc[curr.charAt(0)]) {
        acc[curr.charAt(0)] = [curr];
      } else {
        acc[curr.charAt(0)].push(curr);
      }
      return acc;
    }, {});
    setOptions(formedlist);
    setIsLoading(false);
  }, []);

  const handleSelect = (country: string) => {
    setCurrentCountry(country);
    setShowSelectModal(false);
  };

  const renderSearchResults = () => {
    const results = countryList.filter(
      (country) => country.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
    return results.map((result) => (
      <IonItem button onClick={() => handleSelect(result)}>
        <IonLabel>{result}</IonLabel>
      </IonItem>
    ));
  };

  const renderOptions = () =>
    Object.entries(options).map((option: any) => {
      const letter = option[0];
      const countryArr = option[1];
      return (
        <>
          <IonItemDivider>
            <IonLabel>{letter}</IonLabel>
          </IonItemDivider>
          {countryArr.map((country: string, index: number) => (
            <IonItem
              button
              onClick={() => handleSelect(country)}
              lines={index === countryArr.length - 1 ? "none" : undefined}
            >
              <IonLabel>{country}</IonLabel>
            </IonItem>
          ))}
        </>
      );
    });

  return (
    <IonModal isOpen={true} cssClass="my-custom-class">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Countries</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowSelectModal(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
        <IonFooter>
          {!isLoading && (
            <IonItemGroup>
              {searchText ? renderSearchResults() : renderOptions()}
            </IonItemGroup>
          )}
        </IonFooter>
      </IonContent>
    </IonModal>
  );
};
