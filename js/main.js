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
      $.ajax({
        url: "https://api.github.com/users" + username + "repos",
        data: {
          client_id: "7158b35ca0ca1a70b3cb",
          client_secret: "8626077d5fa940f333acb0bd3120f7409b8369c9",
          sort: "created: asc",
          //per_page: 5
        },
      }).done(function (repos) {
        //console.log(repos);
        $.each(repos, function (index, repo) {
          $("#repos").append(`
              <div class="well>
              <div class="row">
              <div class="col-md-7">
                <strong>${repo.name}</strong>: ${repo.description}
              </div>
              <div class="col-md-3">
              <span class="badge badge-primary">Forks:: ${repo.forks_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
              </div>
              <div class="col-md-2">
                <a href="${repo.html_url}" target="_blank" class="btn btn-default ">Repo Page</a>
              </div> 
              </div>
              </div>
              `);
        });
      });
      //console.log(user);
      $("#profile").html(`
       <div class="card">
  <div class="card-header">
  ${user.name}
  </div>
  <div class="card-body">
    <div class="row">
    <div class="col-md-3">
    <img class="thumbnail avatar" src="${user.avatar_url}">
    <a target="_blank" class="btn tbn-primary btn-block" href="${user.html_url}">View profile</a>
    </div>
    <div class="col-md-9">
    <span class="badge badge-primary">Public Repos:: ${user.public_repos}</span>
<span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
<span class="badge badge-success">Followers: ${user.followers}</span>
<span class="badge badge-danger">Following: ${user.following}</span>
<br><br>
<ul class="list-group card w-50">
<li class="list-group-item">Company: ${user.company}</li>
<li class="list-group-item">Website/Blog: ${user.blog}</li>
<li class="list-group-item">Location: ${user.location}</li>
<li class="list-group-item">Member Since: ${user.created_at}</li>
</ul>

    </div
    </div>
  </div>
</div>

<h3 class="page-header">Latest Repos</h3>
<div id="repos"></div>
      `);
    });
  });
});
