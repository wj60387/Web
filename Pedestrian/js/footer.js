$.ajax({
    type: "POST",
    url: "http://" + location.hostname + (location.port != "" ? ":" : "") + location.port + "/personal/space/index/currentuser.dhtml",
    data: {},
    success: function (retValue) {
        if (retValue != undefined && retValue != null) {
            globalUser = jQuery.parseJSON(retValue);
            if (globalUser == null || globalUser == undefined || globalUser == "") {
                return;
            }
            setSignInfo();
        } else {
            return 0;
        }
    }
});

function setSignInfo() {
    $('#signin').hide();
    $('#userInfo').show();
    $('#userMenu').show();
    $("#overage_score").text(globalUser.remcommendscore);
    $("#user_name").text(globalUser.user_name);
    //$("#user_name").attr('href',contextPath + '/personal/space/index/index-'+globalUser.user_id+'.dhtml');
    $("#userPic").attr('src', imagePath + globalUser.small_user_pic);
    $("#userPicName").attr('title', "您好，" + globalUser.user_name);
    $("#userPicName").attr('href', contextPath + '/personal/space/index/index-' + globalUser.user_id + '.dhtml');
    $("#userScore").attr('href', contextPath + '/personal/space/index/index-' + globalUser.user_id + '.dhtml');
    $("#userAccount").attr('href', contextPath + '/personal/space/index/index-' + globalUser.user_id + '.dhtml');
    $("#userGuide").attr('href', contextPath + '/personal/guide/list-' + globalUser.user_id + '.dhtml');
    $("#userPicGroup").attr('href', contextPath + '/personal/space/picgroup/list-' + globalUser.user_id + '.dhtml');
    $("#userActivity").attr('href', contextPath + '/activity/list-' + globalUser.user_id + '.dhtml');
    $("#userPartner").attr('href', contextPath + '/partner/myindex-' + globalUser.user_id + '.dhtml');
    $("#userAccount").attr('title', globalUser.user_name);
    $("#userMenu").find('li').find('ul').find('a').each(function () { $(this).attr('href', $(this).attr('href').replace('{userId}', globalUser.user_id)) });

    var userType = globalUser.user_type;
    if (userType > 2) {
        $('#clubManage').show();
        $('#clubManageLine').show();
    }
}