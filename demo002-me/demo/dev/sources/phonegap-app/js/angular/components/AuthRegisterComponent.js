module.exports = {
    templateUrl: './assets/tpl/pages/auth-register.html',
    controller: [
        '$state',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            ctrl.std = {
                records: {
                    first_name: 'Jamal',
                    last_name: 'Vleij',
                    bsn: '12345678',
                    phone: '0634566544',
                }
            };

            ctrl.form = {
                errors: {},
                values: {
                    type: 'personal'
                }
            };

            var getRandomNumber = function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            ctrl.fillStd = function() {
                ctrl.form.values = JSON.parse(JSON.stringify(ctrl.std));
                ctrl.form.values.type =  "personal";
                ctrl.form.values.records.email =  getRandomNumber(100000, 200000) + "@forus.io";
            };

            ctrl.submit = function() {
                AuthService.register(
                    ctrl.form.values
                ).then(function(res) {
                    CredentialsService.add(
                        res.data.access_token, 
                        ctrl.form.values.records.first_name + ' ' + ctrl.form.values.records.last_name
                    );
                    CredentialsService.set(res.data.access_token);

                    ctrl.form.errors = {};
                    $state.go('auth-register-pincode');
                }, function(res) {
                    ctrl.form.errors = res.data.errors;
                });
            };
        }
    ]
};