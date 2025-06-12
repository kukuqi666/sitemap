$(document).ready(function() {
    //获取host不包含端口
    var host = window.location.hostname;
    //修改id cmd的值
    /* 替换对应的host地址
     $('#cmd').html("irm "+host+"|iex")
    $('#linux').html("wget --no-check-certificate "+host+" -O ckey.run && bash ckey.run")
    $('#mac').html("curl -L -o ckey.run  "+host+" && bash ckey.run")
    */
    $('#cmd').html("irm " + ckey.run + " | iex");
    $('#linux').html("wget --no-check-certificate " + ckey.run + " -O ckey.run && bash ckey.run");
    $('#mac').html("curl -L -o ckey.run " + ckey.run + " && bash ckey.run");

    // Set default headers for AJAX requests
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json'
        }
    });

     window.copyCmd = function () {
        var text = $('#cmd').text();
        copyText(text).then((result) => {
            alert(result);
        })
    };

    window.copyLinux = function () {
        var text = $('#linux').text();
        copyText(text).then((result) => {
            alert(result);
        })
    };

    window.copyMac = function () {
        var text = $('#mac').text();
        copyText(text).then((result) => {
            alert(result);
        })
    };

    // Function to handle submission of license information
    window.submitLicenseInfo = function () {
        let licenseInfo = {
            licenseeName: $('#licenseeName').val(),
            assigneeName: $('#assigneeName').val(),
            expiryDate: $('#expiryDate').val()
        };
        localStorage.setItem('licenseInfo', JSON.stringify(licenseInfo));
        $('#mask, #form').hide();
    };

    // Function to handle search input
    $('#search').on('input', function(e) {
        $("#product-list").load('/search?search=' + e.target.value);
    });

    // Function to show license form
    window.showLicenseForm = function () {
        let licenseInfo = JSON.parse(localStorage.getItem('licenseInfo'));
        $('#licenseeName').val(licenseInfo?.licenseeName || 'JetBrains');
        $('#assigneeName').val(licenseInfo?.assigneeName || 'ckey.run');
        $('#expiryDate').val(licenseInfo?.expiryDate || '2099-12-31');
        $('#mask, #form').show();
    };

    // Function to show VM options
    window.showVmoptins = function () {
        var text = "-javaagent:/(Your Path)/ja-netfilter/ja-netfilter.jar\n" +
        "--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED\n" +
        "--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED";
        copyText(text)
            .then((result) => {
                alert(result);
            });
    };

    // Function to copy license
    window.copyLicense = async function (e) {
        while (localStorage.getItem('licenseInfo') === null) {
            $('#mask, #form').show();
            await new Promise(r => setTimeout(r, 1000));
        }
        let licenseInfo = JSON.parse(localStorage.getItem('licenseInfo'));
        let productCode = $(e).closest('.card').data('productCodes');
        let data = {
            "licenseName": licenseInfo.licenseeName,
            "assigneeName": licenseInfo.assigneeName,
            "expiryDate": licenseInfo.expiryDate,
            "productCode": productCode,
        };
        $.post('/generateLicense', JSON.stringify(data))
            .then(response => {
                copyText(response)
                    .then((result) => {
                        alert(result);
                    });
            });
    };

// Function to copy text to clipboard
    const copyText = async (val) => {
        if (navigator.clipboard && navigator.permissions) {
            await navigator.clipboard.writeText(val);
            return "已复制成功";
        } else {
            console.log(val);
            return "系统不支持复制功能,或者当前非SSL访问,若为Local环境,请使用127.0.0.1或者localhost访问.";
        }
    };
});
