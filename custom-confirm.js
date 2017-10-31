'use strict';

(function () {
    window.CustomConfirm = CustomConfirm;
    window.C2 = CustomConfirm;

    var template;
    var showing = false;

    function CustomConfirm(config, callback) {
        if (! arguments.length) {
            throw 'CustomConfirm: No arguments were passed';
        }

        if (typeof config === 'function') {
            callback = config;
        }

        config = getFinalConfig(config);

        if (config.targets) {
            var limit = config.targets.length;
    
            if (limit > 0) {
                var dialog = new Dialog(config, callback);
    
                for (var i = 0; i < limit; i++) {
                    setupEvents(config.targets[i], dialog);
                }
            }
        } else {
            var dialog = new Dialog(config, callback);
            dialog.show();
        }
    }

    function Dialog(settings, callback) {
        var _this = this;
        var modal = getTemplate();

        var title = modal.querySelector('.c2_title');
        var close = modal.querySelector('.c2_btn-close');
        var yes = modal.querySelector('.c2_btn-yes');
        var no = modal.querySelector('.c2_btn-no');
        var body = modal.querySelector('.c2_body');

        title.innerHTML = settings.title;
        body.innerHTML = settings.body;
        close.innerHTML = settings.btn_close;
        yes.innerHTML = settings.btn_yes;
        no.innerHTML = settings.btn_no;

        close.addEventListener('click', cancel);
        no.addEventListener('click', cancel);
        yes.addEventListener('click', confirm);

        if (settings.has_overlay) {
            var overlay = document.createElement('DIV');

            modal.appendChild(overlay);
            overlay.className = 'c2_overlay';
            overlay.addEventListener('click', cancel);
        }

        function cancel(event) {
            event.preventDefault();
            _this.hide();

            if (typeof callback === 'function') {
                callback(false, _this.context);
            }

            _this.setContext(undefined);
        }

        function confirm(event) {
            event.preventDefault();
            _this.hide();

            if (typeof callback === 'function') {
                callback(true, _this.context);
            }

            _this.setContext(undefined);
        }

        _this.modal = modal;
    }

    Dialog.prototype.setContext = function (context) {
        this.context = context;
    };

    Dialog.prototype.show = function () {
        if (showing) {
            $warn('CustomConfir: There\'s already a confirm showing');
            return;
        }
        
        showing = true;
        document.body.appendChild(this.modal);
    };

    Dialog.prototype.hide = function () {
        showing = false;
        this.modal.remove();
    };

    function getFinalConfig(config) {
        var _defaults = {
            title: 'Confirm dialog',
            body: 'Are you sure ?',
            btn_yes: 'confirm',
            btn_no: 'cancel',
            btn_close: '',
            has_overlay: true
        };

        if (typeof config === 'string') {
            _defaults.targets = config;
        } else if (typeof config === 'object') {
            Object.assign(_defaults, config)
        }

        if (typeof _defaults.targets === 'string') {
            _defaults.targets = document.querySelectorAll(_defaults.targets);
        } else if (typeof _defaults.targets === 'object' && ! _defaults.targets.length) {
            _defaults.targets = [_defaults.targets];
        }

        return _defaults;
    }

    function setupEvents(el, dialog) {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            dialog.setContext(el);
            dialog.show();
        }, false);
    }

    function getTemplate() {
        if (! template) {
            template = document.createElement('DIV');
            template.className = 'c2';
            template.innerHTML = '<div class="c2_content"> <header class="c2_header"> <h2 class="c2_title"></h2> <button class="c2_btn-close"></button> </header> <div class="c2_body"> </div><footer class="c2_footer"> <button class="c2_btn-no"></button> <button class="c2_btn-yes"></button> </footer>';
        }

        return template.cloneNode(true);
    }

    function $warn() {
        if (typeof window.console === 'object' && typeof console.warn === 'function') {
            console.warn.apply(console, arguments);
        }
    }

})();
