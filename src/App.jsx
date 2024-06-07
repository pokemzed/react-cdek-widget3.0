import './App.css'
import {useEffect, useRef} from "react";

function CdekWidget() {
  // 1. Создаем ref
  const widget = useRef()

  useEffect(() => {
    // 2. Помещаем конструктор в current. Настраиваем конфигурацию
    widget.current = new window.CDEKWidget({

      // Адрес, от которого будет производиться отправка груза. Может содержать только город или адрес целиком
      // from: 'Новосибирск', – пример значения string
      from: {
        // Код страны населенного пункта отправителя в формате ISO_3166-1_alpha-2
        country_code: 'RU',
        // Название населенного пункта отправителя
        city: 'Новосибирск',
        // Почтовый индекс населенного пункта отправителя
        postal_code: 630009,
        // Код населенного пункта CDEK
        code: 270,
        // Адрес откуда произойдет отправка курьером в населеном пункте
        address: 'ул. Большевистская, д. 101',
      },

      // ID элемента, куда будет помещен виджет. В случае отсутствия - данный элемент будет создан на странице
      // root: "cdek-map",

      // ID элемента, куда будет помещен виджет. В случае отсутствия - данный элемент будет создан на странице
      // root: 'cdek-map',

      // Ключ доступа к API Яндекс.Карт
      apiKey: 'Твой ApiKey',

      // Управление кнопкой «Выбрать» в описании ПВЗ. Если выставлено в false – кнопка не будет отображаться,
      // что подходит для инфовиджета в разделе «Доставка». Если true – кнопка показывается с возможностью
      // подписаться на выбор ПВЗ с помощью события onChoose
      canChoose: true,

      // Путь к php файлу для расчетов виджета. Берем отсюда https://github.com/cdek-it/widget/blob/main/dist/service.php?plain=1
      // Настройка тут: https://github.com/cdek-it/widget/wiki/%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-3.0
      servicePath: 'Твой servicePath',

      // Управление сокрытием доступных пользователю фильтров
      hideFilters: {
        // Управление скрытием фильтра "Оплата картой"
        have_cashless: false,
        // Управление скрытием фильтра "Оплата наличными"
        have_cash: false,
        // Управление скрытием фильтра "Есть примерочная"
        is_dressing_room: false,
        // Управление скрытием фильтра "Вид ПВЗ"
        type: false,
      },

      // Включение вывода отладочной информации
      debug: true,

      // Переключение виджета в режим "отправитель"
      // sender: false,

      // Строка адреса или массив [долгота, широта] точки, которая будет отображена на карте при открытии виджета
      defaultLocation: 'Москва, ш. Старомарьинское, 6, корп. 1',

      // Строка языка, который будет использоваться в виджете
      lang: 'rus',

      // Валюта, в которой будет произведен расчет доставки
      currency: 'RUB',

      // Вид ограничения границ отображения пвз, может принимать значения 'country', 'locality', 'province'
      // fixBounds: null,

      // Список тарифов, разрешенных для вычисления стоимости и отображения пользователю
      tariffs: {
          // Список тарифов "до ПВЗ", разрешенных для вычисления стоимости и отображения пользователю
          office: [234, 136, 138],
          // Список тарифов "до двери", разрешенных для вычисления стоимости и отображения пользователю
          door: [233, 137, 139],
          // Список тарифов "до постамата", разрешенных для вычисления стоимости и отображения пользователю
          pickup: [235, 138, 137],
      },

      // Список видом доставки, которые должны быть не доступны покупателю
      hideDeliveryOptions: {
        // Покупатель не должен иметь возможность выбрать доставку до двери
        office: false,
        // Покупатель не должен иметь возможность выбрать доставку до ПВЗ
        door: true,
      },

      // Открытие виджета в модульном окне (popup)
      popup: true,

      // Информация о пересылаемых грузах в формате iParcell
      goods: [
        {
          width: 10,
          height: 10,
          length: 10,
          weight: 10,
        },
      ],

      // Функция, вызываемая после окончания загрузки виджета
      onReady() {
        console.log('Widget is ready')
      },

      // Функция, вызываемая после окончания расчета стоимости доставки
      // Событие передает в функцию-обработчик два параметра: объект с тарифами и объект адреса.
      onCalculate(rates, address) {
        console.log(rates, address)
      },

      // Функция, вызываемая после выбора клиентом тарифа и точки доставки.
      // Событие передает в функцию-обработчик три параметра: выбранный режим доставки, выбранный тариф и выбранный адрес.
      onChoose(delivery, rate, address) {
        console.log(delivery, rate, address)
      }
    });
  }, []);

  return (
    <div className={'widget-container'}>
      {/*3. Ставим открытие popup-окна на клик по кнопке*/}
      <button onClick={() => widget.current.open()}>Open widget popup</button>
    </div>
  )
}

export default CdekWidget
