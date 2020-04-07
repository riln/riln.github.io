---
permalink: /
layout: main
scripts:
  - src: https://momentjs.com/downloads/moment-with-locales.min.js
---


# Отображения

Отображение `вставки` в строке.\
Отображение контейнера `<kbd>`, например, открыть историю браузера: <kbd>⌘ ⇧ H</kbd> или <kbd>Ctrl + H</kbd>.\
Открыть проводник Windows: <kbd><i class="fab fa-windows"></i> + E</kbd>.

Простой блок с функцией на Rust:
```rust
fn factorial(i: u64) -> u64 {
    (1..=i).product()
}
```

Отображение shell-команд:

{% highlight shell linenos %}
yum install openssl-devel zlib-devel
yum groupinstall "Development Tools"
git clone https://github.com/TelegramMessenger/MTProxy
cd MTProxy
make && cd objs/bin
curl -s https://core.telegram.org/getProxySecret -o proxy-secret
curl -s https://core.telegram.org/getProxyConfig -o proxy-multi.conf
head -c 16 /dev/urandom | xxd -ps
./mtproto-proxy -u nobody -p 8888 -H 443 -S <secret> --aes-pwd proxy-secret proxy-multi.conf -M 1
{% endhighlight %}

Многострочный код с нумерацией строк:

{% highlight js linenos %}
sun.movement(() => {
  const angularDisplacement = sunAngularVelocity * time + nodeLongitudes.sun;
  const x = astronomicalUnit * Math.sin(angularDisplacement);
  const y = x * Math.sin(earthAxialTilt);
  const z = astronomicalUnit * Math.cos(angularDisplacement);
  return new THREE.Vector3(x, y, z);
));
{% endhighlight %}

{% highlight scss linenos %}
@mixin browsers($browsers) {
	$selectors: (
			chrome: '&:not(*:root)',
			firefox: '@-moz-document url-prefix()',
			ie: '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)'
	);

	@each $browser in $browsers {
		#{map-get($selectors, $browser)} {
			@content;
		}
	}
}
{% endhighlight %}


# Lorem Ipsum

## Что такое Lorem Ipsum

Lorem Ipsum - просто фиктивный текст в полиграфии и вёрстке. Лорем Ипсум был стандартным манекенщиком в отрасли с 1500-х годов, когда неизвестный принтер взял набор шрифтов и скремблировал его, чтобы сделать книгу типовых образцов. Он пережил не только пять веков, но и скачок в электронном наборе текста, оставаясь практически неизменным. Он был популяризирован в 1960-х годах с выпуском листов Letraset, содержащих отрывки Lorem Ipsum, а в последнее время - с программным обеспечением для настольных издательских систем, таким как Aldus PageMaker, включая версии Lorem Ipsum.

- Маркированный список;
- Много пунктов;
- Сахар-песок;
- Лазанья;
- Котлеты;
- Таблетки для похудения.

<ol></ol>

## Почему мы используем это

Это давно установленный факт, что читатель будет отвлекаться на удобочитаемое содержимое страницы при просмотре ее макета. Смысл использования Lorem Ipsum состоит в том, что он имеет более или менее нормальное распределение букв, в отличие от использования «Контент здесь, контент здесь», что делает его похожим на читаемый английский. Многие настольные издательские пакеты и редакторы веб-страниц теперь используют Lorem Ipsum в качестве текста модели по умолчанию, а поиск по запросу «lorem ipsum» обнаружит многие [веб-сайты](https://linkedin.com/u/romanilin), которые еще находятся в зачаточном состоянии. Различные версии развивались годами, иногда случайно, иногда специально (впрыскиваемый юмор и тому подобное).

Внезапно [JavaScript-ссылка](javascript:void(alert('🍑'))) прямо в этой строке.

## Откуда это

### Не просто случайный текст

Вопреки распространенному мнению, Lorem Ipsum - это не просто случайный текст. Он имеет корни в произведении классической латинской литературы 45 года до нашей эры, что делает его более 2000 лет. Ричард МакКлинток, профессор латыни в Хэмпден-Сиднейском колледже в [Вирджинии](https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%80%D0%B3%D0%B8%D0%BD%D0%B8%D1%8F), отыскал одно из самых непонятных латинских слов, concectetur, из отрывка из Lorem Ipsum и, пройдя по ссылкам на слова в классической литературе, обнаружил несомненный источник. Lorem Ipsum взято из разделов 1.10.32 и 1.10.33 "De Finibus Bonorum et Malorum" (Крайности добра и зла) [Цицерона](https://en.wikipedia.org/wiki/Cicero), написанных в 45 году до нашей эры. Эта книга является трактатом по теории этики, очень популярным во времена Ренессанса. Первая строка Lorem Ipsum, «Lorem ipsum dolor sit amet...», взята из строки в разделе 1.10.32.

![De Finibus Bonorum et Malorum][de-finibus-bonorum-et-malorum]

#### Для заинтересованных

Стандартный кусок Lorem Ipsum, используемый с 1500-х годов, воспроизводится ниже для тех, кто заинтересован. Разделы 1.10.32 и 1.10.33 из "de Finibus Bonorum et Malorum" Цицерона также воспроизведены в их точном оригинальном виде, сопровождаемые английскими версиями из перевода Х. Рэкхэма 1914 года.

## Где я могу получить некоторые

Существует множество вариаций отрывков Lorem Ipsum, но большинство претерпело изменения в той или иной форме из-за введенного юмора или случайных слов, которые не выглядят даже правдоподобно. Если вы собираетесь использовать отрывок из Lorem Ipsum, вы должны быть уверены, что в середине текста нет ничего смущающего. Все генераторы Lorem Ipsum в Интернете имеют тенденцию повторять заранее определенные фрагменты по мере необходимости, что делает их первым настоящим генератором в Интернете. Он использует словарь из более чем 200 латинских слов в сочетании с несколькими модельными структурами предложений для создания Lorem Ipsum, который выглядит разумным. Сгенерированный Lorem Ipsum, следовательно, всегда свободен от повторения, введенного юмора или нехарактерных слов и т.д.


[de-finibus-bonorum-et-malorum]: /assets/images/de-finibus-bonorum-et-malorum.jpg "Та самая книга"
