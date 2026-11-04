
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonRow
} from '@ionic/react';

import { useState } from 'react';

const Kalkulator: React.FC = () => {

    const [obliczanie, setObliczanie] = useState<string>('0');

    const [poprzedniaLiczba, setPoprzedniaLiczba] = useState<number | null>(null);

    const [dzialanie, setDzialanie] = useState<string | null>(null);

    const [nowaLiczba, setNowaLiczba] = useState<boolean>(false);

    const dodanieWartosci = (wartosc: string) => {

        if (obliczanie === 'Nie można dzielić przez zero') {
            setObliczanie(wartosc === '.' ? '0.' : wartosc);
            setNowaLiczba(false);
            return;
        }

        if (nowaLiczba) {
            setObliczanie(wartosc === '.' ? '0.' : wartosc);
            setNowaLiczba(false);
            return;
        }

        if (wartosc === '.') {
            if (obliczanie.includes('.')) {
                return;
            }

            setObliczanie(obliczanie + '.');
            return;
        }

        if (obliczanie === '0' && wartosc !== '.') {
            setObliczanie(wartosc);
        } else {
            setObliczanie(obliczanie + wartosc);
        }
    };

    const wybierzDzialanie = (operator: string) => {

        setPoprzedniaLiczba(parseFloat(obliczanie));
        setDzialanie(operator);
        setNowaLiczba(true);
    };

    const resetuj = () => {
        setObliczanie('0');
        setPoprzedniaLiczba(null);
        setDzialanie(null);
        setNowaLiczba(false);
    };

    const oblicz = () => {

        if (poprzedniaLiczba === null || dzialanie === null) {
            return;
        }

        const drugaLiczba = parseFloat(obliczanie);

        let wynik: number = 0;

        switch (dzialanie) {

            case '+':
                wynik = poprzedniaLiczba + drugaLiczba;
                break;

            case '-':
                wynik = poprzedniaLiczba - drugaLiczba;
                break;

            case 'x':
                wynik = poprzedniaLiczba * drugaLiczba;
                break;

            case '/':
                if (drugaLiczba === 0) {
                    setObliczanie('Nie można dzielić przez zero');
                    setPoprzedniaLiczba(null);
                    setDzialanie(null);
                    setNowaLiczba(true);
                    return;
                }

                wynik = poprzedniaLiczba / drugaLiczba;
                break;
        }

        wynik = parseFloat(wynik.toFixed(10));

        setObliczanie(String(wynik));

        setPoprzedniaLiczba(null);
        setDzialanie(null);
        setNowaLiczba(true);
    };

    return (
        <IonCard>
            <IonCardContent>

                <IonGrid>

                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardContent>
                                    <h2 style={{ textAlign: 'right', minHeight: '30px' }}>
                                        {obliczanie}
                                    </h2>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('7')}>7</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('8')}>8</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('9')}>9</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => wybierzDzialanie('/')}>÷</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('4')}>4</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('5')}>5</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('6')}>6</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => wybierzDzialanie('x')}>×</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('1')}>1</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('2')}>2</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('3')}>3</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => wybierzDzialanie('-')}>−</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" color="danger" onClick={resetuj}>C</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('0')}>0</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => dodanieWartosci('.')}>.</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={() => wybierzDzialanie('+')}>+</IonButton>
                        </IonCol>
                    </IonRow>

                    {/* Przycisk równa się */}
                    <IonRow>
                        <IonCol size="3"></IonCol>
                        <IonCol size="6">
                            <IonButton expand="block" color="success" onClick={oblicz}>
                                =
                            </IonButton>
                        </IonCol>
                        <IonCol size="3"></IonCol>
                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    );
};

export default Kalkulator;
