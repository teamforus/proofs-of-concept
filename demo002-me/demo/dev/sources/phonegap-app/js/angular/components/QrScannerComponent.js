module.exports = {
    templateUrl: './assets/tpl/pages/qr-scanner.html',
    controller: [
        '$state',
        'QrScannerService',
        'IntentService',
        function(
            $state,
            QrScannerService,
            IntentService,
        ) {
            var ctrl = this;
            var scannerActive = true;

            QrScannerService.scan().then(function (code) {
                QrScannerService.cancelScan();
                scannerActive = false;

                let res = {
                    data: JSON.parse(code)
                };

                if (res.data.type == 'intent') {
                    IntentService.readToken(res.data.token).then(function (res) {
                        if (res.data.type == 'ask') {
                            var data = JSON.parse(JSON.stringify(res.data));

                            $state.go('ask-transaction-confirm', {
                                data: data
                            });
                        } else if (res.data.type == 'voucher') {
                            var data = JSON.parse(JSON.stringify(res.data));

                            $state.go('voucher-transaction', {
                                data: data
                            });
                        } else if (res.data.type == 'validate_record') {
                            var data = JSON.parse(JSON.stringify(res.data));

                            $state.go('validator-zuidhorn-confirm', {
                                data: data
                            });
                        } else {
                            alert('Unknown type: ' + res.data.type);
                        }
                    });
                } else if (res.data.type == 'auth_token') {
                    var data = JSON.parse(JSON.stringify(res.data));

                    data.requested = {
                        items: [
                            "Voornaam",
                            "Achternaam",
                            "BSN"
                        ]
                    };

                    $state.go('share-data', {
                        data: data
                    });
                } else if (res.data.type == 'voucher') {
                    var data = JSON.parse(JSON.stringify(res.data));

                    $state.go('voucher-transaction', {
                        data: data
                    });
                } else {
                    alert('Unknown type: ' + res.data.type);
                }
            }, function(err) {
                if (typeof err != 'object') {
                    alert(err);
                } else if (err.data && typeof err.data.message != 'undefined') {
                    console.log(err.data.message);
                } else {
                    console.log(err.data);
                }
            });

            ctrl.$onDestroy = function () {
                if (scannerActive) {
                    QrScannerService.cancelScan();
                }
            };
        }
    ]
};