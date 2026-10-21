const permissionInfo = document.querySelector('#permission');

function updatePermissionInfo() {
    permissionInfo.textContent = 'Notification' in window ? Notification.permission : 'brak obsługi w tej przeglądarce';
}
updatePermissionInfo();

document.querySelector('#enable').addEventListener('click', async () => {
    const permission = await Notification.requestPermission();
    console.log('Uprawnienie:', permission);
    updatePermissionInfo();
});

function showLocalNotification() {
    if (Notification.permission !== 'granted') {
        alert('Najpierw włącz powiadomienia.');
        return;
    }
    try {
        const notification = new Notification('Title', {
            body: 'Message body',
            icon: 'android.png',
        });
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    } catch (err) {
        // np. Chrome na Androidzie: "Illegal constructor" - tam działa tylko powiadomienie z service workera
        alert('Ta przeglądarka nie obsługuje new Notification(): ' + err.message);
    }
}
document.querySelector('#local').addEventListener('click', showLocalNotification);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .catch((err) => console.error('Błąd rejestracji service workera:', err));
}
async function showSwNotification() {
    if (Notification.permission !== 'granted') {
        alert('Najpierw włącz powiadomienia.');
        return;
    }
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification('Powiadomienie z service workera', {
        body: 'Kliknij, aby otworzyć stronę uczelni.',
        icon: 'android.png',
        data: { url: 'https://www.uws.edu.pl' },
    });
}

document.querySelector('#sw').addEventListener('click', showSwNotification);

const VAPID_PUBLIC_KEY = 'BJLXoLb7Ltk-m8W2To2Len4HQh8Ooj-DZWfFQTh-op7u_xjBNV9FYjRHp-zCx1UafznSTJUR6F3Rp3M7bprzd9E';
const subscriptionField = document.querySelector('#subscription');
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
async function subscribePush() {
    if (!('PushManager' in window)) {
        alert('Ta przeglądarka nie obsługuje Web Push (na iPhonie: najpierw dodaj aplikację do ekranu początkowego).');
        return;
    }
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
        try {
            // Jeśli użytkownik jeszcze nie wyraził zgody, przeglądarka zapyta o nią teraz.
            subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
        } catch (err) {
            alert('Nie udało się zasubskrybować: ' + err.message);
            return;
        } finally {
            updatePermissionInfo();
        }
    }
    subscriptionField.value = JSON.stringify(subscription, null, 2);
}
async function unsubscribePush() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
        await subscription.unsubscribe();
    }
    subscriptionField.value = '';
}

document.querySelector('#subscribe').addEventListener('click', subscribePush);
document.querySelector('#unsubscribe').addEventListener('click', unsubscribePush);
document.querySelector('#copy').addEventListener('click', async () => {
    
try {
    await navigator.clipboard.writeText(subscriptionField.value);
        alert('Skopiowano subskrypcję do schowka.');
    } catch (err) {
        // brak dostępu do schowka - zaznaczamy tekst, żeby skopiować go ręcznie (Ctrl+C)
        subscriptionField.select();
        alert('Nie udało się skopiować automatycznie - tekst jest zaznaczony, skopiuj go ręcznie.');
    }
});


document.querySelector('#notification-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
    const icon = document.querySelector('#icon').value;
    const status = document.querySelector('#form-status');

    if (!title) {
        status.textContent = 'Tytuł jest wymagany.';
        return;
    }

    if (Notification.permission !== 'granted') {
        status.textContent = 'Najpierw włącz powiadomienia.';
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;

        await registration.showNotification(title, {
            body: body,
            icon: icon,
            data: { url: './' }
        });

        status.textContent = 'Powiadomienie wyświetlone.';
    } catch (error) {
        status.textContent = 'Błąd: ' + error.message;
    }
});
