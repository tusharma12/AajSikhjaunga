//--------------------------------------------------------------Paths------------------------------------------------------------------//

var loadingtheme = "a";
var loadingText = "Loading ..!"
var ntwrkHead = "Server Inaccessible";
var ntwrkDesc = "You may not be in the Trust internal network ,trust server is inaccessible.";
var session = "Another device is using your login, your session will terminate now.";
var failedMsg = "Something did not work as expected. Please do inform the support team.";

//var link = "http://192.168.10.93/patientlistservicetree/Service.svc/";
//var link = "http://54.187.221.92/patientlistservicetree/Service.svc/";
//var link = "http://206.19.38.2/PatientlistService/Service.svc/";
var link = "http://206.19.38.23/patientlistservicetree/Service.svc/";
//var link = "http://localhost:53317/PatientlistServiceTree/Service.svc/";
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
});


function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function alertDismissed() {
    // do something
}

function onDeviceReady() {

    //  window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 50, onRequestFileSystemSuccess, null); 
    document.addEventListener("backbutton", onBackKeyDown, false);

    //win  StatusBar.show();

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
        case 'PatientlistLandingPage':
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
            $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLandingPage", { reverse: true, transition: "slide", changeHash: false });
            break;
        case 'loginChangePwd':
            $(":mobile-pagecontainer").pagecontainer("change", "#Dashboard", { reverse: true, transition: "slide", changeHash: false });
            break;

        default:
            //   $('#btn_BackCriticalIssue').trigger('click');
            //  alert('this is default ');
            break;
    }
}



//-----------------------------------------------Device Ready Function Ends---------------------------------------------------------//

//----------------------------------------------------------Login Page Starts------------------------------------------------------//


$(document).on('pageinit', '#PatientlistLoginPage', function () {
    $("#btnrequestpin").on("click", openRequestPin);
    $("#btnlogin").on("click", login);
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
function home() {
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLandingPage", { reverse: true, transition: "slide", changeHash: false });
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
    if ($("#loginpin").val() == "") {

        //win         navigator.notification.alert('Please enter your pin.', alertDismissed, 'Validation Error', 'Ok');

                window.plugins.toast.showWithOptions(
                    {
                        message: "Please enter your pin.",
                        duration: 2000, // ms
                        position: "center"
                    });
        return false;
    }
    return true;
}

function login() {
    if (validateLogin()) {
                 SpinnerDialog.show(null, "Loading...", true);

        var msg = {
            "key": $("#loginid").val(),
            "value": $("#loginpin").val()
        };
        $.ajax({
            url: link + "physicianlogin",
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

                    //win                navigator.notification.alert('Invalid Username or Password.', alertDismissed, 'Validation Error', 'Ok');

                                                            window.plugins.toast.showWithOptions(
                                               {
                                                   message: "Invalid Username or Password.",
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
                var phyDetails = JSON.parse(loginDetails);

                $("#hdntokenKey").val(phyDetails["tokenKey"]);
                $("#hdnuserid").val(phyDetails["id"]);
                $("#hdnphyname").val(phyDetails["physicianName"]);
                $("#hdnjobtitle").val(phyDetails["jobtitle"]);
                $("#hdnloginstatus").val(phyDetails["apploginStatus"]);
                $("#dname_landingPage").html(phyDetails["physicianName"]);
                $("#dnameDashboard").html(phyDetails["physicianName"]);
                $("#dname_myLists").html(phyDetails["physicianName"]);
                $("#dname_PatientList").html(phyDetails["physicianName"]);
                $("#phyNameChangePwd").html(phyDetails["physicianName"]);
                $("#hdnfacilityId").val(phyDetails["facilityID"]);

                if (phyDetails["apploginStatus"] == 0) {

                    $.mobile.changePage("#loginChangePwd", { transition: "slide", changeHash: false });
                    return false;
                } else {

                    if (phyDetails["facilityID"] == 3) {

                        $.mobile.changePage("#Dashboard", { transition: "slide", changeHash: false });
                        getFacilityList();

                    } else {
                        openLandingPage();
                    }
                }

                //                if (phyDetails["facilityID"] == 3) {

                //                    //                    $("#hdntokenKey").val(phyDetails["tokenKey"]);
                //                    //                    $("#hdnuserid").val(phyDetails["id"]);
                //                    //                    $("#hdnphyname").val(phyDetails["physicianName"]);
                //                    //                    $("#hdnjobtitle").val(phyDetails["jobtitle"]);
                //                    //                    $("#hdnloginstatus").val(phyDetails["apploginStatus"]);
                //                    //                    $("#dname_landingPage").html(phyDetails["physicianName"]);
                //                    //                    $("#dnameDashboard").html(phyDetails["physicianName"]);
                //                    //                    $("#dname_myLists").html(phyDetails["physicianName"]);
                //                    //                    $("#dname_PatientList").html(phyDetails["physicianName"]);
                //                    $.mobile.changePage("#Dashboard", { transition: "slide", changeHash: false });
                //                    getFacilityList();
                //                }
                //                //                else {
                //                //                    $("#hdnfacilityId").val(phyDetails["facilityID"]);
                //                //                    //                    $("#hdntokenKey").val(phyDetails["tokenKey"]);
                //                //                    //                    $("#hdnuserid").val(phyDetails["id"]);
                //                //                    //                    $("#hdnphyname").val(phyDetails["physicianName"]);
                //                //                    //                    $("#hdnjobtitle").val(phyDetails["jobtitle"]);
                //                //                    //                    $("#hdnloginstatus").val(phyDetails["apploginStatus"]);
                //                //                    //                    $("#hdnfacilityId").val(phyDetails["facilityID"]);
                //                //                    //                    $("#dname_landingPage").html(phyDetails["physicianName"]);
                //                //                    //                    $("#dname_myLists").html(phyDetails["physicianName"]);
                //                //                    //                    $("#dname_PatientList").html(phyDetails["physicianName"]);
                //                //                    openLandingPage();
                //                //                }
            }
        });
    }
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
                $("#facilityName").append('<div id="facilityDiv' + key + '"  style="padding:10px;" class="mt10"><input type="button" style="width:100%; padding:15px;"  value=' + ntwrkName[key].value + '  /></div>')

                $("#facilityDiv" + key).on("click", { key: ntwrkName[key].key }, LandingPage);

            }
        }
    });
}

function LandingPage(event) {
    var facilityId = event.data.key;
    $("#hdnfacilityId").val(facilityId);
    $.mobile.changePage("#PatientlistLandingPage", { transition: "slide", changeHash: false });
}

function backloginPage() {
    $("#loginid").val('');
    $("#loginpin").val('');
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLoginPage", { reverse: true, transition: "slide", changeHash: false });
}
//-------------------------------------------------------Login Page Ends------------------------------------------------------------//

//------------------------------------------Request Pin Page Starts----------------------------------------------------//

$(document).on('pageinit', '#PatientlistRequestPin', function () {
    $("#back_requestpin").on("click", backloginPage);
    $("#request_pin").on("click", requestPin);
    $("#PatientlistRequestPin").on("swiperight", backloginPage);
});


function validatePinRequest() {

    var valname = $("#txt_name").val();
    var valjob = $("#txt_jobtitle").val();
    var valemail = $("#txt_email").val();
    var atpos = $("#txt_email").val().indexOf("@");
    var dotpos = $("#txt_email").val().lastIndexOf(".");

    if (valname == "") {
        //win        navigator.notification.alert('Please enter your name.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                      {
                           message: "Please enter your name.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;

    } else if (valjob == "") {
        //win            navigator.notification.alert('Please enter your job title.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter your job title.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;

    } else if ($('#ddl_netusrname').val() == 0) {
        //win           navigator.notification.alert('Please select network User Name.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please select network User Name.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;

    } else if (valemail == "") {
        //win          navigator.notification.alert('Please enter your email.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                       {
                           message: "Please enter your email.",
                           duration: 2000, // ms
                           position: "center"
                       });
        return false;
    }
    else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= $("#txt_email").val().length) {
        //win            navigator.notification.alert('Invalid email address.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                    {
                        message: "Invalid email address.",
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
            "Name": $("#txt_name").val(),
            "networkUserName": $("#ddl_netusrname").val(),
            "jobtitle": $("#txt_jobtitle").val(),
            "email": $("#txt_email").val()
        };
        $.ajax({
            url: link + "getDoctorPinRequest",
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
                var Pinid = JSON.parse(pinId);
                var idPin = Pinid["ID"];
                if (idPin == 0) {
                    //win              navigator.notification.alert('Success.', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: "Success.",
                                                   duration: 2000, // ms
                                                   position: "center"
                                               });
                    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLoginPage", { reverse: true, transition: "slide", changeHash: false });
                }
                else if (idPin == 999) {
                    //win  navigator.notification.alert('Email already exist.', alertDismissed, 'Validation Error', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                               {
                                                   message: "Email already exist.",
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


function getFacilityListDropdown() {

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
            $("#ddl_netusrname").html("<option value=0> Select Network User Name</option>");
            for (var key in ntwrkName) {
                $("#ddl_netusrname").append('<option value=' + ntwrkName[key].key + '>' + ntwrkName[key].value + '</option>').trigger("change");
            }
        }
    });
}

function openRequestPin() {
    $.mobile.changePage("#PatientlistRequestPin", { transition: "slide", changeHash: false });
    getFacilityListDropdown();
    $("#ddl_netusrname").val("0").change();
    $("#txt_name").val("");
    $("#txt_jobtitle").val("");
    $("#txt_email").val("");
}

//--------------------------------------------Request Pin Page Ends---------------------------------------------//

//-----------------------------------------------Landing Page Function---------------------------------------//
$(document).on('pageinit', '#PatientlistLandingPage', function () {
    $("#done_addlist").on("click", updateEditList);
    $("#editlist_landingpage").on("click", openEditList);
    $("#mylists_landingpage").on("click", openMyList);
    // $("#captureImage").on("click", openCaptureImage);
    $("#addpatient_landingpage").on("click", { search: "1" }, openSearchPatient);
    $("#changepwd_landingpage").on("click", openChangePwd);
    $("#logout_landingpage").on("click", logout);
});
//function openCaptureImage() {
//    $('#camera_image').attr('src', '');
//    $("#dnameuploadProfile").html($("#hdnphyname").val());
//    $.mobile.changePage("#uploadProfilePicPage", { transition: "slide", changeHash: false });
//}
function logout() {
    $.mobile.changePage("#PatientlistLoginPage", { transition: "slide", changeHash: false });
    $("#hdntokenKey").val("");
    $("#hdnuserid").val("");
    $("#hdnphyname").val("");
    $("#hdnjobtitle").val("");
    $("#hdnloginstatus").val("");
    $("#hdnfacilityId").val("");
    $("#loginid").val('');
    $("#loginpin").val('');
}
function openLandingPage() {
    $.mobile.changePage("#PatientlistLandingPage", { transition: "slide", changeHash: false });
}
function backLandingPage() {
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientlistLandingPage", { reverse: true, transition: "slide", changeHash: false });
}

//-------------------------------------------------Landing Page Ends------------------------------------------//

//------------------------------------------------Edit List page function starts--------------------------------//

$(document).on('pageinit', '#PatientEditlist', function () {
    $("#back_addlist").on("click", backLandingPage);
    $("#PatientEditlist").on("swiperight", backLandingPage);
});

function openEditList() {

    $("#dname_editlist").html($("#hdnphyname").val());
        SpinnerDialog.show(null, "Loading...", true);
    $("#checkBox_EditList").html("");
    var dataEditList = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val()
    };
    $.ajax({
        url: link + "getlist",
        data: JSON.stringify(dataEditList),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {

                         SpinnerDialog.hide();
                   navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');

        },
        success: function (editListResult) {
                       SpinnerDialog.hide();
            if (editListResult == 2) {
                //win     navigator.notification.alert(session, alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                      {
                                           message: session,
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                setTimeout(function () { logout(); }, 2000);
                return false;
            }

            $.mobile.changePage("#PatientEditlist", { transition: "slide", changeHash: false });
            var resltEditLst = JSON.parse(editListResult);
            for (var key in resltEditLst) {

                if (resltEditLst[key].physicianListId == 1) {
                    $("#checkBox_EditList").append('<input ctype="checkboxList" name="checkBox' + resltEditLst[key].ID + '" style="outline-color: red;" id="checkBox' + resltEditLst[key].ID + '" type="checkbox" checked="checked"><label for="checkBox' + resltEditLst[key].ID + '">' + resltEditLst[key].Name + '</label>').trigger('create');
                } else {
                    $("#checkBox_EditList").append('<input ctype="checkboxList" name="checkBox' + resltEditLst[key].ID + '" style="outline-color: red;" id="checkBox' + resltEditLst[key].ID + '" type="checkbox" ><label for="checkBox' + resltEditLst[key].ID + '">' + resltEditLst[key].Name + '</label>').trigger('create');
                }
            }
        }
    });
}


function updateEditList() {
       SpinnerDialog.show(null, "Loading...", true);
    var listArr = [];
    $("#checkBox_EditList").find('input[ctype=checkboxList]').each(function () {
        if ($(this).is(':checked')) {
            listArr.push({ "ID": $(this).attr("id").replace("checkBox", "") });
        }
    });


    var msg = {
        "key": $("#hdnuserid").val(),
        "value": JSON.stringify(listArr)
    };
    $.ajax({
        url: link + "updatephysicianlist",
        data: JSON.stringify(msg),
        dataType: "json",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        error: function (request, error) {
                     SpinnerDialog.hide();
                navigator.notification.alert(ntwrkDesc, alertDismissed, ntwrkHead, 'Ok');
        },
        success: function (editListstatus) {
                     SpinnerDialog.hide();
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
            var statusEditList = JSON.parse(editListstatus);
            if (statusEditList == 0) {
                //win              navigator.notification.alert('List Updated Successfully.', alertDismissed, 'Success', 'Ok');
                                window.plugins.toast.showWithOptions(
                                       {
                                           message: "List Updated Successfully.",
                                           duration: 2000, // ms
                                           position: "center"
                                       });
                backLandingPage();
            }
            else {
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
//-----------------------------------------------Edit List Page ends-------------------------------------------------//

//-----------------------------------------------My List Page function starts-------------------------------------------//

$(document).on('pageinit', '#PatientMyLists', function () {
    $("#back_mylists").on("click", backLandingPage);
    $("#PatientMyLists").on("swiperight", backLandingPage);
});
function openMyList() {
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
                    //                    $("#lv_mylists").append("<li id='list" + listInfo[key].ID + "' onclick='openPatientList(" + listInfo[key].ID + "," + '"' + listInfo[key].Name + '"' + ")' style='font-size:13px !important; padding:15px;' data-iconshadow='true' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-icon-arrow-r ui-btn-icon-right'>" + listInfo[key].Name + "</li>").listview('refresh').trigger('create');

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
    if (patientFlag == "search") {
        openMyList();
        $(":mobile-pagecontainer").pagecontainer("change", "#PatientMyLists", { reverse: true, transition: "slide", changeHash: false });
    }
    else if (patientFlag == "list") {
        $(":mobile-pagecontainer").pagecontainer("change", "#PatientMyLists", { reverse: true, transition: "slide", changeHash: false });
    }


}
//------------------------------------------------My List Page ends---------------------------------------------------------//

//--------------------------------------------------Patient List start------------------------------------------------------//
$(document).on('pageinit', '#PatientList', function () {
    $("#backPatientList").on("click", backMyList);
    $("#addPatient_list").on("click", { search: "2" }, openSearchPatient);
    $("#PatientList").on("swiperight", backMyList);
});

var listId = '';
var patientFlag = '';
function openPatientList(event) {

    var listName = '';

    var id = event.data.key;
    var listnm = event.data.value;
    var flagPatient = event.data.checknm;

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

                //                $("#ul_PatientList").append('<li onclick="openPatientTestDetails(' + "'" + listInfo[key].PersonID + "'" + ')"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName + '</div> <div><span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].MRNno + '</span> <span class="iconTxt" style="margin-left:10px;">' + listInfo[key].gender + ' </span><span class="iconTxt" style="margin-left:10px;">D.O.B: ' + listInfo[key].DOB + '</span></div><div>  <span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#ul_PatientList").append('<li id="patientList' + key + '"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName + '</div> <div><span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].MRNno + '</span> <span class="iconTxt" style="margin-left:10px;">' + listInfo[key].gender + ' </span><span class="iconTxt" style="margin-left:10px;">D.O.B: ' + listInfo[key].DOB + '</span></div><div>  <span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#patientList" + key).on("click", { key: listInfo[key].PersonID }, openPatientTestDetails);
            }
        }
    });
}
function backPatientList() {
    $(":mobile-pagecontainer").pagecontainer("change", "#PatientList", { reverse: true, transition: "slide", changeHash: false });
}
//---------------------------------------------------Patient List ends here-------------------------------------------------//

//------------------------------Search Patient starts----------------------------------------------------------------------//

$(document).on('pageinit', '#SearchPatient', function () {
    $("#btnBackSearch").on("click", checkFlagSearch);
    $("#SearchPatient").on("swiperight", checkFlagSearch);
    //  $("#btnSearchPatient").on("click", SearchPatient);
    $("#btnAddPatientSearch").on("click", addPatient);
    $("#txtSearch").on("keyup", function (event) {
        if (event.keyCode == '13') {

            SearchPatient();
        }

    });
});
function checkFlagSearch() {
    if (flagSearch == 1) {
        backLandingPage();
    }
    else if (flagSearch == 2) {
        backPatientList();
    }
}
function addPatient() {

    if ($("#hdnpersonId").val() == "") {
        //win     navigator.notification.alert('Search Patient First.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Search Patient First.",
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
            "MRNno": $("#mrnNoSearch").html(),
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
                    //win  navigator.notification.alert('Patient added successfully.', alertDismissed, 'Success', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: "Patient added successfully.",
                                                                  duration: 2000, // ms
                                                                  position: "center"
                                                              });
                    var ddlId = $("#ddl_list").val();

                    var skillsSelect = document.getElementById("ddl_list");
                    var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;

                    openListSearchPatient(ddlId, selectedText, 'search');

                }
                else if (idReslt == 1) {
                    //win  navigator.notification.alert('Patient already exist.', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                              {
                                                                  message: "Patient already exist.",
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

                //                $("#ul_PatientList").append('<li onclick="openPatientTestDetails(' + "'" + listInfo[key].PersonID + "'" + ')"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName + '</div> <div><span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].MRNno + '</span> <span class="iconTxt" style="margin-left:10px;">' + listInfo[key].gender + ' </span><span class="iconTxt" style="margin-left:10px;">D.O.B: ' + listInfo[key].DOB + '</span></div><div>  <span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#ul_PatientList").append('<li id="patientList' + key + '"><a href="" style="font-size: 12px; line-height: 2em;">  <div class="txtList">' + listInfo[key].patientName + '</div> <div><span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].MRNno + '</span> <span class="iconTxt" style="margin-left:10px;">' + listInfo[key].gender + ' </span><span class="iconTxt" style="margin-left:10px;">D.O.B: ' + listInfo[key].DOB + '</span></div><div>  <span class="iconTxt"></span><span style="margin-left:5px;">' + listInfo[key].NHSno + '</span><span style="margin-left:10px;">Location: ' + listInfo[key].location + '</span></div> </a></li>').listview("refresh").trigger("create");

                $("#patientList" + key).on("click", { key: listInfo[key].PersonID }, openPatientTestDetails);
            }
        }
    });
}


var flagSearch = '';
function openSearchPatient(searchEvent) {
    if (searchEvent.data.search == 1) {
        flagSearch = 1;
    }
    else if (searchEvent.data.search == 2) {
        flagSearch = 2;
    }
    $("#ddl_list").empty();
    $("#hdnpersonId").val("");
    $("#SearchResult").html("");
    $("#txtSearch").val("");
    $("#dname_searchPatient").html($("#hdnphyname").val());

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
            var listInfo = JSON.parse(myList);

            $("#ddl_list").html("<option value=0> Select List Name</option>");
            for (var key in listInfo) {
                if (listInfo[key].physicianListId == 1) {
                    $("#ddl_list").append('<option value=' + listInfo[key].ID + '>' + listInfo[key].Name + '</option>').trigger("change");
                }
            }
            if (flagSearch == 2) {
                $("#ddl_list").val(listId).change();
            }


        }
    });

}
function SearchPatient() {
    $("#SearchResult").html("");
    $("#hdnpersonId").val("");
    if ($("#txtSearch").val() == "") {
        //win     navigator.notification.alert('Please enter MRN number.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter MRN number.",
                       duration: 2000, // ms
                       position: "center"
                   });
    }

    else {
              SpinnerDialog.show(null, "Loading...", true);
        var mrnNo = {
            "key": $("#txtSearch").val(),
            "value": $("#hdnfacilityId").val()
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
                    //win              navigator.notification.alert('MRN not found !', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: "MRN not found !",
                                               duration: 2000, // ms
                                               position: "center"
                                           });

                    return false;
                } else if (searchResult == "failed") {
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
                $("#SearchResult").append('<div style="background-color:#ffffff; padding:5px;" class="ui-content"><div style="background-color:#DFE0DF;	border-style: solid; border-color: #000;  border-width: 1px;" class="ui-content"><div class="txtList" class="txt14">' + resultSearch["patientName"] + '</div><div class="clr"><span class="iconTxt txt14">MRN: </span><span id="mrnNoSearch" class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 33%;">' + resultSearch["MRNno"] + '</span></div><div class="clr"><span class="iconTxt txt14">Gender: </span><span class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 33%;">' + resultSearch["gender"] + '</span></div><div class="clr"><span class="iconTxt txt14">DOB: </span><span class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 44%;">' + resultSearch["DOB"] + '</span></div><div class="clr"><span class="iconTxt txt14">NHS NO.: </span><span class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 33%;">' + resultSearch["NHSno"] + '</span></div> <div class="clr"><span class="iconTxt txt14">LOCATION: </span><span class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 60%;">' + resultSearch["location"] + '</span></div><div class="clr"><span class="iconTxt txt14">LEAD CLINICIAN: </span><span class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 40%;">' + resultSearch["leadClinician"] + '</span></div> <div style="display: inline-block; word-wrap: break-word; width: 100%; text-overflow:ellipsis; "><span class="iconTxt txt14">ADMISSION DATE: </span><span class="fr tar txt14" style="display: inline-block; word-wrap: break-word; width: 40%;" >' + resultSearch["AddmissionDate"] + '</span></div></div></div>');

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
    $(":mobile-pagecontainer").pagecontainer("change", "#LabViews", { reverse: true, transition: "slide", changeHash: false });
}
//-------------------------------Lab Views Ends-----------------------------------------------------------------------------//

//-------------------------------------------------------Lab View 2 starts-----------------------------------------//

$(document).on('pageinit', '#LaboratoryView2', function () {
    //  $("#back_lab2").on("click", backLabView);
    $("#back_lab2").on("click", backTestDetails);
    $("#LaboratoryView2").on("swiperight", backTestDetails);
    $("#rad_lab2").on("click", { src: "labView2" }, openRadiology);
    $("#addNote_lab2").on("click", openAddNote);
});

function backLab2() {
    $(":mobile-pagecontainer").pagecontainer("change", "#LaboratoryView2", { reverse: true, transition: "slide", changeHash: false });
}
//-------------------------------Lab View 2 ends-----------------------------------------------------------------------------//

//-------------------------------------------------Patient Test Details function starts------------------------------------------------------//

$(document).on('pageinit', '#PatientTestDetails', function () {
    $("#rad_details").on("click", { src: "testDtls" }, openRadiology);
    //$("#lab_details").on("click", { src: "tstDtls" }, openLabViews);
    $("#lab_details").on("click", { src: "tstDtls" }, LabView2);
    $("#viewnote_details").on("click", openNotesList);
    $("#addnote_details").on("click", openAddNote);
    $("#backTestDetails").on("click", backPatientList);
    $("#PatientTestDetails").on("swiperight", backPatientList);
});
var srcLabView = '';
function openLabViews(source) {
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
function LabView2() {

    $("#lv_lab2").empty();
    $.mobile.changePage("#LaboratoryView2", { transition: "slide", changeHash: false });
             SpinnerDialog.show(null, "Loading...", true);
    $("#dname_lab2").html($("#hdnphyname").val());
    $("#dname_lab2").append('<span id="lname_lab2" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    $("#ptInfo_lab2").html($("#ptInfo_details").html());
    $("#lab2Location").html($("#ptInfoLocation").html());
    var dataLaboratory2 = {
        "ID": $("#hdnuserid").val(),
        "Token": $("#hdntokenKey").val(),
        "facilityID": $("#hdnfacilityId").val(),
        "PersonId": $("#hdnPersonIdDetails").val()
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
                             SpinnerDialog.hide();
                return false;
            } else if (reportStatus == "failed") {
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
            for (var key in statusLaboratory) {
                //                $("#lv_lab2").append('<li onclick="openLabView2TestInfo(' + statusLaboratory[key].ParentEventId + ',' + statusLaboratory[key].PersonID + ',' + "'" + statusLaboratory[key].Name + "'" + ')"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusLaboratory[key].resultStatus + '</div><span style="font-size: 12px;" class="ui-li-count">' + statusLaboratory[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#lv_lab2").append('<li id="labView2' + key + '"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusLaboratory[key].resultStatus + '</div><span style="font-size: 12px;" class="ui-li-count">' + statusLaboratory[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#labView2" + key).on("click", { parentEvent: statusLaboratory[key].ParentEventId, personID: statusLaboratory[key].PersonID, name: statusLaboratory[key].Name }, openLabView2TestInfo);
            }
                               SpinnerDialog.hide();
        }
    });
}

function openLabView2TestInfo(event) {

    var prntEvntId = event.data.parentEvent;
    var prsnId = event.data.personID;
    var name = event.data.name;

    // $("#refRangeLabView2Info").show();
    $("#Lab2testDetails").html('');
    $("#nameLabView2Info").html('');
    $.mobile.changePage("#LabView2Info", { transition: "slide", changeHash: false });
            SpinnerDialog.show(null, "Loading...", true);
    $("#dnameLab2Info").html($("#hdnphyname").val());
    $("#dnameLab2Info").append('<span id="lnameLab2List" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
    $("#PtInfo_Lab2Info").html($("#ptInfo_details").html());
    $("#Lab2InfoLocation").html($("#ptInfoLocation").html());
    var dataLab2List = {
        "ID": prntEvntId,
        "Token": prsnId,
        "facilityID": $("#hdnfacilityId").val()
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
                $("#Lab2testDetails").append("<div style='color:#000000; background-color:#ffffff;' class='errorMessage pd15 tac'>No Record Found</div>");
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
                    txtcolor = '#ffffff';
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

                    $("#Lab2testDetails").append('<a href="#"><div id="radList' + key + '"  class="mt1 ' + bg + '" style=""><span style="font-size: 13px; margin-top:8px;" id="tstNmLabReportDetails">' + statusRadiology[key].TestName + '</span><span class="" id="rsltvalLabReportDetails" style="word-wrap:none; color:' + txtcolor + ';  text-align: center; width: 50px; padding:10px; display: inline-block; font-size: 13px; background-color:' + bgColor + '">' + statusRadiology[key].Resultvalue + '</span><span class="fr tar" style="display: inline-block; word-wrap: break-word; width: 25%; padding-top:7px; "><span  style="font-size: 13px;" id="unitLabDtls">' + statusRadiology[key].Unit + '</span><span  style="font-size: 13px; margin-left:5px;" id="refLabDtls">' + statusRadiology[key].Refrange + '</span></span></div></a><div class="clr"></clr>').trigger('refresh');

                    $("#radList" + key).on("click", { key: statusRadiology[key].EventID, valueCheck: "3" }, openRadDetails);
                }

                else {
                    $("#Lab2testDetails").append('<div style="display: inline-block;" class="mt1 ' + bg + '" ><span style="font-size: 13px; margin-top:8px;" id="tstNmLabReportDetails">' + statusRadiology[key].TestName + '</span><span class="" id="rsltvalLabReportDetails" style="word-wrap:none; color:' + txtcolor + ';  text-align: center; width: 50px; padding:10px; display: inline-block; font-size: 13px; background-color:' + bgColor + '">' + statusRadiology[key].Resultvalue + '</span><span class="fr tar" style="display: inline-block; word-wrap: break-word; width: 25%; padding-top:7px; "><span  style="font-size: 13px;" id="unitLabDtls">' + statusRadiology[key].Unit + '</span><span  style="font-size: 13px; margin-left:5px;" id="refLabDtls">' + statusRadiology[key].Refrange + '</span></span></div><div class="clr"></clr>').trigger('refresh');
                }

            }

        }
    });
}
function openPatientTestDetails(event) {

    var prsnId = event.data.key;

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
        "value": $("#hdnfacilityId").val()
    };
    $.mobile.changePage("#PatientTestDetails", { transition: "slide", changeHash: false });

           SpinnerDialog.show(null, "Loading...", true);

    $("#dname_testdetails").html($("#hdnphyname").val());

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
                //win  navigator.notification.alert('Unable to fetch Patient Details.', alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                  {
                                      message: "Unable to fetch Patient Details.",
                                      duration: 2000, // ms
                                      position: "center"
                                  });

                return false;
            }


            $("#dname_testdetails").append('<span id="lname_details" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
            var detailsTest = JSON.parse(testDetails);
            $("#ptInfo_details").html(detailsTest["patientName"] + " | " + detailsTest["MRNno"]);
            $("#ptInfoLocation").html(detailsTest["location"]);
            $("#hdnPersonIdDetails").val(detailsTest["PersonID"]);
            $("#ptnameDetails").html(detailsTest["patientName"]);
            $("#mrnNoDetails").html(detailsTest["MRNno"]);
            $("#genderDetails").html(detailsTest["gender"]);
            $("#dobDetails").html(detailsTest["DOB"]);
            $("#nhsnoDetails").html(detailsTest["NHSno"]);
            $("#locationDetails").html(detailsTest["location"]);
        }
    });
}
function backTestDetails() {
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
    $(":mobile-pagecontainer").pagecontainer("change", "#LabView2Info", { reverse: true, transition: "slide", changeHash: false });
}

//--------------------------------------------------------Radiology starts--------------------------------------------//
$(document).on('pageinit', '#Radiology', function () {
    $("#back_radiology").on("click", backFromRadiology);
    $("#Radiology").on("swiperight", backFromRadiology);
    $("#AddNote_radiology").on("click", openAddNote);
    //    $("#lab_radiology").on("click", { src: "rad" }, openLabViews);
    $("#lab_radiology").on("click", LabView2);
});
function backFromRadiology() {
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

    $("#dname_radiology").html($("#hdnphyname").val());
    $("#dname_radiology").append('<span id="lname_radiology" class="txt13" style="float: right; margin-right: 30px;">' + $("#listnm").html() + '</span>');
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

                $("#lv_radiology").append('<li id="radiologyList' + key + '"><a style="font-size: 12px; padding: 15px;" href="">' + statusRadiology[key].Name + '<div style="font-size:9px; margin-top:6px;">' + statusRadiology[key].resultStatus + '</div><span style="font-size: 12px;" class="ui-li-count">' + statusRadiology[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');

                $("#radiologyList" + key).on("click", { key: statusRadiology[key].eventId, valueCheck: "2" }, openRadDetails);

            }
        }
    });
}
var flag = '';
function openRadDetails(event) {

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
    $("#dnmRadReportDetails").html($("#hdnphyname").val());
    $("#dnmRadReportDetails").append('<span id="lnameRadReportDetails" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
    $("#PtInfoRadReportDetails").html($("#ptInfo_details").html());
    $("#RadRprtDtlsLocation").html($("#ptInfoLocation").html());
    var dataReportDetails = {
        "key": evntId,
        "value": $("#hdnfacilityId").val()
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
            var detailsReport = JSON.parse(reportDetails);

            $("#tstNmRadReportDetails").html(detailsReport["TestName"]);
            $("#contentRadReportDetails").html(detailsReport["BLOBCONTENTS"].replace(/\n/g, "<br />"));
            //$("#contentRadReportDetails").prop("disabled", true);
        }
    });
}
function backRadiology() {
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
                $("#lv_laboratory").append('<li onclick="openLabDetails(' + statusLaboratory[key].eventId + ',' + statusLaboratory[key].eventClassCD + ',' + "'" + statusLaboratory[key].Name + "'" + ')"><a style="font-size: 12px; padding: 15px;" href="">' + statusLaboratory[key].Name + '<div style="font-size:12px; margin-top:6px;">' + statusLaboratory[key].resultStatus + '</div><span style="font-size: 12px;" class="ui-li-count">' + statusLaboratory[key].eventDate + '</span></a></li>').listview('refresh').trigger('create');
            }
                 SpinnerDialog.hide();
        }
    });
}
function openLabDetails(evntId, evntClassCd, rprtName) {


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
        //win    navigator.notification.alert('Please enter note.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Please enter note.",
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
            "token": $("#hdntokenKey").val()
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
                    //win   navigator.notification.alert('Note Saved Successfully.', alertDismissed, 'Success', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                           {
                                               message: "Note Saved Successfully.",
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
    $.mobile.changePage("#AddNote", { transition: "slide", changeHash: false });
            SpinnerDialog.show(null, "Loading...", true);
    $("#txt_Notes").val('');
    $("#dname_addnote").html($("#hdnphyname").val());
    $("#dname_addnote").append('<span id="lname_addnote" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
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
    $(":mobile-pagecontainer").pagecontainer("change", "#Notes", { reverse: true, transition: "slide", changeHash: false });
}
function openNotesList() {
    $("#lv_notes").empty();
    $.mobile.changePage("#Notes", { transition: "slide", changeHash: false });

            SpinnerDialog.show(null, "Loading...", true);


    $("#dname_notes").html($("#hdnphyname").val());
    $("#dname_notes").append('<span id="lname_notes" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
    $("#ptInfo_notes").html($("#ptInfo_details").html());
    $("#notesListLocation").html($("#ptInfoLocation").html());
    var dataNotesList = {
        "patientMRN": $("#mrnNoDetails").html(),
        "operatorId": $("#hdnuserid").val(),
        "token": $("#hdntokenKey").val()
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
    $(":mobile-pagecontainer").pagecontainer("change", "#Notes_DetailsPage", { reverse: true, transition: "slide", changeHash: false });
}
function openNoteDetails(event) {

    var id = event.data.key;
    $.mobile.changePage("#Notes_DetailsPage", { transition: "slide", changeHash: false });
              SpinnerDialog.show(null, "Loading...", true);
    $("#noteTitle").html("");
    $("#detailsNotes").html("");
    $("#dnameNotesDetails").html($("#hdnphyname").val());
    $("#dnameNotesDetails").append('<span id="lnameNotesDetails" class="txt13" style="float:right; margin-right:30px;">' + $("#listnm").html() + '</span>');
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
    $("#backChngePwd").on("click", backLandingPage);
    $("#ChangePwd").on("swiperight", backLandingPage);
    $("#submitChangePwd").on("click", ChangePassword);
});

function openChangePwd() {
    $("#dnameChangePwd").html('');
    $("#oldPwd").val('');
    $("#NewPwd").val('');
    $("#ConfirmPwd").val('');
    $("#dnameChangePwd").html($("#hdnphyname").val());
    $.mobile.changePage("#ChangePwd", { transition: "slide", changeHash: false });
}
function ChangePassword() {
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
                    //win      navigator.notification.alert('Password Changed Successfully.', alertDismissed, 'Success', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                           {
                                                               message: "Password Changed Successfully.",
                                                               duration: 2000, // ms
                                                               position: "center"
                                                           });
                    backLandingPage();
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
                    //win  navigator.notification.alert('Incorrect Old Password.', alertDismissed, '', 'Ok');
                                        window.plugins.toast.showWithOptions(
                                                           {
                                                               message: "Incorrect Old Password.",
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
        //win   navigator.notification.alert('Password fields cant be empty.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Password fields cant be empty.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }
    else if ($("#NewPwd").val() != $("#ConfirmPwd").val()) {
        //win  navigator.notification.alert('Password donot match.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "Password donot match.",
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
    $(":mobile-pagecontainer").pagecontainer("change", "#RadRprtDtlsPage", { reverse: true, transition: "slide", changeHash: false });
}

function backRadiologyList() {
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
    $(":mobile-pagecontainer").pagecontainer("change", "#Laboratory", { reverse: true, transition: "slide", changeHash: false });
}
function backLabDtls() {
    $(":mobile-pagecontainer").pagecontainer("change", "#LabRprtDtlsPage", { reverse: true, transition: "slide", changeHash: false });
}
//--------------------------------Laboratory details ends-----------------------------------------------------------------//

//-------------------------------------------------------Laboratory details starts---------------------------------------------------//

$(document).on('pageinit', '#loginChangePwd', function () {
    $("#loginChangePwd").on("swiperight", backloginPage);
    $("#labLabReportDetails").on("click", backloginPage);
    $("#submitChngePwd").on("click", submitChangePassword);
});

function submitChangePassword() {

    if ($("#cnfrmPwdChngePwd").val() == "" || $("#newPwdChngePwd").val() == "") {
        //win   navigator.notification.alert('PIN fields cant be empty.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "PIN fields cant be empty.",
                       duration: 2000, // ms
                       position: "center"
                   });
        return false;
    }
    else if ($("#cnfrmPwdChngePwd").val() != $("#newPwdChngePwd").val()) {
        //win  navigator.notification.alert('PIN dont match.', alertDismissed, 'Validation Error', 'Ok');
                window.plugins.toast.showWithOptions(
                   {
                       message: "PIN dont match.",
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
                openLandingPage();
                //win  navigator.notification.alert('Password Changed Successfulyy', alertDismissed, '', 'Ok');
                                window.plugins.toast.showWithOptions(
                                                   {
                                                       message: 'PIN Changed Succesfully.',
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


//$(document).on('pageinit', '#uploadProfilePicPage', function () {
//    $("#imageUpload").on("click", imagePopupCall);
//    $("#captureVideo").on("click", imagePopupCall);
//    $("#browse").on("click", imagePopupCall);
//    $("#backUploadProfile").on("click", backLandingPage);
//    $("#uploadProfilePicPage").on("swiperight", backLandingPage);

//});
//var Quality = "";
//var id;
//function imagePopupCall() {
//    $("#uploadImagePopup").popup("open");
//    id = $(this).attr("id");
//}
//function getQuality() {

//    if (id == "imageUpload") {
//        Quality = $('input:radio[name=uploadQualityRadio]:checked').val();
//        capturePicture();
//    }
//    if (id == "captureVideo") {
//        Quality = $('input:radio[name=uploadQualityRadio]:checked').val();
//        captureVideo();
//    }
//    if (id == "browse") {
//        Quality = $('input:radio[name=uploadQualityRadio]:checked').val();
//        selectPicture();
//    }
//}
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

