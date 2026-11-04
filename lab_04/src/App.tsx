import { IonApp, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonRow, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

import Kalkulator from './components/Kalkulator';

setupIonicReact();

const App: React.FC = () => {
  const wzrostRef = useRef<HTMLIonInputElement>(null);
  const wagaRef = useRef<HTMLIonInputElement>(null);
  const [obliczoneBMI, setObliczoneBMI] = useState<number>();

  const oblicz = () => {
    const wzrost = wzrostRef.current!.value;
    const waga = wagaRef.current!.value;
    if (!wzrost || !waga) {
      return;
    }
    const wzrostM = +wzrost / 100;
    const bmi = +waga / (wzrostM * wzrostM);
    setObliczoneBMI(bmi);
  };
  const resetuj = () => {
    wzrostRef.current!.value = '';
    wagaRef.current!.value = '';
    setObliczoneBMI(undefined);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Kalkulator BMI
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput label="Wzrost (cm)" labelPlacement="floating" type="number" ref={wzrostRef}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Waga (kg)" labelPlacement="floating" type="number" ref={wagaRef}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-text-left'>
              <IonButton onClick={oblicz}>
                <IonIcon slot="start" icon={calculatorOutline} /> Oblicz
              </IonButton>
            </IonCol>
            <IonCol className='ion-text-right'>
              <IonButton onClick={resetuj}>
                <IonIcon slot="start" icon={refreshOutline} /> Resetuj
              </IonButton>
            </IonCol>
          </IonRow>
           {obliczoneBMI && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                      <h2>BMI: {obliczoneBMI.toFixed(2)}</h2>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            <Kalkulator />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonApp>
  )
};

export default App;