
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

import './Tab3.css';

const Tab3: React.FC = () => {

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const slideChange = (s: SwiperType) => {
    setDisablePrev(s.isBeginning);
    setDisableNext(s.isEnd);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Swiper
          className="slajdy"
          initialSlide={0}
          speed={300}
          onSwiper={setSwiper}
          onSlideChange={slideChange}
        >
          <SwiperSlide><img src="/img/forest.png" alt="Las" loading="lazy" /></SwiperSlide>
          <SwiperSlide><img src="/img/river.png" alt="Rzeka" loading="lazy" /></SwiperSlide>
          <SwiperSlide><img src="/img/city.png" alt="Miasto" loading="lazy" /></SwiperSlide>
        </Swiper>

        <IonGrid>
          <IonRow>

            <IonCol>
              <IonButton
                expand="block"
                disabled={disablePrev}
                onClick={() => swiper?.slidePrev()}
              >
                PREV
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                disabled={disableNext}
                onClick={() => swiper?.slideNext()}
              >
                NEXT
              </IonButton>
            </IonCol>

          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
