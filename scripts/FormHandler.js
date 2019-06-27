(function (window) {
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        this.$formElement = $(selector);
    }

    FormHandler.prototype.addSubmitHandler = function () {
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            $.post("db", this.$formElement.serializeArray(), function (data) {
                alert(data);
                if (data == '登陆成功！')
                    window.location.href = "Main.html";
            });
            console.log('提交成功');
        }.bind(this));
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window)
