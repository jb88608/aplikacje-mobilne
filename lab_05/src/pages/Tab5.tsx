
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/react';

import { useState } from 'react';

const Tab5: React.FC = () => {

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [gamma, setGamma] = useState(0);

  const [wynik, setWynik] = useState('');

  const obliczPole = () => {

    if (
      a <= 0 || b <= 0 || c <= 0 || d <= 0 ||
      alpha <= 0 || alpha >= 360 ||
      gamma <= 0 || gamma >= 360
    ) {
      setWynik('Podaj poprawne wartości!');
      return;
    }

    const s = (a + b + c + d) / 2;

    const wyrazenie =
      (s - a) * (s - b) * (s - c) * (s - d) -
      a * b * c * d *
      Math.pow(Math.cos((alpha + gamma) * Math.PI / 360), 2);

    if (wyrazenie <= 0) {
      setWynik('Taki czworokąt nie istnieje!');
      return;
    }

    const pole = Math.sqrt(wyrazenie);

    setWynik(`Pole czworokąta wynosi: ${pole.toFixed(2)}`);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Pole czworokąta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Oblicz pole czworokąta</h2>

        <IonItem>
          <IonLabel position="stacked">Bok a</IonLabel>
          <IonInput type="number" value={a}
            onIonInput={(e) => setA(parseFloat(e.detail.value!) || 0)}
            placeholder="Podaj bok a" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Bok b</IonLabel>
          <IonInput type="number" value={b}
            onIonInput={(e) => setB(parseFloat(e.detail.value!) || 0)}
            placeholder="Podaj bok b" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Bok c</IonLabel>
          <IonInput type="number" value={c}
            onIonInput={(e) => setC(parseFloat(e.detail.value!) || 0)}
            placeholder="Podaj bok c" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Bok d</IonLabel>
          <IonInput type="number" value={d}
            onIonInput={(e) => setD(parseFloat(e.detail.value!) || 0)}
            placeholder="Podaj bok d" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Kąt alfa (°)</IonLabel>
          <IonInput type="number" value={alpha}
            onIonInput={(e) => setAlpha(parseFloat(e.detail.value!) || 0)}
            placeholder="Podaj kąt alfa" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Kąt gamma (°)</IonLabel>
          <IonInput type="number" value={gamma}
            onIonInput={(e) => setGamma(parseFloat(e.detail.value!) || 0)}
            placeholder="Podaj kąt gamma" />
        </IonItem>

        <IonButton expand="block" onClick={obliczPole}>
          OBLICZ POLE
        </IonButton>

        <h2>{wynik}</h2>

      </IonContent>
    </IonPage>
  );
};

export default Tab5;
