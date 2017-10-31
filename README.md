# CustomConfirm aka C2 : This is an amazing library !

This library was made for people with this feeling : `window.confirm(...)` is ungly !

If you need to add a **confirm dialog** to your web site / web app that is beautiful or, at least easily themable,
you are on the right repo !

## Clean API

You can use **C2** for two major use-cases :

1. You want to add a confirm dialog when a link, set of links or buttons is / are clicked.

```javascript
CustomConfirm('button', function (confirmed, target_element) {
  if (confirmed) {
    // do something when the user confirms
    // use the target element if you want to... or not !
  } else {
    // do something (or not) when he cancels
  }
});
```

2. You need to pragmatically show the confirm dialog whenever you want.

```javascript
CustomConfirm(function (confirmed) {
  if (confirmed) {
    // do something when the user confirms
  } else {
    // do something (or not) when he cancels
  }
});
```

- `confirmed (Boolean)` : as the name says it, it contains whether the user confirmed or not.
- `target_element (Element)` : represents the element that was clicked and that triggered the dialog (check the demo page). 

### API options

**C2** is developer-friendly, you can override the default texts by passing options.

Here's the full list of the available options :
- `title (String) (default: 'Confirm dialog')` : To set the **Title** text
- `body (String) (default: 'Are you sure ?')` : To set the **Body** text
- `btn_yes (String) (default: 'confirm')` : To set the **Confirm button** text
- `btn_no (String) (default: 'cancel')` : To set the **Cancel button** text
- `btn_close (String) (default: 'close')` : To set the **Close button** text
- `has_overlay (String) (default: true)` : To set whether to have an **overlay** markup or not
- `targets (String | Element | Array | NodeList) (default: undefined)` : To set a **selector** or DOM element(s) 

**Example**
```javascript
CustomConfirm({
  targets: 'a',
  title: 'A fancy website',
  body: 'Are you sure you want to visit this link ?',
  btn_yes: 'Oh yeah !',
  btn_no: 'No, please cancel'
}, function (confirmed, target_element) {
  if (confirmed) {
    // do something when the user confirms
    location.href = target_element.href;
  } else {
    // do something (or not) when he cancels
  }
});
```

## Easily themable

 **C2** has a simple markup with some ready-to-use classes. To customize your dialog you can use the following classes :
- `.c2_content` : For the main content box (the white box, check the default theme)
- `.c2_header` : For the header (contains the title and close markup)
- `.c2_title` : For the title
- `.c2_btn-close` : For the close button
- `.c2_body` : For the the inner content (where your confirmation message appears)
- `.c2_footer` : For the footer (contains confirm and cancel button)
- `.c2_btn-no` : For the cancel button
- `.c2_btn-yes` : For the confirm button
- `.c2_overlay` : For the overlay

## Contribute

I'm not a web designer so, i'd be really happy to have some more themes for the community.
Feel free to create a theme and share it here by **sending a pull request**.

## WIP

I'll add some animations when i have some time !

## Browser support
IE 9+
Chrome all versions
Firefox all versions
...

Thanks !
