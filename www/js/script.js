//--------------------------------------------------------------Paths------------------------------------------------------------------//

var loadingtheme = "a";
var loadingText = "Loading ..!"
var ntwrkHead = "Server Inaccessible";
var ntwrkDesc = "You may not be in the Trust internal network, trust server is inaccessible.";
var session = "Another device is using your login, your session will terminate now.";
var sessionExpired = "Your app session has expired. Please login again to continue.";
var failedMsg = "Something did not work as expected. Please do inform the support team.";

var build = 1;
//var build = 2;

// 1 for android and 2 for ios 

//var link = "http://192.168.10.93/patientlistservicetree/Service.svc/";
//var link = "http://54.187.221.92/patientlistservicetree/Service.svc/";
//var link = "http://206.19.38.2/PatientlistService/Service.svc/";
//var link = "http://206.19.38.31/patientListService/Service.svc/";
//var link = "http://206.19.38.55/patientListService/Service.svc/";
//var link = "http://192.168.10.93/patientlistservicetree/Service.svc/";
//testing

var lightboxImageLink = "http://206.19.38.2/lgtPortalUpload/FileServer/";
var link = "http://206.19.38.2/PatientlistService/Service.svc/"
var fileUploadLink = "http://206.19.38.2/patientListService/Service.svc/";
var ImgfileUpload = "http://206.19.38.2/lgtPortalUpload/";

//Prod Links
//var lightboxImageLink = "http://54.187.221.92/lgtPortalUpload/FileServer/";

//var fileUploadLink = "http://54.187.221.92/patientlistservicetree/Service.svc/";
//var ImgfileUpload = "http://54.187.221.92/lgtPortalUpload/";


//Production Links
//var link = "http://192.168.10.93/patientlistservicetree/Service.svc/";
//var lightboxImageLink = "http://192.168.10.93/lgtupload/FileServer/";
//var fileUploadLink = "http://192.168.10.93/patientlistservicetree/Service.svc/";
//var ImgfileUpload = "http://192.168.10.93/lgtupload/";

//DMZ Link
//var link = "https://greenzone.lgt.nhs.uk/lgtportalservicetest/Service.svc/";
//var lightboxImageLink = "https://greenzone.lgt.nhs.uk/lgtupload/FileServer/";
//var fileUploadLink = "https://greenzone.lgt.nhs.uk/patientlistservicetree/Service.svc/";
//var ImgfileUpload = "https://greenzone.lgt.nhs.uk/lgtupload/";




//----------------------------------------------------------Path End------------------------------------------------------------------//

//-----------------------------------------------Device Ready Function Starts--------------------------------------------------------//

$(document).ready(function () {

    $('input').each(function () {

        $(this).on('focus', function () {
            $(this).parents('.inputAnimation').addClass('active');
        });

        $(this).on('blur', function () {
            if ($(this).val().length == 0) {
                $(this).parents('.inputAnimation').removeClass('active');
            }
        });

        if ($(this).val() != '') $(this).parents('.inputAnimation').addClass('active');
    });

    $('label').on('click', function () {
        $(this).parents('.inputAnimation').addClass('active');
    });

    // sessionTimeOut();
});

function sessionTimeOut() {

    var currentDateTime = new Date();
    var currentTimeUsed = new Date().getTime();
    if (parseInt(currentTimeUsed) < parseInt($("#hdn_Timeout").val())) {
        var afterTimeUsed = new Date(currentDateTime.setHours(currentDateTime.getHours() + 1)).getTime();
        $("#hdn_Timeout").val(afterTimeUsed);
        return true;
    }
    else {

        //win     navigator.notification.alert(sessionExpired, alertDismissed, '', 'Ok');

                                   window.plugins.toast.showWithOptions(
                                   {
                                       message: sessionExpired,
                                       duration: 2000, // ms
                                       position: "center"
                                   });

        logout();
        return false;
    }
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    $("#hdntokenKey").val("");
    $("#hdnuserid").val("");
    $("#hdnphyname").val("");
    $("#hdnjobtitle").val("");
    $("#hdnloginstatus").val("");
    $("#hdnfacilityId").val("");
    $("#loginid").val('');
    $("#loginpin").val('');
    $("#hdnPrimaryfacilityId").val('');
    // $('#divScrollable').sliderNav();
}

function alertDismissed() {
    // do something
}

function onDeviceReady() {

    //  window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 50, onRequestFileSystemSuccess, null); 
    'use strict';
    $('textarea').countChar();

    document.addEventListener("backbutton", onBackKeyDown, false);
    getUserId();
    getFacilityListDropdown('login');
    if (build == 1) {
        removeAllCache();
    }
    //win  StatusBar.show();

}
function removeAllCache() {
    window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, gotDirRemove, function (error) {

    });
}
function gotDirRemove(entry) {
    var directoryReader = entry.createReader();
    directoryReader.readEntries(function (entries) {
        var i;
        for (i = 0; i < entries.length; i++) {
            entries[i].remove(function (file) {
            }, function (error) {
            });
        }
    }, function () { });
}
//var pathImage = '';
//var pathVideo = '';

//function onRequestFileSystemSuccess(fileSystem) {

//    fileSystem.root.getDirectory('LGT Portal', { create: true, exclusive: false }, function (dirEntry) {

//        dirEntry.getDirectory('LGTImages', { create: true, exclusive: false }, function (subDirEntry) {
//            imagePath = subDirEntry.fullPath;
//        }, onGetDirectoryFail);

//        dirEntry.getDirectory('LGTVideos', { create: true, exclusive: false }, function (subDirEntry) {
//            pathVideo = subDirEntry.fullPath;
//        }, onGetDirectoryFail);

//        dirEntry.getDirectory('File', { create: true, exclusive: false }, function (subDirEntry) {

//        }, onGetDirectoryFail);
//    }, onGetDirectoryFail);
//}

//function onGetDirectorySuccess(dir) {
//    alert("Created dir: " + dir.name);  
//}

//function onGetDirectoryFail(error) {
//    alert("Error creating directory " + error.code);
//} 


var current_page = '';
$(document).on("pageshow", '[data-role="page"]', function () {
    current_page = $.mobile.activePage[0].id;
});
function onBackKeyDown() {
    switch (current_page) {
        case 'PatientlistLoginPage':
            navigator.app.exitApp();
            break;
        case 'siteLandingPage':
            navigator.app.exitApp();
            break;
        case 'PatientlistRequestPin':
            $('#back_requestpin').trigger('click');
            break;
        case 'PatientEditlist':
            $('#back_addlist').trigger('click');
            break;
        case 'PatientMyLists':
            $('#back_mylists').trigger('click');
            break;
        case 'PatientList':
            $('#backPatientList').trigger('click');
            break;
        case 'SearchPatient':
            $('#btnBackSearch').trigger('click');
            break;
        case 'PatientTestDetails':
            $('#backTestDetails').trigger('click');
            break;
        case 'Radiology':
            $('#back_radiology').trigger('click');
            break;
        case 'Laboratory':
            $('#back_lab').trigger('click');
            break;
        case 'AddNote':
            $('#backAddNote').trigger('click');
            break;
        case 'Notes_DetailsPage':
            $('#backNotesDetails').trigger('click');
            break;
        case 'Notes':
            $('#back_notes').trigger('click');
            break;
        case 'ChangePwd':
            $('#backChngePwd').trigger('click');
            break;
        case 'uploadProfilePicPage':
            $('#backUploadProfile').trigger('click');
            break;
        case 'RadRprtDtlsPage':
            $('#backRadReportDetails').trigger('click');
            break;
        case 'LabRprtDtlsPage':
            $('#backLabReportDetails').trigger('click');
            break;
        case 'LabViews':
            $('#backLabViews').trigger('click');
            break;
        case 'LaboratoryView2':
            $('#back_lab2').trigger('click');
            break;
        case 'LabView2Info':
            $('#backLab2List').trigger('click');
            break;
        case 'loginChangePwd':
            $(":mobile-pagecontainer").pagecontainer("change", "#siteLandingPage", { reverse: true, transition: "slide", changeHash: false });
            break;
        case 'captureImageOptions':
            $('#backCapImageOptions').trigger('click');
            break;

        case 'imageOptionsData':
            $('#backImgOptData').trigger('click');
            break;

        case 'imageCapturePage':
            $('#backImgCapture').trigger('click');
            break;

        case 'lightBoxPage':
            $('#backLightBox').trigger('click');
            break;
        case 'BedWardListPage':
            $('#backBedWardList').trigger('click');
            break;
        case 'WardPatientListPage':
            $('#backWardPatList').trigger('click');
            break;
        case 'confirmWardPatAddPage':
            $('#backCnfrmWardPat').trigger('click');
            break;
        case 'PhotosetIdListPage':
            $("#backPhotoSetId").trigger('click');
            break;
        case 'LightBoxPatListPage':
            $("#backLghtBoxPatList").trigger('click');
            break;
        case 'DataCapScreenPage':
            $("#backDataCapScreen").trigger('click');
            break;
        case 'CreateListPage':
            $("#backCreateList").trigger('click');
            break;
        case 'EditUserListPage':
            $("#backEditUserList").trigger('click');
            break;
        case 'ChangeUUID':
            $("#backUUID").trigger('click');
            break;
        case 'ViewPatientPage':
            $("#backViewPat").trigger('click');
            break;
        case 'SettingsPage':
            $("#backSettings").trigger('click');
            break;
        case 'AddPatientScreenPage':
            $("#backAddPatOpt").trigger('click');
            break;


        default:
            break;
    }
}



//-----------------------------------------------Device Ready Function Ends---------------------------------------------------------//

//----------------------------------------------------------Login Page Starts------------------------------------------------------//
function refreshFacility(event) {
             SpinnerDialog.show(null, "Loading...", true);
    var refresh = event.data.key;
    $.ajax({
        url: link + "getfacilitylist",
        data: [],
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                       SpinnerDialog.hide();
                 navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (facilityList) {
                     SpinnerDialog.hide();

            var ntwrkName = JSON.parse(facilityList);
            if (refresh == 'login') {
                $("#ddlTrustSite").html('');
                for (var key in ntwrkName) {
                    $("#ddlTrustSite").append('<option value=' + ntwrkName[key].key + '>' + ntwrkName[key].value + '</option>').trigger("change");
                }
                var site = window.localStorage.getItem("site");
                if (site == '' || site == null) {

                }
                else {
                    $("#ddlTrustSite").val(site).change();
                }
            }
            else if (refresh == 'pin') {
                $("#ddl_netusrname").html('');
                for (var key in ntwrkName) {
                    $("#ddl_netusrname").append('<option value=' + ntwrkName[key].key + '>' + ntwrkName[key].value + '</option>').trigger("change");
                }
                var site = window.localStorage.getItem("site");
                if (site == '' || site == null) {

                }
                else {
                    $("#ddl_netusrname").val(site).change();
                }
            }
        }
    });
}

$(document).on('pageinit', '#PatientlistLoginPage', function () {
    $("#refreshList").on("click", { key: 'login' }, refreshFacility);
    $("#btnrequestpin").on("click", openRequestPin);
    $("#btnlogin").on("click", login);
    $("#forgotPwdLogin").on("click", openForgotPwd);
    $(".home").on("click", home);
    $("#loginid").on("keyup", function (event) {
        if (event.keyCode == '13') {
            $("#loginpin").focus();
        }

    });
    $("#loginpin").on("keyup", function (event) {
        if (event.keyCode == '13') {

            login();
        }

    });

});
function openForgotPwd() {

    $("#emailForgotPwd").val('');
    $.mobile.changePage("#forgotPwdPage", { transition: "slide", changeHash: false });
}
function home() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#siteLandingPage", { reverse: true, transition: "slide", changeHash: false });

}
$(document).on("pageshow", "#siteLandingPage", function () {
    //    if (sessionTimeOut() == false) {
    //        return false;
    //    } 
    $("#box1").hide();
    $("#box2").hide();
    $("#box3").hide();
    $("#box4").hide();
    getFeatures();
});

function getFeatures() {
    if (sessionTimeOut() == false) {
        return false;
    }
             SpinnerDialog.show(null, "Loading...", true);
    var featuresList = {
        "key": $("#hdnUUID").val(),
        "value": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getFeatures",
        data: JSON.stringify(featuresList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (getFeatures) {
                         SpinnerDialog.hide();
            if (getFeatures == "failed") {

                //win     navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');

                                           window.plugins.toast.showWithOptions(
                                           {
                                               message: failedMsg,
                                               duration: 2000, // ms
                                               position: "center"
                                           });
                $("#box5").show();
                $("#box6").show();
                return false;

            }
            var dataArr = JSON.parse(getFeatures);
            for (var key in dataArr) {
                if (dataArr[key].value == "False" || dataArr[key].value == "0") {

                    if (dataArr[key].key == 'box3') {
                        $("#captureImageDetails").hide();
                    }
                    $("#" + dataArr[key].key).hide();
                }
                else if (dataArr[key].value == "True" || dataArr[key].value == "1") {
                    if (dataArr[key].key == 'box3') {
                        $("#captureImageDetails").show();
                    }
                    $("#" + dataArr[key].key).show();
                }
            }
        }
    });
}

function validateLogin() {
    var id = $("#loginid").val();

    if (id == "") {

        //win          navigator.notification.alert('Please enter your email.', alertDismissed, 'Validation Error', 'Ok');

                window.plugins.toast.showWithOptions(
                    {
                        message: "Please enter your email.",
                        duration: 2000, // ms
                        position: "center"
                    });
        return false;
    }

    var str = $("#loginpin").val();
    var patt1 = /[0-9]/g;
    if (!str.match(patt1)) {
        $("#loginpin").val('');
        //win              navigator.notification.alert('Please use digits for PIN.', alertDismissed, 'validation Error', 'Ok');
         window.plugins.toast.showWithOptions(
                                            {
                                                message: "Please use digits for PIN.",
                                                duration: 2000, // ms
                                                position: "center"
                                            });

        return false;
    }
    //    else if (!($("#loginpin").val().match('^[0-9]'))) {

    //        //win              navigator.notification.alert('Please use digits for PIN.', alertDismissed, 'validation Error', 'Ok');
    //         window.plugins.toast.showWithOptions(
    //                                            {
    //                                                message: "Please use digits for PIN.",
    //                                                duration: 2000, // ms
    //                                                position: "center"
    //                                            });

    //        return false;
    //    }
    else if ($("#loginpin").val() == "") {

        //win         navigator.notification.alert('Please enter your PIN.', alertDismissed, 'Validation Error', 'Ok');

                window.plugins.toast.showWithOptions(
                    {
                        message: "Please enter your PIN.",
                        duration: 2000, // ms
                        position: "center"
                    });
        return false;
    }
    else if ($("#loginpin").val().length != 4) {

        //win         navigator.notification.alert('Please enter a valid PIN.', alertDismissed, 'Validation Error', 'Ok');

                window.plugins.toast.showWithOptions(
                    {
                        message: "Please enter a valid PIN.",
                        duration: 2000, // ms
                        position: "center"
                    });
        return false;
    }

    return true;
}
function getUserId() {
    var id = window.localStorage.getItem("phyEmailId");

    if (id == "" || id == null) {
        $("#loginid").focus();
    }
    else {
        $("#loginid").val(id).trigger('focus');
        $("#loginpin").focus();
    }

}

function login() {

    if (validateLogin()) {
                 SpinnerDialog.show(null, "Loading...", true);

        var msg = {
            "ID": $("#loginid").val(),
            "Token": $("#loginpin").val(),
            "facilityID": $("#ddlTrustSite").val()
        };
        $.ajax({
            url: link + "sitephysicianlogin",
            data: JSON.stringify(msg),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                                SpinnerDialog.hide();
                               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (loginDetails) {
                                            SpinnerDialog.hide();
                if (loginDetails == 0) {

                    //win                navigator.notification.alert('Invalid Username or PIN.', alertDismissed, 'Validation Error', 'Ok');

                                                            window.plugins.toast.showWithOptions(
                                               {
                                                   message: "Invalid Username or PIN.",
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });
                    return false;
                } else if (loginDetails == "failed") {

                    //win     navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');

                                                           window.plugins.toast.showWithOptions(
                                               {
                                                   message: failedMsg,
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });
                    return false;

                }
                var emailId = $("#loginid").val();
                var site = $("#ddlTrustSite").val();

                window.localStorage.setItem("phyEmailId", emailId);
                window.localStorage.setItem("site", site);

                var phyDetails = JSON.parse(loginDetails);

                $("#hdntokenKey").val(phyDetails["tokenKey"]);
                $("#hdnuserid").val(phyDetails["id"]);
                $("#hdnphyname").val(phyDetails["physicianName"]);
                $("#hdnjobtitle").val(phyDetails["jobtitle"]);
                $("#hdnloginstatus").val(phyDetails["apploginStatus"]);
                $("#dnameDashboard").html(phyDetails["physicianName"]);
                $("#phyNameChangePwd").html(phyDetails["physicianName"]);
                $("#hdnfacilityId").val(phyDetails["facilityID"]);
                $("#hdnFacilityName").val(phyDetails["facilityName"]);

                $("#hdnUUID").val(phyDetails["uuid"]);


                //For Session Timeout
                var currentDateTime = new Date();

                var AfterDateTime = new Date(currentDateTime.setHours(currentDateTime.getHours() + 1));

                var afterTimeUsed = AfterDateTime.getTime();

                $("#hdn_Timeout").val(afterTimeUsed);

                if (phyDetails["apploginStatus"] == 0) {
                    if (phyDetails["facilityID"] == 3) {
                        $("#hdnPrimaryfacilityId").val(phyDetails["facilityID"]);
                    }
                    $.mobile.changePage("#loginChangePwd", { transition: "slide", changeHash: false });
                    return false;
                } else {

                    if (phyDetails["facilityID"] == 3) {
                        $("#hdnPrimaryfacilityId").val(phyDetails["facilityID"]);
                        $.mobile.changePage("#Dashboard", { transition: "slide", changeHash: false });
                        getFacilityList();

                    } else {

                        openLandingPage();
                    }
                }


            }
        });
    }
}
function openDashboard() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#Dashboard", { transition: "slide", changeHash: false });
    getFacilityList();


}
function getFacilityList() {
    $("#facilityName").html('');
       SpinnerDialog.show(null, "Loading...", true);
    $.ajax({
        url: link + "getfacilitylist",
        data: [],
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (facilityList) {
                          SpinnerDialog.hide();

            if (facilityList == "failed") {
                //win           navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                return false;
            }
            var ntwrkName = JSON.parse(facilityList);
            for (var key in ntwrkName) {

                $("#facilityName").append('<div id="facilityDiv' + key + '" class="mt10"><a href="" data-role="button" class="ui-corner-all tac mt20" data-mini="true">' + ntwrkName[key].value + '</a></div>').trigger('create');

                //                $("#facilityName").append('<div id="facilityDiv' + key + '"  style="padding:10px;" class="mt10"><input type="button" style="width:100%;"  class="ui-corner-all tac" data-mini="true" value=' + ntwrkName[key].value + '  /></div>');

                $("#facilityDiv" + key).on("click", { key: ntwrkName[key].key, value: ntwrkName[key].value }, LandingPage);

            }
        }
    });
}

function LandingPage(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var facilityId = event.data.key;
    $("#hdnFacilityName").val(event.data.value);
    $("#hdnfacilityId").val(facilityId);
    openLandingPage();
}

function backloginPage() {
    $("#loginid").val('');
    $("#loginpin").val('');
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLoginPage", { reverse: true, transition: "slide", changeHash: false });
}
//-------------------------------------------------------Login Page Ends------------------------------------------------------------//

//------------------------------------------Request Pin Page Starts----------------------------------------------------//

$(document).on('pageinit', '#PatientlistRequestPin', function () {
    $("#refFacility").on("click", { key: 'pin' }, refreshFacility);
    $("#back_requestpin").on("click", backloginPage);
    $("#request_pin").on("click", requestPin);

    // $("#chbagree").on("click", openAgreeTrustPage);
    $("#agreeTandC").on("click", AgreeTandC);
    $("#chbagree").on("click", openAgreeTrustPage);

});

function AgreeTandC() {
    $("#chbagree").prop("checked", true).checkboxradio('refresh');
    popupAgreeClose();

}

function openAgreeTrustPage() {


    if ($("#chbagree").is(':checked')) {
            SpinnerDialog.show(null, "Loading...", true);
        $.ajax({
            url: link + "getTermsAndCond",
            data: [],
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                            SpinnerDialog.hide();
                            navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (getTerms) {
                            SpinnerDialog.hide();
                $("#divPopupAgree").html('');
                $("#divPopupAgree").html(getTerms).trigger('create');
                setTimeout(OpenPopupAgree, 50);
            }
        });
    }
}

function OpenPopupAgree() {
    $("#popupAgree").popup({ positionTo: "window" }).popup('open');
}

function validatePinRequest() {

    var fName = $("#fname").val();
    var lName = $("#lname").val();
    // var valname = $("#txt_name").val();
    var valjob = $("#txt_jobtitle").val();
    var valemail = $("#txt_email").val();

    var uuid = $("#UUIDNo").val();


    var atpos = $("#txt_email").val().lastIndexOf("@");
    var FIRSTpos = $("#txt_email").val().indexOf("@");
    var dotpos = $("#txt_email").val().lastIndexOf(".");
    var textAfter = valemail.substring(valemail.length, atpos + 1);

    var textBefore = valemail.substring(0, atpos);
    if (fName == "") {

        //win        navigator.notification.alert('Please enter first name.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                      {
                           message: "Please enter first name.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;

    }
    else if (lName == "") {

        //win        navigator.notification.alert('Please enter last name.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                      {
                           message: "Please enter last name.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;

    }
    else if (valjob == "") {

        //win            navigator.notification.alert('Please enter your job title.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter your job title.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;

    }
    else if (valemail == "") {

        //win          navigator.notification.alert('Please enter your email.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter your email.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;
    }
    else if (!textBefore.match('^[-a-zA-Z0-9._`\'\]*$') || (valemail.split("@").length - 1) != 1) {
        //win          navigator.notification.alert('Invalid email.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Invalid email.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;
    }
    else if (!$("#chbagree").is(':checked')) {
        //win          navigator.notification.alert('Please agree with terms and conditions.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please agree with terms and conditions.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;
    }

    else if ($("#UUIDNo").val().length < 12 && $("#UUIDNo").val().length >= 1) {
        //win  navigator.notification.alert('Enter valid 12 digit smartcard number.', alertDismissed, 'Validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                           {
                               message: 'Enter valid 12 digit smartcard number.',
                               duration: 2000, // ms
                               position: "center"
                           });
        return false;
    }
    else {
        return true;
    }
}


function requestPin() {

    if (validatePinRequest()) {
            SpinnerDialog.show(null, "Loading...", true);
        var reqPinData = {
            "fName": $("#fname").val(),
            "lName": $("#lname").val(),
            "networkUserName": $("#ddl_netusrname").val(),
            "jobtitle": $("#txt_jobtitle").val(),
            "email": $("#txt_email").val(),
            "uuid": $("#UUIDNo").val()
        };
        $.ajax({
            url: link + "siteDoctorPinRequest",
            data: JSON.stringify(reqPinData),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                            SpinnerDialog.hide();
                            navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (pinId) {
                             SpinnerDialog.hide();
                if (pinId == "mailError") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message:failedMsg ,
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });
                    return false;
                }
                var Pinid = JSON.parse(pinId);
                var idPin = Pinid["ID"];
                if (idPin == 0) {
                    //win              navigator.notification.alert('Email being sent to your inbox from LGT Portal Admin.', alertDismissed, 'Success', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                    message: "Email being sent to your inbox from LGT Portal Admin.",
                                                   duration: 5000, // ms
                                                   position: "center"
                                               });
                    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLoginPage", { reverse: true, transition: "slide", changeHash: false });
                }
                else if (idPin == 999) {
                    //win  navigator.notification.alert('Email already exists.', alertDismissed, 'Validation Error', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: "Email already exists.",
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });

                }
                else if (idPin == "failed") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: failedMsg,
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });

                } else if (idPin == "emailNotSent") {
                    //win              navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: failedMsg,
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });

                    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLoginPage", { reverse: true, transition: "slide", changeHash: false });
                } else if (idPin == "validateMailError") {
                    //win              navigator.notification.alert('Invalid Email Address', alertDismissed, 'validation Error', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: "Invalid Email Address.",
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });
                } else {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: failedMsg,
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });

                }
            }
        });
    }
}


function getFacilityListDropdown(facility) {

       SpinnerDialog.show(null, "Loading...", true);

    $.ajax({
        url: link + "getfacilitylist",
        data: [],
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                       SpinnerDialog.hide();
                 navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (facilityList) {
                     SpinnerDialog.hide();

            var ntwrkName = JSON.parse(facilityList);
            if (facility == 'reqPin') {
                //                $("#ddl_netusrname").html("<option value=0>Trust Site</option>");
                $("#ddl_netusrname").html('');
                for (var key in ntwrkName) {
                    $("#ddl_netusrname").append('<option value=' + ntwrkName[key].key + '>' + ntwrkName[key].value + '</option>');
                }
                $("#ddl_netusrname").trigger("change");
                var site = window.localStorage.getItem("site");
                if (site == '') {

                }
                else {
                    $("#ddl_netusrname").val(site).change();
                }
            }
            else if (facility == 'login') {
                $("#ddlTrustSite").html('');
                for (var key in ntwrkName) {
                    $("#ddlTrustSite").append('<option value=' + ntwrkName[key].key + '>' + ntwrkName[key].value + '</option>');
                }
                $("#ddlTrustSite").trigger("change");
                var site = window.localStorage.getItem("site");
                if (site == '') {

                }
                else {
                    $("#ddlTrustSite").val(site).change();
                }

            }
        }
    });
}

function openRequestPin() {
    $.mobile.changePage("#PatientlistRequestPin", { transition: "slide", changeHash: false });
    $("#chbagree").prop("checked", false).checkboxradio('refresh');
    getFacilityListDropdown('reqPin');
    $("#ddl_netusrname").val("0").change();
    $("#fname").val("");
    $("#lname").val("");
    $("#UUIDNo").val("");
    $("#txt_jobtitle").val("");
    $("#txt_email").val("");
}

//--------------------------------------------Request Pin Page Ends---------------------------------------------//

//-----------------------------------------------Landing Page Function---------------------------------------//
$(document).on('pageinit', '#siteLandingPage', function () {
    $("#box1").hide();
    $("#box2").hide();
    $("#box3").hide();
    $("#box4").hide();


    $("#box1").on("click", openMyList);
    $("#box2").on("click", openPatientWardList);
    $("#box3").on("click", openDataCapScreen);
    $("#box4").on("click", openViewPatPage);
    $("#box5").on("click", openSettingsPage);
    $("#box6").on("click", logout);
});

function openViewPatPage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#ViewPatientPage", { transition: "slide", changeHash: false });
    $("#viewPatDetails").hide();
    $("#dNmViewPat").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#srchResViewPat").html("");
    $("#hdnPrsnIdViewPat").val("");
    $("#hdnMrnViewPat").val("");
    $("#mrnSearViewPat").val("");
}


$(document).on('pageinit', '#ViewPatientPage', function () {
    $("#ViewPatientPage").on("swiperight", backLandingPage);
    $("#backViewPat").on("click", backLandingPage);

    $("#srchResViewPat").on("click", { key: "", value: "viewPat" }, openPatientTestDetails);

    $("#viewPatDetails").on("click", { key: "", value: "viewPat" }, openPatientTestDetails);

    $("#btnSearchPat").on("click", viewPatient);

    $("#mrnSearViewPat").on("keyup", function (event) {
        if (event.keyCode == '13') {
            viewPatient();
        }

    });
});



function viewPatient() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#srchResViewPat").html("");
    viewPrsnId = '';
    $("#hdnPrsnIdViewPat").val("");
    $("#hdnMrnViewPat").val("");
    if ($("#mrnSearViewPat").val() == '') {
        //win          navigator.notification.alert('Please enter MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter MRN.",
                           duration: 2000, // ms
                           position: "center"
                       });
    }
    else if (!$.trim($("#mrnSearViewPat").val()).match('^[a-zA-Z0-9._-`#]*$')) {
        $("#viewPatDetails").hide();
        //win          navigator.notification.alert('Please enter a valid MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter a valid MRN.",
                           duration: 2000, // ms
                           position: "center"
                       });
    }
    else {
              SpinnerDialog.show(null, "Loading...", true);
        var mrnNo = {
            "key": $("#mrnSearViewPat").val(),
            "value": $("#hdnfacilityId").val(),
            "operatorId": $("#hdnuserid").val(),
            "tokenKey": $("#hdntokenKey").val()
        };
        $.ajax({
            url: link + "searchPatient",
            data: JSON.stringify(mrnNo),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                                SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (searchResult) {
                            SpinnerDialog.hide();


                if (searchResult == "999") {
                    $("#viewPatDetails").hide();
                    //win              navigator.notification.alert('MRN not found!', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: "MRN not found!",
                                               duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                } else if (searchResult == "failed") {
                    $("#viewPatDetails").hide();
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: failedMsg,
                                              duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                }

                var resultSearch = JSON.parse(searchResult);
                $("#hdnMrnViewPat").val(resultSearch["MRNno"]);

                var resultSearch = JSON.parse(searchResult);
                $("#viewPatDetails").show();
                $("#srchResViewPat").html('<div style="background-color:#ffffff; padding:5px;" class="ui-content"><div style="background-color:#DFE0DF;	border-style: solid; border-color: #000;  border-width: 1px;" class="ui-content"><div class="txtList txt14" >' + resultSearch["patientName"].toUpperCase() + '</div><div class="clr"><span class="fl textPat txt12">MRN: </span><span class="fr tar iconTxt">' + resultSearch["MRNno"] + '</span></div><div class="clr"><span class="textPat txt12">GENDER: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 33%;">' + resultSearch["gender"] + '</span></div><div class="clr"><span class="textPat txt12">DOB: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 44%;">' + resultSearch["DOB"] + '</span></div><div class="clr"><span class="textPat txt12">NHS NO.: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 45%;">' + resultSearch["NHSno"] + '</span></div> <div class="clr"><span class="textPat txt12">LOCATION: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 60%;">' + resultSearch["location"] + '</span></div><div class="clr"><span class="textPat txt12">LEAD CLINICIAN: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 50%;">' + resultSearch["leadClinician"] + '</span></div> <div style="display: inline-block; word-wrap: break-word; width: 100%; text-overflow:ellipsis; "><span class="textPat txt12">ADMISSION DATE: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 40%;" >' + resultSearch["AddmissionDate"] + '</span></div></div></div>');

                $("#hdnPrsnIdViewPat").val(resultSearch["PersonID"]);

            }
        });
    }
}


$(document).on('pageinit', '#SettingsPage', function () {
    $("#backSettings").on("click", backLandingPage);
    $("#SettingsPage").on("swiperight", backLandingPage);
    $("#chngePinSettings").on("click", openChangePwd);
    $("#smrtcardIdSettings").on("click", openUUID);
    $("#chngeSiteSettings").on("click", openDashboard);
});

function openUUID() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#txtUUID").val('');
    $.mobile.changePage("#ChangeUUID", { transition: "slide", changeHash: false });
    $("#txtUUID").val($("#hdnUUID").val()).focus();
    $("#phyNMChngeUUID").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
}

$(document).on('pageinit', '#ChangeUUID', function () {
    $("#backUUID").on("click", backSettingPage);
    $("#ChangeUUID").on("swiperight", backSettingPage);
    $("#saveUUID").on("click", saveUUID);
});
function limit(element) {
    var max_chars = 12;

    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

function checkSpec(element) {
    var length = element.value.length;

    if (!(element.value.match('^[0-9]'))) {

        element.value = element.value.substr(0, length);
        //win              navigator.notification.alert('Please use digits for PIN.', alertDismissed, 'validation Error', 'Ok');
         window.plugins.toast.showWithOptions(
                                            {
                                                message: "Please use digits for PIN.",
                                                duration: 2000, // ms
                                                position: "center"
                                            });

    }
}
function saveUUID() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if ($("#txtUUID").val() == "") {
        //win  navigator.notification.alert('Enter valid 12 digit smartcard number.', alertDismissed, 'Validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                           {
                               message: 'Enter valid 12 digit smartcard number.',
                               duration: 2000, // ms
                               position: "center"
                           });
    }
    else if ($("#txtUUID").val().length < 12) {
        //win  navigator.notification.alert('Enter valid 12 digit smartcard number.', alertDismissed, 'Validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                           {
                               message: 'Enter valid 12 digit smartcard number.',
                               duration: 2000, // ms
                               position: "center"
                           });
    }
    else {
           SpinnerDialog.show(null, "Loading...", true);
        var dataWardList = {
            "key": $("#hdnuserid").val(),
            "value": $("#txtUUID").val()
        };
        $.ajax({
            url: link + "updateUUId",
            data: JSON.stringify(dataWardList),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {

                             SpinnerDialog.hide();
                       navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

            },
            success: function (getWardResult) {
                             SpinnerDialog.hide();
                if (getWardResult == "success") {
                    $.mobile.changePage("#SettingsPage", { transition: "slide", changeHash: false });
                    $("#hdnUUID").val($("#txtUUID").val());
                }
            }
        });
    }
}
function backSettingPage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#SettingsPage", { reverse: true, transition: "slide", changeHash: false });
}

function openSettingsPage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#SettingsPage", { transition: "slide", changeHash: false });
    $("#dNmSettingsPage").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
}

var statPatWard = '';
function openPatientWardList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    statPatWard = 'landing';
       SpinnerDialog.show(null, "Loading...", true);
    $("#lv_bedWard").empty();
    var dataWardList = {
        "ID": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getBedWardList",
        data: JSON.stringify(dataWardList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (getWardResult) {
                       SpinnerDialog.hide();

            if (getWardResult == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            $.mobile.changePage("#BedWardListPage", { transition: "slide", changeHash: false });
            $("#dNmBedWardList").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

            if (getWardResult == "" || getWardResult == "[]") {
                $("#lv_bedWard").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Lists Found</                       div>");
                return false;
            }

            var wardList = JSON.parse(getWardResult);
            for (var key in wardList) {

                $("#lv_bedWard").append("<li id='bedWard" + key + "' style='font-size:13px !important; padding:15px;' data-iconshadow='true' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-icon-arrow-r ui-btn-icon-right'>" + wardList[key].station + "</li>").listview('refresh').trigger('create');

                $("#bedWard" + key).on("click", { key: wardList[key].codeValue, value: wardList[key].station }, openWardPatient);
            }
        }
    });


}
$(document).on('pageinit', '#WardPatientPage', function () {
    $("#backWardPat").on("click", backWardList);
    $("#WardPatientPage").on("swiperight", backWardList);
});

function openWardPatient(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
       SpinnerDialog.show(null, "Loading...", true);
    $.mobile.changePage("#WardPatientPage", { transition: "slide", changeHash: false });
    $("#lvWardPat").empty();
    $("#dNmWardPat").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    var codeValue = event.data.key;
    var station = event.data.value;

    $("#stnNmWardPat").html(station);

    var dataWardList = {
        "key": codeValue,
        "value": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getWardPatientList",
        data: JSON.stringify(dataWardList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (getWardPatResult) {
                         SpinnerDialog.hide();
            if (getWardPatResult == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            var wardPatList = JSON.parse(getWardPatResult);
            for (var key in wardPatList) {
                codeValue = codeValue + 1;
                $("#lvWardPat").append('<li id="wardPat' + codeValue + '"><a href=""  style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + wardPatList[key].patientName.toUpperCase() + '</div> <div><span class="iconTxt"></span><span>' + wardPatList[key].MRNno + '</span> <span class="" style="margin-left:10px;">' + wardPatList[key].gender + ' </span><span class="" style="margin-left:10px;">D.O.B: </span><span>' + wardPatList[key].DOB + '</span></div><div>  <span class="iconTxt"></span><span>' + wardPatList[key].NHSno + '</span><span style="margin-left:10px;">' + wardPatList[key].location + '</span></div> </a></li>').listview('refresh').trigger('create');

                $("#wardPat" + codeValue).on("click", { key: wardPatList[key].PersonID, value: "wardPat" }, openPatientTestDetails);
            }

        }
    });

}

$(document).on('pageinit', '#DataCapScreenPage', function () {
    $("#acceptDataCap").on("click", { key: "dataCap" }, openImgOptionsData);
    $("#searchResDataCap").on("click", { key: "dataCap" }, openImgOptionsData);
    $("#lghtboxPat").on("click", openPatientListLghtbox);
    $("#backDataCapScreen").on("click", backLandingPage);
    $("#DataCapScreenPage").on("swiperight", backLandingPage);

    $("#btnSearchData").on("click", SearchPatDataCap);
    $("#searchMrnDataCap").on("keyup", function (event) {
        if (event.keyCode == '13') {

            SearchPatDataCap();
        }

    });
});

$(document).on('pageinit', '#LightBoxPatListPage', function () {
    $("#backLghtBoxPatList").on("click", backDataCap);
    $("#LightBoxPatListPage").on("swiperight", backDataCap);

});
function backDataCap() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#DataCapScreenPage", { reverse: true, transition: "slide", changeHash: false });
}
function openPatientListLghtbox() {
    if (sessionTimeOut() == false) {
        return false;
    }
        SpinnerDialog.show(null, "Loading...", true);
    $("#lvLghtBoxPatList").empty();
    $.mobile.changePage("#LightBoxPatListPage", { transition: "slide", changeHash: false });
    $("#dNmLghtBoxPatList").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    var dataLghtBoxPat = {
        "userId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getListofPatientPhotoSet",
        data: JSON.stringify(dataLghtBoxPat),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (PatientList) {
                      SpinnerDialog.hide();

            if (PatientList == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            if (PatientList == "[]" || PatientList == "") {
                $("#lvLghtBoxPatList").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Patient Found</div>");
                return false;
            }
            if (PatientList == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            var listInfo = JSON.parse(PatientList);

            for (var key in listInfo) {

                $("#lvLghtBoxPatList").append('<li id="lightBoxPat' + key + '"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName.toUpperCase() + '</div> <div><span >' + listInfo[key].MRNno + '</span> <span  style="margin-left:10px;">' + listInfo[key].gender + ' </span><span  style="margin-left:10px;">D.O.B: ' + listInfo[key].DOB + '</span></div><div>  <span></span><span >' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#lightBoxPat" + key).on("click", { key: listInfo[key].PersonID, value: listInfo[key].MRNno, patName: listInfo[key].patientName, loc: listInfo[key].location }, openSetIdListPage);
            }
        }
    });

}

$(document).on('pageinit', '#PhotosetIdListPage', function () {
    $("#backPhotoSetId").on("click", backPhotoSetPatList);
    $("#PhotosetIdListPage").on("swiperight", backPhotoSetPatList);
});

function backPhotoSetPatList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#LightBoxPatListPage", { reverse: true, transition: "slide", changeHash: false });
}

function openSetIdListPage(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
        SpinnerDialog.show(null, "Loading...", true);
    $("#lvPhotoSetId").empty();

    $("#dNmPhotosetIdLst").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    var prsnId = event.data.key;
    var mrnNo = event.data.value;
    var ptName = event.data.patName;
    var location = event.data.loc;

    $("#ptInfoPhotosetId").html(ptName + " | " + mrnNo);
    $("#ptLocPhotosetId").html(location);
    $("#hdnPersonIdDetails").val(prsnId);
    $("#phyNmLightBox").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#ptInfoLightBox").html(ptName + " | " + mrnNo);
    $("#ptLocLightBox").html(location);

    $("#ptNmPhotoSetId").html('CAPTURED PHOTOSETS');
    var dataSetIdList = {
        "operatorID": $("#hdnuserid").val(),
        "tokenkey": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val(),
        "personID": prsnId,
        "MRNNO": mrnNo
    };
    $.ajax({
        url: link + "getPhotoSetList",
        data: JSON.stringify(dataSetIdList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (PatientList) {


            if (PatientList == "failed") {
                          SpinnerDialog.hide();
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            $.mobile.changePage("#PhotosetIdListPage", { transition: "slide", changeHash: false });
                      SpinnerDialog.hide();
            if (PatientList == "[]" || PatientList == "") {
                $("#lvPhotoSetId").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Patient Found</div>");
                return false;
            }
            if (PatientList == 2) {

                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            var listInfo = JSON.parse(PatientList);

            for (var key in listInfo) {

                $("#lvPhotoSetId").append('<li id="setId' + key + '"><a href="" style="font-size: 12px; line-height: 2em;"> <div><span>Captured By: ' + listInfo[key].name + '</span></div><div >Captured On: ' + listInfo[key].photoDate + '</div> </a></li>').listview("refresh").trigger("create");

                $("#setId" + key).on("click", { key: listInfo[key].setID }, setHdnSetId);
            }


        }
    });

}

function setHdnSetId(event) {

    var id = event.data.key;
    $("#hdnOptionValue").val(id);
    openLightBoxPage('setList');
}

function SearchPatDataCap() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#searchResDataCap").html("");
    $("#hdnPersonIdDetails").val("");
    if ($("#searchMrnDataCap").val() == "") {
        $("#acceptDataCap").hide();
        //win     navigator.notification.alert('Please enter MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter MRN.",
                       duration: 2000, // ms
                       position: "center"
                   });
    }
    else if (!$.trim($("#searchMrnDataCap").val()).match('^[a-zA-Z0-9._-`#]*$')) {
        $("#acceptDataCap").hide();
        //win          navigator.notification.alert('Please enter a valid MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter a valid MRN.",
                           duration: 2000, // ms
                           position: "center"
                       });
    }
    else {
              SpinnerDialog.show(null, "Loading...", true);
        var mrnNo = {
            "key": $("#searchMrnDataCap").val(),
            "value": $("#hdnfacilityId").val(),
            "operatorId": $("#hdnuserid").val(),
            "tokenKey": $("#hdntokenKey").val()
        };
        $.ajax({
            url: link + "searchPatient",
            data: JSON.stringify(mrnNo),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                                SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (searchResult) {
                            SpinnerDialog.hide();


                if (searchResult == "999") {
                    $("#acceptDataCap").hide();
                    //win              navigator.notification.alert('MRN not found!', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: "MRN not found!",
                                               duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                } else if (searchResult == "failed") {
                    $("#acceptDataCap").hide();
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: failedMsg,
                                              duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                }

                var resultSearch = JSON.parse(searchResult);
                $("#acceptDataCap").show();
                $("#phyNmLightBox").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
                $("#ptInfoLightBox").html(resultSearch["patientName"].toUpperCase() + " | " + resultSearch["MRNno"]);
                $("#ptLocLightBox").html(resultSearch["location"]);

                $("#ptInfoImgOptData").html(resultSearch["patientName"].toUpperCase() + " | " + resultSearch["MRNno"]);
                $("#ptLocImgOptData").html(resultSearch["location"]);
                $("#phyNameImgOptData").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");



                $("#searchResDataCap").html('<div style="background-color:#ffffff; padding:5px;" class="ui-content"><div style="background-color:#DFE0DF;	border-style: solid; border-color: #000;  border-width: 1px;" class="ui-content"><div class="txtList txt14" >' + resultSearch["patientName"].toUpperCase() + '</div><div class="clr"><span class="fl textPat txt12">MRN: </span><span  class="fr tar iconTxt" >' + resultSearch["MRNno"] + '</span></div><div class="clr"><span class="textPat txt12">GENDER: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 33%;">' + resultSearch["gender"] + '</span></div><div class="clr"><span class="textPat txt12">DOB: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 44%;">' + resultSearch["DOB"] + '</span></div><div class="clr"><span class="textPat txt12">NHS NO.: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 45%;">' + resultSearch["NHSno"] + '</span></div> <div class="clr"><span class="textPat txt12">LOCATION: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 60%;">' + resultSearch["location"] + '</span></div><div class="clr"><span class="textPat txt12">LEAD CLINICIAN: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 50%;">' + resultSearch["leadClinician"] + '</span></div> <div style="display: inline-block; word-wrap: break-word; width: 100%; text-overflow:ellipsis; "><span class="textPat txt12">ADMISSION DATE: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 40%;" >' + resultSearch["AddmissionDate"] + '</span></div></div></div>');
                $("#hdnMrnImgOpt").val($("#searchMrnDataCap").val());
                $("#hdnPersonIdDetails").val(resultSearch["PersonID"]);
            }
        });
    }
}

function openDataCapScreen() {
    if (sessionTimeOut() == false) {
        return false;
    }

    $.mobile.changePage("#DataCapScreenPage", { transition: "slide", changeHash: false });
    $("#acceptDataCap").hide();
    $("#hdnPersonIdDetails").val('');
    $("#searchMrnDataCap").val('');
    $("#searchResDataCap").html('');
    $("#dNmDataCapScreen").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

}

//function openCaptureImage() {
//    $('#camera_image').attr('src', '');
//    $("#dnameuploadProfile").html($("#hdnphyname").val());
//    $.mobile.changePage("#uploadProfilePicPage", { transition: "slide", changeHash: false });
//}

function logout() {
    $.mobile.changePage("#PatientlistLoginPage", { transition: "slide", changeHash: false });
    $("#hdntokenKey").val("");
    //   $("#loginid").val('');
    $("#hdnuserid").val("");
    $("#hdnphyname").val("");
    $("#hdnjobtitle").val("");
    $("#hdnloginstatus").val("");
    $("#hdnfacilityId").val("");
    //    $("#loginid").val('');
    $("#loginpin").val('');
    $("#hdnPrimaryfacilityId").val('');
    $("#hdnUUID").val('');

    //clrPatPanel();
    statusAddPat = 0;
    $("#statusAddWardPat").html("");

    for (var key in addWardPat) {
        //$("#" + addWardPat[key].ID).show();
        var id = addWardPat[key].ID.replace("wardPatList", "username");
        $("#" + id).prop("checked", false).checkboxradio('refresh');
    }
    addWardPat = [];
    $("#lvAddWardPat").empty();
    $("#stationNmWardPat").html('');
    return false;

}
$(document).on('pageinit', '#AddPatientOptionsPage', function () {
    $("#bedWardAddPatOpt").on("click", openWardList);
    $("#searchPatAddPatOpt").on("click", openSearchPatient);
    $("#backAddPatOptPage").on("click", backLandingPage);
    $("#AddPatientOptionsPage").on("swiperight", backLandingPage);
});
$(document).on('pageinit', '#BedWardListPage', function () {

    $("#backBedWardList").on("click", backFromWardList);
    $("#BedWardListPage").on("swiperight", backFromWardList);
});

function backFromWardList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (statPatWard == 'options') {
        $(":mobile-pagecontainer").pagecontainer("change", "#AddPatientScreenPage", { reverse: true, transition: "slide", changeHash: false });
    }
    else {
        $(":mobile-pagecontainer").pagecontainer("change", "#siteLandingPage", { reverse: true, transition: "slide", changeHash: false });
    }
}

function backAddPatScreenPage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#AddPatientScreenPage", { reverse: true, transition: "slide", changeHash: false });
}

function backAddPatOptions() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#AddPatientOptionsPage", { reverse: true, transition: "slide", changeHash: false });
}
function openWardList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    statPatWard = 'options';
       SpinnerDialog.show(null, "Loading...", true);
    $("#lv_bedWard").empty();
    var dataWardList = {
        "ID": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getBedWardList",
        data: JSON.stringify(dataWardList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (getWardResult) {
                       SpinnerDialog.hide();

            if (getWardResult == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            $.mobile.changePage("#BedWardListPage", { transition: "slide", changeHash: false });
            $("#dNmBedWardList").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

            if (getWardResult == "" || getWardResult == "[]") {
                $("#lv_bedWard").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Lists Found</div>");
                return false;
            }


            var wardList = JSON.parse(getWardResult);
            for (var key in wardList) {

                $("#lv_bedWard").append("<li id='bedWard" + key + "' style='font-size:13px !important; padding:15px;' data-iconshadow='true' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-icon-arrow-r ui-btn-icon-right'>" + wardList[key].station + "</li>").listview('refresh').trigger('create');

                $("#bedWard" + key).on("click", { key: wardList[key].codeValue, value: wardList[key].station }, openWardPatientList);
            }


        }
    });

}

$(document).on('pageinit', '#WardPatientListPage', function () {
    $("#backWardPatList").on("click", backWardList);
    $("#divfrgt").on("click", function () {
        if (addWardPat.length != 0) {
            $("#panelWardPat").panel("open");
        }

    });
    $("#btnSubPanel").on("click", submitPatPanel);
    $("#btnClrPanel").on("click", clrPatPanel);
    // $("#WardPatientListPage").on("swiperight", backWardList);
});



$(document).on('pageinit', '#confirmWardPatAddPage', function () {
    $("#addPatCnfrmWardPat").on("click", addCnfrmPatList);
    $("#backCnfrmWardPat").on("click", backWardPatList);
    $("#confirmWardPatAddPage").on("swiperight", backWardPatList);
});

function addCnfrmPatList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if ($("#ddlPanelMyList").val() == 0) {
        //win  navigator.notification.alert('Please select a list.', alertDismissed, 'Validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                           {
                               message: 'Please select a list.',
                               duration: 2000, // ms
                               position: "center"
                           });
        return false;
    }
    var dataCnfrmPatList = {
        "listId": $("#ddlPanelMyList").val(),
        "operatorId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val(),
        "wardPatient": JSON.stringify(addWardPat)
    };
    $.ajax({
        url: link + "addWardPatient",
        data: JSON.stringify(dataCnfrmPatList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (getWardResult) {
                       SpinnerDialog.hide();
            statusAddPat = 0;
            $("#statusAddWardPat").html("");

            for (var key in addWardPat) {
                //$("#" + addWardPat[key].ID).show();
                var id = addWardPat[key].ID.replace("wardPatList", "username");
                $("#" + id).prop("checked", false).checkboxradio('refresh');
            }
            addWardPat = [];
            $("#lvAddWardPat").empty();
            $("#stationNmWardPat").html('');
            var statusAddWard = JSON.parse(getWardResult);
            var statusMrnAlready = '';
            var statusMrn = '';
            for (var key in statusAddWard) {
                if (statusAddWard[key].key == 0) {
                    if (statusMrn == '') {
                        statusMrn = statusAddWard[key].value;
                    }
                    else {
                        statusMrn = statusMrn + "," + statusAddWard[key].value;
                    }
                }
                else {
                    if (statusMrnAlready == '') {
                        statusMrnAlready = statusAddWard[key].value;
                    }
                    else {
                        statusMrnAlready = statusMrnAlready + "," + statusAddWard[key].value;
                    }

                }
            }
            if (statusMrn != '' && statusMrnAlready != '') {
                //win  navigator.notification.alert(statusMrnAlready + " already in selected list and " + statusMrn + " added to list.", alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: statusMrnAlready + " already in selected list and " + statusMrn + " added to list." ,
                                       duration: 2000, // ms
                                       position: "center"
                                   });

                var skillsSelect = document.getElementById("ddlPanelMyList");
                var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
                var id = $("#ddlPanelMyList").val();
                openListSearchPatient(id, selectedText, 'ward');
                // patientList();

            }
            else if (statusMrn != '' && statusMrnAlready == '') {
                //win  navigator.notification.alert(statusMrn + " added to list.", alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: statusMrn + " added to list." ,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                var skillsSelect = document.getElementById("ddlPanelMyList");
                var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
                var id = $("#ddlPanelMyList").val();
                openListSearchPatient(id, selectedText, 'ward');

            }
            else if (statusMrn == '' && statusMrnAlready != '') {
                //win  navigator.notification.alert(statusMrnAlready + " is already in selected list.", alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: statusMrnAlready + " is already in selected list." ,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
            }

        }
    });
}

function backWardPatList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#WardPatientListPage", { reverse: true, transition: "slide", changeHash: false });
}

function submitPatPanel() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#lvCnfrmWardPat").empty();
    $.mobile.changePage("#confirmWardPatAddPage", { transition: "slide", changeHash: false });
    $("#dNmCnfrmWardPat").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    getMyListDropDown();
    for (var i = 0; i < addWardPat.length; i++) {
        $("#lvCnfrmWardPat").append('<li><a href="" class="ui-btn" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + addWardPat[i].ptNm + '</div> <div><span class="iconTxt"></span><span style="margin-left:5px;">' + addWardPat[i].mrn + '</span> <span class="iconTxt" style="margin-left:10px;">' + addWardPat[i].gender + ' </span></div><div>  <span class="iconTxt"></span><span style="margin-left:5px;">' + addWardPat[i].nhs + '</span><span style="margin-left:10px;">Location: ' + addWardPat[i].loc + '</span></div> </a></li>').listview('refresh').trigger('create');
    }

}
function backWardList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#BedWardListPage", { reverse: true, transition: "slide", changeHash: false });

}
function clrPatPanel() {

    for (var i = 0; i < addWardPat.length; ++i) {
        //  $("#" + addWardPat[i].ID).show();
        var id = addWardPat[i].ID.replace("wardPatList", "username");
        $("#" + id).prop("checked", false).checkboxradio('refresh');

    }

    addWardPat = [];
    $("#lvAddWardPat").html('').trigger('refresh');
    $("#statusAddWardPat").html("0");
    statusAddPat = 0;
    $("#panelWardPat").panel("close");
}
function openWardPatientList(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
       SpinnerDialog.show(null, "Loading...", true);
    $.mobile.changePage("#WardPatientListPage", { transition: "slide", changeHash: false });
    $("#lv_WardPatList").empty();
    $("#dNmWardPatList").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    var codeValue = event.data.key;
    var station = event.data.value;

    $("#stationNmWardPat").html(station);

    var dataWardList = {
        "key": codeValue,
        "value": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getWardPatientList",
        data: JSON.stringify(dataWardList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (getWardPatResult) {
                         SpinnerDialog.hide();
            if (getWardPatResult == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            var wardPatList = JSON.parse(getWardPatResult);
            for (var key in wardPatList) {
                codeValue = codeValue + 1;

                $("#lv_WardPatList").append('<li><a href="javascript:void(0)" class="ui-btn" style="padding: 0px 0px 0px 0px !important;margin: 0px 0px 0px 0px !important;"><div style="margin: 0px 3px 0px 0px !important;border-width: 0px 1px 0px 0px !important; float:left; width:50px;" data-corners="false">  <div data-role="fieldcontain" id=wardPatList' + codeValue + '> <label for="username' + codeValue + '" style="border:#f6f6f6 !important;"></label><input ctype="chbWardPat" type="checkbox" name="username' + codeValue + '" id="username' + codeValue + '" value="" /></div></div><div style="margin-top:10px;"><div><div class="txtList"><span style="margin-left:5px;">' + wardPatList[key].patientName.toUpperCase() + '</span></div> <div><span class=""></span><span style="font-size:12px; margin-left:5px;">' + wardPatList[key].MRNno + '</span> <span  style="margin-left:10px; font-size:12px;">' + wardPatList[key].gender + ' </span><span  style="margin-left:10px; font-size:12px;">D.O.B: </span><span style="font-size:12px;">' + wardPatList[key].DOB + '</span></span></div><div>  <span ></span><span style="font-size:12px; margin-left:5px;">' + wardPatList[key].NHSno + '</span><span style="margin-left:10px; font-size:12px;"">Location: </span><span style=" font-size:12px;">' + wardPatList[key].location + '</span></div></div></div></li>').trigger('create');

                $("#username" + codeValue).on("click", { key: "wardPatList" + codeValue, mrn: wardPatList[key].MRNno, ptNm: wardPatList[key].patientName, nhs: wardPatList[key].NHSno, loc: wardPatList[key].location, gndr: wardPatList[key].gender, prsnId: wardPatList[key].PersonID, value: codeValue, station: station }, openPanelWardPat);
            }

        }
    });

}

var statusAddPat = 0;
var addWardPat = [];

function openPanelWardPat(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var id = event.data.key;
    var mrn = event.data.mrn;
    var ptNm = event.data.ptNm;
    var nhs = event.data.nhs;
    var value = event.data.value;
    var location = event.data.loc;
    var gender = event.data.gndr;
    var prsnId = event.data.prsnId;
    var station = event.data.station;
    var stat = 0;

    if (!($("#username" + value).is(':checked'))) {

        addWardPat = $.grep(addWardPat, function (element, index) {
            return element.ID != "wardPatList" + value;
        });

        $("#div" + value).remove().trigger('refresh');
        statusAddPat = statusAddPat - 1;
        $("#statusAddWardPat").html(" " + statusAddPat);

    }
    else {


        if (addWardPat.length == 0) {
            addWardPat.push({ "ID": id, "mrn": mrn, "nhs": nhs, "ptNm": ptNm, "loc": location, "gender": gender, "personId": prsnId });
            //$("#" + id).hide();
            $("#lvAddWardPat").append('<ul id="div' + value + '" cType="mealContainer" class="mt10" data-role="listview" data-divider-theme="a" data-inset="true"><li data-role="list-divider" role="heading">' + station + '</li><li  data-theme="a"><a href="#"><p class="listItem">' + ptNm + '</p><p class="listItem">' + mrn + '</p><p class="listItem">' + nhs + '</p><p class="listItem">' + location + '</p></a><a id="delete' + value + '"  href="#" data-icon="delete"></a></li></ul>').trigger('create');

            statusAddPat = statusAddPat + 1;
            $("#statusAddWardPat").html(" " + statusAddPat);
            $("#panelWardPat").trigger("updatelayout");

            $("#delete" + value).on("click", function () {
                $("#username" + value).prop("checked", false).checkboxradio('refresh');
                //  $("#wardPatList" + value).show().trigger('refresh');
                $("#div" + value).remove().trigger('refresh');
                $("#panelWardPat").trigger("updatelayout");
                statusAddPat = statusAddPat - 1;
                $("#statusAddWardPat").html(" " + statusAddPat);
                addWardPat = $.grep(addWardPat, function (element, index) {
                    return element.ID != "wardPatList" + value;
                });
                if (addWardPat.length == 0) {
                    $("#panelWardPat").panel("close");
                }

            });
        }
        else {
            for (var i = 0; i < addWardPat.length; i++) {
                if (addWardPat[i].ID == id) {
                    stat = 1;
                }
            }
            if (stat == 1) {
                //win     navigator.notification.alert('Already Selected.', alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                      {
                                           message: 'Already Selected.',
                                           duration: 2000, // ms
                                           position: "center"
                                       });
            }
            else if (stat == 0) {
                addWardPat.push({ "ID": id, "mrn": mrn, "nhs": nhs, "ptNm": ptNm, "loc": location, "gender": gender, "personId": prsnId });
                //  $("#" + id).hide();
                $("#lvAddWardPat").append('<ul id="div' + value + '" cType="mealContainer" class="mt10" data-role="listview" data-divider-theme="a" data-inset="true"><li data-role="list-divider" role="heading">' + station + '</li><li  data-theme="a"><a href="#"><p class="listItem">' + ptNm + '</p><p class="listItem">' + mrn + '</p><p class="listItem">' + nhs + '</p><p class="listItem">' + location + '</p></a><a id="delete' + value + '"  href="#" data-icon="delete"></a></li></ul>').trigger('create');

                statusAddPat = statusAddPat + 1;
                $("#statusAddWardPat").html(" " + statusAddPat);
                $("#panelWardPat").trigger("updatelayout");

                $("#delete" + value).on("click", function () {
                    $("#username" + value).prop("checked", false).checkboxradio('refresh');

                    // $("#wardPatList" + value).show().trigger('refresh');
                    $("#div" + value).remove().trigger('refresh');
                    $("#panelWardPat").trigger("updatelayout");
                    statusAddPat = statusAddPat - 1;
                    $("#statusAddWardPat").html(" " + statusAddPat);
                    addWardPat = $.grep(addWardPat, function (element, index) {
                        return element.ID != "wardPatList" + value;
                    });
                    if (addWardPat.length == 0) {
                        $("#panelWardPat").panel("close");
                    }

                });
            }
        }

    }





}


function getMyListDropDown() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#ddlPanelMyList").empty();
    $("#ddlPanelMyList").append('<option value="0">Select List</option>')
    var myList = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getlist",
        data: JSON.stringify(myList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                    SpinnerDialog.hide();
                 navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (myList) {
                                        SpinnerDialog.hide();
            if (myList == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            else if (myList == 0) {
                $("#ddlPanelMyList").html("<option value='0'>No List Found</option>");
                return false;
            }

            var counter = 0;
            var listInfo = JSON.parse(myList);

            for (var key in listInfo) {
                if (listInfo[key].physicianListId == 1) {

                    $("#ddlPanelMyList").append("<option value=" + listInfo[key].ID + ">" + listInfo[key].Name + "</option>").change();

                }
                else {
                    ++counter;
                }
            }

            if (counter == listInfo.length) {
                $("#ddlPanelMyList").append("<option value='0'>No List Found</option>");
            }
            else {
                if ($("#hiddenMyList").val() == "1") {
                    $("#ddlPanelMyList").val($("#hdnListId").val()).change().trigger('refresh');
                }
            }
        }
    });

}

function openAddPatientOptions() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#AddPatientOptionsPage", { transition: "slide", changeHash: false });
    $("#dNmAddPatOptPage").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
}


function openLandingPage() {

    $.mobile.changePage("#siteLandingPage", { transition: "slide", changeHash: false });

    $("#dname_landingPage").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#dname_myLists").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#dname_PatientList").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
}
function backLandingPage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#siteLandingPage", { reverse: true, transition: "slide", changeHash: false });
}

//-------------------------------------------------Landing Page Ends------------------------------------------//

//------------------------------------------------Edit List page function starts--------------------------------//

$(document).on('pageinit', '#PatientEditlist', function () {
    $("#createList").on("click", openCreateList);
    $("#back_addlist").on("click", backMyList);
    $("#PatientEditlist").on("swiperight", backMyList);
});

function openEditList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#lvListName").html('');
    $("#dname_editlist").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
        SpinnerDialog.show(null, "Loading...", true);

    var dataEditList = {
        "key": $("#hdnuserid").val(),
        "value": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getUserListStatus",
        data: JSON.stringify(dataEditList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (userListType) {
                       SpinnerDialog.hide();
            $.mobile.changePage("#PatientEditlist", { transition: "slide", changeHash: false });
            if (userListType == "1") {
                $("#lvListName").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Lists Found</div>");
            }
            else if (userListType == "failed") {
                //win      navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                return false;
            }
            else {

                var listUserType = JSON.parse(userListType);

                for (var key in listUserType) {


                    $("#lvListName").append('<li id="lstNm' + listUserType[key].listId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + listUserType[key].listName + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"    id="owner' + listUserType[key].listId + '"/></div><div style="float:right; margin-right:30px; "><input id="admin' + listUserType[key].listId + '"    type="checkbox"  /></div></div></div></li>');

                    $("#lstNm" + listUserType[key].listId).on("click", { key: listUserType[key].listId, value: listUserType[key].listName }, openUpdateListPage);

                    if (listUserType[key].listRole == "admin") {
                        $("#admin" + listUserType[key].listId).prop("checked", true);
                        $("#owner" + listUserType[key].listId).prop("checked", false);
                        $("#admin" + listUserType[key].listId).prop("disabled", "true");
                        $("#owner" + listUserType[key].listId).prop("disabled", "true");
                    }

                    if (listUserType[key].listRole == "creator") {
                        $("#admin" + listUserType[key].listId).prop("checked", false);
                        $("#owner" + listUserType[key].listId).prop("checked", true);
                        $("#admin" + listUserType[key].listId).prop("disabled", "true");
                        $("#owner" + listUserType[key].listId).prop("disabled", "true");
                    }
                }
            }

        }
    });
}

$(document).on('pageinit', '#EditUserListPage', function () {
    $("#backEditUserList").on("click", backEditList);
    //  $("#EditUserListPage").on("swiperight", backEditList);
    $("#saveEditUserList").on("click", updateUserList);
});

var arrEditUsersList = [];

function updateUserList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    arrEditUsersList = [];

    if ($("#lstNameEditUser").val() == '') {
        //win      navigator.notification.alert('Enter list name.', alertDismissed, 'validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                               {
                                   message: 'Enter list name.',
                                   duration: 2000, // ms
                                   position: "center"
                               });
        return false;
    }
    else if (!$.trim($("#lstNameEditUser").val()).charAt(0).match('^[a-zA-Z0-9]')) {
        //win      navigator.notification.alert('Characters used in list name are not valid.', alertDismissed, 'validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                               {
                                   message: 'Characters used in list name are not valid.',
                                   duration: 2000, // ms
                                   position: "center"
                               });
        return false;
    }
    else {
        $("#lvEditUserList").find('li[ctype=divEditUserList]').each(function () {
            var chkedAdmin = "0";
            var chkedAccess = "0";
            var id = $(this).attr("id").replace("editUser", "");
            if ($("#chboxAdmin" + id).is(':checked')) {

                chkedAdmin = "1";
            }
            if ($("#chboxAccess" + id).is(':checked')) {

                chkedAccess = "1";
            }
            if (chkedAccess == "1" || chkedAdmin == "1") {
                arrEditUsersList.push({ "userid": id, "accesschk": chkedAccess, "adminchk": chkedAdmin });
            }
        });

        var UpdateList = {
            "listid": $("#hdnListIdEditUser").val(),
            "listname": $.trim($("#lstNameEditUser").val()),
            "facilityId": $("#hdnfacilityId").val(),
            "creatorId": $("#hdnuserid").val(),
            "useraccessdata": JSON.stringify(arrEditUsersList)
        };

        $.ajax({
            url: link + "addListUser",
            data: JSON.stringify(UpdateList),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                        SpinnerDialog.hide();
                     navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (statusNewList) {

                                            SpinnerDialog.hide();
                if (statusNewList == "s") {
                    openMyList();
                }

                else if (statusNewList == "failed") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                    return false;
                }

                else if (statusNewList == "0") {
                    //win  navigator.notification.alert('List name already exists.', alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                       {
                                           message: 'List name already exists.',
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                    return false;
                }
            }
        });
    }
}



function openUpdateListPage(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var items1 = [];
    var checkedStatus = [];
    $("#searchEditUser").val('');
    $("#dNameEditUser").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#lvEditUserList").html('');
    var listId = event.data.key;
    var listName = event.data.value;
    $("#hdnListIdEditUser").val(listId);
    $("#lstNameEditUser").val(listName);
    var dataEditList = {
        "key": $("#hdnuserid").val(),
        "value": listId
    };
    $.ajax({
        url: link + "getEditUserList",
        data: JSON.stringify(dataEditList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (editListstatus) {
            if (editListstatus == "failed") {
                //win      navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                return false;
            }
            $.mobile.changePage("#EditUserListPage", { transition: "slide", changeHash: false });
            var resultEdit = JSON.parse(editListstatus);
            var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0;
            for (var key in resultEdit) {
                if (resultEdit[key].name.indexOf('a') == 0 || resultEdit[key].name.indexOf('A') == 0) {
                    if (a == 0) {
                        $("#lvEditUserList").append('<li id="A" style="width:100%;"><a name="A" class="title">A</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        a = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('b') == 0 || resultEdit[key].name.indexOf('B') == 0) {
                    if (b == 0) {
                        $("#lvEditUserList").append('<li id="B" style="width:100%;"><a name="B" class="title">B</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        b = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('c') == 0 || resultEdit[key].name.indexOf('C') == 0) {
                    if (c == 0) {
                        $("#lvEditUserList").append('<li id="C" style="width:100%;"><a name="C" class="title">C</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        c = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('d') == 0 || resultEdit[key].name.indexOf('D') == 0) {
                    if (d == 0) {
                        $("#lvEditUserList").append('<li id="D" style="width:100%;"><a name="D" class="title">D</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        d = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('e') == 0 || resultEdit[key].name.indexOf('E') == 0) {
                    if (e == 0) {
                        $("#lvEditUserList").append('<li id="E" style="width:100%;"><a name="E" class="title">E</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        e = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('f') == 0 || resultEdit[key].name.indexOf('F') == 0) {
                    if (f == 0) {
                        $("#lvEditUserList").append('<li id="F" style="width:100%;"><a name="F" class="title">F</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        f = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('g') == 0 || resultEdit[key].name.indexOf('G') == 0) {
                    if (g == 0) {
                        $("#lvEditUserList").append('<li id="G" style="width:100%;"><a name="G" class="title">G</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        g = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('h') == 0 || resultEdit[key].name.indexOf('H') == 0) {
                    if (h == 0) {
                        $("#lvEditUserList").append('<li id="H" style="width:100%;"><a name="H" class="title">H</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        h = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('i') == 0 || resultEdit[key].name.indexOf('I') == 0) {
                    if (i == 0) {
                        $("#lvEditUserList").append('<li id="I" style="width:100%;"><a name="I" class="title">I</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        i = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('j') == 0 || resultEdit[key].name.indexOf('J') == 0) {
                    if (j == 0) {
                        $("#lvEditUserList").append('<li id="J" style="width:100%;"><a name="J" class="title">J</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        j = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('k') == 0 || resultEdit[key].name.indexOf('K') == 0) {
                    if (k == 0) {
                        $("#lvEditUserList").append('<li id="K" style="width:100%;"><a name="K" class="title">K</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        k = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('l') == 0 || resultEdit[key].name.indexOf('L') == 0) {
                    if (l == 0) {
                        $("#lvEditUserList").append('<li id="L" style="width:100%;"><a name="L" class="title">L</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        l = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('m') == 0 || resultEdit[key].name.indexOf('M') == 0) {
                    if (m == 0) {
                        $("#lvEditUserList").append('<li id="M" style="width:100%;"><a name="M" class="title">M</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        m = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('n') == 0 || resultEdit[key].name.indexOf('N') == 0) {
                    if (n == 0) {
                        $("#lvEditUserList").append('<li id="N" style="width:100%;"><a name="N" class="title">N</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        n = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('o') == 0 || resultEdit[key].name.indexOf('O') == 0) {
                    if (o == 0) {
                        $("#lvEditUserList").append('<li id="O" style="width:100%;"><a name="O" class="title">O</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        o = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('p') == 0 || resultEdit[key].name.indexOf('P') == 0) {
                    if (p == 0) {
                        $("#lvEditUserList").append('<li id="P" style="width:100%;"><a name="P" class="title">P</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        p = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('q') == 0 || resultEdit[key].name.indexOf('Q') == 0) {
                    if (q == 0) {
                        $("#lvEditUserList").append('<li id="Q" style="width:100%;"><a name="Q" class="title">Q</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        q = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('r') == 0 || resultEdit[key].name.indexOf('R') == 0) {
                    if (r == 0) {
                        $("#lvEditUserList").append('<li id="R" style="width:100%;"><a name="R" class="title">R</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        r = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('s') == 0 || resultEdit[key].name.indexOf('S') == 0) {
                    if (s == 0) {
                        $("#lvEditUserList").append('<li id="S" style="width:100%;"><a name="S" class="title">S</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        s = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('t') == 0 || resultEdit[key].name.indexOf('T') == 0) {
                    if (t == 0) {
                        $("#lvEditUserList").append('<li id="T" style="width:100%;"><a name="T" class="title">T</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        t = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('u') == 0 || resultEdit[key].name.indexOf('U') == 0) {
                    if (u == 0) {
                        $("#lvEditUserList").append('<li id="U" style="width:100%;"><a name="U" class="title">U</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        u = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('v') == 0 || resultEdit[key].name.indexOf('V') == 0) {
                    if (v == 0) {
                        $("#lvEditUserList").append('<li id="V" style="width:100%;"><a name="V" class="title">V</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        v = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('w') == 0 || resultEdit[key].name.indexOf('W') == 0) {
                    if (w == 0) {
                        $("#lvEditUserList").append('<li id="W" style="width:100%;"><a name="W" class="title">W</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        w = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('x') == 0 || resultEdit[key].name.indexOf('X') == 0) {
                    if (x == 0) {
                        $("#lvEditUserList").append('<li id="X" style="width:100%;"><a name="X" class="title">X</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        x = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('y') == 0 || resultEdit[key].name.indexOf('Y') == 0) {
                    if (y == 0) {
                        $("#lvEditUserList").append('<li id="Y" style="width:100%;"><a name="Y" class="title">Y</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        y = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }
                if (resultEdit[key].name.indexOf('z') == 0 || resultEdit[key].name.indexOf('Z') == 0) {
                    if (z == 0) {
                        $("#lvEditUserList").append('<li id="Z" style="width:100%;"><a name="Z" class="title">Z</a>');
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');

                        z = 1;
                    }
                    else {
                        $("#lvEditUserList").append('<li ctype="divEditUserList" id="editUser' + resultEdit[key].doctorId + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + resultEdit[key].name + '</div><div style="float:right;"><div style="float:left; margin-right:50px; "><input type="checkbox"  id="chboxAdmin' + resultEdit[key].doctorId + '"/></div><div style="float:right; margin-right:40px; "><input type="checkbox"  id="chboxAccess' + resultEdit[key].doctorId + '"/></div></div></div></li>');
                    }
                }

                $("#chboxAdmin" + resultEdit[key].doctorId).on("click", { key: resultEdit[key].doctorId }, checkboxAcess);
                $("#chboxAccess" + resultEdit[key].doctorId).on("click", { key: resultEdit[key].doctorId }, checkboxAdmin);

                checkedStatus.push({ "id": resultEdit[key].doctorId, "access": resultEdit[key].access, "admin": resultEdit[key].admin })

            }
            for (var val = 0; val < checkedStatus.length; ++val) {
                if (checkedStatus[val].access == "1" && checkedStatus[val].admin == "1") {
                    $("#chboxAccess" + checkedStatus[val].id).prop("checked", true);
                    $("#chboxAdmin" + checkedStatus[val].id).prop("checked", true);
                }
                else if (checkedStatus[val].access == "1" && checkedStatus[val].admin == "0") {
                    $("#chboxAccess" + checkedStatus[val].id).prop("checked", true);
                    $("#chboxAdmin" + checkedStatus[val].id).prop("checked", false);
                }
                else if (checkedStatus[val].access == "0" && checkedStatus[val].admin == "1") {
                    $("#chboxAccess" + checkedStatus[val].id).prop("checked", false);
                    $("#chboxAdmin" + checkedStatus[val].id).prop("checked", true);
                }
            }

            //  $('#divEditUser').sliderNav({ items: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], height: '800', arrows: false });

            var it = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z];

            for (var val = 0; val < 26; val++) {
                if (it[val] != 0) {
                    items1.push(String.fromCharCode('A'.charCodeAt(0) + val));
                }

            }

            $('#divEditUser').sliderNav({ items: items1, height: '800', arrows: false });
        }
    });

}

function checkboxAcess(event) {
    var id = event.data.key;

    if ($("#chboxAdmin" + id).is(':checked')) {
        $("#chboxAccess" + id).prop("checked", true);
    }

}

function checkboxAdmin(event) {
    var id = event.data.key;
    if (!$("#chboxAccess" + id).is(':checked')) {
        if ($("#chboxAdmin" + id).is(':checked')) {
            $("#chboxAdmin" + id).prop("checked", false);
        }
    }
}

//function updateEditList() {
//       SpinnerDialog.show(null, "Loading...", true);
//    var listArr = [];
//    $("#checkBox_EditList").find('input[ctype=checkboxList]').each(function () {
//        if ($(this).is(':checked')) {
//            listArr.push({ "ID": $(this).attr("id").replace("checkBox", "") });
//        }
//    });


//    var msg = {
//        "Id": $("#hdnuserid").val(),
//        "value": JSON.stringify(listArr),
//        "facilityId": $("#hdnfacilityId").val()
//    };
//    $.ajax({
//        url: link + "updatephysicianlist",
//        data: JSON.stringify(msg),
//        dataType: "json",
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        error: function (request, error) {
//                     SpinnerDialog.hide();
//                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
//        },
//        success: function (editListstatus) {
//                     SpinnerDialog.hide();
//            if (editListstatus == "failed") {
//                //win      navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
//                                window.plugins.toast.showWithOptions(
//                                       {
//                                           message: failedMsg,
//                                           duration: 2000, // ms
//                                           position: "center"
//                                       });
//                return false;
//            }
//            var statusEditList = JSON.parse(editListstatus);
//            if (statusEditList == 0) {
//                //win              navigator.notification.alert('List Updated Successfully.', alertDismissed, 'Success', 'Ok');
//                                window.plugins.toast.showWithOptions(
//                                       {
//                                           message: "List Updated Successfully.",
//                                           duration: 2000, // ms
//                                           position: "center"
//                                       });
//                backLandingPage();
//            }
//            else {
//                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
//                                window.plugins.toast.showWithOptions(
//                                       {
//                                           message: failedMsg,
//                                           duration: 2000, // ms
//                                           position: "center"
//                                      });
//            }
//        }
//    });
//}
//-----------------------------------------------Edit List Page ends-------------------------------------------------//

//-----------------------------------------------My List Page function starts-------------------------------------------//

$(document).on('pageinit', '#PatientMyLists', function () {
    $("#back_mylists").on("click", backLandingPage);
    $("#PatientMyLists").on("swiperight", backLandingPage);
    $("#addPatMyList").on("click", { key: "0" }, openAddPatOptions);
    $("#addListMyList").on("click", openEditList);
});

function openCreateList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#CreateListPage", { transition: "slide", changeHash: false });
    $("#dNameCreateList").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#txtListName").val('');
    $("#searchCreateList").val('');
    getUsersList();
}
$(document).on('pageinit', '#CreateListPage', function () {
    $("#backCreateList").on("click", backEditList);
    // $("#CreateListPage").on("swiperight", backEditList);
    $("#saveCreateList").on("click", saveNewList);
});

function backEditList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientEditlist", { reverse: true, transition: "slide", changeHash: false });
}


function getUsersList() {
    if (sessionTimeOut() == false) {
        return false;
    }
       SpinnerDialog.show(null, "Loading...", true);
    var items = [];
    $("#lvCreateList").empty();
    var tokenKey = {
        "key": $("#hdnuserid").val(),
        "value": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getUsersList",
        data: JSON.stringify(tokenKey),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                    SpinnerDialog.hide();
                 navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (usersList) {
                                        SpinnerDialog.hide();
            if (usersList == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            else if (usersList == 'failed') {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                                          {
                                                              message: failedMsg,
                                                              duration: 2000, // ms
                                                              position: "center"
                                                          });
                return false;
            }

            var UserList = JSON.parse(usersList);

            var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0;
            for (var key in UserList) {

                if (UserList[key].value.indexOf('a') == 0 || UserList[key].value.indexOf('A') == 0) {
                    if (a == 0) {
                        $("#lvCreateList").append('<li id="A" style="width:100%;"><a name="A" class="title">A</a>');

                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        a = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('b') == 0 || UserList[key].value.indexOf('B') == 0) {
                    if (b == 0) {
                        $("#lvCreateList").append('<li id="B" style="width:100%;"><a name="B" class="title">B</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        b = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('c') == 0 || UserList[key].value.indexOf('C') == 0) {
                    if (c == 0) {
                        $("#lvCreateList").append('<li id="C" style="width:100%;"><a name="C" class="title">C</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        c = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('d') == 0 || UserList[key].value.indexOf('D') == 0) {
                    if (d == 0) {
                        $("#lvCreateList").append('<li id="D" style="width:100%;"><a name="D" class="title">D</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        d = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('e') == 0 || UserList[key].value.indexOf('E') == 0) {
                    if (e == 0) {
                        $("#lvCreateList").append('<li id="E" style="width:100%;"><a name="E" class="title">E</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        e = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('f') == 0 || UserList[key].value.indexOf('F') == 0) {
                    if (f == 0) {
                        $("#lvCreateList").append('<li id="F" style="width:100%;"><a name="F" class="title">F</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        f = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('g') == 0 || UserList[key].value.indexOf('G') == 0) {
                    if (g == 0) {
                        $("#lvCreateList").append('<li id="G" style="width:100%;"><a name="G" class="title">G</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        g = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('h') == 0 || UserList[key].value.indexOf('H') == 0) {
                    if (h == 0) {
                        $("#lvCreateList").append('<li id="H" style="width:100%;"><a name="H" class="title">H</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        h = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('i') == 0 || UserList[key].value.indexOf('I') == 0) {
                    if (i == 0) {
                        $("#lvCreateList").append('<li id="I" style="width:100%;"><a name="I" class="title">I</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        i = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('j') == 0 || UserList[key].value.indexOf('J') == 0) {
                    if (j == 0) {
                        $("#lvCreateList").append('<li id="J" style="width:100%;"><a name="J" class="title">J</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        j = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('k') == 0 || UserList[key].value.indexOf('K') == 0) {
                    if (k == 0) {
                        $("#lvCreateList").append('<li id="K" style="width:100%;"><a name="K" class="title">K</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        k = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('l') == 0 || UserList[key].value.indexOf('L') == 0) {
                    if (l == 0) {
                        $("#lvCreateList").append('<li id="L" style="width:100%;"><a name="L" class="title">L</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        l = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('m') == 0 || UserList[key].value.indexOf('M') == 0) {
                    if (m == 0) {
                        $("#lvCreateList").append('<li id="M" style="width:100%;"><a name="M" class="title">M</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        m = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('n') == 0 || UserList[key].value.indexOf('N') == 0) {
                    if (n == 0) {
                        $("#lvCreateList").append('<li id="N" style="width:100%;"><a name="N" class="title">N</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        n = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('o') == 0 || UserList[key].value.indexOf('O') == 0) {
                    if (o == 0) {
                        $("#lvCreateList").append('<li id="O" style="width:100%;"><a name="O" class="title">O</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        o = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('p') == 0 || UserList[key].value.indexOf('P') == 0) {
                    if (p == 0) {
                        $("#lvCreateList").append('<li id="P" style="width:100%;"><a name="P" class="title">P</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        p = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('q') == 0 || UserList[key].value.indexOf('Q') == 0) {
                    if (q == 0) {
                        $("#lvCreateList").append('<li id="Q" style="width:100%;"><a name="Q" class="title">Q</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        q = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('r') == 0 || UserList[key].value.indexOf('R') == 0) {
                    if (r == 0) {
                        $("#lvCreateList").append('<li id="R" style="width:100%;"><a name="R" class="title">R</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        r = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }

                if (UserList[key].value.indexOf('s') == 0 || UserList[key].value.indexOf('S') == 0) {
                    if (s == 0) {
                        $("#lvCreateList").append('<li id="S" style="width:100%;"><a name="S" class="title">S</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        s = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('t') == 0 || UserList[key].value.indexOf('T') == 0) {
                    if (t == 0) {
                        $("#lvCreateList").append('<li id="T" style="width:100%;"><a name="T" class="title">T</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        t = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('u') == 0 || UserList[key].value.indexOf('U') == 0) {
                    if (u == 0) {
                        $("#lvCreateList").append('<li id="U" style="width:100%;"><a name="U" class="title">U</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        u = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('v') == 0 || UserList[key].value.indexOf('V') == 0) {
                    if (v == 0) {
                        $("#lvCreateList").append('<li id="V" style="width:100%;"><a name="V" class="title">V</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        v = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('w') == 0 || UserList[key].value.indexOf('W') == 0) {
                    if (w == 0) {
                        $("#lvCreateList").append('<li id="W" style="width:100%;"><a name="W" class="title">W</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        w = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('x') == 0 || UserList[key].value.indexOf('X') == 0) {
                    if (x == 0) {
                        $("#lvCreateList").append('<li id="X" style="width:100%;"><a name="X" class="title">X</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        x = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('y') == 0 || UserList[key].value.indexOf('Y') == 0) {
                    if (y == 0) {
                        $("#lvCreateList").append('<li id="Y" style="width:100%;"><a name="Y" class="title">Y</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        y = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }
                if (UserList[key].value.indexOf('z') == 0 || UserList[key].value.indexOf('Z') == 0) {
                    if (z == 0) {
                        $("#lvCreateList").append('<li id="Z" style="width:100%;"><a name="Z" class="title">Z</a>');
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');

                        z = 1;
                    }
                    else {
                        $("#lvCreateList").append('<li ctype="divUserList" id="list' + UserList[key].key + '" ><div  class="ui-content" style="width:100%;"><div style="color:#000;  float:left;">' + UserList[key].value + '</div><div style="float:right;"><div style="float:left; margin-right:30px; "><input type="checkbox"  id="chbAdmin' + UserList[key].key + '"/></div><div style="float:right; margin-right:60px; "><input type="checkbox"  id="chbAccess' + UserList[key].key + '"/></div></div></div></li>');
                    }
                }


                $("#chbAdmin" + UserList[key].key).on("click", { key: UserList[key].key }, checkAcess);
                $("#chbAccess" + UserList[key].key).on("click", { key: UserList[key].key }, checkAdmin);

            }

            //   $('#divScrollable').sliderNav({ items: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], height: '800', arrows: false });

            var it = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z];

            for (var val = 0; val < 26; val++) {
                if (it[val] != 0) {
                    items.push(String.fromCharCode('A'.charCodeAt(0) + val));
                }

            }

            $('#divScrollable').sliderNav({ items: items, height: '800', arrows: false });


        }
    });

}

var arrUsersList = [];
function validateNewList() {
    if ($("#txtListName").val() == '') {
        //win  navigator.notification.alert('Enter list name.', alertDismissed, 'Validation Error', 'Ok');
                                window.plugins.toast.showWithOptions(
                               {
                                   message: 'Enter list name.',
                                   duration: 2000, // ms
                                   position: "center"
                              });

        return false;
    }
    else {
        if (validateSpecChar('txtListName')) {

            return true;
        }
        else {
            //win  navigator.notification.alert('Characters used in list name are not valid.', alertDismissed, 'Validation Error', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                   {
                                       message: 'Characters used in list name are not valid.',
                                       duration: 2000, // ms
                                       position: "center"
                                  });
            return false;
        }
    }
    return true;
}

function validateSpecChar(id) {
    if (!$.trim($("#" + id).val()).charAt(0).match('^[a-zA-Z0-9]')) {

        return false;
    }
    return true;
}

function saveNewList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (validateNewList()) {
        arrUsersList = [];
        $("#lvCreateList").find('li[ctype=divUserList]').each(function () {
            var chkAdmin = "0";
            var chkAccess = "0";
            var id = $(this).attr("id").replace("list", "");
            if ($("#chbAdmin" + id).is(':checked')) {

                chkAdmin = "1";
            }
            if ($("#chbAccess" + id).is(':checked')) {

                chkAccess = "1";
            }
            if (chkAccess == "1" || chkAdmin == "1") {
                arrUsersList.push({ "userid": id, "accesschk": chkAccess, "adminchk": chkAdmin });
            }
        });

         SpinnerDialog.show(null, "Loading...", true);

        var createList = {
            "listid": "0",
            "listname": $.trim($("#txtListName").val()),
            "facilityId": $("#hdnfacilityId").val(),
            "creatorId": $("#hdnuserid").val(),
            "useraccessdata": JSON.stringify(arrUsersList)
        };
        $.ajax({
            url: link + "addListUser",
            data: JSON.stringify(createList),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                        SpinnerDialog.hide();
                     navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (statusNewList) {
                                            SpinnerDialog.hide();
                if (statusNewList == "s") {
                    openMyList();
                }
                else if (statusNewList == "0") {
                    //win  navigator.notification.alert('List name already exists.', alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                       {
                                           message: 'List name already exists.',
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                    return false;
                }
                else if (statusNewList == "failed") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                    return false;
                }
            }
        });
    }
}

function checkAdmin(event) {
    var id = event.data.key;
    if (!$("#chbAccess" + id).is(':checked')) {
        if ($("#chbAdmin" + id).is(':checked')) {
            $("#chbAdmin" + id).prop("checked", false);
        }
    }
}

function checkAcess(event) {
    var id = event.data.key;

    if ($("#chbAdmin" + id).is(':checked')) {
        $("#chbAccess" + id).prop("checked", true);
    }
}
function openAddPatOptions(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var key = event.data.key;
    $("#hiddenMyList").val(key);
    $.mobile.changePage("#AddPatientScreenPage", { transition: "slide", changeHash: false });
    $("#dNmAddPatOpt").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
}

$(document).on('pageinit', '#AddPatientScreenPage', function () {
    $("#backAddPatOpt").on("click", backMyList);
    $("#AddPatientScreenPage").on("swiperight", backMyList);
    $("#srchWardAddPatOpt").on("click", openWardList);
    $("#srchMrnAddPatOpt").on("click", openSearchPatient);

});

function openMyList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#lv_mylists").html('');
     SpinnerDialog.show(null, "Loading...", true);



    var tokenKey = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };


    $.ajax({
        url: link + "getlist",
        data: JSON.stringify(tokenKey),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                    SpinnerDialog.hide();
                 navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (myList) {
                                        SpinnerDialog.hide();
            if (myList == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            else if (myList == 0) {
                $.mobile.changePage("#PatientMyLists", { transition: "slide", changeHash: false });
                $("#lv_mylists").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Lists Found</div>");
                return false;
            }

            var counter = 0;

            $.mobile.changePage("#PatientMyLists", { transition: "slide", changeHash: false });
            var listInfo = JSON.parse(myList);

            for (var key in listInfo) {
                if (listInfo[key].physicianListId == 1) {

                    $("#lv_mylists").append("<li id='list" + listInfo[key].ID + "' style='font-size:13px !important; padding:15px;' data-iconshadow='true' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-icon-arrow-r ui-btn-icon-right'>" + listInfo[key].Name + "</li>").listview('refresh').trigger('create');

                    $("#list" + listInfo[key].ID).on("click", { key: listInfo[key].ID, value: listInfo[key].Name, checknm: "list" }, openPatientList);

                }
                else {
                    ++counter;
                }
            }
            if (counter == listInfo.length) {
                $("#lv_mylists").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Lists Found</div>");
            }
        }
    });

}

function backMyList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientMyLists", { reverse: true, transition: "slide", changeHash: false });
}
//------------------------------------------------My List Page ends---------------------------------------------------------//

//--------------------------------------------------Patient List start------------------------------------------------------//
$(document).on('pageinit', '#PatientList', function () {
    $("#backPatientList").on("click", backMyList);
    $("#PatientList").on("swiperight", backMyList);
    $("#addPatient_list").on("click", { key: "1" }, openAddPatOptions);
});
var listId = '';
var patientFlag = '';


function openPatientList(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var listName = '';

    var id = event.data.key;
    var listnm = event.data.value;
    var flagPatient = event.data.checknm;

    $("#hdnListId").val(id);

    listName = listnm;
    listId = id;
    if (flagPatient == "search") {
        patientFlag = "search";
    }
    else {
        patientFlag = "list";
    }

    $.mobile.changePage("#PatientList", { transition: "slide", changeHash: false });

              SpinnerDialog.show(null, "Loading...", true);

    $("#ul_PatientList").empty();
    $("#listnm").html(listnm);
    var dataPatientlist = {
        "listID": id,
        "userId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };

    $.ajax({
        url: link + "getListofPatient",
        data: JSON.stringify(dataPatientlist),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (PatientList) {
                      SpinnerDialog.hide();

            if (PatientList == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            if (PatientList == "[]" || PatientList == "") {
                $("#ul_PatientList").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Patient Found</div>");
                return false;
            }
            if (PatientList == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            var listInfo = JSON.parse(PatientList);

            for (var key in listInfo) {

                $("#ul_PatientList").append('<li id="patientList' + key + '"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName.toUpperCase() + '</div> <div><span>' + listInfo[key].MRNno + '</span> <span  style="margin-left:10px;">' + listInfo[key].gender + ' </span><span  style="margin-left:10px;">D.O.B: </span><span>' + listInfo[key].DOB + '</span></div><div>  <span ></span><span>' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#patientList" + key).on("click", { key: listInfo[key].PersonID, value: "patList" }, openPatientTestDetails);
            }
        }
    });
}
function backPatientList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (flagDet == "patList") {
        $(":mobile-pagecontainer").pagecontainer("change", "#PatientList", { reverse: true, transition: "slide", changeHash: false });
    }
    else if (flagDet == "wardPat") {
        $(":mobile-pagecontainer").pagecontainer("change", "#WardPatientPage", { reverse: true, transition: "slide", changeHash: false });
    }
    else {
        $(":mobile-pagecontainer").pagecontainer("change", "#ViewPatientPage", { reverse: true, transition: "slide", changeHash: false });
    }
}
//---------------------------------------------------Patient List ends here-------------------------------------------------//

//------------------------------Search Patient starts----------------------------------------------------------------------//

$(document).on('pageinit', '#SearchPatient', function () {
    $("#btnBackSearch").on("click", backAddPatScreenPage);
    $("#SearchPatient").on("swiperight", backAddPatScreenPage);
    $("#SearchResult").on("click", addPatient);
    $("#btnAddPatientSearch").on("click", addPatient);
    $("#searchMRN").on("click", SearchPatient);
    $("#txtSearch").on("keyup", function (event) {
        if (event.keyCode == '13') {

            SearchPatient();
        }

    });
});

function addPatient() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if ($("#hdnpersonId").val() == "") {
        //win     navigator.notification.alert('Please enter a valid MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter a valid MRN.",
                       duration: 2000, // ms
                       position: "center"
                   });

        return false;
    }
    else if ($('#ddl_list').val() == 0) {
        //win     navigator.notification.alert('Please select list.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please select list.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }
    else {
               SpinnerDialog.show(null, "Loading...", true);
        var dataPatientAdd = {
            "MRNno": $("#hdnMrnNo").val(),
            "PersonID": $("#hdnpersonId").val(),
            "listId": $("#ddl_list").val(),
            "operatorID": $("#hdnuserid").val(),
            "token": $("#hdntokenKey").val()
        };
        $.ajax({
            url: link + "addPatient",
            data: JSON.stringify(dataPatientAdd),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                              SpinnerDialog.hide();
                        navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (addPatientResult) {
                           SpinnerDialog.hide();

                var addResult = JSON.parse(addPatientResult);
                var idReslt = addResult["ID"];
                if (idReslt == 2) {
                    //win              navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: session,
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });

                    setTimeout(function () { logout(); }, 2000);

                    return false;
                }
                if (idReslt == 0) {
                    //win  navigator.notification.alert('Patient added to list.', alertDismissed, 'Success', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: "Patient added to list.",
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });
                    var ddlId = $("#ddl_list").val();
                    $("#hdnListId").val($("#ddl_list").val());
                    var skillsSelect = document.getElementById("ddl_list");
                    var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
                    //openPatientList();
                    openListSearchPatient(ddlId, selectedText, 'search');

                }
                else if (idReslt == 1) {
                    //win  navigator.notification.alert('Patient already exist.', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: "Patient already exists.",
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });
                } else if (idReslt == "failed") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: failedMsg,
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });
                }
            }
        });
    }
}

function openListSearchPatient(id, listnm, flagPatient) {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#hdnListId").val(id);
    var listName = '';

    listName = listnm;
    listId = id;
    if (flagPatient == "search") {
        patientFlag = "search";
    }
    else {
        patientFlag = "list";
    }

    $.mobile.changePage("#PatientList", { transition: "slide", changeHash: false });

              SpinnerDialog.show(null, "Loading...", true);

    $("#ul_PatientList").empty();
    $("#listnm").html(listnm);
    var dataPatientlist = {
        "listID": id,
        "userId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };

    $.ajax({
        url: link + "getListofPatient",
        data: JSON.stringify(dataPatientlist),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (PatientList) {
                      SpinnerDialog.hide();

            if (PatientList == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            if (PatientList == "[]" || PatientList == "") {
                $("#ul_PatientList").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Patient Found</div>");
                return false;
            }
            var listInfo = JSON.parse(PatientList);

            for (var key in listInfo) {

                $("#ul_PatientList").append('<li id="patientList' + key + '"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName + '</div> <div><span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].MRNno + '</span> <span class="iconTxt" style="margin-left:10px;">' + listInfo[key].gender + ' </span><span class="iconTxt" style="margin-left:10px;">D.O.B: ' + listInfo[key].DOB + '</span></div><div>  <span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#patientList" + key).on("click", { key: listInfo[key].PersonID, value: "patList" }, openPatientTestDetails);
            }
        }
    });
}


var flagSearch = '';
function openSearchPatient() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#ddl_list").empty();
    $("#hdnpersonId").val("");
    $("#hdnMrnNo").val("");
    $("#SearchResult").html("");
    $("#txtSearch").val("");
    $("#dname_searchPatient").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

     SpinnerDialog.show(null, "Loading...", true);
    var tokenKey = {

        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getlist",
        data: JSON.stringify(tokenKey),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (myList) {
                   SpinnerDialog.hide();
            if (myList == 2) {
                //win   navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                setTimeout(function () { logout(); }, 2000);
                return false;
            } else if (myList == "failed") {
                //win   navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                return false;
            }
            $.mobile.changePage("#SearchPatient", { transition: "slide", changeHash: false });
            $("#btnAddPatientSearch").hide();
            var listInfo = JSON.parse(myList);

            $("#ddl_list").html("<option value=0> Select List Name</option>");
            for (var key in listInfo) {
                if (listInfo[key].physicianListId == 1) {
                    $("#ddl_list").append('<option value=' + listInfo[key].ID + '>' + listInfo[key].Name + '</option>').trigger("change");
                }
            }

            if ($("#hiddenMyList").val() == "1") {
                $("#ddl_list").val($("#hdnListId").val()).change().trigger('refresh');
            }

        }
    });

}
function SearchPatient() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#SearchResult").html("");
    $("#hdnpersonId").val("");
    $("#hdnMrnNo").val("");
    if ($("#txtSearch").val() == "") {
        $("#btnAddPatientSearch").hide();
        //win     navigator.notification.alert('Please enter MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter MRN.",
                       duration: 2000, // ms
                       position: "center"
                   });
    }
    else if (!$.trim($("#txtSearch").val()).match('^[a-zA-Z0-9._-`#]*$')) {
        $("#btnAddPatientSearch").hide();
        //win          navigator.notification.alert('Please enter a valid MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter a valid MRN.",
                           duration: 2000, // ms
                           position: "center"
                       });
    }
    else {
              SpinnerDialog.show(null, "Loading...", true);
        var mrnNo = {
            "key": $("#txtSearch").val(),
            "value": $("#hdnfacilityId").val(),
            "operatorId": $("#hdnuserid").val(),
            "tokenKey": $("#hdntokenKey").val()
        };
        $.ajax({
            url: link + "searchPatient",
            data: JSON.stringify(mrnNo),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                                SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
                $("#btnAddPatientSearch").hide();
            },
            success: function (searchResult) {
                            SpinnerDialog.hide();


                if (searchResult == "999") {
                    $("#btnAddPatientSearch").hide();
                    //win              navigator.notification.alert('MRN not found!', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: "MRN not found!",
                                               duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                } else if (searchResult == "failed") {
                    $("#btnAddPatientSearch").hide();
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: failedMsg,
                                              duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                }
                $("#hdnMrnNo").val($("#txtSearch").val());
                var resultSearch = JSON.parse(searchResult);
                $("#btnAddPatientSearch").show();
                $("#SearchResult").html('<div style="background-color:#ffffff; padding:5px;" class="ui-content"><div style="background-color:#DFE0DF;	border-style: solid; border-color: #000;  border-width: 1px;" class="ui-content"><div class="txtList txt14" >' + resultSearch["patientName"].toUpperCase() + '</div><div class="clr"><span class="fl textPat txt12">MRN: </span><span id="mrnNoSearch" class="fr tar iconTxt" >' + resultSearch["MRNno"] + '</span></div><div class="clr"><span class="textPat txt12">GENDER: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 33%;">' + resultSearch["gender"] + '</span></div><div class="clr"><span class="textPat txt12">DOB: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 44%;">' + resultSearch["DOB"] + '</span></div><div class="clr"><span class="textPat txt12">NHS NO.: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 45%;">' + resultSearch["NHSno"] + '</span></div> <div class="clr"><span class="textPat txt12">LOCATION: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 60%;">' + resultSearch["location"] + '</span></div><div class="clr"><span class="textPat txt12">LEAD CLINICIAN: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 50%;">' + resultSearch["leadClinician"] + '</span></div> <div style="display: inline-block; word-wrap: break-word; width: 100%; text-overflow:ellipsis; "><span class="textPat txt12">ADMISSION DATE: </span><span class="fr tar iconTxt" style="display: inline-block; word-wrap: break-word; width: 40%;" >' + resultSearch["AddmissionDate"] + '</span></div></div></div>');

                $("#hdnpersonId").val(resultSearch["PersonID"]);
            }
        });
    }
}

//-------------------------Search Patient ends------------------------------------------------------------------------------//
//----------------------------LabViews Starts------------------------------------------------------------------------------//

$(document).on('pageinit', '#LabViews', function () {
    //  $("#labView1").on("click", openLaboratory);
    $("#labView2").on("click", LabView2);
    $("#addNoteLabViews").on("click", openAddNote);
    $("#radLabViews").on("click", { src: "views" }, openRadiology);
    $("#backLabViews").on("click", backFromLabView);
    $("#LabViews").on("swiperight", backFromLabView);
});
function backFromLabView() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (srcLabView == "tstDtls") {
        backTestDetails();
    }
    else if (srcLabView == "RadRprtDtls") {
        backRadRprtDtlsPage();
    }
    else if (srcLabView == "rad") {
        backRadiology();
    }
    else if (srcLabView == "Notes") {
        backNotesList();
    }
    else if (srcLabView == "notesDetail") {
        backNotesDtls();
    }
}
function backLabView() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#LabViews", { reverse: true, transition: "slide", changeHash: false });
}
//-------------------------------Lab Views Ends-----------------------------------------------------------------------------//

//------------------------------------------------------capture Image options starts here------------------------------------//
//$(document).on('pageinit', '#captureImageOptions', function () {
//    $("#backCapImageOptions").on("click", backTestDetails);
//    //   $("#viewCapImageOptions").on("click", openViewImgOptions);
//    $("#addCapImageOptions").on("click", { key: "addClick" }, openImgOptionsData);
//    $("#captureImageOptions").on("swiperight", backTestDetails);
//});

function backImgOptions() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (ImgOpt == 'patDetails') {
        $(":mobile-pagecontainer").pagecontainer("change", "#PatientTestDetails", { reverse: true, transition: "slide", changeHash: false });
    }
    else {
        $(":mobile-pagecontainer").pagecontainer("change", "#DataCapScreenPage", { reverse: true, transition: "slide", changeHash: false });
    }
}

function getSiteDropdown() {
    $("#ddlSite").html('');
               SpinnerDialog.show(null, "Loading...", true);
    $.ajax({
        url: link + "getfacilitylist",
        data: [],
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                       SpinnerDialog.hide();
                 navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (facilityList) {
                     SpinnerDialog.hide();

            var ntwrkName = JSON.parse(facilityList);


            for (var key in ntwrkName) {

                $("#ddlSite").append('<option value=' + ntwrkName[key].key + '>' + ntwrkName[key].value + '</option>');
            }

            $("#ddlSite").val($("#hdnfacilityId").val()).selectmenu("refresh");


        }

    });
}

var ImgOpt = '';
function openImgOptionsData(event) {

    if (sessionTimeOut() == false) {
        return false;
    }
    statusChbConsent = 0;
    ImgOpt = event.data.key;
    if (ImgOpt == "patDetails") {

        $("#phyNmLightBox").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
        $("#ptInfoLightBox").html($("#ptInfo_details").html());
        $("#ptLocLightBox").html($("#ptInfoLocation").html());

        $("#phyNameImgOptData").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
        //   $("#phyNameImgOptData").append('<span id="lnameImgOptions" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
        $("#ptInfoImgOptData").html($("#ptInfo_details").html());
        $("#ptLocImgOptData").html($("#ptInfoLocation").html());
    }

    if ($("#hdnPersonIdDetails").val() == '') {
        //win     navigator.notification.alert('Please enter a valid MRN.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter a valid MRN.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }
    $.mobile.changePage("#imageOptionsData", { transition: "slide", changeHash: false });




               SpinnerDialog.show(null, "Loading...", true);

    $("#chbConsentLevel").html('');
    $("#consultantImgOpt").val('');
    $("#aobImgOptData").val('');
    $("#diagImgOptData").val('');
    $("#taNoteImgOptData").val('');
    $("#hdnOptionValue").val('');

    getSiteDropdown();

    getDepartment();

    var dataNoteTitle = {
        "ID": $("#hdnfacilityId").val()
    }
    $.ajax({
        url: link + "getconsentLevel",
        data: JSON.stringify(dataNoteTitle),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (consentLevel) {
                                              SpinnerDialog.hide();
            if (consentLevel == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: session,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                logout();
                return false;
            } else if (consentLevel == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: failedMsg,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                return false;
            }

            var levelConsent = JSON.parse(consentLevel);

            lngthCnsnt = levelConsent.length;
            for (var key in levelConsent) {

                var id = levelConsent[key].key;


                $("#chbConsentLevel").append('<input  ctype="checkboxConsent" checked = "true" name="consent' + key + '"  id="consent' + levelConsent[key].key + '" type="checkbox" ><label for="consent' + levelConsent[key].key + '">' + levelConsent[key].value + '</label>').trigger('create');

                $("#consent" + levelConsent[key].key).on("click", { key: id, value: key }, chkConsent);
            }

        }
    });


}

var lngthCnsnt = '';
function chkConsent(event) {

    var id = event.data.key;
    var key = event.data.value;

    if ($("#consent" + id).is(':checked')) {
        for (var i = 0; i < key; i++) {
            $('input[name=consent' + i + ']').prop("checked", true).checkboxradio('refresh');
        }
    }
    else {
        for (var i = 0; i < lngthCnsnt; i++) {
            $('input[name=consent' + i + ']').prop("checked", false).checkboxradio('refresh');
        }
    }
}



function getDepartment() {
    if (sessionTimeOut() == false) {
        return false;
    }
               SpinnerDialog.show(null, "Loading...", true);

    $("#ddlDept").empty();
    var dataDepartment = {
        "ID": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getDepartment",
        data: JSON.stringify(dataDepartment),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (consentLevel) {
                                              SpinnerDialog.hide();
            if (consentLevel == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: session,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                logout();
                return false;
            } else if (consentLevel == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: failedMsg,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                return false;
            }

            var levelConsent = JSON.parse(consentLevel);

            $("#ddlDept").html("<option value=0> Select Department</option>");
            for (var key in levelConsent) {
                $("#ddlDept").append('<option value=' + levelConsent[key].key + '>' + levelConsent[key].value + '</option>').trigger("change");
            }

        }
    });

}
//--------------------Capture image options ends here--------------------------------------------------------------------------//

$(document).on('pageinit', '#imageOptionsData', function () {
    $("#backImgOptData").on("click", backImgOptions);
    // $("#imageOptionsData").on("swiperight", backImgOptions);
    $("#submitImgOptData").on("click", submitImageOptions);

    //    $("#ddlSite").on("change", function () {
    //        getConsentFacility();
    //        getDepartmentFacility();
    //    });
});

$(document).on('change', '#ddlSite', function () {

    getConsentFacility();
    getDepartmentFacility();
});


function getConsentFacility() {
               SpinnerDialog.show(null, "Loading...", true);

    $("#chbConsentLevel").html('');

    var dataNoteTitle = {
        "ID": $("#ddlSite").val()
    }
    $.ajax({
        url: link + "getconsentLevel",
        data: JSON.stringify(dataNoteTitle),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (consentLevel) {
                                              SpinnerDialog.hide();
            if (consentLevel == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: session,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                logout();
                return false;
            } else if (consentLevel == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: failedMsg,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                return false;
            }

            var levelConsent = JSON.parse(consentLevel);

            lngthCnsnt = levelConsent.length;
            for (var key in levelConsent) {

                var id = levelConsent[key].key;


                $("#chbConsentLevel").append('<input  ctype="checkboxConsent" checked = "true" name="consent' + key + '"  id="consent' + levelConsent[key].key + '" type="checkbox" ><label for="consent' + levelConsent[key].key + '">' + levelConsent[key].value + '</label>').trigger('create');

                $("#consent" + levelConsent[key].key).on("click", { key: id, value: key }, chkConsent);
            }

        }
    });
}

function getDepartmentFacility() {

               SpinnerDialog.show(null, "Loading...", true);

    $("#ddlDept").empty();
    var dataDepartment = {
        "ID": $("#ddlSite").val()
    };
    $.ajax({
        url: link + "getDepartment",
        data: JSON.stringify(dataDepartment),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (consentLevel) {
                                              SpinnerDialog.hide();
            if (consentLevel == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: session,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                logout();
                return false;
            } else if (consentLevel == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: failedMsg,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                return false;
            }

            var levelConsent = JSON.parse(consentLevel);

            $("#ddlDept").html("<option value=0> Select Department</option>");
            for (var key in levelConsent) {
                $("#ddlDept").append('<option value=' + levelConsent[key].key + '>' + levelConsent[key].value + '</option>').trigger("change");
            }

        }
    });
}

//$(document).on('change', '#ddlSite', function () {

//    alert($("#ddlSite").val());
//});

function submitImageOptions() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (validateImgOpt()) {
                       SpinnerDialog.show(null, "Loading...", true);

        var arrConsent = [];
        $("#chbConsentLevel").find('input[ctype=checkboxConsent]').each(function () {
            if ($(this).is(':checked')) {
                arrConsent.push({ "ID": $(this).attr("id").replace("consent", "") });
            }
        });


        var dataNoteTitle = {
            "patientMRN_no": $("#hdnMrnImgOpt").val(),
            "personID": $("#hdnPersonIdDetails").val(),
            "facilityID": $("#ddlSite").val(),
            "consultlevel": JSON.stringify(arrConsent),
            "department": $("#ddlDept").val(),
            "areaofbodyphoto": $("#aobImgOptData").val(),
            "diagnosis": $("#diagImgOptData").val(),
            "notes": $("#taNoteImgOptData").val(),
            "operator_id": $("#hdnuserid").val(),
            "consultant": $("#consultantImgOpt").val()
        };
        $.ajax({
            url: link + "addPhotoSet",
            data: JSON.stringify(dataNoteTitle),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                                SpinnerDialog.hide();
                         navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (response) {
                                                 SpinnerDialog.hide();
                if (response == "failed") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                           {
                                                               message: failedMsg,
                                                               duration: 2000, // ms
                                                               position: "center"
                                                           });
                    return false;
                }

                $("#hdnOptionValue").val(response);

                //win  imageCaptureWindows()
                  imagePopupCall('imgCap');

                //                $.mobile.changePage("#imageCapturePage", { transition: "slide", changeHash: false });
                //                $('#capturedImageShow').attr('src', 'img/camera.png');
                //                $("#imgAprRej").hide();

                $("#phyNmCaptureImg").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");


            }
        });


    }


}
var statusChbConsent = 0;
function validateImgOpt() {
    $("#chbConsentLevel").find('input[ctype=checkboxConsent]').each(function () {
        if ($(this).is(':checked')) {
            statusChbConsent = 1;
        }
    });


    if (statusChbConsent == 0) {

        statusChbConsent = 0;
        //win  navigator.notification.alert('Select consent level.', alertDismissed, 'validation Error', 'Ok');
                       window.plugins.toast.showWithOptions(
                                          {
                                              message: "Select consent level.",
                                              duration: 2000, // ms
                                              position: "center"
                                          });
        return false;
    }
    else if ($("#ddlDept").val() == 0) {

        statusChbConsent = 0;
        //win  navigator.notification.alert('Select department.', alertDismissed, 'validation Error', 'Ok');
                       window.plugins.toast.showWithOptions(
                                          {
                                               message: "Select department.",
                                               duration: 2000, // ms
                                               position: "center"
                                           });
        return false;
    }
    else if ($("#aobImgOptData").val() == '') {

        statusChbConsent = 0;
        //win  navigator.notification.alert('Enter Area(s) of Patient Body.', alertDismissed, 'validation Error', 'Ok');
                        window.plugins.toast.showWithOptions(
                                            {
                                                message: "Enter Area(s) of Patient Body.",
                                                duration: 2000, // ms
                                                position: "center"
                                                 });
        return false;
    }
    else if ($("#consultantImgOpt").val() == '') {

        statusChbConsent = 0;
        //win  navigator.notification.alert('Enter consultant name.', alertDismissed, 'validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Enter consultant name.",
                                                duration: 2000, // ms
                                                position: "center"
                                            });
        return false;
    }

    else if ($("#diagImgOptData").val() == '') {

        statusChbConsent = 0;
        //win  navigator.notification.alert('Enter diagnosis.', alertDismissed, 'validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Enter diagnosis.",
                                                duration: 2000, // ms
                                                position: "center"
                                            });
        return false;
    }
    //    else if ((!$.trim($("#consultantImgOpt").val()).charAt(0).match('^[a-zA-Z0-9]'))) {
    //        statusChbConsent = 0;
    //        //win  navigator.notification.alert('Invalid input for consultant field.', alertDismissed, 'validation Error', 'Ok');
    //                         window.plugins.toast.showWithOptions(
    //                                            {
    //                                                message:"Invalid input for consultant field.",
    //                                                duration: 2000, // ms
    //                                                position: "center"
    //                                            });
    //        return false;
    //    }

    else if (!$("#consultantImgOpt").val().match('^[-a-zA-Z0-9.,`\' \]*$')) {
        statusChbConsent = 0;
        //win  navigator.notification.alert("Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.", alertDismissed, 'validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.",
                                                duration: 7000, // ms
                                                position: "center"
                                            });
        return false;
    }

    //    else if (!$.trim($("#aobImgOptData").val()).charAt(0).match('^[a-zA-Z0-9]')) {
    //        statusChbConsent = 0;
    //        //win  navigator.notification.alert('Invalid input for area(s) of patient's body field.', alertDismissed, 'validation Error', 'Ok');
    //                         window.plugins.toast.showWithOptions(
    //                                            {
    //                                                message:"Invalid input for area(s) of patient body field.",
    //                                                duration: 2000, // ms
    //                                                position: "center"
    //                                            });
    //        return false;
    //    }


    else if (!$("#aobImgOptData").val().match('^[-a-zA-Z0-9.,`\' \]*$')) {
        statusChbConsent = 0;
        //win  navigator.notification.alert("Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.", alertDismissed, 'validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.",
                                                duration: 7000, // ms
                                                position: "center"
                                            });
        return false;
    }

    //    else if (!$.trim($("#diagImgOptData").val()).charAt(0).match('^[a-zA-Z0-9]')) {
    //        statusChbConsent = 0;
    //        //win  navigator.notification.alert('Invalid input for diagnosis field.', alertDismissed, 'validation Error', 'Ok');
    //                         window.plugins.toast.showWithOptions(
    //                                            {
    //                                                message:"Invalid input for diagnosis field.",
    //                                                duration: 2000, // ms
    //                                                position: "center"
    //                                            });
    //        return false;
    //    }


    else if (!$("#diagImgOptData").val().match('^[-a-zA-Z0-9.,`\' \]*$')) {
        statusChbConsent = 0;
        //win  navigator.notification.alert("Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.", alertDismissed, 'validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.",
                                                duration: 7000, // ms
                                                position: "center"
                                            });
        return false;
    }
    //    else if (!$.trim($("#taNoteImgOptData").val()).charAt(0).match('^[a-zA-Z0-9]')) {
    //        statusChbConsent = 0;
    //        //win  navigator.notification.alert('Invalid input for notes field.', alertDismissed, 'validation Error', 'Ok');
    //                         window.plugins.toast.showWithOptions(
    //                                            {
    //                                                message:"Invalid input for notes field.",
    //                                                duration: 2000, // ms
    //                                                position: "center"
    //                                            });
    //        return false;

    //    }
    //    else if ($("#taNoteImgOptData").val() == "") {
    //        statusChbConsent = 0;
    //        //win  navigator.notification.alert('Please enter a note.', alertDismissed, 'validation Error', 'Ok');
    //                         window.plugins.toast.showWithOptions(
    //                                            {
    //                                                message:"Please enter a note.",
    //                                                duration: 2000, // ms
    //                                                position: "center"
    //                                            });
    //        return false;
    //   }


    else if (!$("#taNoteImgOptData").val().match('^[-a-zA-Z0-9.,`\' \]*$')) {
        statusChbConsent = 0;
        //win  navigator.notification.alert("Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.", alertDismissed, 'validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Photo Capture supports the following data: Alphabet, Numbers and the following special characters: , . ` ' -. Other special characters are not allowed.",
                                                duration: 7000, // ms
                                                position: "center"
                                            });
        return false;
    }

    else {
        statusChbConsent = 0;
        return true;
    }
}



function backCapImgOptions() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#captureImageOptions", { reverse: true, transition: "slide", changeHash: false });
}

//$(document).on('pageinit', '#imageCapturePage', function () {

//    $("#captureMore").on("click", openImgPopup);
//    //win  $("#captureMore").on("click", imageCapWinMore);
//     
//    //  $("#capturedImageShow").on("click", imageCaptureWindows);

//    //    $("#approveImage").on("click", imgUpload);
//    //    $("#rejectImage").on("click", rejImage);
//    $("#backImgCapture").on("click", backImgOptData);
//    $("#imageCapturePage").on("swiperight", backImgOptData);
//    $("#lightBoxImgCap").on("click",{key:0}, openLightBoxPage);
//});

function openImgPopup() {
    imagePopupCall('capMore');
}
function backImgOptData() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#imageOptionsData", { reverse: true, transition: "slide", changeHash: false });
    //    $("#checkBoxPatient").prop("checked", true).checkboxradio("refresh");
    //    $("#deptImgOptData").val('');
    $("#aobImgOptData").val('');
    $("#consultantImgOpt").val('');
    $("#diagImgOptData").val('');
    $("#taNoteImgOptData").val('');
    // $("#ddlLevelConsult").val('0').change();
}
var setId = '';
var backLbox = '';
function openLightBoxPage(data) {
    //$("#cnfrmedLightBox").attr("disabled", false).trigger('refresh');
    $("#cnfrmedLightBox").show();

    if (sessionTimeOut() == false) {
        return false;
    }
    backLbox = data;
              SpinnerDialog.show(null, "Loading...", true);

    $("#lv_LightBox").html('');


    var dataThumbImg = {
        "facilityId": $("#hdnFacilityName").val(),
        "setid": $("#hdnOptionValue").val()
    };



    $.ajax({
        url: fileUploadLink + "getThumbImageList",
        data: JSON.stringify(dataThumbImg),
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (response) {
                                              SpinnerDialog.hide();
            $.mobile.changePage("#lightBoxPage", { transition: "slide", changeHash: false });
            $("#phyNmLightBox").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");



            if (response == '' || response == '[]') {

                $("#lv_LightBox").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Images Found</div>");
                //$("#cnfrmedLightBox").attr("disabled", true);
                $("#cnfrmedLightBox").hide();
                return false;
            }

            if (response == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                                       {
                                                           message: failedMsg,
                                                           duration: 2000, // ms
                                                           position: "center"
                                                       });
                return false;
            }
            var thumbRes = JSON.parse(response);


            for (var key in thumbRes) {

                var imgStrng = thumbRes[key].value;



                $("#lv_LightBox").append('<li><a href="javascript:void(0)" class="ui-btn" style="padding: 0px 0px 0px 0px !important;margin: 0px 0px 0px 0px !important;"><div style="margin: 0px 3px 0px 0px !important;border-width: 0px 1px 0px 0px !important;height:50px;float:left;width:50px;" data-corners="false">  <div data-role="fieldcontain"> <label for="username' + key + '" style="padding:2px 10px 10px 45px !important;border:#f6f6f6 !important;"></label><input ctype="chbLghtBox" type="checkbox" name="' + thumbRes[key].value + '" id="pnd' + thumbRes[key].key + '" value="" /></div></div><div id="imgLgt' + key + '"><div><img  src="' + lightboxImageLink + $("#hdnFacilityName").val() + "thumb/" + thumbRes[key].value + '" style="height:60px; margin-bottom:5px; width:60px;float:left;padding-right:10px;border-left:1px solid #a9a9a9;margin-right:5px;"/></div><div style="margin-top:5px; font-size: 12px;">' + thumbRes[key].area + '</div><div style="margin-top:10px; font-size: 10px;">' + thumbRes[key].diagnosis + '</div></div></li>').trigger("create").listview("refresh");

                $("#imgLgt" + key).on("click", { key: imgStrng }, openPopupImage);

                $("#cnfrmedLightBox").show();



            }

        }
    });




}

function openPopupImage(event) {

    var link = event.data.key;
    $("#imgPopupLghtBox").attr('src', '');
    $("#imgPopupLghtBox").attr('src', lightboxImageLink + link);
    setTimeout(OpenPopup, 1000);

}

function OpenPopup() {

    $("#lightBoxImgPopup").popup('open', { x: 0, y: 250 });
    //$("#lightBoxImgPopup").popup({ positionTo: "window" }).popup('open');
}
function pending() {
    if (sessionTimeOut() == false) {
        return false;
    }
    var statLghtbox = 0;
    var arrLghtBox = [];
    $("#lv_LightBox").find('input[ctype=chbLghtBox]').each(function () {
        if ($(this).is(':checked')) {
            statLghtbox = 1;
            arrLghtBox.push({ "ID": $(this).attr("id").replace("pnd", ""), "Name": $(this).attr("name") });
        }
    });

    if (statLghtbox == 1) {

                  SpinnerDialog.show(null, "Loading...", true);
        statLghtbox = 0;

        var dataExif = {
            "personId": $("#hdnPersonIdDetails").val(),
            "facilityId": $("#hdnfacilityId").val(),
            "SetId": $("#hdnOptionValue").val(),
            "fileDetail": JSON.stringify(arrLghtBox),
            "operatorId": $("#hdnuserid").val(),
            "tokenKey": $("#hdntokenKey").val()
        };
        $.ajax({
            url: fileUploadLink + "ExifFile",
            data: JSON.stringify(dataExif),
            dataType: "json",
            type: "POST",
            contentType: "application/json",
            error: function (request, error) {
                          SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

            },
            success: function (response) {



                                                  SpinnerDialog.hide();

                if (ImgOpt == 'patDetails') {
                    backTestDetails();
                }
                else if (ImgOpt == 'dataCap') {
                    home();
                }
                //  $("#lv_LightBox").html('').listview('refresh');
                //  openLghtBoxImages();


            }
        });
    }
    else {
        //win  navigator.notification.alert('Select at least one image.', alertDismissed, 'Validation Error', 'Ok');
                         window.plugins.toast.showWithOptions(
                                            {
                                                message:"Select at least one image.",
                                                duration: 2000, // ms
                                                position: "center"
                                            });
    }
}

function openLghtBoxImages() {
    if (sessionTimeOut() == false) {
        return false;
    }
    var dataThumbImg = {
        "facilityId": $("#hdnFacilityName").val(),
        "setid": $("#hdnOptionValue").val()
    };

    $.ajax({
        url: fileUploadLink + "getThumbImageList",
        data: JSON.stringify(dataThumbImg),
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (response) {
                                              SpinnerDialog.hide();





            if (response == '' || response == '[]') {
                //win  navigator.notification.alert('Completed.', alertDismissed, 'Success', 'Ok');
                                 window.plugins.toast.showWithOptions(
                                                    {
                                                        message:"Completed.",
                                                        duration: 2000, // ms
                                                        position: "center"
                                                    });
                $("#lv_LightBox").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No More Images</div>");
                //    $("#cnfrmedLightBox").attr("disabled", true);
                $("#cnfrmedLightBox").hide();
                return false;
            }

            var thumbRes = JSON.parse(response);


            for (var key in thumbRes) {

                var imgStrng = thumbRes[key].value;



                $("#lv_LightBox").append('<li><a href="javascript:void(0)" class="ui-btn" style="padding: 0px 0px 0px 0px !important;margin: 0px 0px 0px 0px !important;"><div style="margin: 0px 3px 0px 0px !important;border-width: 0px 1px 0px 0px !important;height:50px;float:left;width:50px;" data-corners="false">  <div data-role="fieldcontain"> <label for="username' + key + '" style="padding:2px 10px 10px 45px !important;border:#f6f6f6 !important;"></label><input ctype="chbLghtBox" type="checkbox" name="' + thumbRes[key].value + '" id="pnd' + thumbRes[key].key + '" value="" /></div></div><div id="imgLgt' + key + '"><div><img  src="' + lightboxImageLink + $("#hdnFacilityName").val() + "thumb/" + thumbRes[key].value + '" style="height:60px;width:60px;float:left;padding-right:10px;border-left:1px solid #a9a9a9;margin-right:5px;"/></div><div style="margin-top:5px; font-size: 12px;">' + thumbRes[key].area + '</div><div style="margin-top:10px; font-size: 10px;">' + thumbRes[key].diagnosis + '</div></div></li>').trigger("create").listview("refresh");

                $("#imgLgt" + key).on("click", { key: imgStrng }, openPopupImage);

                $("#cnfrmedLightBox").show();
            }

        }
    });

}

$(document).on('pageinit', '#lightBoxPage', function () {
    $("#backLightBox").on("click", backImgCapturePage);
      $("#capMoreLghtBoxPage").on("click", capMoreLghtBoxAI);
    //win $("#capMoreLghtBoxPage").on("click", capMoreLghtBoxWin);
    $("#lightBoxPage").on("swiperight", backImgCapturePage);
    $("#cnfrmedLightBox").on("click", pending);
});
function backImgCapturePage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (backLbox == 'imgOpt') {
        $(":mobile-pagecontainer").pagecontainer("change", "#imageOptionsData", { reverse: true, transition: "slide", changeHash: false });
    }
    else {
        $(":mobile-pagecontainer").pagecontainer("change", "#PhotosetIdListPage", { reverse: true, transition: "slide", changeHash: false });
    }
}

function capMoreLghtBoxAI() {
    if (sessionTimeOut() == false) {
        return false;
    }
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 720
    });

    function onSuccess(imageURI) {
        if (build == 1) {
            removeAllCache();
        }
        path = imageURI;

        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.headers = { 'Content-Type': "multipart/encrypted" };

        params = new Object();
        params.fullpath = path;
        params.name = name;

        options.params = params;
        options.chunkedMode = false;

        uploadImg();



    }
    function onFail(message) {
        //navigator.notification.alert(failedMsg, alertDismissed, "", 'Ok');
    }



}


function capMoreLghtBoxWin() {
    if (sessionTimeOut() == false) {
        return false;
    }
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.NATIVE_URI, saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 720
    });

    function onSuccess(imageURI) {
        if (build == 1) {
            removeAllCache();
        }
        path = imageURI;

        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.headers = { 'Content-Type': "multipart/encrypted" };

        params = new Object();
        params.fullpath = path;
        params.name = name;

        options.params = params;
        options.chunkedMode = false;

        uploadImg();

    }

    function onFail(message) {
        //navigator.notification.alert(failedMsg, alertDismissed, "", 'Ok');
    }
}
var path = '';
var name = '';
var options = '';
var params = '';

function uploadImg() {

              SpinnerDialog.show(null, "Loading...", true);

    var setId = $("#hdnOptionValue").val();
    var operatorId = $("#hdnuserid").val();

    var ft = new FileTransfer();
    ft.upload(path, ImgfileUpload + "FileUploadServ.svc/UploadFile?facilityname=" + $("#hdnFacilityName").val() + "&setId=" + setId + "&operatorId=" + operatorId,
                    function (result) {
                                      SpinnerDialog.hide();
                        var dataThumbImg = {
                            "facilityId": $("#hdnFacilityName").val(),
                            "setid": $("#hdnOptionValue").val()
                        };
                        $.ajax({
                            url: fileUploadLink + "getThumbImageList",
                            //url: "http://206.19.38.33/patientListService/Service.svc/getThumbImageList",
                            data: JSON.stringify(dataThumbImg),
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json",
                            error: function (request, error) {
                                          SpinnerDialog.hide();
                                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
                            },
                            success: function (response) {
                                                                  SpinnerDialog.hide();

                                $("#lv_LightBox").html('');



                                if (response == '' || response == '[]') {

                                    $("#lv_LightBox").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Images Found</div>");
                                    //  $("#cnfrmedLightBox").attr("disabled", true).trigger('refresh');
                                    $("#cnfrmedLightBox").hide();
                                    return false;
                                }

                                $("#cnfrmedLightBox").attr("disabled", false).trigger('refresh');
                                var thumbRes = JSON.parse(response);


                                for (var key in thumbRes) {

                                    var imgStrng = thumbRes[key].value;


                                    $("#lv_LightBox").append(' <li ><a href="javascript:void(0)" class="ui-btn" style="padding: 0px 0px 0px 0px !important;margin: 0px 0px 0px 0px !important;"><div style="margin: 0px 3px 0px 0px !important;border-width: 0px 1px 0px 0px !important;height:50px;float:left;width:50px;" data-corners="false">  <div data-role="fieldcontain"> <label for="username' + key + '" style="padding:2px 10px 10px 45px !important;border:#f6f6f6 !important;"></label><input ctype="chbLghtBox" type="checkbox" name="' + thumbRes[key].value + '" id="pnd' + thumbRes[key].key + '" value="" /></div></div><div id="imgLgt' + key + '" ><div><img    src="' + lightboxImageLink + $("#hdnFacilityName").val() + "thumb/" + thumbRes[key].value + '" style="height:60px; margin-bottom:5px; width:60px;float:left;padding-right:10px;border-left:1px solid #a9a9a9;margin-right:5px;"/></div><div style="margin-top:5px; font-size: 12px;">' + thumbRes[key].area + '</div><div style="margin-top:10px; font-size: 10px;">' + thumbRes[key].diagnosis + '</div></div></li>').trigger("create").listview("refresh");

                                    $("#imgLgt" + key).on("click", { key: imgStrng }, openPopupImage);

                                    $("#cnfrmedLightBox").show();

                                }

                            }
                        });
                        //                        //win  navigator.notification.alert('Image uploaded successfully.', alertDismissed, 'Success', 'Ok');
                        //                                                window.plugins.toast.showWithOptions(
                        //                                                                           {
                        //                                                                               message: "Image uploaded successfully.",
                        //                                                                               duration: 2000, // ms
                        //                                                                               position: "center"
                        //                                                                           });


                    },
        function (error) {
                     SpinnerDialog.hide();

            //win  navigator.notification.alert('Error in image uploading.', alertDismissed, 'Failed', 'Ok');
                        window.plugins.toast.showWithOptions(
                                                   {
                                                       message: "Image upload could not be completed. Please try again.",
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });

        },
        options
        );

}

function imgUpload() {
    if (sessionTimeOut() == false) {
        return false;
    }
              SpinnerDialog.show(null, "Loading...", true);
    //$("#imgAprRej").hide();
    var setId = $("#hdnOptionValue").val();
    var operatorId = $("#hdnuserid").val();

    var ft = new FileTransfer();
    ft.upload(path, ImgfileUpload + "FileUploadServ.svc/UploadFile?facilityname=" + $("#hdnFacilityName").val() + "&setId=" + setId + "&operatorId=" + operatorId,
                    function (result) {
                                      SpinnerDialog.hide();

                        openLightBoxPage('imgOpt');
                        // $('#capturedImageShow').attr('src', 'img/camera.png');
                        //            movePic(path);


                        //                        //win  navigator.notification.alert('Image uploaded successfully.', alertDismissed, 'Success', 'Ok');
                        //                                                window.plugins.toast.showWithOptions(
                        //                                                                           {
                        //                                                                               message: "Image uploaded successfully.",
                        //                                                                               duration: 2000, // ms
                        //                                                                               position: "center"
                        //                                                                           });

                        //upload successful            
                    },
        function (error) {
                     SpinnerDialog.hide();

            //win  navigator.notification.alert('Image upload could not be completed. Please try again.', alertDismissed, 'Failed', 'Ok');
                        window.plugins.toast.showWithOptions(
                                                   {
                                                       message: "Image upload could not be completed. Please try again.",
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });

        },
        options
        );

}
function rejImage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#imgAprRej").hide();
    $('#capturedImageShow').attr('src', 'img/camera.png');
    // $("#btnImgCapture").show();
}

function imageCapWinMore() {

    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.NATIVE_URI, saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 720
    });

    function onSuccess(imageURI) {
        if (build == 1) {
            removeAllCache();
        }
        var image = document.getElementById('capturedImageShow');

        path = imageURI;
        image.src = imageURI;
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.headers = { 'Content-Type': "multipart/encrypted" };

        params = new Object();
        params.fullpath = path;
        params.name = name;

        options.params = params;
        options.chunkedMode = false;

        imgUpload();

    }

    function onFail(message) {
        //navigator.notification.alert(failedMsg, alertDismissed, "", 'Ok');
    }

}

function imageCaptureWindows() {

    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.NATIVE_URI, saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 720
    });

    function onSuccess(imageURI) {
        if (build == 1) {
            removeAllCache();
        }
        // var image = document.getElementById('capturedImageShow');
        // $.mobile.changePage("#imageCapturePage", { transition: "slide", changeHash: false });
        path = imageURI;
        // image.src = imageURI;
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.headers = { 'Content-Type': "multipart/encrypted" };

        params = new Object();
        params.fullpath = path;
        params.name = name;

        options.params = params;
        options.chunkedMode = false;

        imgUpload();

    }

    function onFail(message) {
        //navigator.notification.alert(failedMsg, alertDismissed, "", 'Ok');
    }

}


function imageCapMore() {

    // $("#imgAprRej").show();
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 720
    });

    function onSuccess(imageURI) {
        if (build == 1) {
            removeAllCache();
        }
        var image = document.getElementById('capturedImageShow');
        path = imageURI;
        image.src = imageURI;
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.headers = { 'Content-Type': "multipart/encrypted" };

        params = new Object();
        params.fullpath = path;
        params.name = name;

        options.params = params;
        options.chunkedMode = false;

        imgUpload();

    }

    function onFail(message) {
        //navigator.notification.alert(failedMsg, alertDismissed, "", 'Ok');
    }
}

function imageCaptureAI() {


    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        targetWidth: 720
    });

    function onSuccess(imageURI) {
        if (build == 1) {
            removeAllCache();
        }

        //   $.mobile.changePage("#imageCapturePage", { transition: "slide", changeHash: false });
        //   var image = document.getElementById('capturedImageShow');
        path = imageURI;
        //   image.src = imageURI;
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.headers = { 'Content-Type': "multipart/encrypted" };

        params = new Object();
        params.fullpath = path;
        params.name = name;

        options.params = params;
        options.chunkedMode = false;

        imgUpload();

    }

    function onFail(message) {
        //navigator.notification.alert(failedMsg, alertDismissed, "", 'Ok');
    }
}


//-------------------------------------------------------Lab View 2 starts-----------------------------------------//

$(document).on('pageinit', '#LaboratoryView2', function () {
    $("#moreLab").on("click", LabViewMore);
    $("#back_lab2").on("click", backTestDetails);
    $("#LaboratoryView2").on("swiperight", backTestDetails);
    $("#rad_lab2").on("click", { src: "labView2" }, openRadiology);
    $("#addNote_lab2").on("click", openAddNote);
});

function backLab2() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#LaboratoryView2", { reverse: true, transition: "slide", changeHash: false });
}
//-------------------------------Lab View 2 ends-----------------------------------------------------------------------------//

//-------------------------------------------------Patient Test Details function starts------------------------------------------------------//

$(document).on('pageinit', '#PatientTestDetails', function () {
    $("#rad_details").on("click", { src: "testDtls" }, openRadiology);
    //$("#lab_details").on("click", { src: "tstDtls" }, openLabViews);
    //$("#captureImageDetails").on("click", openCaptureImageOptions);
    $("#captureImageDetails").on("click", { key: "patDetails" }, openImgOptionsData);
    $("#lab_details").on("click", LabView2);
    $("#viewnote_details").on("click", openNotesList);
    $("#addnote_details").on("click", openAddNote);
    $("#backTestDetails").on("click", backPatientList);
    $("#removePatDetails").on("click", openRemovePatPopup);
    $("#PatientTestDetails").on("swiperight", backPatientList);
});

function popupAgreeClose() {

    $("#popupAgree").popup("close");
}

function openCaptureImageOptions() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#captureImageOptions", { transition: "slide", changeHash: false });
    $("#phyNameCaptureImageOptions").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $("#ptInfoCapImgOpt").html($("#ptInfo_details").html());
    $("#ptLocCapImgOpt").html($("#ptInfoLocation").html());

    //    $("#phyNameImgOptData").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    // //   $("#phyNameImgOptData").append('<span id="lnameImgOptions" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    //    $("#ptInfoImgOptData").html($("#ptInfo_details").html());
    //    $("#ptLocImgOptData").html($("#ptInfoLocation").html());

    $("#ptInfoCapImg").html($("#ptInfo_details").html());
    $("#ptLocCapImg").html($("#ptInfoLocation").html());

    $("#ptInfoLightBox").html($("#ptInfo_details").html());
    $("#ptLocLightBox").html($("#ptInfoLocation").html());



}
function openRemovePatPopup() {

    $("#myPopup").popup("open");

}
function popupClose() {
    //    if (sessionTimeOut() == false) {
    //        return false;
    //    } 
    $("#myPopup").popup("close");
}
function removePatient() {
    if (sessionTimeOut() == false) {
        return false;
    }
             SpinnerDialog.show(null, "Loading...", true);
    $("#myPopup").popup("close");
    var dataremovePat = {
        "listID": $("#hdnListId").val(),
        "userid": $("#hdnuserid").val(),
        "PersonID": $("#hdnPersonIdDetails").val(),
        "Token": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "removePatient",
        data: JSON.stringify(dataremovePat),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (reportStatus) {

                 SpinnerDialog.hide();
            if (reportStatus == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                          duration: 2000, // ms
                                           position: "center"
                                       });

                return false;
            }
            var statusPatientRemove = JSON.parse(reportStatus);
            var ID = statusPatientRemove.ID;

            if (ID == 1) {
                //win             navigator.notification.alert('Patient removed from list.', alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                  {
                                      message: "Patient removed from list.",
                                      duration: 2000, // ms
                                      position: "center"
                                  });

                patientList();
            }
            else if (ID == 2) {
                //win   navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                setTimeout(function () { logout(); }, 2000);
                return false;

            }
        }
    });

}

function patientList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    var listId = $("#hdnListId").val();
    $("#ul_PatientList").empty();
    var dataPatientlist = {
        "listID": listId,
        "userId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };

    $.ajax({
        url: link + "getListofPatient",
        data: JSON.stringify(dataPatientlist),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (PatientList) {
                      SpinnerDialog.hide();
            $.mobile.changePage("#PatientList", { transition: "slide", changeHash: false });

            if (PatientList == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            if (PatientList == "[]" || PatientList == "") {
                $("#ul_PatientList").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Patient Found</div>");
                return false;
            }
            if (PatientList == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                       {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                      });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }
            var listInfo = JSON.parse(PatientList);

            for (var key in listInfo) {

                $("#ul_PatientList").append('<li id="patientList' + key + '"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName.toUpperCase() + '</div> <div><span>' + listInfo[key].MRNno + '</span> <span  style="margin-left:10px;">' + listInfo[key].gender + ' </span><span  style="margin-left:10px;">D.O.B: </span><span>' + listInfo[key].DOB + '</span></div><div>  <span ></span><span>' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#patientList" + key).on("click", { key: listInfo[key].PersonID, value: "patList" }, openPatientTestDetails);
            }
        }
    });
}
var srcLabView = '';
function openLabViews(source) {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (source.data.src == "tstDtls") {
        srcLabView = "tstDtls";
    }
    else if (source.data.src == "RadRprtDtls") {
        srcLabView = "RadRprtDtls";
    }
    else if (source.data.src == "rad") {
        srcLabView = "rad";
    }
    else if (source.data.src == "Notes") {
        srcLabView = "Notes";
    }
    else if (source.data.src == "notesDetail") {
        srcLabView = "notesDetail";
    }
    $("#dname_LabViews").html($("#hdnphyname").val());
    $("#dname_LabViews").append('<span id="lname_LabViews" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    $("#ptInfo_LabViews").html($("#ptInfo_details").html());
    $("#labViewsLocation").html($("#ptInfoLocation").html());

    $.mobile.changePage("#LabViews", { transition: "slide", changeHash: false });
}

var lngthLab = '';
function LabView2() {
    if (sessionTimeOut() == false) {
        return false;
    }
    //  $("#moreLab").show();
    lngthLab = '';

    $("#lv_lab2").empty();

    $.mobile.changePage("#LaboratoryView2", { transition: "slide", changeHash: false });

            SpinnerDialog.show(null, "Loading...", true);
    $("#dname_lab2").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    //    $("#dname_lab2").append('<span id="lname_lab2" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    $("#ptInfo_lab2").html($("#ptInfo_details").html());
    $("#lab2Location").html($("#ptInfoLocation").html());
    var dataLaboratory2 = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val(),
        "PersonId": $("#hdnPersonIdDetails").val(),
        "flag": "0"
    };
    $.ajax({
        url: link + "getLaboratorylist",
        data: JSON.stringify(dataLaboratory2),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                       SpinnerDialog.hide();
                     navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (reportStatus) {

            if (reportStatus == "[]" || reportStatus == "") {

                $("#lv_lab2").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Record Found</div>");
                $("#moreLab").hide();

                                    SpinnerDialog.hide();
                return false;
            } else if (reportStatus == "failed") {
                                    SpinnerDialog.hide();
                $("#moreLab").hide();
                //win      navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                     window.plugins.toast.showWithOptions(
                                        {
                                            message: failedMsg,
                                            duration: 2000, // ms
                                            position: "center"
                                        });
                return false;
            }

            var statusLaboratory = JSON.parse(reportStatus);
            lngthLab = statusLaboratory.length;

            for (var key in statusLaboratory) {

                if (lngthLab >= 50) {

                    $("#moreLab").show();

                }
                else if (lngthLab < 50) {
                    $("#moreLab").hide();
                }

                //                $("#lv_lab2").append('<li onclick="openLabView2TestInfo(' + statusLaboratory[key].ParentEventId + ',' + statusLaboratory[key].PersonID + ',' + "'" + statusLaboratory[key].Name + "'" + ')"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusLaboratory[key].resultStatus + '</div><span style="font-size: 12px;" class="ui-li-count">' + statusLaboratory[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#lv_lab2").append('<li id="labView2' + key + '"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusLaboratory[key].resultStatus + '</div><span style="font-size: 12px;margin-top:2px" class="ui-li-count">' + statusLaboratory[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#labView2" + key).on("click", { parentEvent: statusLaboratory[key].ParentEventId, personID: statusLaboratory[key].PersonID, name: statusLaboratory[key].Name }, openLabView2TestInfo);

            }
                          SpinnerDialog.hide();


            //            $("#lv_lab2").append('<div class="clr"></div><div id="moreLab" style="color:#fff; margin-top:7px; float:right;">More</div><div class="clr"></div>');
            //            $("#moreLab").on("click", LabViewMore);



        }
    });
}

function LabViewMore() {
    if (sessionTimeOut() == false) {
        return false;
    }
            SpinnerDialog.show(null, "Loading...", true);
    $("#moreLab").hide();
    $("#lv_lab2").empty();
    var dataLaboratory2 = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val(),
        "PersonId": $("#hdnPersonIdDetails").val(),
        "flag": "1"
    };
    $.ajax({
        url: link + "getLaboratorylist",
        data: JSON.stringify(dataLaboratory2),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                       SpinnerDialog.hide();
                     navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (reportStatus) {

            if (reportStatus == "[]" || reportStatus == "") {



                                    SpinnerDialog.hide();
                return false;
            } else if (reportStatus == "failed") {
                                    SpinnerDialog.hide();
                //win      navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                     window.plugins.toast.showWithOptions(
                                        {
                                            message: failedMsg,
                                            duration: 2000, // ms
                                            position: "center"
                                        });
                return false;
            }

            var statusLaboratory = JSON.parse(reportStatus);


            for (var i = 0; i < statusLaboratory.length; i++) {


                $("#lv_lab2").append('<li id="labView2' + i + '"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[i].Name + '<div style="font-size:9px; margin-top:6px;">' + statusLaboratory[i].resultStatus + '</div><span style="font-size: 12px;margin-top:2px" class="ui-li-count">' + statusLaboratory[i].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#labView2" + i).on("click", { parentEvent: statusLaboratory[i].ParentEventId, personID: statusLaboratory[i].PersonID, name: statusLaboratory[i].Name }, openLabView2TestInfo);

            }
                          SpinnerDialog.hide();
        }
    });

}

function openLabView2TestInfo(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var prntEvntId = event.data.parentEvent;
    var prsnId = event.data.personID;
    var name = event.data.name;

    // $("#refRangeLabView2Info").show();
    $("#Lab2testDetails").html('');
    $("#nameLabView2Info").html('');
    $.mobile.changePage("#LabView2Info", { transition: "slide", changeHash: false });
          SpinnerDialog.show(null, "Loading...", true);
    $("#dnameLab2Info").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    //  $("#dnameLab2Info").append('<span id="lnameLab2List" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    $("#PtInfo_Lab2Info").html($("#ptInfo_details").html());
    $("#Lab2InfoLocation").html($("#ptInfoLocation").html());
    var dataLab2List = {
        "ID": prntEvntId,
        "Token": prsnId,
        "facilityID": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getLabTestComponantList",
        data: JSON.stringify(dataLab2List),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (reportStatus) {
                        SpinnerDialog.hide();

            if (reportStatus == "failed") {
                //win             navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                  {
                                      message: failedMsg,
                                      duration: 2000, // ms
                                      position: "center"
                                  });
                return false;
            }
            if (reportStatus == "[]" || reportStatus == "") {
                $("#Lab2testDetails").html("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Record Found</div>");
                return false;
            }
            var statusRadiology = JSON.parse(reportStatus);
            // $("#tblLab2TestInfo").append('<thead><tr><th style="text-align:left;">' + name + '</th></tr></thead>');
            $("#nameLabView2Info").html(name);

            var bg = '';
            for (var key in statusRadiology) {
                if (key % 2 == 0)
                    bg = 'even';
                else
                    bg = 'odd';
                var bgColor;
                var txtcolor;
                if (statusRadiology[key].NormalcyCD == '*' || statusRadiology[key].NormalcyCD == '!') {
                    bgColor = '#FE6263';
                    txtcolor = '#ffffff';
                }
                else if (statusRadiology[key].NormalcyCD == 'L' || statusRadiology[key].NormalcyCD == 'H') {
                    bgColor = '#EDE78F';
                    txtcolor = '#000000';
                }
                else if (statusRadiology[key].NormalcyCD == 'N') {
                    bgColor = '';
                    txtcolor = '#000000';
                }
                if (statusRadiology[key].EventClassCD == 236) {

                    $("#Lab2testDetails").append('<div class="mt1 ' + bg + '" ><span style="font-size: 13px; margin-top:8px;" id="tstNmLabReportDetails">' + statusRadiology[key].TestName + '</span><span class="" id="rsltvalLabReportDetails" style="color:' + txtcolor + '; text-align: center; width: 30%; padding:10px; font-size: 13px; background-color:' + bgColor + '">' + statusRadiology[key].Resultvalue + '</span></div><div class="clr"></clr>').trigger('refresh');

                    //   $("#refRangeLabView2Info").hide();
                }
                else if (statusRadiology[key].EventClassCD == 224) {
                    //                    $("#Lab2testDetails").append('<a href="#"><div id="radList' + key + '" onclick="openRadDetails(' + statusRadiology[key].EventID + ',' + '3' + ')" class="mt1 ' + bg + '" style=""><span style="font-size: 13px; margin-top:8px;" id="tstNmLabReportDetails">' + statusRadiology[key].TestName + '</span><span class="" id="rsltvalLabReportDetails" style="word-wrap:none; color:' + txtcolor + ';  text-align: center; width: 50px; padding:10px; display: inline-block; font-size: 13px; background-color:' + bgColor + '">' + statusRadiology[key].Resultvalue + '</span><span class="fr tar" style="display: inline-block; word-wrap: break-word; width: 25%; padding-top:7px; "><span  style="font-size: 13px;" id="unitLabDtls">' + statusRadiology[key].Unit + '</span><span  style="font-size: 13px; margin-left:5px;" id="refLabDtls">' + statusRadiology[key].Refrange + '</span></span></div></a><div class="clr"></clr>').trigger('refresh');

                    $("#Lab2testDetails").append('<a href="#"><div id="radList' + key + '"  class="mt1 ' + bg + '" style=""><span style="font-size: 13px; margin-top:8px;" id="tstNmLabReportDetails">' + statusRadiology[key].TestName + '</span><span class="" id="rsltvalLabReportDetails" style="word-wrap:none; color:' + txtcolor + ';  text-align: center; width: 50px; padding:10px; display: inline-block; font-size: 13px; background-color:' + bgColor + '">' + statusRadiology[key].Resultvalue + '</span><span class="fr tar" style="display: inline-block; word-wrap: break-word; width: 30%; padding-top:7px; "><div  style="font-size: 13px; float:left;" id="unitLabDtls">' + statusRadiology[key].Unit + '</div><div  style="font-size: 13px; float:right;" id="refLabDtls">' + statusRadiology[key].Refrange + '</div></span></div></a><div class="clr"></clr>').trigger('refresh');



                    $("#radList" + key).on("click", { key: statusRadiology[key].EventID, valueCheck: "3" }, openRadDetails);
                }

                else {
                    $("#Lab2testDetails").append('<div style="display: inline-block;" class="mt1 ' + bg + '" ><span style="font-size: 13px; margin-top:8px;" id="tstNmLabReportDetails">' + statusRadiology[key].TestName + '</span><span class="" id="rsltvalLabReportDetails" style="word-wrap:none; color:' + txtcolor + ';  text-align: center; width: 50px; padding:10px; display: inline-block; font-size: 13px; background-color:' + bgColor + '">' + statusRadiology[key].Resultvalue + '</span><span class="fr tar" style="display: inline-block; word-wrap: break-word; width: 30%; padding-top:7px; "><div  style="font-size: 13px;float:left;" id="unitLabDtls">' + statusRadiology[key].Unit + '</div><div  style="font-size: 13px;float:right;" id="refLabDtls">' + statusRadiology[key].Refrange + '</div></span></div><div class="clr"></clr>').trigger('refresh');
                }

            }

        }
    });
}
var flagDet = ""
function openPatientTestDetails(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#removePatDetails").hide();
    flagDet = '';
    var prsnId = event.data.key;
    flagDet = event.data.value;

    if (flagDet == 'patList') {
        $("#removePatDetails").show();

    }
    if (prsnId == '') {
        if ($("#hdnPrsnIdViewPat").val() == '') {

            //win     navigator.notification.alert('Please enter a valid MRN.', alertDismissed, 'Validation Error', 'Ok');
                    window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter a valid MRN.",
                           duration: 2000, // ms
                           position: "center"
                       });

            return false;

        }
        else {
            prsnId = $("#hdnPrsnIdViewPat").val();
        }

    }




    $("#hdnPersonIdDetails").val("");
    $("#ptnameDetails").html("");
    $("#mrnNoDetails").html("");
    $("#genderDetails").html("");
    $("#dobDetails").html("");
    $("#nhsnoDetails").html("");
    $("#locationDetails").html("");
    $("#ptInfo_details").html("");
    var datamrnNo = {
        "key": prsnId,
        "value": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.mobile.changePage("#PatientTestDetails", { transition: "slide", changeHash: false });

           SpinnerDialog.show(null, "Loading...", true);

    if (flagDet == 'patList') {
        $("#dname_testdetails").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
        $("#dname_testdetails").append('<span id="lnameRadReportDetails" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
    }
    else {
        $("#dname_testdetails").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    }

    $.ajax({
        url: link + "getPatientDetail",
        data: JSON.stringify(datamrnNo),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (testDetails) {
                                             SpinnerDialog.hide();

            if (testDetails == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                  {
                                      message: failedMsg,
                                      duration: 2000, // ms
                                      position: "center"
                                  });

                return false;
            } else if (testDetails == 999) {
                //win  navigator.notification.alert('Unable to fetch patient detail.', alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                  {
                                      message: "Unable to fetch patient detail.",
                                      duration: 2000, // ms
                                      position: "center"
                                  });

                return false;
            }



            var detailsTest = JSON.parse(testDetails);
            var patNm = detailsTest["patientName"];
            $("#ptInfo_details").html(patNm.toUpperCase() + " | " + detailsTest["MRNno"]);
            $("#ptInfoLocation").html(detailsTest["location"]);
            $("#hdnPersonIdDetails").val(detailsTest["PersonID"]);
            $("#ptnameDetails").html(patNm.toUpperCase());
            $("#mrnNoDetails").html(detailsTest["MRNno"]);
            $("#genderDetails").html(detailsTest["gender"]);
            $("#dobDetails").html(detailsTest["DOB"]);
            $("#nhsnoDetails").html(detailsTest["NHSno"]);
            $("#locationDetails").html(detailsTest["location"]);
            $("#hdnMrnImgOpt").val(detailsTest["MRNno"]);
        }
    });

}
function backTestDetails() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientTestDetails", { reverse: true, transition: "slide", changeHash: false });
}

//------------------------------------------------------Patient test detail ends----------------------------------------//
$(document).on('pageinit', '#LabView2Info', function () {
    $("#backLab2List").on("click", backLab2);
    $("#LabView2Info").on("swiperight", backLab2);
    $("#radLab2List").on("click", { src: "lab2Info" }, openRadiology);
    $("#addNoteLab2List").on("click", openAddNote);
});
function backLabView2Info() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#LabView2Info", { reverse: true, transition: "slide", changeHash: false });
}

//--------------------------------------------------------Radiology starts--------------------------------------------//
$(document).on('pageinit', '#Radiology', function () {
    $("#back_radiology").on("click", backFromRadiology);
    $("#Radiology").on("swiperight", backFromRadiology);
    $("#AddNote_radiology").on("click", openAddNote);
    //    $("#lab_radiology").on("click", { src: "rad" }, openLabViews);
    $("#lab_radiology").on("click", { key: 0 }, LabView2);
});
function backFromRadiology() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (srcRad == "views") {
        backLabView();
    }
    else if (srcRad == "lab") {
        backLaboratoryList();
    }
    else if (srcRad == "notes") {
        backNotesList();
    }
    else if (srcRad == "notesDetail") {
        backNotesDtls();
    }
    else if (srcRad == "labRprtDtls") {
        backLabDtls();
    }
    else if (srcRad == "labView2") {
        backLab2();
    }
    else if (srcRad == "testDtls") {
        backTestDetails();
    }
    else if (srcRad == "lab2Info") {
        backLabView2Info();
    }
}
var srcRad = '';
function openRadiology(source) {
    if (sessionTimeOut() == false) {
        return false;
    }
           SpinnerDialog.show(null, "Loading...", true);
    if (source.data.src == "views") {
        srcRad = "views";
    }
    else if (source.data.src == "lab") {
        srcRad = "lab";
    }
    else if (source.data.src == "notes") {
        srcRad = "notes";
    }
    else if (source.data.src == "notesDetail") {
        srcRad = "notesDetail";
    }
    else if (source.data.src == "labRprtDtls") {
        srcRad = "labRprtDtls";
    }
    else if (source.data.src == "labView2") {
        srcRad = "labView2";
    }
    else if (source.data.src == "testDtls") {
        srcRad = "testDtls";
    }
    else if (source.data.src == "lab2Info") {
        srcRad = "lab2Info";
    }

    $("#lv_radiology").empty();

    $("#dname_radiology").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    $("#ptInfo_radiology").html($("#ptInfo_details").html());
    $("#radiologyLocation").html($("#ptInfoLocation").html());
    var dataRadiology = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val(),
        "PersonId": $("#hdnPersonIdDetails").val()
    };
    $.ajax({
        url: link + "getRadiologylist",
        data: JSON.stringify(dataRadiology),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
                    navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (reportStatus) {
             SpinnerDialog.hide();

            if (reportStatus == "failed") {
                //win               navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                      message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                  });
                return false;
            }
            $.mobile.changePage("#Radiology", { transition: "slide", changeHash: false });
            if (reportStatus == "[]" || reportStatus == "") {
                $("#lv_radiology").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Record Found</div>");
                return false;
            }
            var statusRadiology = JSON.parse(reportStatus);
            for (var key in statusRadiology) {
                //                $("#lv_radiology").append('<li onclick="openRadDetails(' + statusRadiology[key].eventId + ',' + '2' + ')"><a style="font-size: 12px; padding: 15px;" href="">' + statusRadiology[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusRadiology[key].resultStatus + '</div><span style="font-size: 12px;" class="ui-li-count">' + statusRadiology[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#lv_radiology").append('<li id="radiologyList' + key + '"><a style="font-size: 12px; padding: 15px;" href="">' + statusRadiology[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusRadiology[key].resultStatus + '</div><span style="font-size: 12px;margin-top:2px" class="ui-li-count">' + statusRadiology[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#radiologyList" + key).on("click", { key: statusRadiology[key].eventId, valueCheck: "2" }, openRadDetails);

            }
        }
    });
}
var flag = '';
function openRadDetails(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var evntId = event.data.key;
    var rprtnm = event.data.valueCheck;

           SpinnerDialog.show(null, "Loading...", true);
    $("#tstNmRadReportDetails").html('');
    $("#contentRadReportDetails").html('');

    $.mobile.changePage("#RadRprtDtlsPage", { transition: "slide", changeHash: false });
    if (rprtnm == 1) {
        $("#radReportName").html("Laboratory Report");
        flag = 1;
    }
    else if (rprtnm == 2) {
        $("#radReportName").html("Radiology Report");
        flag = 2;
    }
    else if (rprtnm == 3) {

        $("#radReportName").html("Laboratory Report");
        flag = 3;
    }
    $("#dnmRadReportDetails").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    // $("#dnmRadReportDetails").append('<span id="lnameRadReportDetails" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
    $("#PtInfoRadReportDetails").html($("#ptInfo_details").html());
    $("#RadRprtDtlsLocation").html($("#ptInfoLocation").html());
    var dataReportDetails = {
        "key": evntId,
        "value": $("#hdnfacilityId").val(),
        "operatorId": $("#hdnuserid").val(),
        "tokenKey": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getRadiologyRptdt",
        data: JSON.stringify(dataReportDetails),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                         SpinnerDialog.hide();
                    navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (reportDetails) {
                                                     SpinnerDialog.hide();

            if (reportDetails == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }
            else if (reportDetails == "[]" || reportDetails == "") {
                $("#contentRadReportDetails").html("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Record Found</div>");
                return false;
            }
            var detailsReport = JSON.parse(reportDetails);

            $("#tstNmRadReportDetails").html(detailsReport["TestName"]);
            $("#contentRadReportDetails").html(detailsReport["BLOBCONTENTS"].replace(/\n/g, "<br />")).trigger('create');
            //$("#contentRadReportDetails").prop("disabled", true);
        }
    });
}
function backRadiology() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#Radiology", { reverse: true, transition: "slide", changeHash: false });
}

//-----------------------------------------------------Radiology ends--------------------------------------------------//

//-------------------------------------------Laboratory starts--------------------------------------------------------//

$(document).on('pageinit', '#Laboratory', function () {
    $("#back_lab").on("click", backLabView);
    $("#Laboratory").on("swiperight", backLabView);
    $("#rad_lab").on("click", { src: "lab" }, openRadiology);
    $("#AddNote_lab").on("click", openAddNote);
});

//Not used
function openLaboratory() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#Laboratory", { transition: "slide", changeHash: false });

        SpinnerDialog.show(null, "Loading...", true);

    $("#lv_laboratory").empty();

    $("#dname_lab").html($("#hdnphyname").val());
    $("#dname_lab").append('<span id="lname_lab" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    $("#ptInfo_lab").html($("#ptInfo_details").html());
    $("#labLocation").html($("#ptInfoLocation").html());
    var dataLaboratory = {
        "key": "20860349", //20860349   --Tushar
        "value": "4382594"//$("#hdnPersonIdDetails").val()
    };
    $.ajax({
        url: link + "getPatientClinicalEvent",
        data: JSON.stringify(dataLaboratory),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                        SpinnerDialog.hide();
                    navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (reportStatus) {

            if (reportStatus == "[]" || reportStatus == "") {
                $("#lv_laboratory").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Record Found</div>");
                          SpinnerDialog.hide();
                return false;
            } else if (reportStatus == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                   {
                                       message: failedMsg,
                                       duration: 2000, // ms
                                       position: "center"
                                   });
                return false;
            }

            var statusLaboratory = JSON.parse(reportStatus);

            for (var key in statusLaboratory) {
                $("#lv_laboratory").append('<li onclick="openLabDetails(' + statusLaboratory[key].eventId + ',' + statusLaboratory[key].eventClassCD + ',' + "'" + statusLaboratory[key].Name + "'" + ')"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[key].Name + '<div style="font-size:12px; margin-top:6px;">' + statusLaboratory[key].resultStatus + '</div><span style="font-size: 12px;margin-top:2px" class="ui-li-count">' + statusLaboratory[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');
            }
                 SpinnerDialog.hide();
        }
    });
}
function openLabDetails(evntId, evntClassCd, rprtName) {
    if (sessionTimeOut() == false) {
        return false;
    }

    $("#LabrprtDetails").html('');
          SpinnerDialog.show(null, "Loading...", true);


    $.mobile.changePage("#LabRprtDtlsPage", { transition: "slide", changeHash: false });
    $("#dnmLabReportDetails").html($("#hdnphyname").val());
    $("#dnmLabReportDetails").append('<span id="lnameLabReportDetails" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
    $("#PtInfoLabReportDetails").html($("#ptInfo_details").html());
    $("#LabRprtDtlsLocation").html($("#ptInfoLocation").html());
    var dataReportDetails = {
        "key": evntId,
        "value": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getLabRptdt",
        data: JSON.stringify(dataReportDetails),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                              SpinnerDialog.hide();
                    navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (reportDetails) {
                             SpinnerDialog.hide();
            if (reportDetails == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                  {
                                      message: failedMsg,
                                      duration: 2000, // ms
                                      position: "center"
                                  });
                return false;

            }
            var detailsReport = JSON.parse(reportDetails);
            $("#LabrprtDetails").append('<div style="display: inline-block;" class="mt1"><span style="font-size: 13px; margin-top:8px;" id="tstNmLabRprtDetails">' + detailsReport.TestName + '</span><span id="rsltvalLabRprtDetails" style="word-wrap:none;  text-align: center; width:50px; padding:10px; display:inline-block; font-size: 13px;">' + detailsReport.Resultvalue + '</span><span class="fr tar" style="display: inline-block; word-wrap:break-word; width: 25%; padding-top:7px; "><span  style="font-size: 13px;" id="unitLabRprtDtls">' + detailsReport.Unit + '</span><span  style="font-size: 13px; margin-left:5px;" id="refLabRprtDtls">' + detailsReport.Refrange + '</span></span></div><div class="clr"></clr>');
        }
    });
}

//----------------------------------------------Laboratory ends---------------------------------------------------//

//---------------------------------------Add Note starts-----------------------------------------------------------//

$(document).on('pageinit', '#AddNote', function () {
    $("#backAddNote").on("click", backTestDetails);
    $("#AddNote").on("swiperight", backTestDetails);
    $("#saveNoteAdd").on("click", saveNote);
});
function saveNote() {
    if (sessionTimeOut() == false) {
        return false;
    }
    var ddlNoteTitle = document.getElementById("ddl_NotesList");
    var noteTitleText = ddlNoteTitle.options[ddlNoteTitle.selectedIndex].text;
    if ($('#ddl_NotesList').val() == 0) {
        //win          navigator.notification.alert('Select note title.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                  {
                      message: "Select note title.",
                      duration: 2000, // ms
                      position: "center"
                  });
    }
    else if ($('#txt_Notes').val() == "") {
        //win    navigator.notification.alert('Please enter a note.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter a note.",
                       duration: 2000, // ms
                       position: "center"
                   });
    }
    else {
                SpinnerDialog.show(null, "Loading...", true);
        var dataNoteTitle = {
            "patientMRN": $("#mrnNoDetails").html(),
            "PersonID": $("#hdnPersonIdDetails").val(),
            "physicianID": $("#hdnuserid").val(),
            "NoteTitleID": $("#ddl_NotesList").val(),
            "NoteTitle": noteTitleText,
            "Note": $("#txt_Notes").val(),
            "operatorID": $("#hdnuserid").val(),
            "operatorName": $("#hdnphyname").val(),
            "token": $("#hdntokenKey").val(),
            "facilityID": $("#hdnfacilityId").val()
        };
        $.ajax({
            url: link + "AddPatientNote",
            data: JSON.stringify(dataNoteTitle),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                                 SpinnerDialog.hide();
                      navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
            },
            success: function (noteStatus) {
                               SpinnerDialog.hide();
                if (noteStatus == 0) {
                    //win   navigator.notification.alert('Note saved.', alertDismissed, 'Success', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: "Note saved.",
                                               duration: 2000, // ms
                                               position: "center"
                                          });

                } else {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: failedMsg,
                                               duration: 2000, // ms
                                               position: "center"
                                           });

                }
                openNotesList();
            }
        });
    }
}
function openAddNote() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $.mobile.changePage("#AddNote", { transition: "slide", changeHash: false });
            SpinnerDialog.show(null, "Loading...", true);
    $("#txt_Notes").val('');
    $("#dname_addnote").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    $("#ptInfo_addnote").html($("#ptInfo_details").html());
    $("#addNoteLocation").html($("#ptInfoLocation").html());
    var dataNoteTitle = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getnoteTitlelist",
        data: JSON.stringify(dataNoteTitle),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                           SpinnerDialog.hide();
                  navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (notesTitle) {
                                                 SpinnerDialog.hide();
            if (notesTitle == 2) {
                //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                 window.plugins.toast.showWithOptions(
                                                    {
                                                       message: session,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                  });
                logout();
                return false;
            } else if (notesTitle == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                 window.plugins.toast.showWithOptions(
                                                    {
                                                        message: failedMsg,
                                                        duration: 2000, // ms
                                                        position: "center"
                                                    });
                return false;
            }

            var titleNotes = JSON.parse(notesTitle);
            $("#ddl_NotesList").html("<option value=0> Select Note Title</option>");
            for (var key in titleNotes) {
                $("#ddl_NotesList").append('<option value=' + titleNotes[key].key + '>' + titleNotes[key].value + '</option>').trigger("change");
            }

        }
    });

}

//-----------------------------------Add Note ends-----------------------------------------------------------------------//

//------------------------------------------------------Notes List starts-----------------------------------------------//
$(document).on('pageinit', '#Notes', function () {
    $("#back_notes").on("click", backTestDetails);
    $("#Notes").on("swiperight", backTestDetails);
    $("#rad_notes").on("click", { src: "notes" }, openRadiology);
    //$("#lab_notes").on("click", { src: "Notes" }, openLabViews);
    $("#lab_notes").on("click", LabView2);
    $("#addNote_notes").on("click", openAddNote);
});
function backNotesList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#Notes", { reverse: true, transition: "slide", changeHash: false });
}
function openNotesList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#lv_notes").empty();
    $.mobile.changePage("#Notes", { transition: "slide", changeHash: false });

            SpinnerDialog.show(null, "Loading...", true);


    $("#dname_notes").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");

    $("#ptInfo_notes").html($("#ptInfo_details").html());
    $("#notesListLocation").html($("#ptInfoLocation").html());
    var dataNotesList = {
        "patientMRN": $("#mrnNoDetails").html(),
        "operatorId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };

    $.ajax({
        url: link + "getPatientNoteList",
        data: JSON.stringify(dataNotesList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                        SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (notesList) {
                                                SpinnerDialog.hide();
            if (notesList == 2) {
                //win                              navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                                              window.plugins.toast.showWithOptions(
                                                    {
                                                        message: session,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                logout();
                return false;
            }
            else if (notesList == "" || notesList == "[]") {
                $("#lv_notes").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Notes Found</div>");
                return false;
            }
            var listNotes = JSON.parse(notesList);
            for (var key in listNotes) {
                //                $("#lv_notes").append('<li onclick="openNoteDetails(' + listNotes[key].NoteId + ')"><a href="" style="font-size: 12px; line-height: 2em;"><div id="summary_notes"><b>' + listNotes[key].NoteTitle + '<span style="margin-left:10px; font-size: 12px">' + listNotes[key].NoteDate + '</span></b><span style="margin-left:10px; font-size: 12px">' + listNotes[key].physicianName + '</span></div><div id="notesInfo" class="notesSummary">' + listNotes[key].Note + '</div></a></li>').listview('refresh').trigger('create');

                $("#lv_notes").append('<li id="noteList' + listNotes[key].NoteId + '"><a href="" style="font-size: 12px; line-height: 2em;"><div id="summary_notes"><b>' + listNotes[key].NoteTitle + '<span style="margin-left:10px; font-size: 12px">' + listNotes[key].NoteDate + '</span></b><span style="margin-left:10px; font-size: 12px">' + listNotes[key].physicianName + '</span></div><div id="notesInfo" class="notesSummary">' + listNotes[key].Note + '</div></a></li>').listview('refresh').trigger('create');

                $("#noteList" + listNotes[key].NoteId).on("click", { key: listNotes[key].NoteId }, openNoteDetails);

            }

        }
    });
}

//---------------------------------------------Notes List ends-------------------------------------------------------------//

//------------------------------------------Notes Details starts------------------------------------------------------//

$(document).on('pageinit', '#Notes_DetailsPage', function () {
    $("#backNotesDetails").on("click", backNotesList);
    $("#Notes_DetailsPage").on("swiperight", backNotesList);
    $("#radNotesDetails").on("click", { src: "notesDetail" }, openRadiology);
    //$("#labNotesDetails").on("click", { src: "notesDetail" }, openLabViews);
    $("#labNotesDetails").on("click", LabView2);
    $("#addnoteNotesDetails").on("click", openAddNote);
});
function backNotesDtls() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#Notes_DetailsPage", { reverse: true, transition: "slide", changeHash: false });
}
function openNoteDetails(event) {
    if (sessionTimeOut() == false) {
        return false;
    }
    var id = event.data.key;
    $.mobile.changePage("#Notes_DetailsPage", { transition: "slide", changeHash: false });
              SpinnerDialog.show(null, "Loading...", true);
    $("#noteTitle").html("");
    $("#detailsNotes").html("");
    $("#dnameNotesDetails").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    // $("#dnameNotesDetails").append('<span id="lnameNotesDetails" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
    $("#ptInfoNotesDetails").html($("#ptInfo_details").html());
    $("#notesDetailsLocation").html($("#ptInfoLocation").html());
    var details = {
        "NoteId": id,
        "operatorId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val()
    };
    $.ajax({
        url: link + "getPatientNoteDetail",
        data: JSON.stringify(details),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (notesDetails) {
                                           SpinnerDialog.hide();
            if (notesDetails == 2) {
                //win    navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                                                window.plugins.toast.showWithOptions(
                                                      {
                                                          message: session,
                                                          duration: 2000, // ms
                                                          position: "center"
                                                      });
                logout();
                return false;
            } else if (notesDetails == "failed") {
                //win        navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                 window.plugins.toast.showWithOptions(
                                                    {
                                                       message: failedMsg,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                return false;
            }
            else if (notesDetails == "" || notesDetails == "[]") {
                $("#detailsNotes").html("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Notes Found</div>");
                return false;
            }
            var detailsNotes = JSON.parse(notesDetails);
            $("#noteTitle").html(detailsNotes["NoteTitleID"]);
            $("#detailsNotes").append('<div><span style="margin-left:10px; font-size: 15px; float:left;">' + detailsNotes["operatorName"] + '</span><span class="tac" style="font-size: 15px; float:right;">' + detailsNotes["NoteDate"] + '</span></div><div class="clr"><hr style="height: 1px; background-color: #A12B76; border: 0; color: #A12B76;"></div><div class="tal" style="font-size: 15px;">' + detailsNotes["Note"] + '</div>');
        }
    });



}

//----------------------------------Radiology report ends-------------------------------------------------------------------//

//--------------Change Pwd starts------------------------------------------------------------------------------------------//

$(document).on('pageinit', '#ChangePwd', function () {
    $("#backChngePwd").on("click", backSettingPage);
    $("#ChangePwd").on("swiperight", backSettingPage);
    $("#submitChangePwd").on("click", ChangePassword);
});

function openChangePwd() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $("#dnameChangePwd").html('');
    $("#oldPwd").val('');
    $("#NewPwd").val('');
    $("#ConfirmPwd").val('');
    $("#dnameChangePwd").html($("#hdnphyname").val() + " (@" + $("#hdnFacilityName").val() + ")");
    $.mobile.changePage("#ChangePwd", { transition: "slide", changeHash: false });
}
function ChangePassword() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (validatePwd()) {
        var dataChangePwd = {
            "userid": $("#hdnuserid").val(),
            "oldPassword": $("#oldPwd").val(),
            "newpws": $("#NewPwd").val(),
            "tokenkey": $("#hdntokenKey").val()
        };

          SpinnerDialog.show(null, "Loading...", true);

        $.ajax({
            url: link + "changePassword",
            data: JSON.stringify(dataChangePwd),
            dataType: "json",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (request, error) {
                            SpinnerDialog.hide();
                        navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

            },
            success: function (statusPwd) {

                               SpinnerDialog.hide();
                var pwdStatus = JSON.parse(statusPwd);
                if (pwdStatus["ID"] == 1) {
                    //win      navigator.notification.alert('Your PIN has been Changed.', alertDismissed, 'Success', 'Ok');
                                           window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: "Your PIN has been Changed.",
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });
                    backSettingPage();
                }
                else if (pwdStatus["ID"] == 2) {
                    //win  navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                          window.plugins.toast.showWithOptions(
                                                             {
                                                                 message: session,
                                                                 duration: 2000, // ms
                                                                 position: "center"
                                                             });
                    logout();
                    return false;
                } else if (pwdStatus["ID"] == "failed") {
                    //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                         window.plugins.toast.showWithOptions(
                                                            {
                                                                message: failedMsg,
                                                                duration: 2000, // ms
                                                                position: "center"
                                                            });
                    return false;
                }
                else {
                    //win  navigator.notification.alert('Incorrect old PIN.', alertDismissed, '', 'Ok');
                                          window.plugins.toast.showWithOptions(
                                                             {
                                                                 message: "Incorrect old PIN.",
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });
                }
            }
        });
    }
}
function validatePwd() {

    if ($("#oldPwd").val() == "" || $("#NewPwd").val() == "" || $("#ConfirmPwd").val() == "") {
        //win   navigator.notification.alert('Please complete all boxes.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please complete all boxes.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }
    else if ($("#oldPwd").val().length != 4 || $("#NewPwd").val().length != 4 || $("#ConfirmPwd").val().length != 4) {
        //win         navigator.notification.alert('Please enter a valid PIN.', alertDismissed, 'Validation Error', 'Ok');

                window.plugins.toast.showWithOptions(
                    {
                        message: "Please enter a valid PIN.",
                        duration: 2000, // ms
                        position: "center"
                    });
        return false;
    }
    else if ($("#NewPwd").val() != $("#ConfirmPwd").val()) {
        //win  navigator.notification.alert('PINs not matching.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "PINs not matching.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }

    return true;

}

//---------------------------------------------------------Change Pwd ends-------------------------------------------------//
//-----------------------------Radiology  Details starts------------------------------------------------------------------//

$(document).on('pageinit', '#RadRprtDtlsPage', function () {
    $("#backRadReportDetails").on("click", backRadiologyList);
    $("#RadRprtDtlsPage").on("swiperight", backRadiologyList);
    $("#radioRadReportDetails").on("click", backRadiologyList);
    $("#addNoteRadReportDetails").on("click", openAddNote);
    //    $("#labRadReportDetails").on("click", { src: "RadRprtDtls" }, openLabViews);
    $("#labRadReportDetails").on("click", LabView2);
});
function backRadRprtDtlsPage() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#RadRprtDtlsPage", { reverse: true, transition: "slide", changeHash: false });
}

function backRadiologyList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if (flag == 2) {
        $(":mobile-pagecontainer").pagecontainer("change", "#Radiology", { reverse: true, transition: "slide", changeHash: false });
    }
    else if (flag == 1) {
        $(":mobile-pagecontainer").pagecontainer("change", "#Laboratory", { reverse: true, transition: "slide", changeHash: false });
    }
    else if (flag == 3) {
        $(":mobile-pagecontainer").pagecontainer("change", "#LabView2Info", { reverse: true, transition: "slide", changeHash: false });
    }

}

//-----------------------Radiology  Details ends---------------------------------------------------------------------//

//-------------------------------------------------------Laboratory details starts---------------------------------------------------//
$(document).on('pageinit', '#LabRprtDtlsPage', function () {
    $("#backLabReportDetails").on("click", backLaboratoryList);
    $("#LabRprtDtlsPage").on("swiperight", backLaboratoryList);
    $("#labLabReportDetails").on("click", backLaboratoryList);
    $("#addNoteLabReportDetails").on("click", openAddNote);
    $("#radioLabReportDetails").on("click", { src: "labRprtDtls" }, openRadiology);
});

function backLaboratoryList() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#Laboratory", { reverse: true, transition: "slide", changeHash: false });
}
function backLabDtls() {
    if (sessionTimeOut() == false) {
        return false;
    }
    $(":mobile-pagecontainer").pagecontainer("change", "#LabRprtDtlsPage", { reverse: true, transition: "slide", changeHash: false });
}
//--------------------------------Laboratory details ends-----------------------------------------------------------------//

//-------------------------------------------------------Laboratory details starts---------------------------------------------------//

$(document).on('pageinit', '#loginChangePwd', function () {
    $("#loginChangePwd").on("swiperight", backloginPage);
    $("#submitChngePwd").on("click", submitChangePassword);
});

function submitChangePassword() {
    if (sessionTimeOut() == false) {
        return false;
    }
    if ($("#cnfrmPwdChngePwd").val() == "" || $("#newPwdChngePwd").val() == "") {
        //win   navigator.notification.alert('Please complete all boxes.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please complete all boxes.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }
    else if ($("#cnfrmPwdChngePwd").val().length != 4 || $("#newPwdChngePwd").val().length != 4) {
        //win         navigator.notification.alert('Please enter a valid PIN.', alertDismissed, 'Validation Error', 'Ok');

                window.plugins.toast.showWithOptions(
                    {
                        message: "Please enter a valid PIN.",
                        duration: 2000, // ms
                        position: "center"
                    });
        return false;
    }
    else if ($("#cnfrmPwdChngePwd").val() != $("#newPwdChngePwd").val()) {
        //win  navigator.notification.alert('PINs not matching.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "PINs not matching.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }


    var dataNoteTitle = {
        "key": $("#hdnuserid").val(),
        "value": $("#cnfrmPwdChngePwd").val()
    };
     SpinnerDialog.show(null, "Loading...", true);
    $.ajax({
        url: link + "firstLoginPassword",
        data: JSON.stringify(dataNoteTitle),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (success) {
                  SpinnerDialog.hide();
            var pwdStatus = JSON.parse(success);
            if (pwdStatus["ID"] == 1) {
                if ($("#hdnfacilityId").val() == '3') {
                    $.mobile.changePage("#Dashboard", { transition: "slide", changeHash: false });
                    getFacilityList();
                }
                else {
                    openLandingPage();
                }
                //win  navigator.notification.alert('Your PIN has been Changed.', alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: 'Your PIN has been Changed.',
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });

                return false;
            } else if (pwdStatus["ID"] == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: failedMsg,
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
                return false;
            }
        }
    });

}
//--------------------------------Laboratory details ends-----------------------------------------------------------------//

//----------------------------------------------------------forgot pwd page starts---------------------------------------------------------//

$(document).on('pageinit', '#forgotPwdPage', function () {
    $("#forgotPwdPage").on("swiperight", backloginPage);
    $("#backForgotPwd").on("click", backloginPage);
    $("#requestPwd").on("click", requestPwd);
});
function requestPwd() {

    if ($("#emailForgotPwd").val() == '') {
        //win  navigator.notification.alert('Please enter email.', alertDismissed, 'Validation error', 'Ok');
                            window.plugins.toast.showWithOptions(
                               {
                                   message: 'Please enter email.',
                                  duration: 2000, // ms
                                   position: "center"
                               });
        return false;
    }
    var dataReqPwd = {
        "ID": $("#emailForgotPwd").val()
    };
      SpinnerDialog.show(null, "Loading...", true);
    $.ajax({
        url: link + "forgotPassword",
        data: JSON.stringify(dataReqPwd),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                      SpinnerDialog.hide();
               navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (success) {
                  SpinnerDialog.hide();
            if (success == "failed") {
                //win  navigator.notification.alert(failedMsg, alertDismissed, '', 'Ok');
                                    window.plugins.toast.showWithOptions(
                                       {
                                           message: failedMsg,
                                          duration: 2000, // ms
                                           position: "center"
                                       });

                return false;
            }
            var pwdStatus = JSON.parse(success);
            var result = pwdStatus.ID;
            if (result == 0) {
                //win  navigator.notification.alert('Email does not exist.', alertDismissed, 'Failed', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: 'Email does not exist.',
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
            }
            else if (result == "mailNotSent") {
                //win  navigator.notification.alert('Failed', alertDismissed, 'Failed', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: 'Failed',
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });
            }
            else {

                //win  navigator.notification.alert('PIN sent to your email.', alertDismissed, 'Success', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: 'PIN sent to your email.',
                                                       duration: 2000, // ms
                                                       position: "center"
                                                   });

                $("#emailForgotPwd").val('');

                backloginPage();
            }
        }
    });

}

//------------------------------------------------Forgot Pwd Page ends here----------------------------------------//
//----------------------Upload pic page starts------------------------------------------------------------------------------------------------//

//$(document).on('pageinit', '#uploadProfilePicPage', function () {
//    $("#imageUpload").on("click", imagePopupCall);
//    $("#captureVideo").on("click", imagePopupCall);
//    $("#browse").on("click", imagePopupCall);
//    $("#backUploadProfile").on("click", backLandingPage);
//    $("#uploadProfilePicPage").on("swiperight", backLandingPage);

//});
var Quality = "";
var imgCap = '';
function imagePopupCall(statImgCap) {
    imgCap = statImgCap;
    if (imgCap == 'capMore') {
        imageCapMore();
        //$("#popupCapMore").popup("open");
    }
    else if (imgCap == 'imgCap') {
        imageCaptureAI();
        //$("#uploadImagePopup").popup("open");
    }


}
function getQuality() {
    Quality = $('input:radio[name=uploadQualityRadio]:checked').val();
    if (imgCap == 'capMore') {
        imageCapMore();
        $("#popupCapMore").popup("close");
        $("#popupCapMore").popup({ history: false });
    }
    else if (imgCap == 'imgCap') {
        imageCaptureAI();
        $("#uploadImagePopup").popup("close");
        $("#uploadImagePopup").popup({ history: false });
    }

}
//function capturePicture() {


//    var options = {
//        limit: 1

//    };

//    navigator.device.capture.captureImage(onSuccess, onError, options);
//    $("#uploadImagePopup").popup({ history: false });
//    $("#uploadImagePopup").popup("close");

//    function onSuccess(mediaFiles) {

//        var path = mediaFiles[0].fullPath;
//        var name = mediaFiles[0].name;
//        var img = document.getElementById('camera_image');
//        img.style.visibility = "visible";
//        img.style.display = "block";
//        img.src = path;

//      
//        var options = new FileUploadOptions();
//        options.fileKey = "file";
//        options.fileName = name;
//        options.mimeType = mediaFiles[0].type;
//        options.headers = { 'Content-Type': "multipart/encrypted" };

//        var params = new Object();
//        params.fullpath = path;
//        params.name = name;

//        options.params = params;
//        options.chunkedMode = false;

//        var ft = new FileTransfer();
//        ft.upload(path, "http://206.19.38.2/fileupload/FileUploadServ.svc/UploadFile?fileName=" + name,
//                    function (result) {
//                         SpinnerDialog.hide();
//                        movePic(path);

//                        window.plugins.toast.showWithOptions(
//                                                   {
//                                                       message: "Image uploaded successfully.",
//                                                       duration: 2000, // ms
//                                                       position: "center"
//                                                   });

//                        //upload successful            
//                    },
//        function (error) {
//             SpinnerDialog.hide();
//            window.plugins.toast.showWithOptions(
//                                       {
//                                           message: "Error in image uploading.",
//                                           duration: 2000, // ms
//                                           position: "center"
//                                       });
//            //upload unsuccessful, error occured while upload. 
//        },
//        options
//        );
//    }



//    function onError(error) {
//        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
//    }
//}

//function movePic(image) {
//  
//    window.resolveLocalFileSystemURL(image, resolveOnSuccess, resOnError);
//}
//function resolveOnSuccess(entry) {
//  
//    var d = new Date();
//    var n = d.getTime();
//   
//    var newFileName =  n + ".jpg";
//    var myFolderApp = "LGT Portal";

//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
//      
//        fileSys.root.getDirectory(myFolderApp,
//                { create: true, exclusive: false },
//        function (directory) {
//            directory.getDirectory('LGTImages', { create: true, exclusive: false }, function (subDirEntry) {
//                entry.moveTo(subDirEntry, newFileName, successMove, resOnError);
//              
//                var path = fileSys.root.toURL() + "LGT Portal/LGTImages/" + newFileName;
//              
//             
//                refreshMedia.refresh(path);
//            }, onGetDirectoryFail);

//        },
//                resOnError);
//    },
//            resOnError);
//}

//function successMove(entry) {
//    alert("success: " + entry);
//}

//function resOnError(error) {
//    alert("error1" + error.code);
//}
//function restOnError(error) {
//    alert("error2" + error.code);
//}
//function restOnnError(error) {
//    alert("error3" + error.code);
//}




//function captureVideo() {
//    $('#camera_image').attr('src', '');
//    var captureSuccess = function (mediaFiles) {
//       SpinnerDialog.show(null, "Loading...", true);
//        var path = mediaFiles[0].fullPath;
//        var name = mediaFiles[0].name;

//        var options = new FileUploadOptions();
//        options.fileKey = "file";
//        options.fileName = name;
//        options.mimeType = mediaFiles[0].type;
//        options.headers = { 'Content-Type': "multipart/encrypted" };
//      
//        var params = new Object();
//        params.fullpath = path;
//        params.name = name;

//        options.params = params;
//        options.chunkedMode = false;

//        var ft = new FileTransfer();
//        ft.upload(path, "http://206.19.38.2/fileupload/FileUploadServ.svc/UploadFile?fileName=" + name,
//        function (result) {
//           SpinnerDialog.hide();
//            moveVideo(path);
//            window.plugins.toast.showWithOptions(
//                           {
//                               message: "Video uploaded successfully.",
//                               duration: 2000, // ms
//                               position: "center"
//                           });
//            //upload successful            
//        },
//        function (error) {
//              SpinnerDialog.hide();
//            window.plugins.toast.showWithOptions(
//                           {
//                               message: "Error in Video uploading.",
//                               duration: 2000, // ms
//                               position: "center"
//                           });
//        },
//        options
//        );
//    }




//    var captureError = function (error) {
//        // navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
//    };
//    var optionsFile = { limit: 1, quality: Quality };

//    // start video capture
//    navigator.device.capture.captureVideo(captureSuccess, captureError, optionsFile);
//    $("#uploadImagePopup").popup({ history: false });
//    $("#uploadImagePopup").popup("close");
//}
//function moveVideo(video) {

//    window.resolveLocalFileSystemURL(video, OnVideoSuccess, OnVideoError);
//}
//function OnVideoSuccess(entry) {

//    var d = new Date();
//    var n = d.getTime();
//    //new file name
//    var newFileName = n + ".mp4";
//    var myFolderApp = "LGT Portal";

//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
//     
//        fileSys.root.getDirectory(myFolderApp,
//                { create: true, exclusive: false },
//        function (directory) {
//            directory.getDirectory('LGTVideos', { create: true, exclusive: false }, function (subDirEntry) {
//                entry.moveTo(subDirEntry, newFileName, successMoveVideo, resOnError);
//                
//                var path = fileSys.root.toURL() + "LGT Portal/LGTVideos/" + newFileName;
//                
//               
//                refreshMedia.refresh(path);
//            }, onGetDirectoryFail);

//        },
//                resError);
//    },
//            OnErrorResult);
//}

//function successMoveVideo(entry) {
//    alert("success: " + entry);
//}

//function OnVideoError(error) {
//    alert("error1" + error.code);
//}
//function resError(error) {
//    alert("error2" + error.code);
//}
//function OnErrorResult(error) {
//    alert("error3" + error.code);
//}

//function selectPicture() {
//    $('#camera_image').attr('src', '');

//    navigator.camera.getPicture(
//    function (uri) {
//        window.plugins.spinnerDialog.show(null, "Loading...", true);
//        var img = document.getElementById('camera_image');
//        img.style.visibility = "visible";
//        img.style.display = "block";
//        img.src = uri;

//        window.FilePath.resolveNativePath(uri, function (result) {

//            // onSuccess code
//            var name = result.replace(/^.*[\\\/]/, '');

//            var options = new FileUploadOptions();
//            options.fileKey = "file";
//            options.fileName = name;
//            options.mimeType = "image/jpeg";
//            options.headers = { 'Content-Type': "multipart/encrypted" };

//            var params = new Object();
//            params.fullpath = result;
//            params.name = name;

//            options.params = params;
//            options.chunkedMode = false;

//            var ft = new FileTransfer();
//            ft.upload(result, "http://206.19.38.2/fileupload/FileUploadServ.svc/UploadFile?fileName=" + name,
//        function (result) {
//            window.plugins.spinnerDialog.hide();
//            window.plugins.toast.showWithOptions(  
//                           {
//                               message: "Image uploaded successfully.",
//                               duration: 2000, // ms
//                               position: "center"
//                           });
//            //upload successful            
//        },
//        function (error) {
//            window.plugins.spinnerDialog.hide();
//            window.plugins.toast.showWithOptions(
//                           {
//                               message: "Error in image uploading.",
//                               duration: 2000, // ms
//                               position: "center"
//                           });
//            //upload unsuccessful, error occured while upload. 
//        },
//        options
//        );

//        }, function (error) {
//            // onError code here
//            alert(error);
//        });


//    },
//            function (e) {
//                //alert("Not selected");
//            },
//    { quality: Quality, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
//    $("#uploadImagePopup").popup({ history: false });
//    $("#uploadImagePopup").popup("close");

//}

