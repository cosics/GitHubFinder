$(document).ready(function () {
  //console.log("Ready...");
  $("#searchUser").on("keyup", function (e) {
    //console.log('key pressed')
    //console.log(e.target.value);
    let username = e.target.value;

    //ajax request to github

    $.ajax({
      url: "https://api.github.com/users/" + username,
      data: {
        client_id: "7158b35ca0ca1a70b3cb",
        client_secret: "8626077d5fa940f333acb0bd3120f7409b8369c9",
      },
    }).done(function (user) {
      console.log(user);
    });
  });
});
