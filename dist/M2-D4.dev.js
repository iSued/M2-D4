"use strict";

var APP = {
  members: [],
  // add member
  addMember: function addMember(name) {
    // add the name to user list
    this.members.push(name); // show the name in user section

    $("#memberList").append("<li class='list-group-item'>" + name + "</li>");
  },
  // init function
  // member section should be blank.
  // team section should be blank.
  init: function init() {
    // clear user list and user section
    this.members = [];
    $("#memberList").html("");
    var self = this; // clear team section

    $("#teamarea").html(""); // default team number  = 2

    $("#numberOfTeams").val(2); // default user list

    $("#textMemberInput").val("James, John, Robert, Michael, David, Richard"); // when click on remove in members of team

    $("#teamarea").off("click").on("click", ".btn-remove", function (e) {
      e.stopPropagation(); // remove the member in team

      var name = $(this).parent().find("span").text();
      $(this).parent().remove(); // add the user to global user list

      $("#memberList").append("<li class='list-group-item'>" + name + "</li>");
    });
  },
  // add team
  addTeam: function addTeam(number) {
    var self = this; // position list of team

    var pos = 1;

    if ($("#teamarea > div:last-child").length > 0) {
      pos = $("#teamarea > div:last-child").find(".card").data("team");
      pos = parseInt(pos) + 1;
    }

    for (var i = 0; i < number; i++) {
      // get the team template and show it
      var team = $("#team-template").html();
      $("#teamarea").append(team); // make a team

      team = $("#teamarea > div:last-child");
      $(team).find(".card-title").text("team" + (i + pos).toString());
      $(team).find(".card").data("team", i + pos);
      $(team).addClass("col-lg-6");
    }
  },
  // assign a member to team
  assignTeam: function assignTeam(name, team) {
    // get the user temlpate and add it to team
    var usr = $("#user-template").html();
    $(team).find(".memberlist").append(usr);
    $(team).find(".memberlist > li:last-child").find("span").text(name);
  },
  // remove a member
  removeMember: function removeMember(index) {
    $("#memberList > li").eq(index).remove();
  },
  //showalert
  showAlert: function showAlert(message) {
    jQuery("#error").html(message);
    jQuery("#showAlert").modal("show");
  }
};
$(document).ready(function () {
  // click on btn-add-member
  $(".btn-add-member").off("click").on("click", function () {
    // get the name
    var name = $("#textMemberInput").val();

    if (name.trim() == "") {
      APP.showAlert("Please Add Player");
    } // splite the string with "," .if  string is user list, we can get the user lists.


    var list = name.split(",");

    if (list.length > 0) {
      //  case user list
      $(list).each(function (index, item) {
        if (item.trim()) // add the real name
          APP.addMember(item.trim());
      });
      $("#textMemberInput").val("");
      return;
    }
  }); // click on add team

  $(".btn-add-team").off("click").on("click", function () {
    // check validation number
    var num = $("#numberOfTeams").val();
    var numbers = /^[0-9]+$/;

    if (!num.match(numbers)) {
      APP.showAlert("Please Use Number.");
      return false;
    }

    if (num) {
      // create team
      APP.addTeam(num);
    }
  }); // click on user assign

  $(".btn-user-assign").off("click").on("click", function () {
    var size = $("#memberList > li").length; // user size

    var teams = $("#teamarea > div").length; // teams size
    // random value (user)

    var rand = parseInt(Math.random() * 10000);
    var id = rand % size; // random value of (team)

    rand = parseInt(Math.random() * 10000);
    var tpos = rand % teams;

    if (teams > 0 && size > 0) {
      // select random user and random team. and assign it.
      // remove the member from global list
      var name = $("#memberList > li").eq(id).text();
      var activeTeam = $("#teamarea > div").eq(tpos);
      APP.assignTeam(name, activeTeam);
      APP.removeMember(id);
    }

    if (teams == 0) {
      APP.showAlert("please add the team");
      return;
    }

    if (size == 0) {
      APP.showAlert("please add the player");
    }
  }); // click on reset

  $(".btn-app-reset").off("click").on("click", function () {
    APP.init();
  });
  APP.init();
});